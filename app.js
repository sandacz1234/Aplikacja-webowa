const CATEGORY_ICONS = {
  'Języki obce': '文', Angielski: 'A', Hiszpański: '¡', Niemiecki: 'Ä',
  Francuski: 'é', Japoński: 'あ', Biologia: '✿', Historia: '◷',
  Geografia: '⌖', Matematyka: '∑', Informatyka: '⌘', Medycyna: '✚',
  Prawo: '§', Inne: '✳'
};
const COLOR_CLASSES = ['mint', 'peach', 'lilac', 'blue', 'yellow'];

let data = { decks: [] };
let supabaseClient = null;
let currentUser = null;
let activatingUserId = null;
let photoTargetDeckId = null;
let activeDeckId = null;
let editingDeckId = null;
let editingCardId = null;
let testQuestions = [];
let testIndex = 0;
let studyCards = [];
let studyIndex = 0;
let answerVisible = false;
let learnedToday = 0;
let learnedDate = null;
let toastTimeout;

const $ = (selector) => document.querySelector(selector);
const homeView = $('#home-view');
const deckView = $('#deck-view');
const studyView = $('#study-view');
const testView = $('#test-view');
const authScreen = $('#auth-screen');
const appShell = $('#app-shell');

function setAuthStatus(message, isError = false) {
  const status = $('#auth-status');
  status.textContent = message;
  status.classList.toggle('error', isError);
}

function setPhotoStatus(message, isError = false) {
  const status = $('#photo-status');
  status.textContent = message;
  status.classList.toggle('error', isError);
}

function getErrorMessage(error) {
  return error && typeof error.message === 'string' ? error.message : 'Wystąpił nieznany błąd.';
}

async function loadCloudData() {
  if (!supabaseClient || !currentUser) throw new Error('Brak aktywnej sesji użytkownika.');
  const [deckRows, cardRows] = await Promise.all([
    fetchAllRows('decks', 'id,name,description,category,color,created_at'),
    fetchAllRows('cards', 'id,deck_id,front,back,created_at')
  ]);
  const cardsByDeck = new Map();
  for (const card of cardRows) {
    if (!cardsByDeck.has(card.deck_id)) cardsByDeck.set(card.deck_id, []);
    cardsByDeck.get(card.deck_id).push({
      id: card.id,
      front: card.front,
      back: card.back
    });
  }
  data = {
    decks: deckRows.map((deck) => ({
      id: deck.id,
      name: deck.name,
      description: deck.description || '',
      category: deck.category || 'Inne',
      color: deck.color || 'mint',
      cards: cardsByDeck.get(deck.id) || []
    }))
  };
}

async function fetchAllRows(table, columns) {
  const pageSize = 1000;
  const rows = [];
  for (let offset = 0; ; offset += pageSize) {
    const { data: page, error } = await supabaseClient.from(table)
      .select(columns)
      .order('created_at')
      .range(offset, offset + pageSize - 1);
    if (error) throw error;
    rows.push(...(page || []));
    if (page.length < pageSize) return rows;
  }
}

async function upsertRowsInBatches(table, rows) {
  const batchSize = 500;
  for (let offset = 0; offset < rows.length; offset += batchSize) {
    const { error } = await supabaseClient.from(table)
      .upsert(rows.slice(offset, offset + batchSize), { onConflict: 'user_id,id' });
    if (error) throw error;
  }
}

async function offerLegacyDeckImport(user) {
  const legacyKey = 'fiszki-app-data-v1';
  const legacyValue = localStorage.getItem(legacyKey);
  if (!legacyValue || data.decks.length) return;
  let legacyData;
  try {
    legacyData = JSON.parse(legacyValue);
  } catch (error) {
    console.error('Poprzednie lokalne talie mają nieprawidłowy format:', error);
    showToast('Znaleziono stare dane fiszek, których nie udało się odczytać.');
    return;
  }
  const legacyDecks = legacyData && Array.isArray(legacyData.decks) ? legacyData.decks : [];
  if (!legacyDecks.length || !legacyDecks.every(isValidDeck)) return;
  const confirmed = window.confirm(
    `W tej przeglądarce znaleziono ${legacyDecks.length} ${pluralize(legacyDecks.length, 'talię', 'talie', 'talii')} bez przypisanego konta. Czy przenieść je do konta ${user.email || 'użytkownika'}? Jeśli z tego urządzenia korzystało więcej osób, stare talie mogą należeć do kogoś innego.`
  );
  if (!confirmed) return;

  const decks = legacyDecks.map((deck) => ({
    id: makeId(),
    name: deck.name.trim(),
    description: typeof deck.description === 'string' ? deck.description : '',
    category: CATEGORY_ICONS[deck.category] ? deck.category : 'Inne',
    color: COLOR_CLASSES.includes(deck.color) ? deck.color : 'mint',
    cards: deck.cards.map((card) => ({
      id: makeId(),
      front: card.front.trim(),
      back: card.back.trim()
    }))
  }));
  const deckRows = decks.map((deck) => ({
    id: deck.id, user_id: user.id, name: deck.name,
    description: deck.description, category: deck.category, color: deck.color
  }));
  const cardRows = decks.flatMap((deck) => deck.cards.map((card) => ({
    id: card.id, user_id: user.id, deck_id: deck.id, front: card.front, back: card.back
  })));
  try {
    await upsertRowsInBatches('decks', deckRows);
    await upsertRowsInBatches('cards', cardRows);
    data.decks.push(...decks);
    localStorage.removeItem(legacyKey);
    showToast('Poprzednie talie zostały przeniesione na to konto.');
  } catch (error) {
    await rollbackCloudRows('decks', decks.map((deck) => deck.id), 'migracji starych talii');
    console.error('Nie udało się przenieść poprzednich talii:', error);
    showToast(`Nie udało się przenieść starych talii: ${getErrorMessage(error)}`);
  }
}

async function persistDeck(deck) {
  if (!supabaseClient || !currentUser) {
    showToast('Zaloguj się, aby zapisać talię.');
    return false;
  }
  const { error } = await supabaseClient.from('decks').upsert({
    id: deck.id,
    user_id: currentUser.id,
    name: deck.name,
    description: deck.description || '',
    category: deck.category || 'Inne',
    color: getColor(deck)
  }, { onConflict: 'user_id,id' });
  if (error) {
    console.error('Nie udało się zapisać talii:', error);
    showToast(`Nie udało się zapisać talii: ${getErrorMessage(error)}`);
    return false;
  }
  return true;
}

async function persistCard(deckId, card) {
  if (!supabaseClient || !currentUser) {
    showToast('Zaloguj się, aby zapisać fiszkę.');
    return false;
  }
  const { error } = await supabaseClient.from('cards').upsert({
    id: card.id,
    user_id: currentUser.id,
    deck_id: deckId,
    front: card.front,
    back: card.back
  }, { onConflict: 'user_id,id' });
  if (error) {
    console.error('Nie udało się zapisać fiszki:', error);
    showToast(`Nie udało się zapisać fiszki: ${getErrorMessage(error)}`);
    return false;
  }
  return true;
}

