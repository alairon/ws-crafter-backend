/* eslint-disable no-octal */
/* eslint-disable no-undef */

const { expect } = require('chai');

// Functions to be tested
const { metaValidation, cardValidation } = require ('../src/validation/jsonValidation');

// Test Data
const testData = require('./testCardData');

/* 
  Metadata Tests
*/
describe('Data Validation', () => {
  describe('1) Metadata Validation', () => {
    // Test A - Examines the JSON when values could be missing
    describe('A) Existence of Data', () => {
      it ('returns an array with 1 error when nothing is passed in', () => {
        expect(metaValidation().length).to.equal(1);
      });
      it ('returns an array with 1 errors when values are missing', () => {
        expect(metaValidation(testData.meta.empty).length).to.equal(1);
      });
      it ('returns an array with 4 errors when incorrect values are passed in', () => {
        expect(metaValidation(testData.meta.typo_hyphons).length).to.equal(4);
      });
    });
    // Test B - Examines the contents of the JSON
    describe('B) Validity of Metadata', () => {
      it ('returns 0 when all required fields are present', () => {
        expect(metaValidation(testData.meta.valid)).to.equal(0);
      });
      it ('returns an array with 3 errors when strings are passed instead of number', () => {
        expect(metaValidation(testData.meta.invalid_numAsStr).length).to.equal(3);
      });
      it ('returns an array with 1 error when numbers are passed instead of string', () => {
        expect(metaValidation(testData.meta.invalid_strAsNum).length).to.equal(1);
      });
    });
  });

  /* Card Tests */
  describe('2. Card Data Validation', () => {
    // Test A - Examines the card JSON where values are missing
    describe('A) Existence of Data', () => {
      it('returns an array with 1 error when all values are empty', () => {
        expect(cardValidation(testData.card.empty).length).to.equal(1);
      })
    });
  });
});
