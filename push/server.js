const http = require("http");
const WebSocketServer = require("websocket").server;

const connections = [];
const httpServer = http.createServer();

const websocket = new WebSocketServer({ httpServer: httpServer });
httpServer.listen(8000, console.log("===== Server Listening In Port: 3000 ====="));


const sendMessage = (requestPort, message) => {
  connections.forEach(connection => {
    connection.sendUTF(`User${connection.socket.remotePort}: ${message.utf8Data}`);
  })
}

const sendConnectionMessage = (requestPort) => {
  connections.forEach(connection => {
    if (connection.socket.remotePort !== requestPort){
      connection.send(`User${connection.socket.remotePort} Just Joined!`)
    } else{
      connection.send(`Established Connection!`)

    }
  })
}
websocket.on("request", (req) => {
  const connection = req.accept(null, req.origin);
  connection.on("message", (message) => sendMessage(req.socket.remotePort, message));

  connections.push(connection);
  sendConnectionMessage(req.socket.remotePort);
});
