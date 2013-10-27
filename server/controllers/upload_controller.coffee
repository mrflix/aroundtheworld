{Controller} = require('./controller')
path         = require('path')
fs           = require('fs')

class UploadController extends Controller
  before: ->
    'upload': @ensureAuthenticated

  upload: (req, res) ->
    userId = req.user.values._id
    uploadFolder = "/uploaded/#{userId}"
    basePath = "#{__dirname}/../../public#{uploadFolder}"

    # create the user's upload folder
    fs.mkdir basePath, (err) ->
      file = req.files.file
      newName = Date.now() + file.name.replace('..', '')
      toPath = "#{basePath}/#{newName}"

      # move the just uploaded file to the upload folder
      fs.rename file.path, toPath, (err) ->
        res.json imagePath: "#{uploadFolder}/#{newName}"

exports.UploadController = UploadController