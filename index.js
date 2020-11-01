var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("get sms", msg => {
      console.log(msg);
      io.emit("get sms", msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});