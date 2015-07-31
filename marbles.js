/** @module lib/marbles
 * Simple module to count promises, or any metric that returns to 0 eventually,
 * and do something when all promises have completed
 */

function Marbles() {
  var promises = 0;
  var gameOver = function() {
    if (this.done)
      this.done();
  };
}

Marbles.prototype.add = function(n) { promises += n; };
Marbles.prototype.inc = function() { this.add(1); };
Marbles.prototype.subtract = function(n) {
  if (promises >= n)
    promises -= n;

  if (promises === 0)
    gameOver();
};
Marbles.prototype.dec = function() { this.subtract(1); };

module.exports = Object.create(Marbles);
