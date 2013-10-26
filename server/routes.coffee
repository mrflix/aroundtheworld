StaticSitesController = require('./controllers/static_sites_controller').StaticSitesController
HackController        = require('./controllers/hack_controller').HackController
UserController        = require('./controllers/user_controller').UserController

module.exports = (app, auth) ->
  statics = new StaticSitesController auth
  user    = new UserController auth
  hacks   = new HackController auth

  # render the index page
  app.get   '/', statics.index

  # static pages
  app.get   '/privacy', statics.privacy
  app.get   '/hack/tripread', hacks.tripread

  # users / login / register / OAuth providers
  app.get   '/register', statics.register
  app.post  '/register', user.register

  app.get   '/login', statics.login
  app.post  '/login', user.auth.authenticate 'local',
    successRedirect: '/me'
    failureRedirect: '/login'

  app.get   '/logout', user.logout

  app.get   '/me', user.redirectToProfileIfLoggedIn
  app.get   '/user/:username', user.show