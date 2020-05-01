import { data, host, colors, addPlayer, addPlayerName } from "./Others";
import { writable } from "svelte/store";

// Add test data to the "data" object
let fakeData = {
  0: {
    id: "3yup5fa61rd00000",
    name: "Uschi",
    color: "yellow",
  },
  1: {
    id: "scjftirfuh000000",
    name: "Linus",
    color: "blue",
  },
  2: {
    id: "vs6z5luvg4h00000",
    name: "Linn",
    color: "yellow",
  },
};
data.set(fakeData);

// Mock $-variables
let $data = null;
const unsubscribeData = data.subscribe((obj) => ($data = obj));
let $host = null;
const unsubscribeHost = host.subscribe((str) => ($host = str));
let $colors = null;
const unsubscribeColors = colors.subscribe((arr) => ($colors = arr));
//-> here i mocked ("simulated") the behaviour in a svelte file.
//   it should be possible to call the store with the prefix $ and it should
//   return it's state

describe("data object", () => {
  it("should return Uschi when called data[0][name]", () => {
    expect($data[0]["name"]).toEqual("Uschi");
  });
  it("should return undefined when called data[6]", () => {
    expect($data[6]).toBeUndefined();
  });
});

describe("host", () => {
  it("should return null when called by default", () => {
    expect($host).toBeNull();
  });
  it("should return index 4 after set to 4", () => {
    host.set(4);
    expect($host).toEqual(4);
  });
});

describe("colors (example for derived store)", () => {
  it("should return an array", () => {
    expect(Array.isArray($colors)).toBe(true);
  });
  it("should return 'blue' when called colors[1]", () => {
    expect($colors[1]).toEqual("blue");
  });
  it("should return undefined when called colors[22]", () => {
    expect($colors[22]).toBeUndefined();
  });
});
