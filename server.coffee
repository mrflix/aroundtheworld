express   = require('express')
config    = require('./server/config')

# create the express app
app = express()

# configure the auth module
auth = require('./server/config/auth_config').auth

# configure the express app
require('./server/config/app_config')(app, auth)

# set up the routes
require('./server/routes')(app, auth)

# start the app
app.listen(config.appPort)

console.log('Server started on port:', config.appPort)