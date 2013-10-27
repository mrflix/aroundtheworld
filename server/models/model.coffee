Q           = require 'q'
connection  = require('../config/connection_config').config.createConnection()

class Model
  constructor: (@values = {}) ->

  @databaseName: -> 'atw_data'
  
  @db: -> connection.database @databaseName()

  @instanceOrError: (done, err, values) =>
    return done(err) if err
    return done(null, values)

  @get: (id, done) ->
    @db().get String(id), (err, values) => @instanceOrError done, err, values

  @create: (doc, done) ->
    # don't allow to set an id
    delete doc._id
    delete doc.id

    doc.created_at = Date.now()
    
    @db().save doc, (err, res) =>
      return done(err) if err
      
      doc._rev = res.rev
      doc._id = res.id

      @instanceOrError done, err, doc

  @edit: (docId, doc, done) ->
    @db().save docId, doc, (err, res) =>
      return done(err) if err

      doc._rev = res.rev

      @instanceOrError done, err, doc

  @remove: (id, done) ->
    db = @db()
    db.get id, (err, doc) ->
      return done(err) if err
      
      db.remove id, doc._rev, (error, response) ->
        return done(error) if error
        done null, response

  toJSON: -> @values

module.exports = Model