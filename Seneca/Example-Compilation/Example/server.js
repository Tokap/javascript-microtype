var seneca = require('seneca')();

seneca.use('./inventory.js');

seneca.act(
  {
    role:'inventory'
  , cmd:'create_item'
  , name:'apple'
  },
  function(err, item) {
    console.log(item);
  }
)
