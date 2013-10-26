class Controller
  before: -> {}

  constructor: ->
    # set up the before filters
    for method, filter of @before()
      original = @[method]
      @_createFilterFor method, original, filter

  _createFilterFor: (method, original, filter) ->
    @[method] = (req, res, next) ->
      # the filter's next function will be the original function
      _next = ->
        original req, res, next
      filter req, res, _next

  # fails if user is not logged in
  ensureAuthenticated: (req, res, next) =>
    if req.isAuthenticated()
      next()
    else
      @['401'](req, res)

  # redirects to login if user is not logged in
  loginIfNotLoggedIn: (req, res, next) ->
    if req.isAuthenticated()
      next()
    else
      res.redirect('/login')

  redirectToProfileIfLoggedIn: (req, res, next) =>
    if req.isAuthenticated()
      res.redirect "/user/#{req.user.values.username}"
    else
      next()

  401: (req, res) ->
    if req.xhr
      res.json {error: 'Not authorized'}, 401
    else
      res.status(401).render 'errors/401', 401

  404: (req, res) ->
    if req.xhr
      res.json {error: 'Not found'}, 404
    else
      res.status(404).render 'errors/401', 404

  500: (req, res) ->
    if req.xhr
      res.json {error: 'Internal serer error'}, 500
    else
      res.status(500).render 'errors/500', 500

exports.Controller = Controller