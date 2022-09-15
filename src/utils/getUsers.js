//Store connected Users
let users = {}

//Funtion to get users online in a room
function getUsers(arr){
    let onlineUsers = []
    arr.forEach((onlineUser) => {
        onlineUsers.push(Object.values(onlineUser)[0])
    })
    return onlineUsers
}

module.exports = {getUsers, users};