async function deleteCloudRecord(table, id, label) {
  if (!supabaseClient || !currentUser) {
    showToast('Sesja wygasła. Zaloguj się ponownie.');
    return false;
  }
  const { error } = await supabaseClient.from(table)
    .delete()
    .eq('user_id', currentUser.id)
    .eq('id', id);
  if (error) {
    console.error(`Nie udało się usunąć ${label}:`, error);
    showToast(`Nie udało się usunąć ${label}: ${getErrorMessage(error)}`);
    return false;
  }
  return true;
}

async function rollbackCloudRows(table, ids, label) {
  if (!supabaseClient || !currentUser || !ids.length) return;
  for (let offset = 0; offset < ids.length; offset += 500) {
    try {
      const { error } = await supabaseClient.from(table)
        .delete()
        .eq('user_id', currentUser.id)
        .in('id', ids.slice(offset, offset + 500));
      if (error) throw error;
    } catch (error) {
      console.error(`Nie udało się wycofać ${label}:`, error);
    }
  }
}

async function activateUser(user) {
  if (!user || (currentUser && currentUser.id === user.id && !appShell.classList.contains('hidden'))
    || activatingUserId === user.id) return;
  activatingUserId = user.id;
  currentUser = user;
  setAuthStatus('Wczytuję Twoje talie…');
  try {
    await loadCloudData();
    if (!currentUser || currentUser.id !== user.id) return;
    await offerLegacyDeckImport(user);
    if (!currentUser || currentUser.id !== user.id) return;
  } catch (error) {
    if (!currentUser || currentUser.id !== user.id) return;
    console.error('Nie udało się wczytać talii z Supabase:', error);
    data = { decks: [] };
    currentUser = null;
    activatingUserId = null;
    setAuthStatus(`Zalogowano, ale nie udało się wczytać talii: ${getErrorMessage(error)} Sprawdź konfigurację Supabase i tabele.`, true);
    return;
  }
  activatingUserId = null;
  const userEmail = user.email || '';
  $('#user-email').textContent = userEmail;
  $('#sign-out-avatar').textContent = userEmail.slice(0, 1).toUpperCase() || 'U';
  const statsKey = `fiszki-learned-today:${user.id}`;
  const dateKey = `fiszki-learned-date:${user.id}`;
  learnedToday = Number(localStorage.getItem(statsKey)) || 0;
  learnedDate = localStorage.getItem(dateKey);
  setAuthStatus('');
  authScreen.classList.add('hidden');
  appShell.classList.remove('hidden');
  updateDate();
  renderHome();
  showView('home');
}

async function initializeSupabase() {
  const config = window.FLASHCARDS_CONFIG;
  if (!config || !config.supabaseUrl || !config.supabaseAnonKey) {
    $('#auth-form').classList.add('hidden');
    setAuthStatus('Aplikacja nie została jeszcze połączona przez jej właściciela. Spróbuj ponownie później.', true);
    return;
  }
  if (!window.supabase) {
    setAuthStatus('Nie udało się połączyć z biblioteką Supabase. Sprawdź połączenie z internetem i odśwież stronę.', true);
    $('#auth-form').classList.add('hidden');
    return;
  }
  $('#auth-form').classList.remove('hidden');
  try {
    supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || (!session && event !== 'INITIAL_SESSION')) {
        currentUser = null;
        activatingUserId = null;
        data = { decks: [] };
        appShell.classList.add('hidden');
        authScreen.classList.remove('hidden');
      } else if (session?.user && event === 'SIGNED_IN') {
        setTimeout(() => activateUser(session.user), 0);
      }
    });
    const { data: sessionData, error } = await supabaseClient.auth.getSession();
    if (error) throw error;
    if (sessionData.session?.user) await activateUser(sessionData.session.user);
    else setAuthStatus('Połączono. Zaloguj się lub utwórz konto.');
  } catch (error) {
    console.error('Nie udało się zainicjalizować Supabase:', error);
    supabaseClient = null;
    $('#auth-form').classList.add('hidden');
    setAuthStatus(`Nie udało się połączyć z Supabase: ${getErrorMessage(error)}`, true);
  }
}

function setBusy(button, busy, busyText) {
  if (busy) {
    button.dataset.originalText = button.textContent;
    button.textContent = busyText;
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
    delete button.dataset.originalText;
  }
}

function makeId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function getDeckIcon(category) {
  return CATEGORY_ICONS[category] || CATEGORY_ICONS.Inne;
}

function getColor(deck) {
  return COLOR_CLASSES.includes(deck.color) ? deck.color : 'mint';
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2600);
}

function updateDate() {
  $('#today-label').textContent = new Intl.DateTimeFormat('pl-PL', {
    weekday: 'long', day: 'numeric', month: 'long'
  }).format(new Date());
  const today = new Date().toDateString();
  if (learnedDate !== today) {
    learnedToday = 0;
    learnedDate = today;
    if (currentUser) {
      localStorage.setItem(`fiszki-learned-date:${currentUser.id}`, today);
      localStorage.setItem(`fiszki-learned-today:${currentUser.id}`, '0');
    }
  }
}

function renderHome() {
  const grid = $('#deck-grid');
  const totalCards = data.decks.reduce((sum, deck) => sum + deck.cards.length, 0);
  $('#deck-count').textContent = data.decks.length;
  $('#card-count').textContent = totalCards;
  $('#learned-count').textContent = learnedToday;
  $('#deck-heading-count').textContent = data.decks.length ? `(${data.decks.length})` : '';
  grid.innerHTML = data.decks.map((deck) => `
    <article class="deck-card" data-deck-id="${escapeHtml(deck.id)}" tabindex="0" role="button" aria-label="Otwórz talię ${escapeHtml(deck.name)}">
      <div class="deck-card-top">
        <span class="deck-icon ${getColor(deck)}">${escapeHtml(getDeckIcon(deck.category))}</span>
        <div class="deck-menu-wrap">
          <button class="deck-menu" aria-label="Opcje talii ${escapeHtml(deck.name)}" aria-expanded="false">···</button>
          <div class="deck-menu-popup hidden">
            <button data-action="edit">Edytuj talię</button>
            <button data-action="delete" class="delete-action">Usuń talię</button>
          </div>
        </div>
      </div>
      <h3>${escapeHtml(deck.name)}</h3>
      <p class="deck-card-description">${escapeHtml(deck.description || deck.category)}</p>
      <div class="deck-card-footer"><span>${deck.cards.length} ${pluralize(deck.cards.length, 'fiszkę', 'fiszki', 'fiszek')}</span><span>${deck.cards.length ? '✳ Gotowa do nauki' : '＋ Dodaj fiszki'}</span></div>
    </article>
  `).join('');
  $('#empty-state').classList.toggle('hidden', data.decks.length > 0);

  grid.querySelectorAll('.deck-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('.deck-menu-wrap')) return;
      openDeck(card.dataset.deckId);
    });
    card.addEventListener('keydown', (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && !event.target.closest('.deck-menu-wrap')) {
        event.preventDefault();
        openDeck(card.dataset.deckId);
      }
    });
  });
  grid.querySelectorAll('.deck-menu').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const popup = button.nextElementSibling;
      const wasOpen = !popup.classList.contains('hidden');
      grid.querySelectorAll('.deck-menu-popup').forEach((menu) => menu.classList.add('hidden'));
      popup.classList.toggle('hidden', wasOpen);
      button.setAttribute('aria-expanded', String(!wasOpen));
    });
  });
  grid.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const deck = data.decks.find((item) => item.id === button.closest('.deck-card').dataset.deckId);
      if (button.dataset.action === 'edit') openDeckDialog(deck);
      if (button.dataset.action === 'delete') deleteDeck(deck);
    });
  });
  renderStudyOptions();
}

