const CATEGORY_ICONS = {
  'Języki obce': '文', Angielski: 'A', Hiszpański: '¡', Niemiecki: 'Ä',
  Francuski: 'é', Japoński: 'あ', Biologia: '✿', Historia: '◷',
  Geografia: '⌖', Matematyka: '∑', Informatyka: '⌘', Medycyna: '✚',
  Prawo: '§', Inne: '✳'
};
const COLOR_CLASSES = ['mint', 'peach', 'lilac', 'blue', 'yellow'];
const ENGLISH_TENSES = [
  {
    id: 'present-simple', name: 'Present Simple', short: 'Teraźniejszy prosty',
    summary: 'Nawyki, fakty i czynności regularne.',
    theory: {
      use: 'Używamy go do opisywania nawyków, rutyny, faktów i stanów. Często występuje z określeniami częstotliwości.',
      affirmative: 'I/You/We/They + czasownik w formie podstawowej. He/She/It + czasownik z końcówką -s lub -es.',
      negative: 'I/You/We/They + do not (don’t) + czasownik. He/She/It + does not (doesn’t) + czasownik bez -s.',
      question: 'Do + I/you/we/they + czasownik? Does + he/she/it + czasownik bez -s?',
      signals: 'always, usually, often, sometimes, never, every day, on Mondays',
      example: 'She works every day. / She doesn’t work on Sundays. / Does she work here?'
    },
    exercises: [
      { level: 'A1', instruction: 'Uzupełnij zdanie poprawną formą czasownika w nawiasie.', prompt: 'Tom ___ (play) tennis every Saturday.', answers: ['plays'], tip: 'W 3. osobie liczby pojedynczej dodajemy do czasownika -s.' },
      { level: 'A1', instruction: 'Przetłumacz zdanie na angielski.', prompt: 'Oni mieszkają w Londynie.', answers: ['They live in London.'], tip: 'Dla they użyj czasownika w formie podstawowej.' },
      { level: 'A2', instruction: 'Utwórz przeczenie. Użyj skróconej formy.', prompt: 'She likes coffee. → She ___ coffee.', answers: ['doesn’t like', 'does not like'], tip: 'Po doesn’t czasownik nie ma końcówki -s.' },
      { level: 'A2', instruction: 'Ułóż pytanie z podanych wyrazów.', prompt: 'your brother / work / here?', answers: ['Does your brother work here?'], tip: 'Pytanie zaczyna się od Does, a czasownik pozostaje w formie podstawowej.' },
      { level: 'B1', instruction: 'Wybierz poprawną formę i wpisz całe zdanie.', prompt: 'My parents ___ (not / watch) TV in the morning.', answers: ['My parents don’t watch TV in the morning.', 'My parents do not watch TV in the morning.'], tip: 'Dla parents użyj don’t + forma podstawowa.' }
    ]
  },
  {
    id: 'present-continuous', name: 'Present Continuous', short: 'Teraźniejszy ciągły',
    summary: 'Czynności trwające teraz i sytuacje tymczasowe.',
    theory: {
      use: 'Opisuje czynności trwające w chwili mówienia, sytuacje tymczasowe oraz ustalone plany na bliską przyszłość.',
      affirmative: 'Podmiot + am/is/are + czasownik z końcówką -ing. I am; he/she/it is; you/we/they are.',
      negative: 'Podmiot + am/is/are + not + czasownik z -ing. Skróty: isn’t, aren’t; I’m not.',
      question: 'Am/Is/Are + podmiot + czasownik z -ing?',
      signals: 'now, right now, at the moment, today, this week, Look!, Listen!',
      example: 'They are studying now. / They aren’t studying now. / Are they studying now?'
    },
    exercises: [
      { level: 'A1', instruction: 'Uzupełnij zdanie formą Present Continuous.', prompt: 'I ___ (read) a book right now.', answers: ['am reading'], tip: 'Po I użyj am, a do czasownika dodaj -ing.' },
      { level: 'A1', instruction: 'Przetłumacz zdanie na angielski.', prompt: 'Ona teraz gotuje obiad.', answers: ['She is cooking dinner now.'], tip: 'She + is + cooking.' },
      { level: 'A2', instruction: 'Utwórz przeczenie.', prompt: 'We are waiting for the bus. → We ___ for the bus.', answers: ['aren’t waiting', 'are not waiting'], tip: 'Po we użyj aren’t + czasownik z -ing.' },
      { level: 'A2', instruction: 'Ułóż pytanie z podanych wyrazów.', prompt: 'they / listen / to music / now?', answers: ['Are they listening to music now?'], tip: 'Zacznij od Are, potem podmiot i czasownik z -ing.' },
      { level: 'B1', instruction: 'Uzupełnij zdanie poprawną formą czasownika.', prompt: 'Look! The children ___ (run) in the garden.', answers: ['are running'], tip: 'The children to liczba mnoga; run podwaja n przed -ing.' }
    ]
  },
  {
    id: 'present-perfect', name: 'Present Perfect', short: 'Teraźniejszy dokonany',
    summary: 'Doświadczenia i przeszłość mająca związek z teraźniejszością.',
    theory: {
      use: 'Opisuje doświadczenia bez podania konkretnego czasu, niedawne zdarzenia i sytuacje z przeszłości, których skutek jest ważny teraz.',
      affirmative: 'Podmiot + have/has + past participle (III forma). He/She/It używa has; pozostałe osoby have.',
      negative: 'Podmiot + haven’t/hasn’t + III forma czasownika.',
      question: 'Have/Has + podmiot + III forma czasownika?',
      signals: 'already, just, yet, ever, never, recently, so far, since, for',
      example: 'I have lost my keys. / I haven’t found them yet. / Have you seen them?'
    },
    exercises: [
      { level: 'A2', instruction: 'Uzupełnij zdanie formą Present Perfect.', prompt: 'She ___ (finish) her homework already.', answers: ['has finished'], tip: 'She używa has; regularny czasownik ma III formę finished.' },
      { level: 'A2', instruction: 'Przetłumacz zdanie na angielski.', prompt: 'Nigdy nie widziałem tego filmu.', answers: ['I have never seen this film.', 'I’ve never seen this film.'], tip: 'Po have użyj III formy nieregularnego see: seen.' },
      { level: 'B1', instruction: 'Utwórz pytanie.', prompt: 'you / ever / visit / Scotland?', answers: ['Have you ever visited Scotland?'], tip: 'Pytanie zaczyna się od Have; po ever użyj III formy visited.' },
      { level: 'B1', instruction: 'Uzupełnij przeczenie.', prompt: 'He ___ (not / call) me yet.', answers: ['hasn’t called', 'has not called'], tip: 'Yet często występuje w przeczeniach Present Perfect.' },
      { level: 'B2', instruction: 'Wpisz poprawną formę czasownika.', prompt: 'We ___ (know) each other for ten years.', answers: ['have known'], tip: 'Czasownik know opisuje stan trwający od przeszłości do teraz.' }
    ]
  },
  {
    id: 'present-perfect-continuous', name: 'Present Perfect Continuous', short: 'Teraźniejszy dokonany ciągły',
    summary: 'Czynność trwająca od przeszłości lub jej widoczny skutek.',
    theory: {
      use: 'Podkreśla czas trwania czynności rozpoczętej w przeszłości i trwającej nadal albo jej widoczny, niedawny skutek.',
      affirmative: 'Podmiot + have/has been + czasownik z końcówką -ing.',
      negative: 'Podmiot + haven’t/hasn’t been + czasownik z -ing.',
      question: 'Have/Has + podmiot + been + czasownik z -ing?',
      signals: 'for, since, all day, lately, recently, how long',
      example: 'It has been raining for hours. / It hasn’t been raining. / Has it been raining?'
    },
    exercises: [
      { level: 'B1', instruction: 'Uzupełnij zdanie formą Present Perfect Continuous.', prompt: 'I ___ (learn) English since September.', answers: ['have been learning'], tip: 'I + have been + czasownik z -ing.' },
      { level: 'B1', instruction: 'Przetłumacz zdanie na angielski.', prompt: 'Ona pracuje tutaj od pięciu lat.', answers: ['She has been working here for five years.'], tip: 'Dla she użyj has been; for wskazuje okres trwania.' },
      { level: 'B2', instruction: 'Utwórz pytanie.', prompt: 'how long / they / wait?', answers: ['How long have they been waiting?'], tip: 'Po How long użyj have + podmiot + been + -ing.' },
      { level: 'B2', instruction: 'Uzupełnij przeczenie.', prompt: 'He ___ (not / sleep) well lately.', answers: ['hasn’t been sleeping', 'has not been sleeping'], tip: 'He + hasn’t been + czasownik z -ing.' },
      { level: 'C1', instruction: 'Uzupełnij zdanie, podkreślając długość trwania czynności.', prompt: 'Your hands are dirty. What ___ you ___ (do)?', answers: ['have you been doing'], gapAnswers: [['have', 'been doing']], tip: 'Pytamy o czynność, która doprowadziła do widocznego skutku.' }
    ]
  },
  {
    id: 'past-simple', name: 'Past Simple', short: 'Przeszły prosty',
    summary: 'Zakończone wydarzenia w określonym czasie w przeszłości.',
    theory: {
      use: 'Opisuje zakończone czynności i wydarzenia z przeszłości, często z podanym momentem lub okresem.',
      affirmative: 'Podmiot + czasownik w II formie. Czasowniki regularne otrzymują końcówkę -ed; nieregularne mają własną II formę.',
      negative: 'Podmiot + did not (didn’t) + czasownik w formie podstawowej.',
      question: 'Did + podmiot + czasownik w formie podstawowej?',
      signals: 'yesterday, last week, ago, in 2020, when I was young',
      example: 'She visited Rome. / She didn’t visit Rome. / Did she visit Rome?'
    },
    exercises: [
      { level: 'A1', instruction: 'Uzupełnij zdanie w Past Simple.', prompt: 'We ___ (watch) a film last night.', answers: ['watched'], tip: 'Regularny czasownik watch otrzymuje końcówkę -ed.' },
      { level: 'A1', instruction: 'Przetłumacz zdanie na angielski.', prompt: 'Wczoraj kupiłem nowy telefon.', answers: ['I bought a new phone yesterday.'], tip: 'Buy jest nieregularne: II forma to bought.' },
      { level: 'A2', instruction: 'Utwórz przeczenie. Użyj skróconej formy.', prompt: 'He went to school. → He ___ to school.', answers: ['didn’t go', 'did not go'], tip: 'Po didn’t użyj formy podstawowej go, nie went.' },
      { level: 'A2', instruction: 'Ułóż pytanie z podanych wyrazów.', prompt: 'you / see / Anna / yesterday?', answers: ['Did you see Anna yesterday?'], tip: 'Po Did użyj formy podstawowej see.' },
      { level: 'B1', instruction: 'Uzupełnij zdanie poprawną formą czasownika.', prompt: 'They ___ (not / have) enough time last week.', answers: ['didn’t have', 'did not have'], tip: 'Przeczenie w Past Simple tworzymy przez didn’t + have.' }
    ]
  },
  {
    id: 'past-continuous', name: 'Past Continuous', short: 'Przeszły ciągły',
    summary: 'Czynności trwające w określonym momencie w przeszłości.',
    theory: {
      use: 'Opisuje czynność trwającą o określonej porze w przeszłości, tło wydarzeń lub czynność przerwaną przez inne zdarzenie.',
      affirmative: 'Podmiot + was/were + czasownik z końcówką -ing. I/he/she/it was; you/we/they were.',
      negative: 'Podmiot + wasn’t/weren’t + czasownik z -ing.',
      question: 'Was/Were + podmiot + czasownik z -ing?',
      signals: 'at 5 o’clock yesterday, while, when, all evening',
      example: 'I was cooking when he called. / I wasn’t cooking. / Were you cooking?'
    },
    exercises: [
      { level: 'A2', instruction: 'Uzupełnij zdanie w Past Continuous.', prompt: 'At 8 p.m. I ___ (do) my homework.', answers: ['was doing'], tip: 'I używa was + czasownik z -ing.' },
      { level: 'A2', instruction: 'Przetłumacz zdanie na angielski.', prompt: 'Dzieci bawiły się, kiedy zaczął padać deszcz.', answers: ['The children were playing when it started to rain.'], tip: 'Dłuższa czynność w tle: were playing.' },
      { level: 'B1', instruction: 'Utwórz pytanie.', prompt: 'what / you / do / at midnight?', answers: ['What were you doing at midnight?'], tip: 'Dla you użyj were przed podmiotem.' },
      { level: 'B1', instruction: 'Uzupełnij przeczenie.', prompt: 'She ___ (not / listen) when the teacher spoke.', answers: ['wasn’t listening', 'was not listening'], tip: 'She + wasn’t + czasownik z -ing.' },
      { level: 'B2', instruction: 'Uzupełnij obie formy czasowników.', prompt: 'While we ___ (walk) home, it ___ (begin) to snow.', answers: ['were walking; began', 'were walking, began'], gapAnswers: [['were walking', 'began']], tip: 'Czynność trwająca: Past Continuous; krótkie zdarzenie: Past Simple.' }
    ]
  },
  {
    id: 'past-perfect', name: 'Past Perfect', short: 'Zaprzeszły',
    summary: 'Wcześniejsza czynność przed innym wydarzeniem w przeszłości.',
    theory: {
      use: 'Pokazuje, że jedna czynność wydarzyła się przed inną czynnością lub momentem w przeszłości.',
      affirmative: 'Podmiot + had + III forma czasownika. Forma had jest taka sama dla wszystkich osób.',
      negative: 'Podmiot + had not (hadn’t) + III forma czasownika.',
      question: 'Had + podmiot + III forma czasownika?',
      signals: 'before, after, by the time, already, never, when',
      example: 'They had left before I arrived. / They hadn’t left. / Had they left?'
    },
    exercises: [
      { level: 'B1', instruction: 'Uzupełnij zdanie w Past Perfect.', prompt: 'The train ___ (leave) before we arrived.', answers: ['had left'], tip: 'Wcześniejsze wydarzenie: had + III forma leave → left.' },
      { level: 'B1', instruction: 'Przetłumacz zdanie na angielski.', prompt: 'Ona skończyła pracę, zanim zadzwoniłem.', answers: ['She had finished work before I called.'], tip: 'Skończenie pracy nastąpiło wcześniej: had finished.' },
      { level: 'B2', instruction: 'Utwórz pytanie.', prompt: 'they / eat / before the meeting?', answers: ['Had they eaten before the meeting?'], tip: 'Pytanie zaczynamy od Had; III forma eat to eaten.' },
      { level: 'B2', instruction: 'Uzupełnij przeczenie.', prompt: 'I ___ (not / see) the film before yesterday.', answers: ['hadn’t seen', 'had not seen'], tip: 'Po hadn’t użyj III formy seen.' },
      { level: 'C1', instruction: 'Uzupełnij zdanie odpowiednią formą.', prompt: 'By the time the doctor arrived, the patient ___ (fall) asleep.', answers: ['had fallen'], tip: 'By the time wskazuje, że zaśnięcie nastąpiło wcześniej.' }
    ]
  },
  {
    id: 'past-perfect-continuous', name: 'Past Perfect Continuous', short: 'Zaprzeszły ciągły',
    summary: 'Czas trwania czynności poprzedzającej moment w przeszłości.',
    theory: {
      use: 'Podkreśla, jak długo czynność trwała przed innym wydarzeniem lub momentem w przeszłości.',
      affirmative: 'Podmiot + had been + czasownik z końcówką -ing.',
      negative: 'Podmiot + hadn’t been + czasownik z końcówką -ing.',
      question: 'Had + podmiot + been + czasownik z końcówką -ing?',
      signals: 'for, since, before, until, how long, all day',
      example: 'He had been working for hours before he took a break.'
    },
    exercises: [
      { level: 'B2', instruction: 'Uzupełnij zdanie w Past Perfect Continuous.', prompt: 'She ___ (study) for hours before the exam started.', answers: ['had been studying'], tip: 'Podkreślamy długość nauki przed egzaminem.' },
      { level: 'B2', instruction: 'Przetłumacz zdanie na angielski.', prompt: 'Czekaliśmy godzinę, zanim przyjechał autobus.', answers: ['We had been waiting for an hour before the bus arrived.'], tip: 'Czekanie trwało przed przyjazdem autobusu.' },
      { level: 'B2', instruction: 'Utwórz pytanie.', prompt: 'how long / he / work / there before he resigned?', answers: ['How long had he been working there before he resigned?'], tip: 'Użyj had + podmiot + been + -ing.' },
      { level: 'C1', instruction: 'Uzupełnij przeczenie.', prompt: 'They ___ (not / live) there long when they moved.', answers: ['hadn’t been living', 'had not been living'], tip: 'Po hadn’t been użyj czasownika z -ing.' },
      { level: 'C1', instruction: 'Uzupełnij zdanie poprawną formą czasownika.', prompt: 'His clothes were wet because he ___ (walk) in the rain.', answers: ['had been walking'], tip: 'Czynność trwała wcześniej i wyjaśniała widoczny skutek.' }
    ]
  },
  {
    id: 'future-simple', name: 'Future Simple', short: 'Przyszły prosty',
    summary: 'Decyzje, obietnice, przewidywania i przyszłe fakty.',
    theory: {
      use: 'Stosujemy will do spontanicznych decyzji, obietnic, ofert i przewidywań, a także do przyszłych faktów.',
      affirmative: 'Podmiot + will + czasownik w formie podstawowej. Skrót: ’ll.',
      negative: 'Podmiot + will not (won’t) + czasownik w formie podstawowej.',
      question: 'Will + podmiot + czasownik w formie podstawowej?',
      signals: 'tomorrow, next week, I think, probably, perhaps, I promise',
      example: 'I will help you. / I won’t forget. / Will you call me?'
    },
    exercises: [
      { level: 'A2', instruction: 'Uzupełnij zdanie formą Future Simple.', prompt: 'I think it ___ (rain) tomorrow.', answers: ['will rain'], tip: 'Po will zawsze używamy formy podstawowej czasownika.' },
      { level: 'A2', instruction: 'Przetłumacz zdanie na angielski.', prompt: 'Pomogę ci z tym zadaniem.', answers: ['I will help you with this task.', 'I’ll help you with this task.'], tip: 'Will + help wyraża decyzję lub obietnicę.' },
      { level: 'B1', instruction: 'Utwórz przeczenie. Użyj skróconej formy.', prompt: 'She ___ (not / be) late.', answers: ['She won’t be late.', 'She will not be late.'], tip: 'Po won’t użyj formy podstawowej be.' },
      { level: 'B1', instruction: 'Ułóż pytanie z podanych wyrazów.', prompt: 'you / come / to the party?', answers: ['Will you come to the party?'], tip: 'Pytanie zaczynamy od Will.' },
      { level: 'B2', instruction: 'Uzupełnij zdanie obietnicą.', prompt: 'I promise I ___ (tell) anyone your secret.', answers: ['won’t tell', 'will not tell'], tip: 'Obietnicę, że czegoś nie zrobimy, wyrażamy przez won’t.' }
    ]
  },
  {
    id: 'future-continuous', name: 'Future Continuous', short: 'Przyszły ciągły',
    summary: 'Czynność, która będzie trwała w określonym momencie w przyszłości.',
    theory: {
      use: 'Opisuje czynność, która będzie w toku o określonej porze w przyszłości, albo uprzejmie pyta o czyjeś plany.',
      affirmative: 'Podmiot + will be + czasownik z końcówką -ing.',
      negative: 'Podmiot + will not (won’t) be + czasownik z końcówką -ing.',
      question: 'Will + podmiot + be + czasownik z końcówką -ing?',
      signals: 'this time tomorrow, at 8 p.m. next Monday, all day tomorrow',
      example: 'This time tomorrow, we will be flying. / Will you be working?'
    },
    exercises: [
      { level: 'B1', instruction: 'Uzupełnij zdanie w Future Continuous.', prompt: 'This time tomorrow, we ___ (fly) to Spain.', answers: ['will be flying'], tip: 'Po will dodaj be i czasownik z -ing.' },
      { level: 'B1', instruction: 'Przetłumacz zdanie na angielski.', prompt: 'O tej porze jutro będę pracować.', answers: ['I will be working at this time tomorrow.', 'I’ll be working at this time tomorrow.'], tip: 'Czynność będzie trwała o określonej porze.' },
      { level: 'B2', instruction: 'Utwórz pytanie.', prompt: 'you / use / the car / this evening?', answers: ['Will you be using the car this evening?'], tip: 'Pytanie zaczyna się od Will, po podmiocie użyj be + -ing.' },
      { level: 'B2', instruction: 'Uzupełnij przeczenie.', prompt: 'They ___ (not / stay) at the hotel next week.', answers: ['won’t be staying', 'will not be staying'], tip: 'Przeczenie: won’t be + czasownik z -ing.' },
      { level: 'C1', instruction: 'Uzupełnij zdanie, opisując czynność trwającą o wskazanej porze.', prompt: 'At noon on Friday, the team ___ (present) its results.', answers: ['will be presenting'], tip: 'At noon wskazuje konkretny moment w przyszłości.' }
    ]
  },
  {
    id: 'future-perfect', name: 'Future Perfect', short: 'Przyszły dokonany',
    summary: 'Czynność zakończona przed określonym momentem w przyszłości.',
    theory: {
      use: 'Opisuje czynność, która zostanie zakończona przed określonym momentem lub innym wydarzeniem w przyszłości.',
      affirmative: 'Podmiot + will have + III forma czasownika.',
      negative: 'Podmiot + will not (won’t) have + III forma czasownika.',
      question: 'Will + podmiot + have + III forma czasownika?',
      signals: 'by, by the time, before, by next year, in two hours',
      example: 'She will have finished by noon. / Will she have finished by noon?'
    },
    exercises: [
      { level: 'B2', instruction: 'Uzupełnij zdanie w Future Perfect.', prompt: 'By Friday, I ___ (complete) the report.', answers: ['will have completed'], tip: 'By Friday wskazuje termin, do którego raport będzie ukończony.' },
      { level: 'B2', instruction: 'Przetłumacz zdanie na angielski.', prompt: 'Do końca roku oni zbudują nowy most.', answers: ['They will have built a new bridge by the end of the year.'], tip: 'Po will have użyj III formy built.' },
      { level: 'B2', instruction: 'Utwórz pytanie.', prompt: 'you / finish / the book / by Monday?', answers: ['Will you have finished the book by Monday?'], tip: 'Pytanie zaczyna się od Will; dalej have + III forma.' },
      { level: 'C1', instruction: 'Uzupełnij przeczenie.', prompt: 'We ___ (not / arrive) by 6 p.m.', answers: ['won’t have arrived', 'will not have arrived'], tip: 'Po won’t have użyj III formy arrived.' },
      { level: 'C1', instruction: 'Uzupełnij zdanie poprawną formą.', prompt: 'By the time you get home, the children ___ (go) to bed.', answers: ['will have gone'], tip: 'Pójście spać nastąpi przed twoim powrotem.' }
    ]
  },
  {
    id: 'future-perfect-continuous', name: 'Future Perfect Continuous', short: 'Przyszły dokonany ciągły',
    summary: 'Czas trwania czynności do określonego momentu w przyszłości.',
    theory: {
      use: 'Podkreśla, jak długo czynność będzie trwała do określonego momentu w przyszłości.',
      affirmative: 'Podmiot + will have been + czasownik z końcówką -ing.',
      negative: 'Podmiot + will not (won’t) have been + czasownik z końcówką -ing.',
      question: 'Will + podmiot + have been + czasownik z końcówką -ing?',
      signals: 'for, by, by the time, by next month, how long',
      example: 'By June, I will have been working here for a year.'
    },
    exercises: [
      { level: 'C1', instruction: 'Uzupełnij zdanie w Future Perfect Continuous.', prompt: 'By June, she ___ (teach) here for ten years.', answers: ['will have been teaching'], tip: 'Podkreślamy czas trwania pracy do czerwca.' },
      { level: 'C1', instruction: 'Przetłumacz zdanie na angielski.', prompt: 'W przyszłym tygodniu będę czekać na odpowiedź już od miesiąca.', answers: ['By next week, I will have been waiting for an answer for a month.'], tip: 'Użyj will have been + waiting.' },
      { level: 'C1', instruction: 'Utwórz pytanie.', prompt: 'how long / you / travel / by the time you arrive?', answers: ['How long will you have been travelling by the time you arrive?', 'How long will you have been traveling by the time you arrive?'], tip: 'Po will użyj have been i czasownika z -ing.' },
      { level: 'C2', instruction: 'Uzupełnij przeczenie.', prompt: 'He ___ (not / work) here for long by the end of May.', answers: ['won’t have been working', 'will not have been working'], tip: 'Schemat przeczenia: won’t have been + -ing.' },
      { level: 'C2', instruction: 'Uzupełnij zdanie, podkreślając długość trwania.', prompt: 'At 5 p.m., they ___ (drive) for eight hours.', answers: ['will have been driving'], tip: 'Czynność będzie trwała przez osiem godzin do wskazanego momentu.' }
    ]
  }
];

