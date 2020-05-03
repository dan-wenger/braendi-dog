import { others, colors, addPlayer, addPlayerName } from "./Players";
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
others.set(fakeData);

// Mock $-variables
let $others = null;
const unsubscribeData = others.subscribe((obj) => ($others = obj));
let $colors = null;
const unsubscribeColors = colors.subscribe((arr) => ($colors = arr));
//-> here i mocked ("simulated") the behaviour in a svelte file.
//   it should be possible to call the store with the prefix $ and it should
//   return it's state

describe("others object", () => {
  it("should return Uschi when called others[0][name]", () => {
    expect($others[0]["name"]).toEqual("Uschi");
  });
  it("should return undefined when called others[6]", () => {
    expect($others[6]).toBeUndefined();
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