function pluralize(count, one, few, many) {
  if (count === 1) return one;
  const lastTwo = count % 100;
  const last = count % 10;
  return last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? few : many;
}

function openDeck(deckId) {
  const deck = data.decks.find((item) => item.id === deckId);
  if (!deck) return;
  activeDeckId = deckId;
  $('#breadcrumb-current').textContent = deck.name;
  $('#detail-icon').textContent = getDeckIcon(deck.category);
  $('#detail-icon').className = `deck-detail-icon ${getColor(deck)}`;
  $('#detail-category').textContent = deck.category.toUpperCase();
  $('#detail-title').textContent = deck.name;
  $('#detail-description').textContent = deck.description || 'Twoja własna talia fiszek.';
  $('#detail-card-count').textContent = `(${deck.cards.length})`;
  $('#study-deck-button').disabled = deck.cards.length === 0;
  $('#study-deck-button').style.opacity = deck.cards.length ? '1' : '.55';
  $('#test-deck-button').disabled = deck.cards.length === 0;
  $('#test-deck-button').style.opacity = deck.cards.length ? '1' : '.55';
  renderCards(deck);
  showView('deck');
}

function renderCards(deck) {
  $('#card-list').innerHTML = deck.cards.map((card, index) => `
    <article class="flashcard-row">
      <div class="flashcard-side"><span class="flashcard-side-label">PRZÓD</span><p class="flashcard-side-text">${escapeHtml(card.front)}</p></div>
      <div class="flashcard-side"><span class="flashcard-side-label">TYŁ</span><p class="flashcard-side-text">${escapeHtml(card.back)}</p></div>
      <div class="flashcard-row-actions">
        <button class="icon-button" data-edit-card="${escapeHtml(card.id)}" aria-label="Edytuj fiszkę ${index + 1}">✎</button>
        <button class="icon-button delete" data-delete-card="${escapeHtml(card.id)}" aria-label="Usuń fiszkę ${index + 1}">×</button>
      </div>
    </article>
  `).join('');
  $('#empty-cards').classList.toggle('hidden', deck.cards.length > 0);
  $('#card-list').classList.toggle('hidden', deck.cards.length === 0);
  $('#card-list').querySelectorAll('[data-edit-card]').forEach((button) => {
    button.addEventListener('click', () => openCardDialog(deck.cards.find((card) => card.id === button.dataset.editCard)));
  });
  $('#card-list').querySelectorAll('[data-delete-card]').forEach((button) => {
    button.addEventListener('click', () => deleteCard(deck, button.dataset.deleteCard));
  });
}

function showView(name) {
  homeView.classList.toggle('hidden', name !== 'home');
  deckView.classList.toggle('hidden', name !== 'deck');
  studyView.classList.toggle('hidden', name !== 'study');
  testView.classList.toggle('hidden', name !== 'test');
  document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.dataset.view === (name === 'deck' ? 'home' : name === 'test' ? 'study' : name)));
  if (name === 'home') $('#breadcrumb-current').textContent = 'Moje talie';
  if (name === 'study') $('#breadcrumb-current').textContent = 'Nauka';
  if (name === 'test') $('#breadcrumb-current').textContent = 'Sprawdzian';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openDeckDialog(deck = null) {
  editingDeckId = deck ? deck.id : null;
  const form = $('#deck-form');
  form.reset();
  $('#deck-dialog-title').textContent = deck ? 'Edytuj talię' : 'Nowa talia';
  $('#save-deck').textContent = deck ? 'Zapisz zmiany' : 'Utwórz talię';
  if (deck) {
    $('#deck-name').value = deck.name;
    $('#deck-description').value = deck.description || '';
    $('#deck-category').value = CATEGORY_ICONS[deck.category] ? deck.category : 'Inne';
    const colorInput = form.querySelector(`input[name="color"][value="${getColor(deck)}"]`);
    if (colorInput) colorInput.checked = true;
  }
  $('#deck-dialog').showModal();
  $('#deck-name').focus();
}

async function saveDeck(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const name = $('#deck-name').value.trim();
  if (!name) return;
  const deckFields = {
    name,
    description: $('#deck-description').value.trim(),
    category: $('#deck-category').value,
    color: form.querySelector('input[name="color"]:checked').value
  };
  const isEditing = Boolean(editingDeckId);
  const deck = isEditing
    ? { ...data.decks.find((item) => item.id === editingDeckId), ...deckFields }
    : { id: makeId(), ...deckFields, cards: [] };
  const button = $('#save-deck');
  setBusy(button, true, 'Zapisywanie…');
  const saved = await persistDeck(deck);
  setBusy(button, false);
  if (!saved) return;
  if (editingDeckId) {
    const index = data.decks.findIndex((item) => item.id === editingDeckId);
    data.decks[index] = deck;
  } else {
    data.decks.unshift(deck);
  }
  $('#deck-dialog').close();
  renderHome();
  if (isEditing && activeDeckId === deck.id) openDeck(activeDeckId);
  showToast(isEditing ? 'Zapisano zmiany w talii.' : 'Nowa talia jest gotowa!');
  editingDeckId = null;
}

async function deleteDeck(deck) {
  if (!window.confirm(`Usunąć talię „${deck.name}” wraz ze wszystkimi fiszkami?`)) return;
  if (!await deleteCloudRecord('decks', deck.id, 'talii')) return;
  data.decks = data.decks.filter((item) => item.id !== deck.id);
  if (activeDeckId === deck.id) activeDeckId = null;
  renderHome();
  showToast('Talia została usunięta.');
}

function openCardDialog(card = null) {
  editingCardId = card ? card.id : null;
  $('#card-form').reset();
  $('#card-dialog-title').textContent = card ? 'Edytuj fiszkę' : 'Nowa fiszka';
  $('#save-card').textContent = card ? 'Zapisz zmiany' : 'Dodaj fiszkę';
  if (card) {
    $('#card-front').value = card.front;
    $('#card-back').value = card.back;
  }
  $('#card-dialog').showModal();
  $('#card-front').focus();
}

