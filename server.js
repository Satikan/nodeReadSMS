var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("get sms", msg => {
      console.log(msg);
      io.emit("get sms", msg);
  });

  socket.on("private message", (message) => {
    socket.emit("get sms", message);
  });

  socket.on("global message", (message) => {
    io.emit("get sms", message);
  });

  socket.on("broadcast message", (message) => {
    socket.broadcast.emit("get sms", message);
  });
});

http.listen(PORT, () => {
  console.log(`Server is running. ${PORT}`);
});