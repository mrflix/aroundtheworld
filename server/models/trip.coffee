Model   = require './model'
config  = require '../config'
_s      = require('underscore.string')

class Trip extends Model

  @findByUserIdAndSlug: (userId, slug, done) ->
    @db().view 'trips/byUserIdAndSlug', {startkey:[userId, slug], endkey: [userId, slug]}, (err, res) =>
      return done({ message: 'Could not find trip' }) if err or res.length is 0
      done null, new @(res?[0]?.value)

  @create: (doc, done) ->
    # here we could have conflicts of slugs, but it's a rather rare case
    # there shouldn't be too many users naming the trips the same
    # living on the edge here....yeeehhaaawww

    # create a slug for the current trip
    doc.slug = _s.slugify doc.trip.name

    # create the doc
    super(doc, done)

module.exports = Trip