config = {}

# DEVELOPMENT
config.development =
  type: 'development'
  appPort: 3000
  redisPort: 6379
  adminName: 'jan'
  adminPassword: '123456'
  databaseHost: '127.0.0.1' # e.g. 127.0.0.1
  databasePort: '5984' # e.g. 5984
  databaseName: 'share-with-me' # e.g. myCoolDatabase
  salt: '9wvpwiun28bv83vsc<b7ciuesb9w' # random characters
  sessionSecret: 'cez8rbv38ov.dbvoedvzc8wvcsev' # random characters
  twitterKey: '7WFLhiZckY6ADBrcqDKpXw'
  twitterSecret: 'AEPifpLLlIkClZGAEg9hQXb0EejdHDLzbwGMU6IaI8g'
  facebookKey: ''
  facebookSecret: ''
  facebookRedirectURL: ''

# TEST
config.test = 
  type: 'test'
  appPort: 3000
  redisPort: 6379
  adminName: ''
  adminPassword: ''
  databaseHost: '127.0.0.1' # e.g. 127.0.0.1
  databasePort: '27017' # e.g. 5984
  databaseName: '' # e.g. myCoolDatabase
  salt: 'keyboardcat' # random characters
  sessionSecret: 'anotherkeyboardcat' # random characters
  twitterKey: ''
  twitterSecret: ''
  facebookKey: ''
  facebookSecret: ''
  facebookRedirectURL: ''

# PRODUCTION
config.production =
  type: 'production'
  appPort: 3000
  redisPort: 6379
  adminName: ''
  adminPassword: ''
  databaseHost: '127.0.0.1' # e.g. 127.0.0.1
  databasePort: '27017' # e.g. 5984
  databaseName: '' # e.g. myCoolDatabase
  salt: 'keyboardcat' # random characters
  sessionSecret: 'anotherkeyboardcat' # random characters
  twitterKey: ''
  twitterSecret: ''
  facebookKey: ''
  facebookSecret: ''
  facebookRedirectURL: ''

# get the node environment from the variable or default to development
node_env = process.env['NODE_ENV'] or 'development'

module.exports = config[node_env]