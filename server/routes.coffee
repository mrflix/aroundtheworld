StaticSitesController = require('./controllers/static_sites_controller').StaticSitesController
HackController        = require('./controllers/hack_controller').HackController
UserController        = require('./controllers/user_controller').UserController
TripController        = require('./controllers/trip_controller').TripController
UploadController      = require('./controllers/upload_controller').UploadController

module.exports = (app, auth) ->
  statics = new StaticSitesController auth
  user    = new UserController auth
  hacks   = new HackController auth
  trip    = new TripController auth
  upload  = new UploadController auth

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

  # trips
  app.get   '/user/:user_id/trip', trip.create

  app.get   '/me', user.redirectToProfileIfLoggedIn

  # upload
  app.get   '/upload', hacks.upload
  app.post  '/upload', upload.upload

  app.get   '/:username', user.show
  app.get   '/:username/:trip_slug', trip.show