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

// webSocket回调函数
function ioSocket(socket) {
  // 函数执行开始
  console.log('有一个用户进来了');
  // 监听退出事件
  socket.on('disconnect', () => {
    console.log('有一个用户离开了');
  });

  // 服务端给客户端发消息
  // socket.emit('a', 'hello lichen');

  // setInterval(() => {
  //   socket.emit('time', Date.now())
  // }, 10000);

  // socket.on('hello', data => {
  //   console.log(data)
  //   socket.emit('hello', '你才是猪撸撸🐽+2');
  // })

  socket.on('chat-message', msg => {
    console.log('收到客户端消息：', msg)
    
    // 把消息发送给当前在线的所有客户端
    // socket.emit('') 只能发送给当前客户端
    io.emit('chat message', msg);
  })
}

// 当客户端和服务端建立 WebSocket 连接成功会触发 connection 事件，执行回调函数
io.on('connection', ioSocket);


http.listen(3000, () => {
  console.log('listening on *:3000');
});