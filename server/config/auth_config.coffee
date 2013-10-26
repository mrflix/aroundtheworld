# Setup the auth module
passport        = require('passport')
User            = require('../models/user')
LocalStrategy   = require('passport-local').Strategy
TwitterStrategy = require('passport-twitter').Strategy
config          = require('../config')

# looks for the user by its username and tries to authenticate it with the given password
authenticate = (username, pw, done) ->
  User.findByName username, (err, user) ->
    return done(null, null, err) if err or !user or !user.checkPassword(pw)
    done null, user

authenticateSocial = (userid, username, service, profile, done) ->
  # Find the user by the given id...
  User.findByServiceId userid, service, (err, user) ->
    # there was an error
    return done(err, null) if err
    # found the user
    if user
      done null, user
    else # no user, so let's create one
      # ...or create the user if it's not defined yet
      User.create
        username: username
        from_service: service
        service_userid: "#{service}-#{userid}"
      , done

# authenticate a Twitter user
authenticateTwitter = (token, tokenSecret, profile, done) ->
  authenticateSocial String(profile.id), profile.username, 'twitter', profile, done

# Set up password auth
passport.use new LocalStrategy
  usernameField: 'username'
  passwordField: 'password'
, authenticate

passport.use new TwitterStrategy
  consumerKey: config.twitterKey
  consumerSecret: config.twitterSecret
, authenticateTwitter

# (De-)Serialization of users

# only the user's id is important
serializeUser = (user, done) ->
  user = if user.values? then user.values else user
  id = if user.id? then user.id else user._id
  done null, id

# find the user by the id
deserializeUser = (id, done) ->
  User.get id, (err, user) ->
    return done(null, null, null) if err or !user
    done null, new User user

# make passport use the above defined methods
passport.serializeUser serializeUser
passport.deserializeUser deserializeUser

### This is how you would add more auth strategies (don't forget to ad the keys in config.coffee)

FacebookStrategy = require('passport-facebook').Strategy

# Authenticate a Facebook user
authenticateFacebook = (accesToken, refreshToken, profile, done) ->
  authenticateSocial String(profile.id), profile.username, 'facebook', done

passport.use new FacebookStrategy
  clientID: config.facebookKey
  clientSecret: config.facebookSecret
  callbackURL: config.facebookRedirectURL
, auth.authenticateFacebook
###

exports.auth = passport