{Controller} = require('./controller')
fs           = require('fs')

class HackController extends Controller

  tripread: (req, res) ->
    dummyData = fs.readFileSync "#{__dirname}/../../hack/data.json"
    dummyData = JSON.parse(dummyData)
    res.render "#{__dirname}/../../hack/index", {trip: dummyData.trip}

exports.HackController = HackController