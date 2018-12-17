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
var converter = require('hsl-to-rgb-for-reals');




app.get("/setVolume", function (req, res) {
  volume = parseFloat(req.query.v);
  fv = kalmanFilter.filter(volume);
 // console.log((fv*100).toFixed(2));
  res.send("1");
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

setInterval(sendIOTMessage, 100);
function sendIOTMessage()
{
  var h = 310 //+ getRandomInt(30);
  var s =  Math.min(1,(2 - fv));
  var l =  Math.max(0,(fv - .2));
  
    var rgb = converter(h,s,l);

    var r = rgb[0];
    var g = rgb[1];
    var b = rgb[2];
    var client = new Client();
    var url = "https://foxden.xyz/updateColor?id=5c_cf_7f_3c_8e_1a&r=" + r + "&g=" + g + "&b=" + b;
    
    client.get(url, function (data, response) {
     // console.log(data);
    });

  var h = 30 //+ getRandomInt(30);
//  var s = .95;
 // var l =  Math.max(0,(fv - .2));
  var rgb = converter(h,s,l);

  var r = rgb[0];
  var g = rgb[1];
  var b = rgb[2];

  var client1 = new Client();
  var url = "https://foxden.xyz/updateColor?id=5c_cf_7f_ff_f0_b3&r=" + r + "&g=" + g + "&b=" + b;
  client1.get(url, function (data, response) {
   // console.log(data);
  });
} 
 


app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);

