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

  
  describe('3) Function: isNumber()', () => {
    context('A) Valid Values', () => {
      it('0 (zero) returns true', () => {
        expect(isNumber(0)).to.equal(true);
      });
      it('10 (postive number) returns true', () => {
        expect(isNumber(10)).to.equal(true);
      });
      it('10.01 (positive decimal) returns true', () => {
        expect(isNumber(10.01)).to.equal(true);
      });
      it('-10 (negative number) returns true', () => {
        expect(isNumber(-10)).to.equal(true);
      });
      it('-10.01 (negative decimal) returns true', () => {
        expect(isNumber(-10.01)).to.equal(true);
      });
    });
    context('B) Empty Values', () => {
      it('nothing passed in returns false', () => {
        expect(isNumber()).to.equal(false);
      });    
      it('null returns false', () => {
        expect(isNumber(null)).to.equal(false);
      });
      it('undefined returns false', () => {
        expect(isNumber(undefined)).to.equal(false);
      });
    });
    context('C) Invalid Values', () => {
      it('boolean returns false', () => {
        expect(isNumber(true)).to.equal(false);
      });
      it('NaN (not a number) returns false', () => {
        expect(isNumber(NaN)).to.equal(false);
      });
      it(`"${str}" (string) returns false`, () => {
        expect(isNumber(str)).to.equal(false);
      });
      it('An object is returns false', () => {
        expect(isNumber(obj)).to.equal(false);
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
