{Controller} = require('./controller')
fs           = require('fs')

class HackController extends Controller

  tripread: (req, res) ->
    dummyData = fs.readFileSync "#{__dirname}/../../public/data/gotland.json"
    dummyData = JSON.parse(dummyData)
    res.render "hacks/tripread", dummyData

exports.HackController = HackController