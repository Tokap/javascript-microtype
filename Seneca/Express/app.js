const SenecaWeb = require('seneca-web')
const Express   = require('express')
const Router    = Express.Router
const context   = new Router()

const SenecaWebAdapterExpress = require('seneca-web-adapter-express') // plugin?
const BodyParser              = require('body-parser')
const Seneca                  = require('seneca')

const seneca_web_config = {
      context: context,
      adapter: SenecaWebAdapterExpress,
      options: { parseBody: false } // so we can use body-parser
}

let app = Express()
      .use( BodyParser.json() )
      .use( context )
      .listen(3000)

let seneca = Seneca()
      .use(SenecaWeb, seneca_web_config )
      .use('./api.js')
      .client( { type:'tcp', pin:'role:math' } )

// You create a seneca instance, load the api plugin, and then use seneca.client
// to send any role:math actions out to an external service. Your Express app
// is the microservice client.
