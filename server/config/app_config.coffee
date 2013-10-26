# Configure the app
express     = require('express')
RedisStore  = require('connect-redis')(express)
stylus      = require('stylus')
nib         = require('nib')
config      = require '../config'

module.exports = (app, auth) ->
  app.configure ->
    app.set 'view engine', 'jade'
    app.set 'views', "#{__dirname}/../views"

    # static files
    app.use express.static "#{__dirname}/../../public"
    
    # various express helpers
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use express.cookieParser()
    
    # set up the session store
    app.use express.session
      secret: config.sessionSecret
      store: new RedisStore {port: config.redisPort}
      cookie:
        maxAge: 604800000

    # initialize the auth module
    app.use auth.initialize()
    app.use auth.session()

    # csrf protection
    app.use express.csrf()

    # set up locals for templates
    app.use (req, res, next) ->
      res.locals.csrf_token = -> if req.session then req.csrfToken() else undefined
      res.locals.user = req.user?.values
      next()

    # initialize the router
    app.use app.router

    # 404
    app.use (req, res) -> if req.xhr then res.json({ error: 'page not found' }, 404) else res.render 'errors/404', 404
