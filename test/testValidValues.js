/* eslint-disable no-undef */
const { expect } = require('chai');

// Functions to be tested
const { isNull, isBoolean, isNumber, isString, isUndefined } = require('../src/validation');

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
});