async function saveCard(event) {
  event.preventDefault();
  const deck = data.decks.find((item) => item.id === activeDeckId);
  if (!deck) return;
  const front = $('#card-front').value.trim();
  const back = $('#card-back').value.trim();
  if (!front || !back) return;
  const isEditing = Boolean(editingCardId);
  const card = isEditing
    ? { ...deck.cards.find((item) => item.id === editingCardId), front, back }
    : { id: makeId(), front, back };
  const button = $('#save-card');
  setBusy(button, true, 'Zapisywanie…');
  const saved = await persistCard(deck.id, card);
  setBusy(button, false);
  if (!saved) return;
  if (isEditing) {
    const index = deck.cards.findIndex((item) => item.id === editingCardId);
    deck.cards[index] = card;
  } else {
    deck.cards.push(card);
  }
  $('#card-dialog').close();
  renderHome();
  openDeck(deck.id);
  showToast(isEditing ? 'Zapisano zmiany we fiszce.' : 'Fiszka została dodana.');
  editingCardId = null;
}

async function deleteCard(deck, cardId) {
  if (!window.confirm('Czy na pewno chcesz usunąć tę fiszkę?')) return;
  if (!await deleteCloudRecord('cards', cardId, 'fiszki')) return;
  deck.cards = deck.cards.filter((card) => card.id !== cardId);
  renderHome();
  openDeck(deck.id);
  showToast('Fiszka została usunięta.');
}

function renderStudyOptions() {
  const select = $('#study-deck-select');
  const previous = select.value;
  const decksWithCards = data.decks.filter((deck) => deck.cards.length);
  select.innerHTML = decksWithCards.length
    ? decksWithCards.map((deck) => `<option value="${escapeHtml(deck.id)}">${escapeHtml(deck.name)} — ${deck.cards.length} ${pluralize(deck.cards.length, 'fiszka', 'fiszki', 'fiszek')}</option>`).join('')
    : '<option value="">Najpierw dodaj fiszki do talii</option>';
  if (decksWithCards.some((deck) => deck.id === previous)) select.value = previous;
  $('#start-study').disabled = decksWithCards.length === 0;
  $('#start-study').style.opacity = decksWithCards.length ? '1' : '.55';
}

function startStudy() {
  const deck = data.decks.find((item) => item.id === $('#study-deck-select').value);
  if (!deck || !deck.cards.length) {
    showToast('Dodaj fiszki do talii, zanim zaczniesz naukę.');
    return;
  }
  studyCards = [...deck.cards];
  if ($('#shuffle-checkbox').checked) {
    for (let i = studyCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [studyCards[i], studyCards[j]] = [studyCards[j], studyCards[i]];
    }
  }
  studyIndex = 0;
  $('#study-setup').classList.add('hidden');
  $('#study-complete').classList.add('hidden');
  $('#study-session').classList.remove('hidden');
  $('#study-deck-name').textContent = deck.name;
  renderStudyCard();
}

function renderStudyCard() {
  const card = studyCards[studyIndex];
  if (!card) return;
  answerVisible = false;
  $('#flashcard-label').textContent = 'HASŁO';
  $('#flashcard-text').textContent = card.front;
  $('#flashcard-hint').textContent = 'Kliknij kartę, aby zobaczyć odpowiedź';
  $('#study-counter').textContent = `${studyIndex + 1} / ${studyCards.length}`;
  $('#study-progress').style.width = `${((studyIndex + 1) / studyCards.length) * 100}%`;
  $('#study-previous').disabled = studyIndex === 0;
  $('#study-previous').style.opacity = studyIndex === 0 ? '.5' : '1';
  $('#study-next').textContent = studyIndex === studyCards.length - 1 ? 'Zakończ →' : 'Następna →';
}

function flipCard() {
  if (!studyCards.length) return;
  answerVisible = !answerVisible;
  const card = studyCards[studyIndex];
  $('#flashcard-label').textContent = answerVisible ? 'ODPOWIEDŹ' : 'HASŁO';
  $('#flashcard-text').textContent = answerVisible ? card.back : card.front;
  $('#flashcard-hint').textContent = answerVisible ? 'Kliknij kartę, aby wrócić do hasła' : 'Kliknij kartę, aby zobaczyć odpowiedź';
  if (answerVisible) {
    const today = new Date().toDateString();
    if (learnedDate !== today) {
      learnedDate = today;
      learnedToday = 0;
    }
    learnedToday += 1;
    if (currentUser) {
      localStorage.setItem(`fiszki-learned-date:${currentUser.id}`, today);
      localStorage.setItem(`fiszki-learned-today:${currentUser.id}`, String(learnedToday));
    }
    $('#learned-count').textContent = learnedToday;
  }
}

function nextStudyCard() {
  if (studyIndex < studyCards.length - 1) {
    studyIndex += 1;
    renderStudyCard();
    return;
  }
  finishStudy();
}

function finishStudy() {
  $('#study-session').classList.add('hidden');
  $('#study-complete').classList.remove('hidden');
  $('#complete-message').textContent = `Przejrzano ${studyCards.length} ${pluralize(studyCards.length, 'fiszkę', 'fiszki', 'fiszek')}. Każda powtórka przybliża Cię do celu!`;
}

function showStudySetup() {
  $('#study-session').classList.add('hidden');
  $('#study-complete').classList.add('hidden');
  $('#study-setup').classList.remove('hidden');
  showView('study');
}

function showTestSetup() {
  const deck = data.decks.find((item) => item.id === activeDeckId);
  if (!deck) return;
  $('#test-subtitle').textContent = `${deck.name} — ${deck.cards.length} ${pluralize(deck.cards.length, 'fiszka', 'fiszki', 'fiszek')}`;
  $('#test-question-count').max = deck.cards.length;
  $('#test-question-count').value = Math.min(10, deck.cards.length) || 1;
  $('#test-question-count').disabled = deck.cards.length === 0;
  $('#test-all-cards').checked = false;
  $('#test-all-cards').disabled = deck.cards.length === 0;
  const uniqueAnswers = getUniqueAnswers(deck);
  const multipleChoice = $('#test-mode-multiple');
  multipleChoice.disabled = uniqueAnswers.length < 4;
  multipleChoice.checked = !multipleChoice.disabled;
  const trueFalse = $('#test-mode-true-false');
  trueFalse.disabled = uniqueAnswers.length < 2;
  trueFalse.checked = !trueFalse.disabled;
  $('#test-mode-full').checked = true;
  $('#test-mode-missing').checked = true;
  $('#test-mode-reverse').checked = true;
  $('#test-mode-hint').textContent = `Każda zaznaczona forma pojawi się co najmniej raz. Gdy form jest więcej niż wybranych fiszek, niektóre fiszki powtórzą się.${uniqueAnswers.length < 4
    ? ' Tryby A–D i prawda/fałsz wymagają odpowiednio 4 i 2 różnych tłumaczeń w talii.'
    : ''}`;
  $('#start-test').disabled = deck.cards.length === 0;
  $('#start-test').style.opacity = deck.cards.length ? '1' : '.55';
  $('#test-setup').classList.remove('hidden');
  $('#test-session').classList.add('hidden');
  $('#test-results').classList.add('hidden');
  showView('test');
}

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index--) {
    const otherIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[otherIndex]] = [items[otherIndex], items[index]];
  }
  return items;
}

