const { expect } = require('chai');

const { openConnection } = require('../db/dbOperations');

describe('Database Suite', () => {
  context('connect', () => {
    it('should return 0', () => {
      // Should be able to connect
      const connectResult = openConnection;
      expect(connectResult).to.equal(undefined);
    });
  });
});
