import Peer from "peerjs";
import * as Players from "./components/Players";
import * as Me from "./components/Me";
import { get } from "svelte/store";

let connections = {};

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
  Me.peer = peer;

  return new Promise((resolve, reject) => {
    peer.on("open", (newId) => {
      console.log("setupPeer: success");
      resolve(newId);
    });

    peer.on("connection", (connection) => {
      console.log("connection received by another peer");
      const newIndex = Object.keys(connections).length + 1;
      connections[newIndex] = connection;

      connection.send("test");

      connection.on("data", function(obj) {
        console.log(`Host: got data ${JSON.stringify(obj)}`);
        const data = obj["data"];
        if (obj["type"] == "introduction") {
          const id = Object.keys(data)[0];
          const rest = data[id];
          Players.setupNewPlayer(id, rest);
        }
      });
    });

    peer.on("error", (err) => {
      reject(err);
    });
  });
}

export function connectToPeer(id) {
  const connection = Me.peer.connect(id);
  console.log(`You entered with host id "${id}"`);
  console.log(connection);

  Players.setupNewPlayer(id);
  connections[id] = connection;

  connection.on("open", () => {
    const myData = get(Me.meAsObj);
    console.log(
      `connection open. sending introduction ${JSON.stringify(myData)}`
    );
    connection.send({ type: "introduction", data: myData });

    connection.on("data", function(obj) {
      console.log(`Receiver: got data ${obj}`);
      if (obj["type"] == "introduction") {
        //TODO continue here
      }
    });
  });
}

export function tellOthers(data) {
  const testTarget = connections[1];
  console.log("tellOthers -> testTarget", testTarget);
  testTarget.send(data);
  console.log(`about to tell "${data}" to ${testTarget}`);
}