function getUniqueAnswers(deck) {
  return [...new Map(deck.cards.map((card) => [normalizeAnswer(card.back), card.back])).values()];
}

function createLetterClue(answer) {
  const characters = Array.from(answer);
  const letterIndexes = characters
    .map((character, index) => (/\p{L}|\p{N}/u.test(character) ? index : -1))
    .filter((index) => index >= 0);
  const revealedCount = letterIndexes.length > 1
    ? Math.min(letterIndexes.length - 1, Math.max(1, Math.floor(letterIndexes.length / 3)))
    : 0;
  const revealedIndexes = new Set(shuffle([...letterIndexes]).slice(0, revealedCount));
  const missingIndexes = new Set(letterIndexes.filter((index) => !revealedIndexes.has(index)));
  return {
    clue: characters.map((character, index) => (
      missingIndexes.has(index) ? '＿' : character
    )).join(''),
    missing: characters.filter((character, index) => missingIndexes.has(index)).join('')
  };
}

function startTest() {
  const deck = data.decks.find((item) => item.id === activeDeckId);
  if (!deck || !deck.cards.length) {
    showToast('Dodaj fiszki do talii, zanim zaczniesz sprawdzian.');
    return;
  }
  const useAll = $('#test-all-cards').checked;
  const requestedCount = Number($('#test-question-count').value);
  if (!useAll && (!Number.isInteger(requestedCount) || requestedCount < 1 || requestedCount > deck.cards.length)) {
    showToast(`Wpisz liczbę od 1 do ${deck.cards.length}.`);
    $('#test-question-count').focus();
    return;
  }
  const modes = [];
  if ($('#test-mode-full').checked) modes.push('full');
  if ($('#test-mode-missing').checked) modes.push('missing');
  if ($('#test-mode-multiple').checked && !$('#test-mode-multiple').disabled) modes.push('multiple');
  if ($('#test-mode-true-false').checked && !$('#test-mode-true-false').disabled) modes.push('true-false');
  if ($('#test-mode-reverse').checked) modes.push('reverse');
  if (!modes.length) {
    showToast('Wybierz przynajmniej jeden rodzaj pytania.');
    return;
  }

  const count = useAll ? deck.cards.length : requestedCount;
  const selectedCards = shuffle([...deck.cards]).slice(0, count);
  const questionCount = Math.max(count, modes.length);
  const questionModes = Array.from({ length: questionCount }, (_, index) => modes[index % modes.length]);
  shuffle(questionModes);
  testQuestions = Array.from({ length: questionCount }, (_, index) => {
    const card = selectedCards[index % selectedCards.length];
    const mode = questionModes[index];
    const expectedAnswer = mode === 'reverse' ? card.front : card.back;
    const clue = mode === 'missing' ? createLetterClue(expectedAnswer) : null;
    const question = {
      card,
      mode,
      expectedAnswer,
      clue: clue ? clue.clue : '',
      missing: clue ? clue.missing : '',
      options: [],
      proposedAnswer: '',
      answer: '',
      correct: false
    };
    if (mode === 'multiple') {
      const distractors = getUniqueAnswers(deck)
        .filter((answer) => normalizeAnswer(answer) !== normalizeAnswer(expectedAnswer));
      question.options = shuffle([expectedAnswer, ...distractors].slice(0, 4));
    } else if (mode === 'true-false') {
      const isTrue = Math.random() < 0.5;
      const alternatives = getUniqueAnswers(deck)
        .filter((answer) => normalizeAnswer(answer) !== normalizeAnswer(expectedAnswer));
      question.proposedAnswer = isTrue
        ? expectedAnswer
        : alternatives[Math.floor(Math.random() * alternatives.length)];
      question.options = ['Prawda', 'Fałsz'];
      question.expectedAnswer = isTrue ? 'Prawda' : 'Fałsz';
    }
    return question;
  });
  testIndex = 0;
  $('#test-setup').classList.add('hidden');
  $('#test-results').classList.add('hidden');
  $('#test-session').classList.remove('hidden');
  $('#test-deck-name').textContent = deck.name;
  renderTestQuestion();
}

function renderTestQuestion() {
  const question = testQuestions[testIndex];
  if (!question) return;
  $('#test-counter').textContent = `${testIndex + 1} / ${testQuestions.length}`;
  $('#test-progress').style.width = `${((testIndex + 1) / testQuestions.length) * 100}%`;
  const labels = {
    full: 'WPISZ CAŁE SŁÓWKO',
    missing: 'UZUPEŁNIJ BRAKUJĄCE LITERY',
    multiple: 'WYBIERZ ODPOWIEDŹ A–D',
    'true-false': 'PRAWDA CZY FAŁSZ?',
    reverse: 'ODWRÓĆ KIERUNEK TŁUMACZENIA'
  };
  $('#test-question-label').textContent = labels[question.mode];
  $('.test-prompt-label').textContent = question.mode === 'missing'
    ? 'Podaj odpowiedź na podstawie podpowiedzi:'
    : question.mode === 'true-false'
      ? 'Czy to tłumaczenie jest poprawne?'
      : question.mode === 'reverse'
        ? 'Przetłumacz na drugi język:'
        : question.mode === 'multiple'
          ? 'Wybierz poprawne tłumaczenie:'
          : 'Przetłumacz lub podaj odpowiedź:';
  $('#test-prompt').textContent = question.mode === 'true-false'
    ? `${question.card.front} → ${question.proposedAnswer}`
    : question.mode === 'reverse' ? question.card.back : question.card.front;
  $('#test-clue-wrap').classList.toggle('hidden', question.mode !== 'missing');
  $('#test-clue').textContent = question.clue;
  const usesChoices = question.mode === 'multiple' || question.mode === 'true-false';
  $('#test-choice-wrap').classList.toggle('hidden', !usesChoices);
  $('#test-choice-legend').textContent = question.mode === 'true-false'
    ? 'Wybierz odpowiedź'
    : 'Wybierz jedną odpowiedź';
  const options = $('#test-choice-options');
  options.replaceChildren();
  question.options.forEach((option, index) => {
    const label = document.createElement('label');
    label.className = 'test-choice-option';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'test-choice';
    input.value = option;
    input.required = true;
    const text = document.createElement('span');
    text.textContent = question.mode === 'multiple'
      ? `${String.fromCharCode(65 + index)}. ${option}`
      : option;
    label.append(input, text);
    options.append(label);
  });
  $('#test-answer-label').classList.toggle('hidden', usesChoices);
  $('#test-answer').classList.toggle('hidden', usesChoices);
  $('#test-answer').required = !usesChoices;
  $('#test-answer').placeholder = question.mode === 'missing' ? 'Wpisz brakujące litery…' : 'Wpisz całe słówko…';
  $('#test-answer-form').reset();
  $('#test-answer').disabled = false;
  $('#check-test-answer').disabled = false;
  $('#check-test-answer').classList.remove('hidden');
  $('#test-feedback').className = 'test-feedback hidden';
  $('#test-feedback').textContent = '';
  $('#test-next').classList.add('hidden');
  $('#test-next').textContent = testIndex === testQuestions.length - 1 ? 'Zobacz wynik →' : 'Następne pytanie →';
  if (usesChoices) options.querySelector('input')?.focus();
  else $('#test-answer').focus();
}

