/* eslint-disable no-undef */
/* eslint-disable no-octal*/

const { expect } = require('chai');

// Functions to be tested
const { isNull, isBoolean, isTinyInt, isSmallInt, isInt, isString, isValidDate, isUndefined } = require('../src/validation/dataValidation');

// Generic test data. Not to be used if testing for a specific data type.
const num = 10;
const bool = true;
const str = "test";
const obj = { "test": 10 };

describe('Value Validation', () => {
  describe('1) Function: isNull()', () => {
    context('A) Empty Values', () => {
      it('null returns true', () => {
        expect(isNull(null)).to.equal(true);
      });
      it('nothing passed in returns false', () => {
        expect(isNull()).to.equal(false);
      });
      it('undefined returns false', () => {
        expect(isNull(undefined)).to.equal(false);
      });
    });
    context('B) Non-empty Values', () => {
      it('a boolean returns false', () => {
        expect(isNull(bool)).to.equal(false);
      });
      it('a number returns false', () => {
        expect(isNull(num)).to.equal(false);
      });
      it('a string returns false', () => {
        expect(isNull(str)).to.equal(false);
      });
      it('an object returns false', () => {
        expect(isNull(obj)).to.equal(false);
      });
    });
  });

  describe('2) Function: isBoolean()', () => {
    context('A) Valid Values', () => {
      it('"true" returns true', () => {
        expect(isBoolean(true)).to.equal(true);
      });
      it('"false" returns false', () => {
        expect(isBoolean(false)).to.equal(true);
      });
    });
    context('B) Empty Values', () => {
      it('nothing passed in returns false', () => {
        expect(isBoolean()).to.equal(false);
      });    
      it('null returns false', () => {
        expect(isBoolean(null)).to.equal(false);
      });
      it('undefined returns false', () => {
        expect(isBoolean(undefined)).to.equal(false);
      });
    });
    context('C) Invalid Values', () => {
      it('"true" returns false', () => {
        expect(isBoolean('true')).to.equal(false);
      });
      it('"false" returns false', () => {
        expect(isBoolean('false')).to.equal(false);
      });
      it('any number returns false', () => {
        expect(isBoolean(num)).to.equal(false);
      });
      it(`"${str}" string returns false`, () => {
        expect(isBoolean(str)).to.equal(false);
      });
      it('an object returns false', () => {
        expect(isBoolean(obj)).to.equal(false);
      });
    });
  });

  
  describe('3) Functions: SQL Number Limits', () => {
    context('A) TINYINT (Max: 127)', () => {
      it('nothing passed in returns false', () => {
        expect(isTinyInt()).to.equal(false);
      });
      it('null returns false', () => {
        expect(isTinyInt(null)).to.equal(false);
      });
      it('undefined returns false', () => {
        expect(isTinyInt(undefined)).to.equal(false);
      });
      it('boolean returns false', () => {
        expect(isTinyInt(true)).to.equal(false);
      });
      it('NaN (not a number) returns false', () => {
        expect(isTinyInt(NaN)).to.equal(false);
      });
      it(`"${str}" (string) returns false`, () => {
        expect(isTinyInt(str)).to.equal(false);
      });
      it('An object is returns false', () => {
        expect(isTinyInt(obj)).to.equal(false);
      });
      it('0 (zero) returns true', () => {
        expect(isTinyInt(0)).to.equal(true);
      });
      it('127 returns true', () => {
        expect(isTinyInt(127)).to.equal(true);
      });
      it('128 (max +1) returns false', () => {
        expect(isTinyInt(128)).to.equal(false);
      });
      it('-1 (imposed min of 0 -1) returns false', () => {
        expect(isTinyInt(-1)).to.equal(false);
      });
      it('10.01 (positive decimal) returns false', () => {
        expect(isTinyInt(10.01)).to.equal(false);
      });
      it('-10.01 (negative decimal) returns false', () => {
        expect(isTinyInt(-10.01)).to.equal(false);
      });
    });
    context('B) SMALLINT (Max: 32767)', () => {
      it('nothing passed in returns false', () => {
        expect(isSmallInt()).to.equal(false);
      });
      it('null returns false', () => {
        expect(isSmallInt(null)).to.equal(false);
      });
      it('undefined returns false', () => {
        expect(isSmallInt(undefined)).to.equal(false);
      });
      it('boolean returns false', () => {
        expect(isSmallInt(true)).to.equal(false);
      });
      it('NaN (not a number) returns false', () => {
        expect(isSmallInt(NaN)).to.equal(false);
      });
      it(`"${str}" (string) returns false`, () => {
        expect(isSmallInt(str)).to.equal(false);
      });
      it('An object is returns false', () => {
        expect(isSmallInt(obj)).to.equal(false);
      });
      it('0 (zero) returns true', () => {
        expect(isSmallInt(0)).to.equal(true);
      });
      it('32767 returns true', () => {
        expect(isSmallInt(32767)).to.equal(true);
      });
      it('32768 (max +1) returns false', () => {
        expect(isSmallInt(32768)).to.equal(false);
      });
      it('-1 (imposed min of 0 -1) returns false', () => {
        expect(isSmallInt(-1)).to.equal(false);
      });
      it('10.01 (positive decimal) returns false', () => {
        expect(isSmallInt(10.01)).to.equal(false);
      });
      it('-10.01 (negative decimal) returns false', () => {
        expect(isSmallInt(-10.01)).to.equal(false);
      });
    });
    context('C) isInt (Max: 2147483647)', () => {
      it('nothing passed in returns false', () => {
        expect(isInt()).to.equal(false);
      });
      it('null returns false', () => {
        expect(isInt(null)).to.equal(false);
      });
      it('undefined returns false', () => {
        expect(isInt(undefined)).to.equal(false);
      });
      it('boolean returns false', () => {
        expect(isInt(true)).to.equal(false);
      });
      it('NaN (not a number) returns false', () => {
        expect(isInt(NaN)).to.equal(false);
      });
      it(`"${str}" (string) returns false`, () => {
        expect(isInt(str)).to.equal(false);
      });
      it('An object is returns false', () => {
        expect(isInt(obj)).to.equal(false);
      });
      it('0 (zero) returns true', () => {
        expect(isInt(0)).to.equal(true);
      });
      it('2147483647 returns true', () => {
        expect(isInt(2147483647)).to.equal(true);
      });
      it('2147483648 (max +1) returns false', () => {
        expect(isInt(2147483648)).to.equal(false);
      });
      it('-1 (imposed min of 0 -1) returns false', () => {
        expect(isInt(-1)).to.equal(false);
      });
      it('10.01 (positive decimal) returns false', () => {
        expect(isInt(10.01)).to.equal(false);
      });
      it('-10.01 (negative decimal) returns false', () => {
        expect(isInt(-10.01)).to.equal(false);
      });
    });
  });

  describe('4) Function: isString()', () => {
    context('A) Valid Values', () => {
      it('a string returns true', () => {
        expect(isString(str)).to.equal(true);
      });
      it('an empty string returns true', () => {
        expect(isString('')).to.equal(true);
      });
    });
    context('B) Empty Values', () => {
      it('nothing passed in returns false', () => {
        expect(isString()).to.equal(false);
      });    
      it('null returns false', () => {
        expect(isString(null)).to.equal(false);
      });
      it('undefined returns false', () => {
        expect(isString(undefined)).to.equal(false);
      });
    });
    context('C) Invalid Values', () => {
      it('a boolean returns false', () => {
        expect(isString(bool)).to.equal(false);
      });
      it('a number returns false', () => {
        expect(isString(num)).to.equal(false);
      });
      it('an object returns false', () => {
        expect(isString(obj)).to.equal(false);
      });
    });
  });

  describe('5) Function: isUndefined()', () => {
    context('A) Empty Values', () => {
      it('nothing passed in returns true', () => {
        expect(isUndefined()).to.equal(true);
      });
      it('undefined returns true', () => {
        expect(isUndefined(undefined)).to.equal(true);
      });
      it('null returns false', () => {
        expect(isUndefined(null)).to.equal(false);
      });
      it('NaN (not a number) returns false', () => {
        expect(isUndefined(NaN)).to.equal(false);
      });
    });
    context('B) Non-empty Values', () => {
      it('a boolean returns false', () => {
        expect(isUndefined(bool)).to.equal(false);
      });
      it('a number returns false', () => {
        expect(isUndefined(num)).to.equal(false);
      });
      it('a string returns false', () => {
        expect(isUndefined(str)).to.equal(false);
      });
      it('an object returns false', () => {
        expect(isUndefined(obj)).to.equal(false);
      });
    });
  });

  describe('6) Function: isValidDate()', () => {
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
      context('v) Incorrect format, extraneous characters', () => {
        it('202020-01-01 returns false', () => {
          expect(isValidDate('202020-01-01')).to.equal(false);
        });
        it('"2020-001-01" returns false', () => {
          expect(isValidDate('2020-001-01')).to.equal(false);
        });
        it('"2020-01-001" returns false', () => {
          expect(isValidDate('2020-01-001')).to.equal(false);
        });
        it('"-2020-01-01" returns false', () => {
          expect(isValidDate('-2020-01-01')).to.equal(false);
        });
        it('"2020-01-01-" returns false', () => {
          expect(isValidDate('2020-01-01-')).to.equal(false);
        });
        it('"\\2020-01-01" returns false', () => {
          expect(isValidDate('\\2020-01-01')).to.equal(false);
        });
        it('"\\t2020-01-01" returns false', () => {
          expect(isValidDate('\t2020-01-01')).to.equal(false);
        });
        it('"2020\\t01-01" returns false', () => {
          expect(isValidDate('2020\t01-01')).to.equal(false);
        });
        it('"2020-01-01\\t" returns false', () => {
          expect(isValidDate('2020-01-01\t')).to.equal(false);
        });
        it('2020--01--01 returns false', () => {
          expect(isValidDate('2020--01--01')).to.equal(false);
        });
        it('"-2020-01-01-" returns false', () => {
          expect(isValidDate('-2020-01-01-')).to.equal(false);
        });
      });
    });
    describe('D) Advanced Verification', () => {
      describe('i) Months with 30/31 days', () => {
        it('2020-01-31 returns true', () => {
          expect(isValidDate('2020-01-31')).to.equal(true);
        });
        it('2020-02-30 returns false', () => {
          expect(isValidDate('2020-02-30')).to.equal(false);
        });
        it('2020-02-31 returns false', () => {
          expect(isValidDate('2020-02-31')).to.equal(false);
        });
        it('2020-03-31 returns true', () => {
          expect(isValidDate('2020-03-31')).to.equal(true);
        });
        it('2020-04-31 returns false', () => {
          expect(isValidDate('2020-04-31')).to.equal(false);
        });
        it('2020-05-31 returns true', () => {
          expect(isValidDate('2020-05-31')).to.equal(true);
        });
        it('2020-06-31 returns false', () => {
          expect(isValidDate('2020-06-31')).to.equal(false);
        });
        it('2020-07-31 returns true', () => {
          expect(isValidDate('2020-07-31')).to.equal(true);
        });
        it('2020-08-31 returns true', () => {
          expect(isValidDate('2020-08-31')).to.equal(true);
        });
        it('2020-09-31 returns false', () => {
          expect(isValidDate('2020-09-31')).to.equal(false);
        });
        it('2020-10-31 returns true', () => {
          expect(isValidDate('2020-10-31')).to.equal(true);
        });
        it('2020-11-31 returns false', () => {
          expect(isValidDate('2020-11-31')).to.equal(false);
        });
        it('2020-12-31 returns true', () => {
          expect(isValidDate('2020-12-31')).to.equal(true);
        });
      });
    });
    describe('E) Leap Years', () => {
      describe('i) Common Years', () => {
        it('2019-02-29 returns false', () => {
          expect(isValidDate('2019-02-29')).to.equal(false);
        });
        it('2041-02-29 returns false', () => {
          expect(isValidDate('2041-02-29')).to.equal(false);
        });
        it('1900-02-29 returns false', () => {
          expect(isValidDate('1900-02-29')).to.equal(false);
        });
        it('2100-02-29 returns false', () => {
          expect(isValidDate('2100-02-29')).to.equal(false);
        });
      });
      describe('ii) Leap Years', () => {
        it('2000-02-29 returns true', () => {
          expect(isValidDate('2000-02-29')).to.equal(true);
        });
        it('2020-02-29 returns true', () => {
          expect(isValidDate('2020-02-29')).to.equal(true);
        });
        it('2400-02-29 returns true', () => {
          expect(isValidDate('2400-02-29')).to.equal(true);
        });
      });
    });
  });
});
