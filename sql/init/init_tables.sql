/* Initializes the English (Global) wsCards database with predefined tables */
USE wsCards_en;

CREATE TABLE IF NOT EXISTS meta(
    set_id varchar(8) PRIMARY KEY NOT NULL,
    set_name varchar(64) NOT NULL,
    set_number smallint,
    set_side boolean,
    total_cards smallint NOT NULL,
    release_date date NOT NULL,
    UNIQUE (set_id),
    UNIQUE (set_name),
    UNIQUE (release_date)
);

/* Shared values among the card types */
CREATE TABLE IF NOT EXISTS cards_general(
    card_id varchar(16) PRIMARY KEY NOT NULL,
    en_name varchar(128) NOT NULL,
    jp_name varchar(128) CHARSET utf8mb4 NOT NULL,
    set_id varchar(8) NOT NULL,
    card_number varchar(8) NOT NULL,
    card_rarity tinyint NOT NULL,
    card_type boolean,
    card_color tinyint NOT NULL,
    card_flavorTxt varchar(512),
    card_abilityTxt varchar(512),
    card_img varchar(512),
    UNIQUE (card_id)
);

/* Values specific to character cards */
CREATE TABLE IF NOT EXISTS cards_character(
    card_id varchar(16) PRIMARY KEY NOT NULL,
    card_level tinyint NOT NULL,
    card_cost tinyint NOT NULL,
    card_icon tinyint,
    card_power smallint,
    card_soul tinyint,
    card_trigger tinyint,
    card_trait1 varchar(32),
    card_trait2 varchar(32),
    UNIQUE (card_id)
);

/* Values specific to event cards */
CREATE TABLE IF NOT EXISTS cards_event(
    card_id varchar(16) PRIMARY KEY NOT NULL,
    card_level tinyint NOT NULL,
    card_cost tinyint NOT NULL,
    card_icon tinyint,
    card_trigger tinyint,
    UNIQUE (card_id)
);

/* Values specific to climax cards */
CREATE TABLE IF NOT EXISTS cards_climax(
    card_id varchar(16) PRIMARY KEY NOT NULL,
    card_trigger tinyint,
    UNIQUE (card_id)
);

/* Errata cards */
CREATE TABLE IF NOT EXISTS cards_errata(
	card_id varchar(16) PRIMARY KEY NOT NULL,
    errata_type smallint NOT NULL,
    errata_desc varchar(512),
    UNIQUE (card_id)
);

/* Restrictions */
CREATE TABLE IF NOT EXISTS cards_restrictions(
    card_id varchar(16) PRIMARY KEY NOT NULL,
    restiction_type smallint NOT NULL,
    card_assoc varchar(128),
    UNIQUE (card_id)
);

/* Card Abilities */
CREATE TABLE IF NOT EXISTS cards_abilities(
    card_id varchar(16) PRIMARY KEY,
    ability1_text varchar(256),
    ability1_type smallint,
    ability2_text varchar(256),
    ability2_type smallint,
    ability3_text varchar(256),
    ability3_type smallint,
    UNIQUE (card_id)
);