function checkTestAnswer(event) {
  event.preventDefault();
  const question = testQuestions[testIndex];
  if (!question || question.answer) return;
  const answer = question.mode === 'multiple' || question.mode === 'true-false'
    ? $('#test-choice-options input:checked')?.value || ''
    : $('#test-answer').value.trim();
  if (!answer) {
    if (question.mode === 'multiple' || question.mode === 'true-false') {
      $('#test-choice-options input')?.focus();
    } else {
      $('#test-answer').focus();
    }
    return;
  }
  question.answer = answer;
  question.correct = normalizeAnswer(answer) === normalizeAnswer(question.expectedAnswer)
    || (question.mode === 'missing' && normalizeAnswer(answer) === normalizeAnswer(question.missing));
  const feedback = $('#test-feedback');
  feedback.classList.remove('hidden');
  feedback.classList.toggle('correct', question.correct);
  feedback.classList.toggle('incorrect', !question.correct);
  feedback.innerHTML = question.correct
    ? 'Dobrze! To poprawna odpowiedź.'
    : question.mode === 'true-false'
      ? `Nie tym razem. Poprawna odpowiedź: <strong>${question.expectedAnswer}</strong>${question.expectedAnswer === 'Fałsz'
        ? ` — poprawne tłumaczenie: <strong>${escapeHtml(question.card.back)}</strong>`
        : ''}`
      : `Nie tym razem. Poprawna odpowiedź: <strong>${escapeHtml(question.expectedAnswer)}</strong>`;
  document.querySelectorAll('#test-choice-options input').forEach((input) => { input.disabled = true; });
  $('#test-answer-form button').disabled = true;
  $('#test-answer').disabled = true;
  $('#check-test-answer').classList.add('hidden');
  $('#test-next').classList.remove('hidden');
  $('#test-next').focus();
}

function normalizeAnswer(answer) {
  return answer.normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('pl');
}

function finishTest() {
  $('#test-session').classList.add('hidden');
  $('#test-results').classList.remove('hidden');
  const correctCount = testQuestions.filter((question) => question.correct).length;
  $('#test-score').textContent = `${correctCount} / ${testQuestions.length} poprawnych`;
  $('#test-result-message').textContent = correctCount === testQuestions.length
    ? 'Świetnie! Wszystkie odpowiedzi są poprawne.'
    : `Poprawnych odpowiedzi: ${Math.round((correctCount / testQuestions.length) * 100)}%. Sprawdź trudniejsze słówka poniżej.`;
  const mistakes = testQuestions.filter((question) => !question.correct);
  $('#test-mistakes').innerHTML = mistakes.length
    ? `<p class="eyebrow">DO POWTÓRKI</p>${mistakes.map((question) => `
      <div class="test-mistake">
        <strong>${escapeHtml(question.card.front)} → ${escapeHtml(question.card.back)}</strong>
        <span>Twoja odpowiedź: ${escapeHtml(question.mode === 'true-false' && question.answer === 'Fałsz'
          ? `Fałsz (${question.proposedAnswer})`
          : question.answer)}</span>
      </div>`).join('')}`
    : '';
}

function exportData() {
  const file = new Blob([JSON.stringify({ version: 1, decks: data.decks }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'moje-fiszki.json';
  link.click();
  URL.revokeObjectURL(url);
  showToast('Plik z taliami został pobrany.');
}

async function importData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const imported = JSON.parse(reader.result);
      const decks = Array.isArray(imported) ? imported : imported.decks;
      if (!Array.isArray(decks) || !decks.every(isValidDeck)) {
        showToast('Plik ma nieprawidłowy format. Wybierz eksport JSON tej aplikacji.');
        return;
      }
      const safeDecks = decks.map((deck) => ({
        id: makeId(),
        name: deck.name.trim(),
        description: typeof deck.description === 'string' ? deck.description : '',
        category: CATEGORY_ICONS[deck.category] ? deck.category : 'Inne',
        color: COLOR_CLASSES.includes(deck.color) ? deck.color : 'mint',
        cards: deck.cards.map((card) => ({ id: makeId(), front: card.front.trim(), back: card.back.trim() }))
      }));
      if (!currentUser || !supabaseClient) {
        showToast('Zaloguj się, zanim zaimportujesz talie.');
        return;
      }
      const deckRows = safeDecks.map((deck) => ({
        id: deck.id, user_id: currentUser.id, name: deck.name,
        description: deck.description, category: deck.category, color: deck.color
      }));
      const cardRows = safeDecks.flatMap((deck) => deck.cards.map((card) => ({
        id: card.id, user_id: currentUser.id, deck_id: deck.id, front: card.front, back: card.back
      })));
      try {
        await upsertRowsInBatches('decks', deckRows);
        await upsertRowsInBatches('cards', cardRows);
      } catch (error) {
        await rollbackCloudRows('decks', safeDecks.map((deck) => deck.id), 'częściowego importu');
        throw error;
      }
      data.decks.push(...safeDecks);
      renderHome();
      showToast(`Zaimportowano ${safeDecks.length} ${pluralize(safeDecks.length, 'talię', 'talie', 'talii')}.`);
    } catch (error) {
      console.error('Nie udało się zaimportować pliku:', error);
      showToast(`Nie udało się zaimportować pliku: ${getErrorMessage(error)}`);
    } finally {
      $('#import-file').value = '';
    }
  };
  reader.onerror = () => {
    showToast('Nie udało się odczytać wybranego pliku.');
    $('#import-file').value = '';
  };
  reader.readAsText(file);
}

function openPhotoDialog(deckId = null) {
  photoTargetDeckId = deckId;
  $('#photo-form').reset();
  $('#photo-status').textContent = '';
  $('#photo-status').classList.remove('error');
  $('#photo-preview').classList.add('hidden');
  $('#photo-pairs').innerHTML = '';
  $('#save-photo-cards').classList.add('hidden');
  const isAddingToDeck = Boolean(deckId);
  $('#photo-deck-name-label').classList.toggle('hidden', isAddingToDeck);
  $('#photo-deck-name').classList.toggle('hidden', isAddingToDeck);
  $('#photo-deck-name').required = !isAddingToDeck;
  if (isAddingToDeck) {
    const deck = data.decks.find((item) => item.id === deckId);
    setPhotoStatus(deck ? `Rozpoznane fiszki zostaną dodane do talii „${deck.name}”.` : '');
  }
  $('#photo-dialog').showModal();
}

