/** @module lib/marbles
 * Simple module to count callbacks, or anything that rises and falls back to 0,
 * and do something when all callbacks have fired / completed.
 */

function Marbles() {
  this.counter = 0;
}

Marbles.prototype.add = function(n) { this.counter += n; };
Marbles.prototype.inc = function() { this.add(1); };
Marbles.prototype.subtract = function(n) {
  if (this.counter >= n)
    this.counter -= n;

  if (this.counter === 0)
    this.gameOver();
};
Marbles.prototype.dec = function() { this.subtract(1); };
Marbles.prototype.gameOver = function() {
  if (this.done)
  {
    this.done();
  }
};

// Just in case you need more marbles!
Marbles.prototype.clone = function() {
  var clone = new Marbles();
  clone.counter = this.counter;
  return clone;
};
Marbles.prototype.reset = function() {
  this.counter = 0;
  return this;
};

module.exports = new Marbles();
