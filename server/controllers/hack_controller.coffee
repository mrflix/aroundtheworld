{Controller} = require('./controller')
fs           = require('fs')

class HackController extends Controller
  before: ->
    'save': @ensureAuthenticated

  tripread: (req, res) ->
    dummyData = fs.readFileSync "#{__dirname}/../../public/data/gotland.json"
    dummyData = JSON.parse(dummyData)
    res.render "hacks/tripread", dummyData

  upload: (req, res) ->
    res.render 'hacks/upload'

  save: (req, res) ->
    res.render 'hacks/save'

exports.HackController = HackController