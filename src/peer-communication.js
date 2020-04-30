import Scriptloader from "./helpers/script-loader";
import * as Me from "./components/Me.js";

export async function setupPeer() {
  const loader = new Scriptloader({
    src: "cdn.jsdelivr.net/npm/peerjs@0.3.20/dist/peer.min.js",
    global: "Segment",
  });
  console.log("retreiving peerjs from CDN...");
  const peerjs = await loader.load();
  console.log("CDN loaded");

  console.log("setting up peer...");
  const peer = new Peer({
    host: location.hostname,
    port: location.port || (location.protocol === "https:" ? 443 : 80),
    path: "/peerjs",
    debug: 3,
  });

  peer.on("open", (newId) => {
    console.log(`received individual id: ${newId}`);
    Me.id.set(newId);
  });

  peer.on("error", (err) => {
    throw new Error(err);
  });
}
