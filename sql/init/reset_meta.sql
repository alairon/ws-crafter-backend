DROP TABLE IF EXISTS meta;
CREATE TABLE IF NOT EXISTS meta(
    set_id varchar(8) PRIMARY KEY NOT NULL,
    set_name varchar(64) NOT NULL,
    set_number smallint,
    set_side boolean,
    series_set varchar(8),
    total_cards smallint NOT NULL,
    release_date date NOT NULL,
    UNIQUE (set_id),
    UNIQUE (set_name),
    UNIQUE (release_date)
);