async function preparePhoto(file) {
  if (!file || !file.type.startsWith('image/')) throw new Error('Wybierz plik graficzny.');
  if (file.size > 25 * 1024 * 1024) throw new Error('Zdjęcie jest za duże. Wybierz plik mniejszy niż 25 MB.');
  if (typeof createImageBitmap !== 'function') throw new Error('Ta przeglądarka nie obsługuje przygotowania zdjęcia. Zaktualizuj przeglądarkę.');
  const image = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 2000 / Math.max(image.width, image.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Nie udało się przygotować obrazu.');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.85));
    if (!blob) throw new Error('Nie udało się skompresować zdjęcia.');
    if (blob.size > 9 * 1024 * 1024) throw new Error('Zdjęcie jest nadal za duże. Zrób mniejszą fotografię.');
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result);
        const separator = result.indexOf(',');
        if (separator < 0) reject(new Error('Nie udało się odczytać zdjęcia.'));
        else resolve(result.slice(separator + 1));
      };
      reader.onerror = () => reject(new Error('Nie udało się odczytać zdjęcia.'));
      reader.readAsDataURL(blob);
    });
  } finally {
    image.close();
  }
}

function parseRecognizedPairs(text) {
  const lines = text.split(/\r?\n/u)
    .map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/u, '').trim())
    .filter(Boolean);
  const pairs = [];
  const unpaired = [];
  for (const line of lines) {
    const columns = line.split(/\t+|\s{2,}|\s+[-–—:;|]\s+/u).map((part) => part.trim()).filter(Boolean);
    if (columns.length >= 2) pairs.push([columns[0], columns.slice(1).join(' ')]);
    else unpaired.push(line);
  }
  for (let index = 0; index + 1 < unpaired.length; index += 2) {
    pairs.push([unpaired[index], unpaired[index + 1]]);
  }
  return pairs;
}

function addPhotoPair(front = '', back = '') {
  const row = document.createElement('div');
  row.className = 'photo-pair-row';
  row.innerHTML = `
    <input class="photo-front" type="text" maxlength="500" aria-label="Polskie słówko lub pytanie" placeholder="po polsku" value="${escapeHtml(front)}" required>
    <input class="photo-back" type="text" maxlength="1000" aria-label="Angielskie słówko lub odpowiedź" placeholder="po angielsku" value="${escapeHtml(back)}" required>
    <button class="photo-row-remove" type="button" aria-label="Usuń fiszkę">×</button>`;
  row.querySelector('.photo-row-remove').addEventListener('click', () => {
    row.remove();
    if (!$('#photo-pairs').children.length) $('#save-photo-cards').classList.add('hidden');
  });
  $('#photo-pairs').append(row);
}

async function recognizePhoto() {
  const file = $('#photo-file').files[0];
  if (!file) {
    setPhotoStatus('Najpierw wybierz zdjęcie kartki.', true);
    return;
  }
  if (!supabaseClient || !currentUser) {
    setPhotoStatus('Zaloguj się, aby użyć rozpoznawania zdjęć.', true);
    return;
  }
  const button = $('#recognize-photo');
  setBusy(button, true, 'Rozpoznaję…');
  setPhotoStatus('Przygotowuję zdjęcie i wysyłam je do Google Cloud Vision…');
  $('#photo-preview').classList.add('hidden');
  $('#save-photo-cards').classList.add('hidden');
  try {
    const image = await preparePhoto(file);
    const { data: result, error } = await supabaseClient.functions.invoke('recognize-flashcards', {
      body: { image }
    });
    if (error) {
      let details = error.message;
      try {
        const response = error.context;
        if (response && typeof response.json === 'function') {
          const body = await response.json();
          if (body.error) details = body.error;
        }
      } catch (parseError) {
        console.error('Nie udało się odczytać błędu rozpoznawania:', parseError);
      }
      throw new Error(details || 'Nie udało się rozpoznać zdjęcia.');
    }
    if (!result || typeof result.text !== 'string') throw new Error('Usługa nie zwróciła rozpoznanego tekstu.');
    let pairs = parseRecognizedPairs(result.text);
    if ($('#photo-first-language').value === 'english') {
      pairs = pairs.map(([first, second]) => [second, first]);
    }
    $('#photo-pairs').innerHTML = '';
    pairs.forEach(([front, back]) => addPhotoPair(front, back));
    if (!pairs.length) addPhotoPair();
    $('#photo-preview').classList.remove('hidden');
    $('#save-photo-cards').classList.remove('hidden');
    const filename = file.name.replace(/\.[^.]+$/u, '').trim();
    if (!photoTargetDeckId && !$('#photo-deck-name').value.trim()) {
      $('#photo-deck-name').value = filename.slice(0, 50) || 'Nowe słówka';
    }
    setPhotoStatus(pairs.length
      ? `Rozpoznano ${pairs.length} ${pluralize(pairs.length, 'parę', 'pary', 'par')} słówek. Sprawdź i popraw wynik przed zapisem.`
      : 'Odczytano tekst, ale nie udało się automatycznie rozdzielić go na pary. Uzupełnij wiersze ręcznie.');
  } catch (error) {
    console.error('Nie udało się rozpoznać zdjęcia:', error);
    setPhotoStatus(getErrorMessage(error), true);
  } finally {
    setBusy(button, false);
  }
}

async function savePhotoCards() {
  const rows = [...$('#photo-pairs').querySelectorAll('.photo-pair-row')];
  const cards = rows.map((row) => ({
    id: makeId(),
    front: row.querySelector('.photo-front').value.trim(),
    back: row.querySelector('.photo-back').value.trim()
  }));
  if (!cards.length || cards.some((card) => !card.front || !card.back)) {
    setPhotoStatus('Uzupełnij obie strony każdej fiszki przed zapisem.', true);
    return;
  }
  let deck = photoTargetDeckId ? data.decks.find((item) => item.id === photoTargetDeckId) : null;
  const isNewDeck = !deck;
  if (isNewDeck) {
    const name = $('#photo-deck-name').value.trim();
    if (!name) {
      setPhotoStatus('Wpisz nazwę nowej talii.', true);
      $('#photo-deck-name').focus();
      return;
    }
    deck = { id: makeId(), name, description: 'Słówka rozpoznane ze zdjęcia.', category: 'Angielski', color: 'mint', cards: [] };
  }
  const button = $('#save-photo-cards');
  setBusy(button, true, 'Zapisywanie…');
  try {
    if (isNewDeck && !await persistDeck(deck)) return;
    const cardRows = cards.map((card) => ({
      id: card.id, user_id: currentUser.id, deck_id: deck.id, front: card.front, back: card.back
    }));
    try {
      await upsertRowsInBatches('cards', cardRows);
    } catch (error) {
      if (isNewDeck) {
        await rollbackCloudRows('decks', [deck.id], 'pustej talii po nieudanym zapisie');
      } else {
        await rollbackCloudRows('cards', cards.map((card) => card.id), 'częściowo zapisanych fiszek');
      }
      throw error;
    }
    if (isNewDeck) data.decks.unshift(deck);
    deck.cards.push(...cards);
    $('#photo-dialog').close();
    renderHome();
    openDeck(deck.id);
    showToast(`Dodano ${cards.length} ${pluralize(cards.length, 'fiszkę', 'fiszki', 'fiszek')}.`);
  } catch (error) {
    console.error('Nie udało się zapisać fiszek ze zdjęcia:', error);
    setPhotoStatus(`Nie udało się zapisać fiszek: ${getErrorMessage(error)}`, true);
  } finally {
    setBusy(button, false);
  }
}

