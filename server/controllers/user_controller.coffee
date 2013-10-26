Controller    = require('./controller').Controller
User          = require('../models/user')

class UserController extends Controller
  before: ->
    'me' : @loginIfNotLoggedIn
    'showCollection' : @loginIfNotLoggedIn

  constructor: (@auth) ->
    super

  show: (req, res) ->
    res.render('user/show')

  # Register a user from form daat
  register: (req, res) ->
    # structure the data
    data =
      username: req.body.username
      password: req.body.password
      email: req.body.email

    # create user from given data
    User.createWithPassword data, (err, user) ->
      # something went wrong
      if err or !user
        res.json({message: 'Could not create a user, try again!'}, 500)
      else
        # User successfully created, log it in and redirect
        req.login user, (err) ->
          return res.json({message: 'Could not log you in, try again!'}, 500) if err
          res.redirect("/user/#{req.user.values.username}")

  # Log the user out and redirect
  logout: (req, res) ->
    req.logout()
    res.redirect('/')

exports.UserController = UserController