const Bluebird = require('bluebird');
const seneca   = require('seneca')();

// Promisify the .act() method
const act = Bluebird.promisify(seneca.act, {context: seneca});

// Add a conversion command
seneca.add({cmd: 'dollars-to-euros'}, (args, done) => {
  const exchangeRate = 0.88;
  const euros = args.product.price * exchangeRate;

  // Return the product with euros set
  done(null, {
    name: args.product.name,
    price: args.product.price,
    euros: euros
  });
});

// Build an array of promisified commands
const convertPrices = (products) => {
  var cmds = [];
  products.forEach(function (product) {
    var command = act({cmd: 'dollars-to-euros', product: product});
    cmds.push(command);
  });

  return Bluebird.all(cmds)
    .then( (results) => {
      // results is now an array of each of the resolved promises
      // {name: 'Product A', price: 9.99, euros: 8.81}
      // {name: 'Product B', price: 23.99, euros: 21.15}
      // {name: 'Product C', price: 10.00, euros: 8.82}
      // {name: 'Product D', price: 100.99, euros: 89.05}
      // {name: 'Product E', price: 0.99, euros: 0.87}
      return results
    })
    .catch( (err) => {
      console.error(err);
    });
}

module.exports = {
  convertPrices: convertPrices
}
