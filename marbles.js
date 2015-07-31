/** @module lib/marbles
 * Simple module to count promises, or any metric that returns to 0 eventually,
 * and do something when all promises have completed
 */

function Marbles() {
  this.promises = 0;
}

Marbles.prototype.add = function(n) { this.promises += n; };
Marbles.prototype.inc = function() { this.add(1); };
Marbles.prototype.subtract = function(n) {
  if (this.promises >= n)
    this.promises -= n;

  if (this.promises === 0)
    this.gameOver();
};
Marbles.prototype.dec = function() { this.subtract(1); };
Marbles.prototype.gameOver = function() {
  if (this.done)
  {
    this.done();
  }
};

module.exports = new Marbles();
