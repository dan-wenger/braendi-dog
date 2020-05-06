import { others, colors, addPlayer, addPlayerName } from "./Players";
import { writable } from "svelte/store";

import { mockStore } from "../helpers/mock-store-helper";

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

// Mock $-variables, call as functions!
let $others = mockStore(others);
let $colors = mockStore(colors);

describe("others object", () => {
  it("should return Uschi when called others[0][name]", () => {
    expect($others()[0]["name"]).toEqual("Uschi");
  });
  it("should return undefined when called others[6]", () => {
    expect($others()[6]).toBeUndefined();
  });
});

describe("colors (example for derived store)", () => {
  it("should return an array", () => {
    expect(Array.isArray($colors())).toBeTruthy();
  });
  it("should return 'blue' when called colors[1]", () => {
    expect($colors()[1]).toEqual("blue");
  });
  it("should return undefined when called colors[22]", () => {
    expect($colors()[22]).toBeUndefined();
  });
});