const DETAILED_TENSE_THEORY = {
  'present-simple': [
    { title: 'Jak rozpoznać ten czas?', text: 'Present Simple opisuje rutynę, fakty, upodobania i rozkłady. Nie przedstawia czynności trwającej właśnie teraz: I walk to work every day; The train leaves at six.' },
    { title: 'Pisownia i częste błędy', text: 'W trzeciej osobie dodaj -s: read/reads; spółgłoska+y zmienia się w -ies: study/studies. Po -ch, -sh, -ss, -x dodaj -es: watches.' },
    { title: 'Czasowniki opisujące stany', text: 'Know, believe, need i belong zwykle nie przyjmują formy ciągłej: I know the answer. Always, usually i often stoją przed zwykłym czasownikiem.' }
  ],
  'present-continuous': [
    { title: 'Czynność teraz i sytuacja tymczasowa', text: 'Present Continuous opisuje czynność teraz, tymczasową sytuację lub zmianę: I am staying with my aunt this week; The days are getting longer.' },
    { title: 'Jak tworzyć formę -ing?', text: 'Zwykle dodaj -ing: work/working; usuń końcowe nieme e: make/making; czasem podwój spółgłoskę: run/running. Nie pomijaj operatora be.' },
    { title: 'Kiedy nie stosować formy ciągłej?', text: 'Czasowniki stanu, np. know, like i own, zwykle pozostają w formie prostej: She likes tea. Czas ciągły opisuje też ustalone plany.' }
  ],
  'present-perfect': [
    { title: 'Przeszłość połączona z teraźniejszością', text: 'Present Perfect podkreśla obecny skutek, doświadczenie lub niedokończony okres, bez podawania konkretnej daty: I have lost my key.' },
    { title: 'Since, for i typowe określenia', text: 'Since podaje początek, for długość. Already i just stoją zwykle przed III formą; yet najczęściej kończy pytanie lub przeczenie.' },
    { title: 'Past Simple czy Present Perfect?', text: 'Zakończony moment wymaga Past Simple: I visited Rome in 2022. Doświadczenie bez daty to Present Perfect: I have visited Rome.' }
  ],
  'present-perfect-continuous': [
    { title: 'Podkreślanie trwania i procesu', text: 'Czas odpowiada na How long? i podkreśla trwanie albo niedawny skutek: I have been studying for two hours; You look wet.' },
    { title: 'Budowa i wyrażenia czasu', text: 'Użyj have/has been oraz -ing. Since wskazuje początek, for długość. W pytaniu operator poprzedza podmiot: Have they been waiting?' },
    { title: 'Ciągły czy prosty Present Perfect?', text: 'Forma ciągła akcentuje proces, prosta rezultat: I have been painting (czynność), I have painted the room (ukończenie). Stany zwykle nie występują w ciągłym.' }
  ],
  'past-simple': [
    { title: 'Zamknięty czas w przeszłości', text: 'Past Simple opisuje zakończone wydarzenia, często z yesterday, last week lub konkretną datą. Pozwala opowiedzieć kolejno: She opened the door and called.' },
    { title: 'Czasowniki regularne i nieregularne', text: 'Regularne otrzymują -ed: study/studied; nieregularne trzeba zapamiętać: go/went. Po did w pytaniu i przeczeniu wraca forma podstawowa.' },
    { title: 'Wyjątek: czasownik be', text: 'Be przyjmuje was lub were i nie potrzebuje did: Was she tired? Pozostałe czasowniki używają did w pytaniach i przeczeniach.' }
  ],
  'past-continuous': [
    { title: 'Tło opowieści i przerwana czynność', text: 'Past Continuous opisuje czynność trwającą w przeszłym momencie lub stanowiącą tło: I was cooking when the phone rang.' },
    { title: 'Was, were i końcówka -ing', text: 'Użyj was dla I/he/she/it, were dla pozostałych osób, a następnie -ing. W pytaniu odwróć kolejność; nie dodawaj did.' },
    { title: 'Past Continuous a Past Simple', text: 'Forma ciągła przedstawia dłuższe tło, prosta krótkie zdarzenie. When często wprowadza przerwanie; while podkreśla równoległe czynności.' }
  ],
  'past-perfect': [
    { title: 'Co wydarzyło się wcześniej?', text: 'Past Perfect wskazuje wcześniejsze z dwóch przeszłych wydarzeń: When we arrived, the film had started. Ułatwia zrozumienie chronologii opowieści.' },
    { title: 'Jedna forma had dla każdej osoby', text: 'Każda osoba używa had oraz III formy. Przeczenie to hadn’t; pytanie zaczyna się od Had. Nie łącz tej konstrukcji z did.' },
    { title: 'Past Perfect czy Past Simple?', text: 'Past Perfect podkreśla wcześniejszą czynność, Past Simple późniejszą: She had locked the door before she left. Before często wyjaśnia kolejność.' }
  ],
  'past-perfect-continuous': [
    { title: 'Jak długo coś trwało przed przeszłym momentem?', text: 'Czas podkreśla długość czynności poprzedzającej przeszłe wydarzenie: They had been driving for hours before they stopped.' },
    { title: 'Schemat i określenia czasu', text: 'Użyj had been + -ing dla każdej osoby. For wskazuje długość, since początek; pytanie zaczyna się od Had.' },
    { title: 'Kiedy wybrać formę prostą?', text: 'Past Perfect Continuous podkreśla trwanie; Past Perfect rezultat: She had been writing for hours, ale had written three pages.' }
  ],
  'future-simple': [
    { title: 'Decyzje, obietnice i przewidywania', text: 'Will wyraża spontaniczną decyzję, ofertę, obietnicę lub opinię o przyszłości. Po will zawsze występuje czasownik w formie podstawowej.' },
    { title: 'Pytania i przeczenia', text: 'Will jest niezmienne: Will they come? Przeczenie to won’t; skrót twierdzący to ’ll. Nie dodawaj końcówki -s.' },
    { title: 'Will czy going to?', text: 'Will często oznacza decyzję podjętą teraz; going to wcześniejszy zamiar lub przewidywanie oparte na dowodach: Look at those clouds!' }
  ],
  'future-continuous': [
    { title: 'Czynność w toku w przyszłym momencie', text: 'Future Continuous pokazuje czynność trwającą o określonej porze: At nine tomorrow I will be taking an exam. Może też uprzejmie pytać o plany.' },
    { title: 'Budowa i pytania', text: 'Schemat to will be + -ing. Przeczenie: won’t be working; pytanie: Will you be working? Konstrukcja nie zmienia się zależnie od osoby.' },
    { title: 'Różnica względem Future Simple', text: 'Future Simple zapowiada wydarzenie lub decyzję; Future Continuous podkreśla trwanie: I will call at eight, ale I will be working at eight.' }
  ],
  'future-perfect': [
    { title: 'Ukończenie przed terminem', text: 'Future Perfect opisuje rezultat gotowy do przyszłego terminu: By Friday I will have sent the report. By wskazuje granicę czasu.' },
    { title: 'Schemat z trzecią formą', text: 'Użyj will have i III formy, niezależnie od osoby. Pytanie zaczyna się od Will; przeczenie tworzymy przez won’t have.' },
    { title: 'Nie myl zakończenia z trwaniem', text: 'Future Perfect akcentuje ukończenie: she will have written the book. Future Perfect Continuous podkreśla długość: she will have been writing for a year.' }
  ],
  'future-perfect-continuous': [
    { title: 'Czas trwania do przyszłego punktu', text: 'Czas podaje długość czynności do przyszłej granicy: By May, he will have been living here for ten years.' },
    { title: 'Długa, ale regularna konstrukcja', text: 'Dla każdej osoby użyj will have been + -ing. For wskazuje długość; by lub by the time wyznacza przyszły punkt.' },
    { title: 'Wybór między perfect a perfect continuous', text: 'Future Perfect podkreśla rezultat, a Future Perfect Continuous — czas trwania: I will have repaired the car albo I will have been repairing it for hours.' }
  ]
};

