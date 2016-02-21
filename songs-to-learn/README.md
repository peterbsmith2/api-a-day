#songs-to-learn
API for Songs for which to Learn the Lyrics.
##New
- HTTP Basic Auth
- Produces XML
- swagger-tools
  - security
  - validate

##Configuration

###Database

1. In the `/config` directory add a sub-directory `/env`
2. Create a `.js` file for each environment, (i.e.: production, development, test) with the format
```javascript
module.exports = {
  db: 'MONGO_URI'
};
```
