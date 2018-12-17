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
  var h = 10;
  var s = 10;
  var l = fv;
  var r = 10;
  var g = 10;
  var b = 10;
  var url = "https://foxden.xyz/updateColor?id=5c_cf_7f_3c_8e_1a&r=" + r + "&g=" + g + "&b=" + b;
  
  client.get(url, function (data, response) {
    console.log(data);
  });
});


app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);

