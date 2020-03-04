# Database

## Changelog
**Revision 3**
 * Added rows to `Errata`, `Climax`, and `Restrictions` tables
 * Improved naming of rows to make it readable

**Revision 2**
 * Created `Character`, `Event`, `Climax`, `Errata` tables
 * Removed `Level`, `Cost`, `Icon`, `Power`, `Soul`, `Traits` 1/2 from the main table and inserted them into rows into both `Character` and `Event` tables
 * Renamed the `wsCards` database into the `wsCards_en`

 **Revision 1**
  * Removed Ability flags from the main table to reduce clutter in the table
  * Removed the all data pertaining to JP cards from from the `wsCards` database

  **Initial Design**
  * Everything was on a single table

-----

## MySQL Constraints Legend
Code | Definition
--- | ---
PK | Primary Key
NN | Not Null
UQ | Unique

 -----

## wsCards_en
### Common Columns
Column | Data Type | Valid Values | Constraints | Description
--- | --- | --- | --- | ---
card_id | varchar | XXX/S##-### | [PK][NN][UQ] | The card's unique ID. Comprised of the set (X), Side (S), set number, and card number. Also known officially as the "Collection ID"
en_name | varchar | Any string | [NN] | The English name for the card
jp_name | varchar CHARACTER SET utf8 | Any UTF-8 string | | The Japanese name for the card (if available as stated in section 2.1.1.3 of the comprehensive rules)
card_set | varchar | Any string | [NN] | An alphanumeric string identifying the set
set_number | integer | Any numeric value | [NN] | The number identifying the set. Some cards do not have a set number, but for those that do, it's found immediately after the side identifier
card_number | smallint | Any numeric value | [NN] | The card's number within the set
set_side | boolean, NULL | true, false, NULL | [NN] | Whether the card is affliated with the Weiß [0] or Schwartz [1] side of the game. Note that some cards are associated with both [NULL] sides (e.g. BWC2016/WS01EN, Cheering Shiyoko).
card_rarity | smallint | C, U, R, RR, RRR, SR, SP, PR, TD | [NN] | The rarity of a card
card_type | boolean, NULL | true, false, NULL | | Denotes the card's type. Character [NULL], Event [0], Climax [1]
card_color | smallint | 0, 1, 2, 3, 4 | [NN] | Red [0], Blue [1], Green [2], Yellow [3], Purple [4]
card_trigger | smallint | None, Soul, Return (Wind), Pool (Bag), Comeback (Door), Draw (Book), Shot (Burn), Treasure (Bar), Gate, Standby | | Denotes the type of trigger shown on the card. None is denoted with NULL.
card_flavorText | varchar | Any string | | A short exerpt, usually describing the card's illustration
card_abilityText | varchar | Any string | [NN] | The valid moves the card can perform

### Characters
Column | Data Type | Valid Values | Constraints | Description
--- | --- | --- | --- | ---
card_id | varchar | XXX/S##-### | [PK][NN][UQ] | The card's unique ID. Comprised of the set (X), Side (S), set number, and card number. Also known officially as the "Collection ID"
card_level | tinyint | 0, 1, 2, 3 | [NN] | The card's level
card_cost | tinyint | 0 .. 9 | [NN] | The cost required to play the card from hand
card_icon | tinyint | 0, 1, 2 | [NN] | None [0], Counter [1], Clock [2]
card_power | integer | Any numeric value | [NN] | The base attack power of a card when used in battle
card_soul | tinyint | 0, 1, 2 | [NN] | The base amount of soul (clock) damage dealt during offensive battle
card_trait1 | varchar | Any string | | The first trait a character may have
card_trait2 | varchar | Any string | | The second trait a character may have

### Event
Column | Data Type | Valid Values | Constraints | Description
--- | --- | --- | --- | ---
card_id | varchar | XXX/S##-### | [PK][NN][UQ] | The card's unique ID. Comprised of the set (X), Side (S), set number, and card number. Also known officially as the "Collection ID"
card_level | tinyint | 0, 1, 2, 3 | [NN] | The card's level
card_cost | tinyint | 0 .. 9 | [NN] | The cost required to play the card from hand
card_icon | tinyint | 0, 1, 2 | [NN] | None [0], Counter [1], Clock [2]

### Climax
Column | Data Type | Valid Values | Constraints | Description
--- | --- | --- | --- | ---
card_id | varchar | XXX/S##-### | [PK][NN][UQ] | The card's unique ID. Comprised of the set (X), Side (S), set number, and card number. Also known officially as the "Collection ID"

### Errata
Column | Data Type | Valid Values | Constraints | Description
--- | --- | --- | --- | ---
card_id | varchar | XXX/S##-### | [PK][NN][UQ] | The card's unique ID. Comprised of the set (X), Side (S), set number, and card number. Also known officially as the "Collection ID"
errata_location | varchar | The affected field | [NN] | This field describes the location as to where the errata is located. Examples include a typo in the ability, incorrect level, incorrect color, etc.
errata_description | varchar | The correction | [NN] | This field contains data about the original text that appeared on the card

### Restrictions/Ban list
Column | Data Type | Valid Values | Constraints | Description
--- | --- | --- | --- | ---
card_id | varchar | XXX/S##-### | [PK][NN][UQ] | The card's unique ID. Comprised of the set (X), Side (S), set number, and card number. Also known officially as the "Collection ID"
restriction_type | varchar | Any string | [NN] | A description of the restriction
restriction_group_id | smallint | Any small numeric value | [NN] | An identifier to group cards that fall into a specific restriction/ban

### Abilities
Column | Data Type | Valid Values | Constraints | Description
--- | --- | --- | --- | ---
card_id | varchar | XXX/S##-### | [PK][NN][UQ] | The card's unique ID. Comprised of the set (X), Side (S), set number, and card number. Also known officially as the "Collection ID"
ability1_text | varchar | Any String | | The text for the card's first ability
ability1_type | tinyint | Any small number | | Act [0], Auto [1], Continuous [2]
ability2_text | varchar | Any String | | The text for the card's second ability
ability2_type | tinyint | Any small number | | Act [0], Auto [1], Continuous [2]
ability3_text | varchar | Any String | | The text for the card's third ability
ability3_type | tinyint | Any small number | | Act [0], Auto [1], Continuous [2]