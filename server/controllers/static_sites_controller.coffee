{Controller} = require('./controller')
User         = require('../models/user')

class StaticSitesController extends Controller
  before: ->
    'login'     : @redirectToProfileIfLoggedIn
    'register'  : @redirectToProfileIfLoggedIn
    'index'     : @redirectToProfileIfLoggedIn

  login: (req, res) -> res.render 'statics/login'

  register: (req, res) -> res.render 'statics/register'

  index: (req, res) -> res.render 'statics/index'

exports.StaticSitesController = StaticSitesController