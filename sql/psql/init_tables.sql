/* Initializes the English (Global) card database
  Postgres doesn't support the USE keyword
*/
-- "sets" is a non-reserved keyword. "set" is.

/* Data for the set */
CREATE TABLE IF NOT EXISTS sets(
  set_id varchar(8) PRIMARY KEY NOT NULL,
  set_name varchar(64) NOT NULL,
  set_number smallint,
  set_side boolean,
  set_type smallint,
  series_name text NOT NULL,
  total_cards smallint NOT NULL,
  release_date date NOT NULL,
  UNIQUE (set_id),
  UNIQUE (set_name)
);

/* Data that all cards share */
CREATE TABLE IF NOT EXISTS cards(
  set_id varchar(8) NOT NULL,
  card_id varchar(16) PRIMARY KEY NOT NULL,
  en_name text NOT NULL,
  jp_name text,
  card_number varchar(8) NOT NULL,
  card_rarity smallint NOT NULL,
  card_type smallint NOT NULL,
  card_color smallint NOT NULL,
  card_flavor_text text,
  card_ability_text text,
  card_img text,
  UNIQUE (card_id)
) INHERITS (sets);

/* Children table names are in plural because 'event' is an SQL keyword */
/* Values specific to character chards */
CREATE TABLE IF NOT EXISTS characters(
  card_id varchar(16) PRIMARY KEY NOT NULL,
  card_level smallint NOT NULL,
  card_cost smallint NOT NULL,
  card_icon smallint,
  card_power smallint,
  card_soul smallint,
  card_trigger smallint,
  card_trait_1 varchar(32),
  card_trait_2 varchar(32),
  card_trait_3 varchar(32)
) INHERITS (cards);

/* Values specific to event cards */
CREATE TABLE IF NOT EXISTS events(
  card_id varchar(16) PRIMARY KEY NOT NULL,
  card_level smallint NOT NULL,
  card_cost smallint NOT NULL
) INHERITS (cards);

/* Values specific to climax cards */
CREATE TABLE IF NOT EXISTS climaxes(
  card_id varchar(16) PRIMARY KEY NOT NULL,
  card_trigger smallint
) INHERITS (cards);
