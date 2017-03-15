var seneca = require('seneca')();

seneca.use( './process.js' );

seneca.act(
  {
    role: 'process'
  , cmd: 'sum'
  , numbers: [ 1, 2, 3]
  },
  function ( err, result ) {
    console.log( result );
  }
)

// CALLING AN ACTION:
seneca.act(
  {
    role:'inventory'
  , cmd:'find_item'
  , id:'a3e42'
  },
  function(err, item) {
    if (err) return err;
    console.log(item);
    // Perform other actions with item
  }
);
