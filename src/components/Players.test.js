import { others, colors, setupNewPlayer } from "./Players";
import { writable, get } from "svelte/store";

import { mockStore } from "../helpers/mock-store-helper";

// Add test data to the "data" object
let fakeData = {
  "3yup5fa61rd00000": {
    username: "Uschi",
    color: "yellow",
  },
  scjftirfuh000000: {
    username: "Linus",
    color: "blue",
  },
  vs6z5luvg4h00000: {
    username: "Linn",
    color: "yellow",
  },
};
others.set(fakeData);

// Mock $-variables, call as functions!b
let $others = mockStore(others);
let $colors = mockStore(colors);

describe("others object", () => {
  it("should return Uschi when called others[0]['3yup5fa61rd00000']", () => {
    expect($others()["3yup5fa61rd00000"]["username"]).toEqual("Uschi");
  });
  it("should return undefined when called others[wrongId]", () => {
    expect($others()["wrongId"]).toBeUndefined();
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

describe("setupNewPlayer function", () => {
  it("needs an id as an argument", () => {
    expect(() => {
      setupNewPlayer();
    }).toThrow();
  });
  test("the id should be passed as an object", () => {
    expect(() => {
      setupNewPlayer("someid");
    }).toThrow();
  });
  it('adds an entry to the "others" store', () => {
    const before = Object.assign({}, get(others));
    setupNewPlayer({ id: "someotherid" });
    const after = Object.assign({}, get(others));
    expect(Object.keys(after).length).toBeGreaterThan(
      Object.keys(before).length
    );
  });
  it("leaves the object empty, if only passed an id", () => {
    others.set({});
    setupNewPlayer({ id: "randomId" });
    const playerObj = get(others);
    expect(playerObj).toEqual({ randomId: {} });
  });
  it("adds username and color attributes inside the object (with prop of id)", () => {
    others.set({});
    setupNewPlayer({ id: "moreRandomId", username: "Vale", color: "red" });
    const playerObj = get(others);
    expect(playerObj).toEqual({
      moreRandomId: { username: "Vale", color: "red" },
    });
  });
});
