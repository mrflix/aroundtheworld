# Setup

- install node.js from <http://nodejs.org/>
- install CouchDB from <http://couchdb.apache.org/>
- install redis <http://redis.io>
- install CoffeeScript `npm install -g coffee-script`
- `git clone` this repo and `cd` into it
- run `(sudo) npm install`
- __copy `server/config.sample.coffee` to `server/config.coffee` and fill in your credentials__

# Database Setup

- create two databases `atw_users` and `atw_data`
- in `atw_users`, create a new document:
    {
      "_id": "_design/users",
      "language": "javascript",
      "views": {
          "usersByName": {
              "map": "function(doc) {\n  emit(doc.username, doc);\n}"
          },
          "usersByServiceId": {
              "map": "function(doc) {\n  if(doc.service_userid)\n    emit(doc.service_userid, doc);\n}"
          }
      }
    }
- in `atw_data`, create a new document:
    {
      "_id": "_design/trips",
      "_rev": "4-655028ad941d185682cec99364f22c71",
      "language": "javascript",
      "views": {
          "byUserIdAndSlug": {
              "map": "function(doc) {\n  if(doc.type == 'trip' && doc.user_id)\n    emit([doc.user_id, doc.slug], doc);\n}"
          }
      }
    }
- there might be an alert, that a document wasn't found...ignore it ;)

# Development

- make sure that CouchDB and redis are running
- run `coffee server.coffee`