const EXTRA_TENSE_EXERCISES = {
  'present-simple': [
    { level: 'A1', instruction: 'Uzupełnij zdanie poprawną formą czasownika.', prompt: 'My sister ___ (get up) at seven every day.', answers: ['gets up'], tip: 'W 3. osobie liczby pojedynczej czasownik get otrzymuje końcówkę -s.' },
    { level: 'A2', instruction: 'Uzupełnij pytanie właściwym operatorem.', prompt: '___ your friends ___ (play) basketball after school?', answers: ['Do; play', 'Do / play'], gapAnswers: [['Do', 'play']], tip: 'Dla friends użyj Do, a czasownik pozostaw w formie podstawowej.' },
    { level: 'B1', instruction: 'Uzupełnij przeczenie odpowiednią formą czasownika.', prompt: 'Water ___ (not / boil) at 50 degrees Celsius.', answers: ['doesn’t boil', 'does not boil'], tip: 'To ogólny fakt; dla water użyj doesn’t + forma podstawowa.' },
    { level: 'B2', instruction: 'Uzupełnij zdanie odpowiednim przysłówkiem i formą czasownika.', prompt: 'He is very reliable; he ___ (always / arrive) on time.', answers: ['always arrives'], tip: 'Always zwykle stoi przed czasownikiem głównym; dla he dodaj -s.' },
    { level: 'C1', instruction: 'Uzupełnij zdanie poprawną formą czasownika opisującego stan.', prompt: 'This recipe ___ (contain) three kinds of cheese.', answers: ['contains'], tip: 'Czasownik opisuje stałą właściwość, dlatego używamy Present Simple.' }
  ],
  'present-continuous': [
    { level: 'A1', instruction: 'Uzupełnij zdanie formą czasownika w nawiasie.', prompt: 'The dog ___ (sleep) on the sofa at the moment.', answers: ['is sleeping'], tip: 'The dog to it: użyj is + czasownika z -ing.' },
    { level: 'A2', instruction: 'Uzupełnij pytanie właściwą formą czasownika.', prompt: '___ the students ___ (prepare) for the test now?', answers: ['Are; preparing', 'Are / preparing'], gapAnswers: [['Are', 'preparing']], tip: 'Students to liczba mnoga, dlatego pytanie zaczyna się od Are.' },
    { level: 'B1', instruction: 'Uzupełnij przeczenie w Present Continuous.', prompt: 'I ___ (not / use) my laptop right now.', answers: ['am not using'], tip: 'Dla I użyj am not + czasownika z -ing.' },
    { level: 'B2', instruction: 'Uzupełnij zdanie opisujące ustalony plan.', prompt: 'We ___ (meet) the client tomorrow afternoon.', answers: ['are meeting'], tip: 'Present Continuous może opisywać ustalone plany na bliską przyszłość.' },
    { level: 'C1', instruction: 'Uzupełnij zdanie poprawną formą czasownika.', prompt: 'Why ___ you ___ (wear) a coat indoors today?', answers: ['are; wearing', 'are / wearing'], gapAnswers: [['are', 'wearing']], tip: 'Pytanie tworzymy przez are + podmiot + czasownik z -ing.' }
  ],
  'present-perfect': [
    { level: 'A2', instruction: 'Uzupełnij zdanie formą Present Perfect.', prompt: 'They ___ (not / finish) the project yet.', answers: ['haven’t finished', 'have not finished'], tip: 'Dla they użyj haven’t + III formy finished.' },
    { level: 'B1', instruction: 'Uzupełnij pytanie właściwą formą czasownika.', prompt: '___ Mark ever ___ (ride) a horse?', answers: ['Has; ridden', 'Has / ridden'], gapAnswers: [['Has', 'ridden']], tip: 'Mark używa has, a III forma ride to ridden.' },
    { level: 'B1', instruction: 'Uzupełnij zdanie słowem already i poprawną formą czasownika.', prompt: 'I ___ (already / send) the invitation.', answers: ['have already sent'], tip: 'Already stoi między have a III formą sent.' },
    { level: 'B2', instruction: 'Uzupełnij zdanie właściwą formą czasownika.', prompt: 'Our neighbours ___ (just / move) into the house next door.', answers: ['have just moved'], tip: 'Dla neighbours użyj have; just stoi przed III formą.' },
    { level: 'C1', instruction: 'Uzupełnij zdanie poprawną formą czasownika.', prompt: 'The company ___ (not / announce) its decision so far.', answers: ['hasn’t announced', 'has not announced'], tip: 'Company jest w liczbie pojedynczej, dlatego użyj has not.' }
  ],
  'present-perfect-continuous': [
    { level: 'B1', instruction: 'Uzupełnij zdanie formą Present Perfect Continuous.', prompt: 'It ___ (rain) since early morning.', answers: ['has been raining'], tip: 'Dla it użyj has been + czasownika z -ing.' },
    { level: 'B1', instruction: 'Uzupełnij pytanie o czas trwania czynności.', prompt: 'How long ___ Maya ___ (learn) French?', answers: ['has; been learning', 'has / been learning'], gapAnswers: [['has', 'been learning']], tip: 'Maya używa has; konstrukcja czasu to has been + -ing.' },
    { level: 'B2', instruction: 'Uzupełnij przeczenie odpowiednią formą.', prompt: 'We ___ (not / wait) for very long.', answers: ['haven’t been waiting', 'have not been waiting'], tip: 'Dla we użyj haven’t been + czasownika z -ing.' },
    { level: 'C1', instruction: 'Uzupełnij zdanie, zwracając uwagę na widoczny skutek.', prompt: 'Your eyes are red. ___ you ___ (cry)?', answers: ['Have; been crying', 'Have / been crying'], gapAnswers: [['Have', 'been crying']], tip: 'Pytamy o czynność, której skutek widać teraz.' },
    { level: 'C2', instruction: 'Uzupełnij zdanie, podkreślając trwający proces.', prompt: 'Researchers ___ (investigate) the issue for several months.', answers: ['have been investigating'], tip: 'Czynność rozpoczęła się wcześniej i nadal trwa.' }
  ],
  'past-simple': [
    { level: 'A1', instruction: 'Uzupełnij zdanie poprawną formą czasownika.', prompt: 'Lena ___ (visit) her grandparents on Sunday.', answers: ['visited'], tip: 'Regularny czasownik visit w Past Simple otrzymuje końcówkę -ed.' },
    { level: 'A2', instruction: 'Uzupełnij pytanie właściwym operatorem i czasownikiem.', prompt: '___ your team ___ (win) the match yesterday?', answers: ['Did; win', 'Did / win'], gapAnswers: [['Did', 'win']], tip: 'Po Did czasownik win pozostaje w formie podstawowej.' },
    { level: 'B1', instruction: 'Uzupełnij przeczenie.', prompt: 'I ___ (not / understand) the instructions at first.', answers: ['didn’t understand', 'did not understand'], tip: 'Po didn’t użyj formy podstawowej understand.' },
    { level: 'B2', instruction: 'Uzupełnij zdanie odpowiednią formą czasownika nieregularnego.', prompt: 'The museum ___ (close) earlier than usual last Monday.', answers: ['closed'], tip: 'Close jest regularne: w Past Simple dodajemy -d.' },
    { level: 'C1', instruction: 'Uzupełnij pytanie o zakończone wydarzenie.', prompt: 'Where ___ the explorers ___ (find) the ancient map?', answers: ['did; find', 'did / find'], gapAnswers: [['did', 'find']], tip: 'Po did użyj formy podstawowej find.' }
  ],
  'past-continuous': [
    { level: 'A2', instruction: 'Uzupełnij zdanie formą Past Continuous.', prompt: 'At this time yesterday, Ella ___ (travel) to work.', answers: ['was travelling', 'was traveling'], tip: 'Ella używa was + czasownika z -ing.' },
    { level: 'B1', instruction: 'Uzupełnij pytanie właściwą formą czasownika.', prompt: 'What ___ the neighbours ___ (do) when you called?', answers: ['were; doing', 'were / doing'], gapAnswers: [['were', 'doing']], tip: 'Neighbours to liczba mnoga: were + doing.' },
    { level: 'B1', instruction: 'Uzupełnij przeczenie.', prompt: 'The children ___ (not / sleep) when the storm began.', answers: ['weren’t sleeping', 'were not sleeping'], tip: 'Dla the children użyj weren’t + czasownika z -ing.' },
    { level: 'B2', instruction: 'Uzupełnij zdanie opisujące dwie równoczesne czynności.', prompt: 'While I ___ (cook), my brother was setting the table.', answers: ['was cooking'], tip: 'Czynność trwająca w tle jest w Past Continuous.' },
    { level: 'C1', instruction: 'Uzupełnij zdanie właściwą formą czasownika.', prompt: 'The audience ___ (talk) when the lights suddenly went out.', answers: ['were talking'], tip: 'Czynność trwała w chwili, gdy wydarzyło się krótkie zdarzenie.' }
  ],
  'past-perfect': [
    { level: 'B1', instruction: 'Uzupełnij zdanie formą Past Perfect.', prompt: 'After they ___ (book) the tickets, they reserved a hotel.', answers: ['had booked'], tip: 'Rezerwacja biletów nastąpiła przed rezerwacją hotelu.' },
    { level: 'B2', instruction: 'Uzupełnij pytanie właściwą formą czasownika.', prompt: '___ the guests ___ (leave) before the speech began?', answers: ['Had; left', 'Had / left'], gapAnswers: [['Had', 'left']], tip: 'Pytanie tworzymy przez Had + podmiot + III formę.' },
    { level: 'B2', instruction: 'Uzupełnij przeczenie.', prompt: 'She ___ (not / hear) the news before the meeting.', answers: ['hadn’t heard', 'had not heard'], tip: 'Po hadn’t użyj III formy heard.' },
    { level: 'C1', instruction: 'Uzupełnij zdanie z already.', prompt: 'The film ___ (already / start) when we reached the cinema.', answers: ['had already started'], tip: 'Film zaczął się przed naszym dotarciem.' },
    { level: 'C2', instruction: 'Uzupełnij zdanie właściwą formą czasownika.', prompt: 'By 2019, the architect ___ (design) several award-winning buildings.', answers: ['had designed'], tip: 'By 2019 wskazuje wcześniejszy moment w przeszłości.' }
  ],
  'past-perfect-continuous': [
    { level: 'B2', instruction: 'Uzupełnij zdanie w Past Perfect Continuous.', prompt: 'He ___ (train) for months before the competition.', answers: ['had been training'], tip: 'Trening trwał przez pewien czas przed zawodami.' },
    { level: 'B2', instruction: 'Uzupełnij pytanie o czas trwania czynności.', prompt: 'How long ___ they ___ (argue) before someone intervened?', answers: ['had; been arguing', 'had / been arguing'], gapAnswers: [['had', 'been arguing']], tip: 'Użyj had + podmiot + been + czasownika z -ing.' },
    { level: 'C1', instruction: 'Uzupełnij przeczenie.', prompt: 'I ___ (not / feel) well for several days before I saw a doctor.', answers: ['hadn’t been feeling', 'had not been feeling'], tip: 'Czas trwania złego samopoczucia poprzedzał wizytę.' },
    { level: 'C1', instruction: 'Uzupełnij zdanie opisujące przyczynę widocznego skutku.', prompt: 'The road was slippery because it ___ (snow) all night.', answers: ['had been snowing'], tip: 'Opady trwały przed momentem, w którym droga była śliska.' },
    { level: 'C2', instruction: 'Uzupełnij zdanie poprawną formą czasownika.', prompt: 'Before the policy changed, staff ___ (work) longer shifts for nearly a year.', answers: ['had been working'], tip: 'Konstrukcja podkreśla czas trwania wcześniejszej sytuacji.' }
  ],
  'future-simple': [
    { level: 'A2', instruction: 'Uzupełnij spontaniczną decyzję.', prompt: 'The phone is ringing. I ___ (answer) it.', answers: ['will answer', '’ll answer', "'ll answer"], tip: 'Spontaniczną decyzję w chwili mówienia wyrażamy przez will.' },
    { level: 'B1', instruction: 'Uzupełnij przewidywanie.', prompt: 'I’m sure our team ___ (do) its best in the final.', answers: ['will do'], tip: 'Po will użyj formy podstawowej do.' },
    { level: 'B1', instruction: 'Uzupełnij przeczenie.', prompt: 'Don’t worry; I ___ (not / tell) anyone.', answers: ['won’t tell', 'will not tell'], tip: 'Obietnicę, że czegoś nie zrobimy, wyrażamy przez won’t.' },
    { level: 'B2', instruction: 'Uzupełnij pytanie o przyszłość.', prompt: '___ you ___ (join) us for dinner tonight?', answers: ['Will; join', 'Will / join'], gapAnswers: [['Will', 'join']], tip: 'Pytanie zaczyna się od Will, po którym używamy formy podstawowej.' },
    { level: 'C1', instruction: 'Uzupełnij zdanie przewidujące przyszły fakt.', prompt: 'According to the schedule, the train ___ (arrive) at platform four.', answers: ['will arrive'], tip: 'Po will zawsze występuje podstawowa forma czasownika.' }
  ],
  'future-continuous': [
    { level: 'B1', instruction: 'Uzupełnij zdanie w Future Continuous.', prompt: 'At 9 tomorrow morning, the manager ___ (meet) the new team.', answers: ['will be meeting'], tip: 'Czynność będzie trwała o określonej porze w przyszłości.' },
    { level: 'B2', instruction: 'Uzupełnij pytanie o czyjeś plany.', prompt: '___ you ___ (stay) at the office late tonight?', answers: ['Will; be staying', 'Will / be staying'], gapAnswers: [['Will', 'be staying']], tip: 'Użyj will + podmiot + be + czasownika z -ing.' },
    { level: 'B2', instruction: 'Uzupełnij przeczenie.', prompt: 'This time next week, we ___ (not / work); we’ll be on holiday.', answers: ['won’t be working', 'will not be working'], tip: 'Przeczenie: won’t be + czasownik z -ing.' },
    { level: 'C1', instruction: 'Uzupełnij zdanie opisujące czynność w toku.', prompt: 'The delegates ___ (travel) back home all day on Friday.', answers: ['will be travelling', 'will be traveling'], tip: 'All day on Friday podkreśla trwanie przyszłej czynności.' },
    { level: 'C2', instruction: 'Uzupełnij uprzejme pytanie o plan.', prompt: '___ Sam ___ (use) the conference room this afternoon?', answers: ['Will; be using', 'Will / be using'], gapAnswers: [['Will', 'be using']], tip: 'Future Continuous może służyć do uprzejmego pytania o plany.' }
  ],
  'future-perfect': [
    { level: 'B2', instruction: 'Uzupełnij zdanie w Future Perfect.', prompt: 'By the end of the month, we ___ (save) enough money.', answers: ['will have saved'], tip: 'Po will have użyj III formy saved.' },
    { level: 'B2', instruction: 'Uzupełnij pytanie.', prompt: '___ the builders ___ (finish) the bridge by September?', answers: ['Will; have finished', 'Will / have finished'], gapAnswers: [['Will', 'have finished']], tip: 'Pytanie tworzymy przez Will + podmiot + have + III formę.' },
    { level: 'C1', instruction: 'Uzupełnij przeczenie.', prompt: 'She ___ (not / complete) the course by next spring.', answers: ['won’t have completed', 'will not have completed'], tip: 'Po won’t have użyj III formy completed.' },
    { level: 'C1', instruction: 'Uzupełnij zdanie odpowiednią formą czasownika nieregularnego.', prompt: 'By the time you arrive, I ___ (write) the first chapter.', answers: ['will have written'], tip: 'III forma czasownika write to written.' },
    { level: 'C2', instruction: 'Uzupełnij zdanie z określeniem by then.', prompt: 'The committee ___ (make) its final decision by then.', answers: ['will have made'], tip: 'By then wskazuje zakończenie przed przyszłym momentem.' }
  ],
  'future-perfect-continuous': [
    { level: 'C1', instruction: 'Uzupełnij zdanie w Future Perfect Continuous.', prompt: 'By December, I ___ (teach) at this school for five years.', answers: ['will have been teaching'], tip: 'Konstrukcja podkreśla czas trwania pracy do grudnia.' },
    { level: 'C1', instruction: 'Uzupełnij pytanie o długość trwania czynności.', prompt: 'How long ___ she ___ (run) the business by next year?', answers: ['will; have been running', 'will / have been running'], gapAnswers: [['will', 'have been running']], tip: 'Schemat: will + podmiot + have been + czasownik z -ing.' },
    { level: 'C1', instruction: 'Uzupełnij przeczenie.', prompt: 'They ___ (not / travel) for very long by the time they reach the coast.', answers: ['won’t have been travelling', 'will not have been travelling', 'won’t have been traveling', 'will not have been traveling'], tip: 'Po won’t have been użyj czasownika z -ing.' },
    { level: 'C2', instruction: 'Uzupełnij zdanie, zwracając uwagę na długość procesu.', prompt: 'In March, the engineers ___ (develop) the prototype for two years.', answers: ['will have been developing'], tip: 'Czas wskazuje, jak długo proces będzie trwał do marca.' },
    { level: 'C2', instruction: 'Uzupełnij pytanie o oczekiwany czas trwania.', prompt: 'By midnight, how long ___ the crew ___ (sail)?', answers: ['will; have been sailing', 'will / have been sailing'], gapAnswers: [['will', 'have been sailing']], tip: 'Po How long użyj will + podmiot + have been + -ing.' }
  ]
};

