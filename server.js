const express = require("express");
const ExpressPeerServer = require("peer").ExpressPeerServer;

//////////////////
// Server Setup //
//////////////////
console.log("setting up server");

// tells node to use express for the server logic
const app = express();

// Static files
app.use(express.static("dist"));

//  process.env.PORT is used when the application is deployed to the server,
//  because the server probably uses a different port than set here.
//  During development on localhost, process.env.PORT doesn't exist,
//  therefore it uses "backup" port specified
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`listening for requests on port ${port}`);
});

// PeerJS
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
