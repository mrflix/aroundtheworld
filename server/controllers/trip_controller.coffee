{Controller} = require('./controller')
User         = require('../models/user')
Trip         = require('../models/trip')

class TripController extends Controller
  before: ->
    'create': @ensureAuthenticated
    'edit': @ensureAuthenticated

  show: (req, res) =>
    username = req.params.username
    tripSlug = req.params.trip_slug

    User.findByName username, (err, user) =>
      return @['404'](req, res) unless user

      Trip.findByUserIdAndSlug user.values._id, tripSlug, (err, trip) =>
        return @['404'](req, res) unless trip
        res.render 'trips/show', {trip: trip.values, tripOwner: user.values}

  edit: (req, res) =>
    trip = req.body

    return @['400']('Missing trip information in request body', req, res) unless trip

    Trip.get trip._id, (err, theRealTrip) =>
      return @['404'](req, res) unless theRealTrip
      return @['401'](req, res) if theRealTrip.values.user_id isnt req.user.values._id

      Trip.edit trip._id, trip, (err, trip) =>
        return @['500']('Missing trip information in request body', req, res) if err
        return @['404'](req, res) unless trip

        res.json trip

  create: (req, res) =>
    tripData = req.body
    userId = req.user.values._id

    console.log tripData

    return @['400']('Missing trip information in request body', req, res) unless tripData
    return @['400']('Missing user information in request body', req, res) unless userId

    tripData.user_id = userId
    tripData.type = 'trip';

    Trip.create tripData, (err, trip) =>
      return @['500'](req, res) if err

      res.json trip


exports.TripController = TripController