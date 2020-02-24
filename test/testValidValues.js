/* eslint-disable no-undef */
/* eslint-disable no-octal*/

const { expect } = require('chai');

// Functions to be tested
const { isNull, isBoolean, isNumber, isString, isValidDate, isUndefined } = require('../src/dataValidation');

// Generic test data. Not to be used if testing for a specific data type.
const num = 10;
const bool = true;
const str = "test";
const obj = { "test": 10 };

describe('Value Validation', () => {
  describe('Function: isNull()', () => {
    it('returns false if nothing is passed in', () => {
      expect(isNull()).to.equal(false);
    });
    it('returns true if "null" is passed', () => {
      expect(isNull(null)).to.equal(true);
    });
    it('returns false if "undefined" is passed in', () => {
      expect(isNull(undefined)).to.equal(false);
    })
    it('returns false if a boolean is passed in', () => {
      expect(isNull(bool)).to.equal(false);
    });
    it('returns false if a number is passed in', () => {
      expect(isNull(num)).to.equal(false);
    });
    it('returns false if a string is passed in', () => {
      expect(isNull(str)).to.equal(false);
    });
    it('returns false if an object is passed in', () => {
      expect(isNull(obj)).to.equal(false);
    });
  });

  describe('Function: isBoolean()', () => {
    it('returns false if nothing is passed in', () => {
      expect(isBoolean()).to.equal(false);
    });    
    it('returns false if "null" is passed in', () => {
      expect(isBoolean(null)).to.equal(false);
    });
    it('returns false if "undefined" is passed in', () => {
      expect(isBoolean(undefined)).to.equal(false);
    });
    it('returns true if "true" is passed in', () => {
      expect(isBoolean(true)).to.equal(true);
    });
    it('returns true if "false" is passed in', () => {
      expect(isBoolean(false)).to.equal(true);
    });
    it('returns false if a number is passed in', () => {
      expect(isBoolean(num)).to.equal(false);
    });
    it('returns false if a string is passed in', () => {
      expect(isBoolean(str)).to.equal(false);
    });
  });

  
  describe('Function: isNumber()', () => {
    it('returns false if nothing is passed in', () => {
      expect(isNumber()).to.equal(false);
    });    
    it('returns false if "null" is passed in', () => {
      expect(isNumber(null)).to.equal(false);
    });
    it('returns false if "undefined" is passed in', () => {
      expect(isNumber(undefined)).to.equal(false);
    });
    it('returns true if a boolean is passed in', () => {
      expect(isNumber(true)).to.equal(false);
    });
    it('returns false if a NaN (not a number) is passed in', () => {
      expect(isNumber(NaN)).to.equal(false);
    });
    it('returns true if zero is passed in', () => {
      expect(isNumber(0)).to.equal(true);
    });
    it('returns true if a postive number is passed in', () => {
      expect(isNumber(10)).to.equal(true);
    });
    it('returns true if a positive decimal number is passed in', () => {
      expect(isNumber(10.01)).to.equal(true);
    });
    it('returns true if a negative number is passed in', () => {
      expect(isNumber(-10)).to.equal(true);
    });
    it('returns true if a negative decimal number is passed in', () => {
      expect(isNumber(-10.01)).to.equal(true);
    });
    it('returns false if a string is passed in', () => {
      expect(isNumber(str)).to.equal(false);
    });
    it('returns false if an object is passed in', () => {
      expect(isNumber(obj)).to.equal(false);
    });
  });

  describe('Function: isString()', () => {
    it('returns false if nothing is passed in', () => {
      expect(isString()).to.equal(false);
    });    
    it('returns false if "null" is passed in', () => {
      expect(isString(null)).to.equal(false);
    });
    it('returns false if "undefined" is passed in', () => {
      expect(isString(undefined)).to.equal(false);
    });
    it('returns false if a boolean is passed in', () => {
      expect(isString(bool)).to.equal(false);
    });
    it('returns false if a number is passed in', () => {
      expect(isString(num)).to.equal(false);
    });
    it('returns true if a string is passed in', () => {
      expect(isString(str)).to.equal(true);
    });
    it('returns false if an object is passed in', () => {
      expect(isString(obj)).to.equal(false);
    });
  });

  describe('Function: isUndefined()', () => {
    it('returns true if nothing is passed in', () => {
      expect(isUndefined()).to.equal(true);
    });
    it('returns false if null is passed in', () => {
      expect(isUndefined(null)).to.equal(false);
    });
    it('returns false if a boolean is passed in', () => {
      expect(isUndefined(bool)).to.equal(false);
    });
    it('returns false if NaN (not a number) is passed in', () => {
      expect(isUndefined(NaN)).to.equal(false);
    });
    it('returns false if a number is passed in', () => {
      expect(isUndefined(num)).to.equal(false);
    });
    it('returns false if a string is passed in', () => {
      expect(isUndefined(str)).to.equal(false);
    });
    it('returns false if an object is passed in', () => {
      expect(isUndefined(obj)).to.equal(false);
    });
  });

  describe('Function: isDate()', () => {
    describe('A) Date Format', () => {
      context('i) Correct Formatting (YYYY-MM-DD)', () => {
        it('\'2020-01-01\' as a string returns true', () => {
          expect(isValidDate('2020-01-01')).to.equal(true);
        });
        it('2020-01-01 without quotes returns false', () => {
          expect(isValidDate(2020-01-01)).to.equal(false);
        });
      });
      context('ii) Incorrect format', () => {
        it('01-01-2020 (MM-DD-YYYY) returns false', () => {
          expect(isValidDate('01-01-2020')).to.equal(false);
        });
        it('20-01-2020 (DD-MM-YYYY) returns false', () => {
          expect(isValidDate('20-01-2020')).to.equal(false);
        });
        it('20-01-01 (YY-MM-DD) returns false', () => {
          expect(isValidDate('20-01-01')).to.equal(false);
        });
        it('01-01-20 (MM-DD-YY) returns false', () => {
          expect(isValidDate('01-01-20')).to.equal(false);
        });
        it('20-01-20 (DD-MM-YY) returns false', () => {
          expect(isValidDate('20-01-20')).to.equal(false);
        });
        it('Date() returns false', () => {
          expect(isValidDate(Date())).to.equal(false);
        });
      });
    });
    describe('B) Invalid values', () => {
      context('i) Empty values', () => {
        it('nothing passed in returns false', () => {
          expect(isValidDate()).to.equal(false);
        });
        it('null returns false', () => {
          expect(isValidDate(null)).to.equal(false);
        });
        it('undefined returns false', () => {
          expect(isValidDate(undefined)).to.equal(false);
        });
      });
    });
    describe('C) Basic Verification', () => {
      context('i) Correct format, valid month, valid day', () => {
        it('2020-01-01 returns true', () => {
          expect(isValidDate('2020-01-01')).to.equal(true);
        });
        it('2020-10-01 returns true', () => {
          expect(isValidDate('2020-10-20')).to.equal(true);
        });
        it('2020-12-31 returns true', () => {
          expect(isValidDate('2020-12-31')).to.equal(true);
        });
      });
      context('ii) Correct format, invalid month, valid day', () => {
        it('2020-00-01 returns false', () => {
          expect(isValidDate('2020-00-01')).to.equal(false);
        });
        it('2020-13-01 returns false', () => {
          expect(isValidDate('2020-13-01')).to.equal(false);
        });
      });
      context('iii) Correct format, valid month, invalid day', () => {
        it('2020-01-00 returns false', () => {
          expect(isValidDate('2020-01-00')).to.equal(false);
        });
        it('2020-10-01 returns false', () => {
          expect(isValidDate('2020-01-32')).to.equal(false);
        });
      });
      context('iv) Correct format, invalid month, invalid day', () => {
        it('2020-00-00 returns false', () => {
          expect(isValidDate('2020-00-00')).to.equal(false);
        });
        it('2020-13-32 returns false', () => {
          expect(isValidDate('2020-13-32')).to.equal(false);
        });
      });
    });
  });
});