function isValidDeck(deck) {
  return deck && typeof deck.name === 'string' && deck.name.trim().length > 0
    && Array.isArray(deck.cards)
    && deck.cards.every((card) => card && typeof card.front === 'string' && card.front.trim()
      && typeof card.back === 'string' && card.back.trim());
}

$('#auth-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!supabaseClient) {
    setAuthStatus('Najpierw skonfiguruj połączenie z Supabase.', true);
    return;
  }
  const button = $('#sign-in-button');
  setBusy(button, true, 'Logowanie…');
  const { data: result, error } = await supabaseClient.auth.signInWithPassword({
    email: $('#auth-email').value.trim(),
    password: $('#auth-password').value
  });
  setBusy(button, false);
  if (error) {
    console.error('Logowanie Supabase nie powiodło się:', error);
    setAuthStatus(`Nie udało się zalogować: ${getErrorMessage(error)}`, true);
    return;
  }
  if (result.user) await activateUser(result.user);
});

$('#sign-up-button').addEventListener('click', async () => {
  if (!supabaseClient) {
    setAuthStatus('Najpierw skonfiguruj połączenie z Supabase.', true);
    return;
  }
  if (!$('#auth-email').reportValidity() || !$('#auth-password').reportValidity()) return;
  const button = $('#sign-up-button');
  setBusy(button, true, 'Tworzę konto…');
  const { data: result, error } = await supabaseClient.auth.signUp({
    email: $('#auth-email').value.trim(),
    password: $('#auth-password').value
  });
  setBusy(button, false);
  if (error) {
    console.error('Tworzenie konta Supabase nie powiodło się:', error);
    setAuthStatus(`Nie udało się utworzyć konta: ${getErrorMessage(error)}`, true);
    return;
  }
  if (result.session && result.user) await activateUser(result.user);
  else setAuthStatus('Konto utworzone. Sprawdź pocztę i potwierdź adres e-mail, a potem się zaloguj.');
});

async function signOut() {
  if (!supabaseClient) return;
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error('Wylogowanie nie powiodło się:', error);
    showToast(`Nie udało się wylogować: ${getErrorMessage(error)}`);
    return;
  }
  appShell.classList.add('hidden');
  authScreen.classList.remove('hidden');
  setAuthStatus('');
  currentUser = null;
  activatingUserId = null;
  data = { decks: [] };
}

$('#sign-out-button').addEventListener('click', signOut);
$('#sign-out-avatar').addEventListener('click', signOut);
$('#open-create-deck').addEventListener('click', () => openDeckDialog());
$('#empty-create-deck').addEventListener('click', () => openDeckDialog());
$('#deck-form').addEventListener('submit', saveDeck);
$('#open-create-card').addEventListener('click', () => openCardDialog());
$('#empty-create-card').addEventListener('click', () => openCardDialog());
$('#card-form').addEventListener('submit', saveCard);
$('#edit-deck-button').addEventListener('click', () => openDeckDialog(data.decks.find((deck) => deck.id === activeDeckId)));
$('#study-deck-button').addEventListener('click', () => {
  renderStudyOptions();
  $('#study-deck-select').value = activeDeckId;
  showStudySetup();
});
$('#back-home').addEventListener('click', () => showView('home'));
$('#back-study').addEventListener('click', () => activeDeckId ? openDeck(activeDeckId) : showView('home'));
$('#test-deck-button').addEventListener('click', showTestSetup);
$('#back-test').addEventListener('click', () => activeDeckId ? openDeck(activeDeckId) : showView('home'));
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (link.dataset.view === 'study') showStudySetup();
    else showView('home');
  });
});
document.querySelectorAll('[data-close]').forEach((button) => {
  button.addEventListener('click', () => document.getElementById(button.dataset.close).close());
});
$('#start-study').addEventListener('click', startStudy);
$('#flashcard').addEventListener('click', flipCard);
$('#study-next').addEventListener('click', nextStudyCard);
$('#study-previous').addEventListener('click', () => {
  if (studyIndex > 0) {
    studyIndex -= 1;
    renderStudyCard();
  }
});
$('#study-again').addEventListener('click', startStudy);
$('#study-done').addEventListener('click', () => {
  if (activeDeckId) openDeck(activeDeckId);
  else showView('home');
});
$('#test-all-cards').addEventListener('change', (event) => {
  $('#test-question-count').disabled = event.target.checked;
});
document.querySelectorAll('#test-mode-full, #test-mode-missing, #test-mode-multiple, #test-mode-true-false, #test-mode-reverse').forEach((input) => {
  input.addEventListener('change', (event) => {
    const selectedModes = document.querySelectorAll(
      '#test-mode-full:checked, #test-mode-missing:checked, #test-mode-multiple:checked, #test-mode-true-false:checked, #test-mode-reverse:checked'
    );
    if (!selectedModes.length) {
      event.target.checked = true;
      showToast('Wybierz przynajmniej jeden rodzaj pytania.');
    }
  });
});
$('#start-test').addEventListener('click', startTest);
$('#test-answer-form').addEventListener('submit', checkTestAnswer);
$('#test-next').addEventListener('click', () => {
  if (testIndex < testQuestions.length - 1) {
    testIndex += 1;
    renderTestQuestion();
  } else {
    finishTest();
  }
});
$('#test-again').addEventListener('click', showTestSetup);
$('#test-done').addEventListener('click', () => {
  if (activeDeckId) openDeck(activeDeckId);
  else showView('home');
});
$('#export-button').addEventListener('click', exportData);
$('#import-button').addEventListener('click', () => $('#import-file').click());
$('#import-file').addEventListener('change', (event) => importData(event.target.files[0]));
$('#open-photo-import').addEventListener('click', () => openPhotoDialog());
$('#deck-photo-import').addEventListener('click', () => openPhotoDialog(activeDeckId));
$('#recognize-photo').addEventListener('click', recognizePhoto);
$('#add-photo-row').addEventListener('click', () => addPhotoPair());
$('#save-photo-cards').addEventListener('click', savePhotoCards);
document.addEventListener('keydown', (event) => {
  if ($('#study-session').classList.contains('hidden') || document.querySelector('dialog[open]')) return;
  if (event.key === ' ') {
    event.preventDefault();
    flipCard();
  }
  if (event.key === 'ArrowRight') nextStudyCard();
  if (event.key === 'ArrowLeft' && studyIndex > 0) {
    studyIndex -= 1;
    renderStudyCard();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.deck-menu-wrap')) {
    document.querySelectorAll('.deck-menu-popup').forEach((menu) => menu.classList.add('hidden'));
  }
});

initializeSupabase().catch((error) => {
  console.error('Nie udało się uruchomić aplikacji:', error);
  setAuthStatus(`Nie udało się uruchomić aplikacji: ${getErrorMessage(error)}`, true);
});
