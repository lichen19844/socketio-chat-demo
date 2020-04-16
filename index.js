var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/demo.html');
  res.sendFile(__dirname + '/index.html');
});

// 当客户端和服务端建立 WebSocket 连接成功会触发 connection 事件
io.on('connection', (socket) => {
  console.log('有一个用户进来了');

  socket.emit('a', 'hello lichen');

  setInterval(() => {
    socket.emit('time', Date.now())
  }, 10000);

  socket.on('hello', data => {
    console.log(data)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});