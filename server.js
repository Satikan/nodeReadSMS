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
});

http.listen(PORT, () => {
  console.log(`Server is running. ${PORT}`);
});