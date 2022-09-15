"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _socket = _interopRequireDefault(require("socket.io"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"]["static"]('src/public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');
var port = process.env.PORT || 3000;
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); //Render Index pageconst jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
  res.render('index');
}); //Get username and roomname from form and pass it to room

app.post('/room', function (req, res) {
  var roomname = req.body.roomname;
  var username = req.body.username;
  res.redirect("/room?username=".concat(username, "&roomname=").concat(roomname));
}); //Rooms

app.get('/room', function (req, res) {
  res.render('room');
}); //Start Server

var server = app.listen(port, function () {
  console.log("Server Running on port ".concat(port));
});
var io = (0, _socket["default"])(server, {
  cors: {
    origin: '*'
  }
});

require("./utils/socket")(io);