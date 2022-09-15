"use strict";

var _getUsers = require("./getUsers");

//Socket connection
function socket(io) {
  io.on('connection', function (socket) {
    socket.on('joined-user', function (data) {
      //Storing users connected in a room in memory
      var user = {};
      user[socket.id] = data.username;

      if (_getUsers.users[data.roomname]) {
        _getUsers.users[data.roomname].push(user);
      } else {
        _getUsers.users[data.roomname] = [user];
      } //Joining the Socket Room


      socket.join(data.roomname); //Emitting New Username to Clients

      io.to(data.roomname).emit('joined-user', {
        username: data.username
      }); //Send online users array

      io.to(data.roomname).emit('online-users', (0, _getUsers.getUsers)(_getUsers.users[data.roomname]));
    }); //Emitting messages to Clients

    socket.on('chat', function (data) {
      io.to(data.roomname).emit('chat', {
        username: data.username,
        message: data.message
      });
    }); //Broadcasting the user who is typing

    socket.on('typing', function (data) {
      socket.broadcast.to(data.roomname).emit('typing', data.username);
    }); //Remove user from memory when they disconnect

    socket.on('disconnecting', function () {
      var rooms = Object.keys(socket.rooms);
      var socketId = rooms[0];
      var roomname = rooms[1];

      _getUsers.users[roomname].forEach(function (user, index) {
        if (user[socketId]) {
          _getUsers.users[roomname].splice(index, 1);
        }
      }); //Send online users array


      io.to(roomname).emit('online-users', (0, _getUsers.getUsers)(_getUsers.users[roomname]));
    });
  });
}

module.exports = socket;