ENGLISH_TENSES.forEach((tense) => {
  tense.exercises.push(...EXTRA_TENSE_EXERCISES[tense.id]);
});

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
const englishTensesView = $('#english-tenses-view');
const authScreen = $('#auth-screen');
const appShell = $('#app-shell');
let activeTenseId = null;

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

function renderTenseCatalog() {
  $('#tense-grid').innerHTML = ENGLISH_TENSES.map((tense, index) => `
    <button class="tense-card" type="button" data-tense-id="${tense.id}">
      <span class="tense-card-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="tense-card-copy"><strong>${escapeHtml(tense.name)}</strong><span>${escapeHtml(tense.short)}</span></span>
      <span class="tense-card-arrow" aria-hidden="true">→</span>
    </button>
  `).join('');
  $('#tense-grid').querySelectorAll('[data-tense-id]').forEach((button) => {
    button.addEventListener('click', () => openTense(button.dataset.tenseId));
  });
}

function openTense(tenseId) {
  const tense = ENGLISH_TENSES.find((item) => item.id === tenseId);
  if (!tense) return;
  activeTenseId = tense.id;
  $('#tense-catalog').classList.add('hidden');
  $('#tense-lesson').classList.remove('hidden');
  $('#tense-title').textContent = tense.name;
  $('#tense-summary').textContent = tense.summary;
  const detailedSections = DETAILED_TENSE_THEORY[tense.id];
  $('#tense-theory-content').innerHTML = `
    <section class="tense-theory-overview">
      <p class="eyebrow">ZASTOSOWANIE</p>
      <h2>Kiedy używamy ${escapeHtml(tense.name)}?</h2>
      <p>${escapeHtml(tense.theory.use)}</p>
      <div class="tense-theory-signals"><strong>Typowe określenia:</strong> ${escapeHtml(tense.theory.signals)}</div>
    </section>
    <section class="tense-theory-formulas" aria-label="Budowa zdań">
      ${[
        ['Zdanie twierdzące', tense.theory.affirmative],
        ['Przeczenie', tense.theory.negative],
        ['Pytanie', tense.theory.question]
      ].map(([title, content], index) => `
        <article class="tense-theory-card tense-theory-formula">
          <span class="tense-theory-step">0${index + 1}</span>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(content)}</p>
        </article>
      `).join('')}
    </section>
    <section class="tense-theory-details" aria-label="Szczegółowe wyjaśnienie">
      <div class="tense-theory-section-heading">
        <p class="eyebrow">SZCZEGÓŁOWE WYJAŚNIENIE</p>
        <h2>Jak poprawnie stosować ten czas?</h2>
      </div>
      ${detailedSections.map((section, index) => `
        <article class="tense-theory-card tense-theory-detail">
          <span class="tense-theory-step">${String(index + 1).padStart(2, '0')}</span>
          <div><h3>${escapeHtml(section.title)}</h3><p>${escapeHtml(section.text)}</p></div>
        </article>
      `).join('')}
    </section>
    <section class="tense-theory-example">
      <p class="eyebrow">PRZYKŁADY</p>
      <h2>Twierdzenie, przeczenie i pytanie</h2>
      <p>${escapeHtml(tense.theory.example)}</p>
    </section>
  `;
  showView('english-tenses');
  $('#breadcrumb-current').textContent = `Czasy angielskie / ${tense.name}`;
  selectTenseTab('exercises');
}

