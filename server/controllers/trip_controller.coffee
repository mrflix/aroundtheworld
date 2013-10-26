{Controller} = require('./controller')
User         = require('../models/user')
Trip         = require('../models/trip')

class TripController extends Controller
  before: ->
    'create': @ensureAuthenticated

  show: (req, res) =>
    username = req.params.username
    tripSlug = req.params.trip_slug

    User.findByName username, (err, user) =>
      return @['404'](req, res) unless user

      Trip.findByUserIdAndSlug user.values._id, tripSlug, (err, trip) =>
        return @['404'](req, res) unless trip
        res.json trip.values

  create: (req, res) =>
    trip = req.body.trip
    userId = req.user.values._id

    trip = { name: 'test trip 2011' }

    return @['400']('Missing trip information in request body', req, res) unless trip
    return @['400']('Missing user information in request body', req, res) unless userId

    data = 
      user_id: userId
      type: 'trip'
      trip: trip

    Trip.create data, (err, trip) =>
      return @['500'](req, res) if err

      res.json trip


exports.TripController = TripController