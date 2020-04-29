const express = require("express");
const ExpressPeerServer = require("peer").ExpressPeerServer;
//-> note that es6 imports are not possible in server-side code

// ANCHOR Server Setup
console.log("setting up server");
const app = express(); // tells node to use express for the server logic

// ANCHOR Static files
app.use(express.static("dist"));
const port = process.env.PORT || 4000;
//-> process.env.PORT only exists on the server, that's how both
//   dev and production ports can be specified
const server = app.listen(port, () => {
  console.log(`listening for requests on port ${port}`);
});

// ANCHOR PeerJS "Subserver"
const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  secure: false,
  port: port,
  generateClientId: customGenerationFunction,
});
app.use("/peerjs", peerServer);

peerServer.on("connection", function(id) {
  console.log(id.id);
});
