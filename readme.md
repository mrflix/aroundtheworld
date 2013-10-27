# Screenshot

Basic Layout - Blog left, map right.
![Screenshot of a trip](http://f.cl.ly/items/3Z331u1W2j0l363P0C38/Screen%20Shot%202013-10-27%20at%2010.22.30.png)

Add a destination
![Screenshot of the destination-editor](http://f.cl.ly/items/3D0G3i0j1D250L3G2d3Y/Screen%20Shot%202013-10-27%20at%2010.26.25.png)

Add a journey
![Screenshot of the journey-editor](http://f.cl.ly/items/3o1s2C3W3T2V1n2l3z3L/Screen%20Shot%202013-10-27%20at%2010.28.33.png)

Animation of the map while scrolling
![Screenshot of a trip](http://f.cl.ly/items/1c2E3z2O3Z0y0X3W2q0I/map%20animation.gif)

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
