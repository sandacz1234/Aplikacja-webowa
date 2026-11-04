create table if not exists public.decks (
  id text not null,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 50),
  description text not null default '',
  category text not null default 'Inne',
  color text not null default 'mint',
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.cards (
  id text not null,
  user_id uuid not null default auth.uid(),
  deck_id text not null,
  front text not null check (char_length(front) between 1 and 500),
  back text not null check (char_length(back) between 1 and 1000),
  created_at timestamptz not null default now(),
  primary key (user_id, id),
  foreign key (user_id, deck_id)
    references public.decks(user_id, id)
    on delete cascade
);

create index if not exists cards_user_deck_created_idx
  on public.cards(user_id, deck_id, created_at);
create index if not exists cards_user_created_idx
  on public.cards(user_id, created_at);
create index if not exists decks_user_created_idx
  on public.decks(user_id, created_at);

alter table public.decks enable row level security;
alter table public.cards enable row level security;

drop policy if exists "Users can read their own decks" on public.decks;
create policy "Users can read their own decks"
  on public.decks for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own decks" on public.decks;
create policy "Users can create their own decks"
  on public.decks for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own decks" on public.decks;
create policy "Users can update their own decks"
  on public.decks for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own decks" on public.decks;
create policy "Users can delete their own decks"
  on public.decks for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can read their own cards" on public.cards;
create policy "Users can read their own cards"
  on public.cards for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own cards" on public.cards;
create policy "Users can create their own cards"
  on public.cards for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.decks
      where decks.user_id = (select auth.uid())
        and decks.id = cards.deck_id
    )
  );

drop policy if exists "Users can update their own cards" on public.cards;
create policy "Users can update their own cards"
  on public.cards for update to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.decks
      where decks.user_id = (select auth.uid())
        and decks.id = cards.deck_id
    )
  );

drop policy if exists "Users can delete their own cards" on public.cards;
create policy "Users can delete their own cards"
  on public.cards for delete to authenticated
  using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.decks to authenticated;
grant select, insert, update, delete on public.cards to authenticated;
revoke all on public.decks from anon;
revoke all on public.cards from anon;
