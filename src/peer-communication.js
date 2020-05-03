import Peer from "peerjs";
import * as Others from "./components/Others";

// takes a single object as a parameter (whith defaults set here),
// which contains the options for the Peer class
export function setupPeer({
  path = "/peerjs",
  host = location.hostname,
  port = Number(location.port || (location.protocol === "https:" ? 443 : 80)),
  debug = 3,
} = {}) {
  console.log("setupPeer: started...");
  //...this object is then passed on as a whole via arguments[0]
  const peer = new Peer(arguments[0]);

  return new Promise((resolve, reject) => {
    peer.on("open", (newId) => {
      console.log("setupPeer: success");
      resolve(newId);
    });

    peer.on("error", (err) => {
      throw new Error(`setupPeer ${err}`);
    });
  });
}

/*
peer.on("connection", (connection) => {
  console.log("connection received by another peer");
});

export function connectToPeer(id) {
  const connection = peer.connect(id);
}

export function broadcastPeers(data) {}
*/
