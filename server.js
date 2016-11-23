var express = require('express');
const path = require('path');
var app = express();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

app.set('port', (process.env.PORT || 8080));

app.get('/', function(req, res) {
  app.use(express.static('views'));
  res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/*', function(req, res) {
  var query = decodeURI(req.path.substring(1));
  if (!isNaN(query)) {
    var date = new Date(query*1000);
    var naturalStr = monthNames[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
    res.send(JSON.stringify({unix: query, natural: naturalStr}));
    return;
  }
  var date = new Date(query);
  if (date.toString() != "Invalid Date") {
    var naturalStr = monthNames[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
    var unixTime = date.getTime()/1000;
    res.send(JSON.stringify({unix: unixTime, natural: naturalStr}));
    return;
  }
  res.send(JSON.stringify({unix: null, natural: null}));
});

app.listen(app.get('port'), function() {
  console.log('Timestamp app is running on port ' + app.get('port'));
});
