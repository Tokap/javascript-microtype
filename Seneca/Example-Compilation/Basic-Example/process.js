module.exports = function( options ) {
  var seneca = this;

  seneca.add( { role:'process', cmd:'sum' }, sum );

  function sum ( args, done ) {
    var numbers = args.numbers;

    var result = numbers.reduce( function( a, b ) {
      return a + b;
    }, 0);

    done( null, { result: result } );
  }
}

// EXAMPLE OF ADDING:
// seneca.add({role:'inventory', cmd:'find_item'}, function(args, done) {
//   var itemId = args.id;
//
//   // find item using any means necessary
//   var item = byAnyMeansNecessary(itemId);
//
//   done(null, item);
// });
