Model         = require './model'
crypto        = require 'crypto'
_             = require 'underscore'
config        = require '../config'

class User extends Model
  @databaseName: -> 'atw_users'

  @findByName: (name, done) ->
    @db().view 'users/usersByName', {key: name}, (err, res) =>
      return done({ message: 'Could not find user' }) if err or res.length is 0
      done null, new @(res?[0]?.value)

  @findByServiceId: (serviceId, service, done) ->
    @db().view 'users/usersByServiceId', {key: "#{service}-#{serviceId}"}, (err, res) =>
      return done(null, null) if err or res.length == 0
      done null, new @(res[0].value)

  @createWithPassword: (data, done) ->
    user = new @(data)
    @findByName data.username, (err, _user) =>
      return done({message: 'Username already taken'}) if _user
      @create {
        username: data.username
        email: data.email
        pwhash: user.getSaltedHash data.password
      }, done

  toJSON: -> _.omit @values, ['pwhash', '_rev']

  getSaltedHash: (password) ->
    pwhash = crypto.createHash 'sha1'
    pwhash.update password + config.salt + password
    'hashed-' + pwhash.digest 'hex'

  checkPassword: (password) ->
    hash1 = @values.pwhash
    hash2 = @getSaltedHash(password)
    hash1 is hash2

module.exports = User