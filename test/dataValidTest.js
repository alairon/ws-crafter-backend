/* eslint-disable no-octal */
/* eslint-disable no-undef */

const { expect } = require('chai');

// Functions to be tested
const { metaCheck, metaValues, generalCheck } = require ('../src/jsonValidaton');

// Load Chai JSON for JSON testing

const validMetaJSON = {
  "set_id": "TST",
  "set_name": "Test Data",
  "set_number": 1,
  "set_side": 'W',
  "total_cards": 1,
  "release_date": 2020-02-23
}

const typoMetaJSON = {
  "set-id": "TST",
  "set-name": "Test Data",
  "total-cards": 1,
  "release-date": 2020-02-23
}

/* 
  Metadata Tests
*/
describe('Metadata Validation', () => {
  // Test A - Examines the JSON when values could be missing
  describe('A) Existence of Data', () => {
    it ('returns 0 when all required fields are present', () => {
      expect(metaCheck(validMetaJSON)).to.equal(0);
    });
    it ('returns 1 when nothing is passed in', () => {
      expect(metaCheck()).to.equal(1);
    });
    it ('returns 2 for missing values', () => {
      expect (metaCheck({})).to.equal(2);
    });
    it ('returns 2 for mistyped values', () => {
      expect(metaCheck(typoMetaJSON)).to.equal(2);
    });
  });
  // Test B - Examines the contents of the JSON
  describe('B) Validity of Metadata', () => {
    it ('returns 0 when all data is valid', () => {
      expect(metaValues(validMetaJSON)).to.equal(0);
    });
  });
});