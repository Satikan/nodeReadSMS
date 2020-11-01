var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Allow client to access cross domain or ip-address
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
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