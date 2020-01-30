/* Initializes the wsCards database with predefined tables */
USE wsCards_en;

/* Shared values among the card types */
CREATE TABLE IF NOT EXISTS cards(
    card_id varchar(16) PRIMARY KEY NOT NULL,
    en_name varchar(256) NOT NULL,
    jp_name varchar(256) NOT NULL,
    card_rarity int NOT NULL,
    card_type int NOT NULL,
    card_color int NOT NULL,
    card_side boolean NOT NULL,
    card_trigger int NOT NULL,
    card_flavorTxt varchar(512),
    card_abilityTxt varchar(512),
    card_img varchar(512),
    UNIQUE (card_id)
);

/* Values specific to character cards */
CREATE TABLE IF NOT EXISTS cards_character(
    card_id varchar(16) PRIMARY KEY NOT NULL,
    card_level smallint NOT NULL,
    card_cost smallint NOT NULL,
    card_icon smallint,
    card_power int,
    card_soul smallint,
    card_trait1 varchar(32),
    card_trait2 varchar(32),
    UNIQUE (card_id)
);

/* Values specific to event cards */
CREATE TABLE IF NOT EXISTS cards_event(
    card_id varchar(16) PRIMARY KEY NOT NULL,
    card_level smallint NOT NULL,
    card_cost smallint NOT NULL,
    card_icon smallint,
    UNIQUE (card_id)
);

/* Values specific to climax cards */
CREATE TABLE IF NOT EXISTS cards_climax(
    card_id varchar(16) PRIMARY KEY NOT NULL,
    UNIQUE (card_id)
);

/* Errata cards */
CREATE TABLE IF NOT EXISTS cards_errata(
    card_icon varchar(16) PRIMARY KEY NOT NULL,
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