function selectTenseTab(tab) {
  const showExercises = tab === 'exercises';
  $('#tense-exercise-tab').classList.toggle('active', showExercises);
  $('#tense-theory-tab').classList.toggle('active', !showExercises);
  $('#tense-exercise-tab').setAttribute('aria-selected', String(showExercises));
  $('#tense-theory-tab').setAttribute('aria-selected', String(!showExercises));
  $('#tense-exercises').classList.toggle('hidden', !showExercises);
  $('#tense-theory').classList.toggle('hidden', showExercises);
  if (showExercises) renderTenseExercises();
}

function renderTenseExercises() {
  const tense = ENGLISH_TENSES.find((item) => item.id === activeTenseId);
  if (!tense) return;
  $('#tense-exercise-count').textContent = `${tense.exercises.length} zadań`;
  $('#tense-exercise-links').innerHTML = tense.exercises.map((exercise, exerciseIndex) => `
    <button class="tense-exercise-link${exerciseIndex === 0 ? ' active' : ''}" id="tense-exercise-link-${exerciseIndex + 1}" type="button" role="tab" aria-selected="${exerciseIndex === 0}" aria-controls="tense-exercise-${exerciseIndex + 1}" data-select-exercise="${exerciseIndex}" aria-label="Otwórz zadanie ${exerciseIndex + 1}, poziom ${exercise.level}">
      <span>${exerciseIndex + 1}</span><small>${escapeHtml(exercise.level)}</small>
    </button>
  `).join('');
  $('#tense-exercise-list').innerHTML = tense.exercises.map((exercise, exerciseIndex) => {
    let blankIndex = 0;
    const prompt = exercise.prompt.split('___').map((part, partIndex, parts) => {
      const text = escapeHtml(part);
      if (partIndex === parts.length - 1) return text;
      blankIndex += 1;
      return `${text}<input class="tense-inline-answer" type="text" data-answer-slot="${blankIndex - 1}" aria-label="Odpowiedź do zadania ${exerciseIndex + 1}, luka ${blankIndex}" autocomplete="off" spellcheck="false">`;
    }).join('');
    const answerLine = blankIndex ? '' : `
      <label class="tense-answer-line" for="tense-answer-${exerciseIndex}">
        <span>Twoja odpowiedź</span>
        <input id="tense-answer-${exerciseIndex}" class="tense-inline-answer tense-full-answer" type="text" data-answer-slot="0" autocomplete="off" spellcheck="false">
      </label>
    `;
    return `
      <article class="tense-exercise-card${exerciseIndex === 0 ? '' : ' hidden'}" id="tense-exercise-${exerciseIndex + 1}" data-exercise-index="${exerciseIndex}" role="tabpanel" aria-labelledby="tense-exercise-link-${exerciseIndex + 1}">
        <div class="tense-exercise-meta"><span>Zadanie ${exerciseIndex + 1}</span><span class="level-badge level-${exercise.level.toLowerCase()}">${escapeHtml(exercise.level)}</span></div>
        <p class="tense-exercise-instruction">${escapeHtml(exercise.instruction)}</p>
        <p class="tense-exercise-prompt">${prompt}</p>
        ${answerLine}
        <div class="tense-exercise-footer">
          <button class="button button-light" type="button" data-check-exercise="${exerciseIndex}">Sprawdź</button>
          <div class="tense-exercise-feedback hidden" data-exercise-feedback="${exerciseIndex}" role="status" aria-live="polite"></div>
        </div>
      </article>
    `;
  }).join('');
}

