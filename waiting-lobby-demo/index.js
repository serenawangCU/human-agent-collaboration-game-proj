// Create an application and require basic modules
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.port || 3000;

// Listen to the ports
server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// The idle user
// There would only be at most 1 idle user
let idleUser = null;

io.on('connection', (socket) => {

  console.log('Client added');

  // Listen on the 'add user' event
  socket.on('add user', (userName) => {
    socket.userName = userName;

    console.log('Client\'s name: ' + userName);

    // Use the same event for pairing no matter it's successful or not
    if (idleUser == null) {
      // If there's no available user
      // Set the current user as the idle user
      idleUser = socket;
      socket.emit('paired', {
        result: false,
        userName: null
      });
    } else {
      // Pairing succeed
      // Send the event to both of the clients
      idleUser.emit('paired', {
        result: true,
        userName: socket.userName
      });
      socket.emit('paired', {
        result: true,
        userName: idleUser.userName
      });
      // Reset the idle user
      idleUser = null;
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnect');

    // If the idle user leaves the lobby
    // Reset the global idle user id
    if (idleUser == socket) {
      idleUser = null;
    }
  });
});