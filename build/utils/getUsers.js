"use strict";

//Store connected Users
var users = {}; //Funtion to get users online in a room

function getUsers(arr) {
  var onlineUsers = [];
  arr.forEach(function (onlineUser) {
    onlineUsers.push(Object.values(onlineUser)[0]);
  });
  return onlineUsers;
}

module.exports = {
  getUsers: getUsers,
  users: users
};