function normalizeTenseAnswer(answer) {
  return answer.toLowerCase().replace(/[’‘]/g, "'").replace(/[.!?]+$/g, '').replace(/\s+/g, ' ').trim();
}

function getTenseAnswerVariants(exercise) {
  const blankCount = (exercise.prompt.match(/___/g) || []).length;
  if (!blankCount) return exercise.answers.map((answer) => [answer]);
  if (exercise.gapAnswers) return exercise.gapAnswers;
  const promptPattern = `^\\s*${exercise.prompt.split('___').map((part) => normalizeTenseAnswer(part).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('([\\s\\S]*?)')}\\s*$`;
  const pattern = new RegExp(promptPattern, 'i');
  const variants = [];
  for (const answer of exercise.answers) {
    const match = normalizeTenseAnswer(answer).match(pattern);
    if (match) {
      variants.push(match.slice(1).map((part) => part.trim()));
    } else if (blankCount === 1) {
      variants.push([answer]);
    } else {
      const parts = answer.split(/[;,]\s*/);
      if (parts.length === blankCount) variants.push(parts);
    }
  }
  return variants;
}

function checkTenseExercise(exerciseIndex) {
  const tense = ENGLISH_TENSES.find((item) => item.id === activeTenseId);
  if (!tense) return;
  const exercise = tense.exercises[exerciseIndex];
  const card = $('#tense-exercise-list').querySelector(`[data-exercise-index="${exerciseIndex}"]`);
  if (!exercise || !card) return;
  const answerInputs = [...card.querySelectorAll('[data-answer-slot]')];
  if (answerInputs.some((input) => !input.value.trim())) {
    answerInputs.find((input) => !input.value.trim()).focus();
    return;
  }
  const answers = answerInputs.map((input) => normalizeTenseAnswer(input.value));
  const variants = getTenseAnswerVariants(exercise);
  const isCorrect = variants.some((variant) => variant.length === answers.length
    && variant.every((part, index) => normalizeTenseAnswer(part) === answers[index]));
  answerInputs.forEach((input) => {
    input.classList.toggle('answer-correct', isCorrect);
    input.classList.toggle('answer-incorrect', !isCorrect);
  });
  const feedback = card.querySelector(`[data-exercise-feedback="${exerciseIndex}"]`);
  feedback.className = `tense-exercise-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
  if (isCorrect) {
    feedback.textContent = `Dobrze! ${exercise.tip}`;
  } else {
    const expected = variants[0] || exercise.answers;
    feedback.textContent = `Poprawna odpowiedź: ${expected.join(' / ')}. ${exercise.tip}`;
  }
}

function selectTenseExercise(exerciseIndex) {
  const tense = ENGLISH_TENSES.find((item) => item.id === activeTenseId);
  if (!tense || !tense.exercises[exerciseIndex]) return;
  $('#tense-exercise-links').querySelectorAll('[data-select-exercise]').forEach((button) => {
    const isSelected = Number(button.dataset.selectExercise) === exerciseIndex;
    button.classList.toggle('active', isSelected);
    button.setAttribute('aria-selected', String(isSelected));
  });
  $('#tense-exercise-list').querySelectorAll('[data-exercise-index]').forEach((panel) => {
    panel.classList.toggle('hidden', Number(panel.dataset.exerciseIndex) !== exerciseIndex);
  });
}

function showTenseCatalog() {
  activeTenseId = null;
  $('#tense-lesson').classList.add('hidden');
  $('#tense-catalog').classList.remove('hidden');
  renderTenseCatalog();
  showView('english-tenses');
}

function showView(name) {
  homeView.classList.toggle('hidden', name !== 'home');
  deckView.classList.toggle('hidden', name !== 'deck');
  studyView.classList.toggle('hidden', name !== 'study');
  testView.classList.toggle('hidden', name !== 'test');
  englishTensesView.classList.toggle('hidden', name !== 'english-tenses');
  document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.dataset.view === (name === 'deck' ? 'home' : name === 'test' ? 'study' : name)));
  if (name === 'home') $('#breadcrumb-current').textContent = 'Moje talie';
  if (name === 'study') $('#breadcrumb-current').textContent = 'Nauka';
  if (name === 'test') $('#breadcrumb-current').textContent = 'Sprawdzian';
  if (name === 'english-tenses' && !activeTenseId) $('#breadcrumb-current').textContent = 'Czasy angielskie';
  document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
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
    else if (link.dataset.view === 'english-tenses') showTenseCatalog();
    else showView('home');
  });
});
$('#back-to-tenses').addEventListener('click', showTenseCatalog);
$('#tense-exercise-tab').addEventListener('click', () => selectTenseTab('exercises'));
$('#tense-theory-tab').addEventListener('click', () => selectTenseTab('theory'));
$('#tense-exercise-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-check-exercise]');
  if (button) checkTenseExercise(Number(button.dataset.checkExercise));
});
$('#tense-exercise-links').addEventListener('click', (event) => {
  const button = event.target.closest('[data-select-exercise]');
  if (!button) return;
  selectTenseExercise(Number(button.dataset.selectExercise));
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
