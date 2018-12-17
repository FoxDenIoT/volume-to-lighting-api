var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var Client = require('node-rest-client').Client;

var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;

var KalmanFilter = require('kalmanjs').default;
var kalmanFilter = new KalmanFilter({R: 0.01, Q: 3});
var volume = 0;
var fv = 0;



app.get("/setVolume", function (req, res) {
  var client = new Client();
  volume = parseFloat(req.query.v);
  var fv = kalmanFilter.filter(volume);
  console.log((fv*100).toFixed(2));
  res.send("1");
  
  /*client.get(url, function (data, response) {
    res.send(data);
  });*/
});


app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);

