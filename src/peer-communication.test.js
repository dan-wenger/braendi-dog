import { setupPeer, loadPeerjs } from "./peer-communication";

describe("loadPeerjs function", () => {
  it.skip("should load the peerjs library from CDN", () => {});
});

describe("setupPeer function", () => {
  it.todo("should call the loadPeerjs function");
  it.todo("should connect to the signal server in /peerjs");
  it.todo("should recieve an id from the signal server");
  it.todo("should assign the id to the Me store");
});
