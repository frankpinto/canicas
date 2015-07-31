process.env.NODE_ENV = process.env.NODE_ENV || 'testing';
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var should = chai.should();

var marbles = require('../marbles');

describe('Marbles', function() {
  before(function() {
    marbles.done = function() {
    };
  });

  afterEach(function() {
    marbles.reset();
  });

  it('calls done when internal counter hits 0', function() {
    marbles.done = chai.spy(marbles.done);

    marbles.inc();
    marbles.dec();
    marbles.done.should.have.been.called();
  });

  describe('#inc()', function() {
    it('sets internal counter to 1', function() {
      marbles.inc();
      marbles.counter.should.equal(1);
    });
  });

  describe('#dec()', function() {
    before(function() {
      marbles.inc();
    });

    it('sets internal counter to 0 when 1', function() {
      marbles.dec();
      marbles.counter.should.equal(0);
    });
  });
});
