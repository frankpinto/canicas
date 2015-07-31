# Canicas
*ca-ni-cuz*

Sometimes promises are too much. Example:

    var knex = require('knex')({client: 'pg', connection: process.env.PG_CONNECTION_STRING});

    for (var i = 0; i < 5; i++)
    {
      knex('products').insert({title: i + ' bananas', description: 'Full of potassium!'}).then(function() {
        // Don't care
      });
    }
    // Need to teardown knex pg connection somehow after all inserts are done / callbacks are called

In that case add the function you want to be run when all of your callbacks have fired:


    var canicas = require('canicas');
    canicas.done = function() {
      knex.destroy(function() {});
    };

Add one every time you spin out a new async function:


    // snip
    for (var i = 0; i < 5; i++)
    {
      canicas.inc();
      knex('products').insert({title: i + ' bananas', description: 'Full of potassium!'}).then(function() {
    //snip

And make sure to register when a callback has finished:

    // snip
    knex('products').insert({title: i + ' bananas', description: 'Full of potassium!'}).then(function() {
      // Some important code

      canicas.dec();
    };

When all callbacks have been fired the function you registered with `canicas.done` will be called.

NOTE: done WILL be called as soon as the canicas internal counter reaches 0. If you have 5 callbacks, you spin one out, and it completes before you've incremented the counter done will be called and it could mess up your other 4 callbacks. I'll fix that in the next version.
