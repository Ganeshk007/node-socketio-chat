import express from 'express';
import bodyParser from 'body-parser';
import socket from 'socket.io';

const app = express();
app.use(express.static('src/public'));
app.set('view engine', 'ejs');
app.set('views','./src/views');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));

//Render Index pageconst jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.get('/', (req, res) => {
    res.render('index')
})

//Get username and roomname from form and pass it to room
app.post('/room', (req, res) => {
    let roomname = req.body.roomname;
    let username = req.body.username;
    res.redirect(`/room?username=${username}&roomname=${roomname}`)
})

//Rooms
app.get('/room', (req, res) => {
    res.render('room')
})

//Start Server
const server = app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
})

const io = socket(server, {
    cors: {
      origin: '*'
    },
  });

require('./utils/socket')(io);