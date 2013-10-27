config = {}

# DEVELOPMENT
config.development =
  type: 'development'
  appPort: 3000
  redisPort: 6379
  adminName: '' # couchdb admin name might be empty
  adminPassword: ''
  databaseHost: '' # e.g. 127.0.0.1
  databasePort: '' # e.g. 5984
  databaseName: '' # e.g. myCoolDatabase
  salt: 'keyboardcat' # random characters
  sessionSecret: 'anotherkeyboardcat' # random characters

# PRODUCTION
config.production =
  type: 'production'
  appPort: 3000
  redisPort: 6379
  adminName: '' # couchdb admin name might be empty
  adminPassword: ''
  databaseHost: '' # e.g. 127.0.0.1
  databasePort: '' # e.g. 5984
  databaseName: '' # e.g. myCoolDatabase
  salt: 'keyboardcat' # random characters
  sessionSecret: 'anotherkeyboardcat' # random characters

# get the node environment from the variable or default to development
node_env = process.env['NODE_ENV'] or 'development'
exports = config[node_env]