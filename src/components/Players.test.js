import { others, all, colors, setupNewPlayer, updatePlayer } from "./Players";
import * as Me from "./Me";
import { get } from "svelte/store";

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
let $all = mockStore(all);
let $colors = mockStore(colors);

describe("others store", () => {
  it("should return Uschi when called others[0]['3yup5fa61rd00000']", () => {
    expect($others()["3yup5fa61rd00000"]["username"]).toEqual("Uschi");
  });
  it("should return undefined when called others[wrongId]", () => {
    expect($others()["wrongId"]).toBeUndefined();
  });
});

describe("all derived store", () => {
  it("should return a combined version of Players.others and Me.meAsObj", () => {
    Me.id.set("thatsmyid");
    Me.username.set("thatsmyname");
    Me.color.set("thatsmycolor");
    expect($all()).toEqual({
      thatsmyid: {
        username: "thatsmyname",
        color: "thatsmycolor",
      },
      ...fakeData,
    });
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
  it('adds an entry to the "others" store', () => {
    const before = Object.assign({}, get(others));
    setupNewPlayer("someotherid");
    const after = Object.assign({}, get(others));
    expect(Object.keys(after).length).toBeGreaterThan(
      Object.keys(before).length
    );
  });
  it("still sets up default props, if only passed an id", () => {
    others.set({});
    setupNewPlayer("randomId");
    const playerObj = get(others);
    expect(playerObj).toEqual({ randomId: { username: "", color: "" } });
  });
  it("adds username and color attributes inside the object (with prop of id)", () => {
    others.set({});
    setupNewPlayer("moreRandomId", { username: "Vale", color: "red" });
    const playerObj = get(others);
    expect(playerObj).toEqual({
      moreRandomId: { username: "Vale", color: "red" },
    });
  });
});

describe("updatePlayer function", () => {
  it("takes three arguments and changes the others store accordingly", () => {
    setupNewPlayer("testId");
    expect(() => {
      updatePlayer("testId", "username", "Meret");
    }).not.toThrow();
  });
  it("should throw if an argument is missing", () => {
    expect(() => {
      updatePlayer("onlyOneArg");
    }).toThrowError("arguments");
    expect(() => {
      updatePlayer("first", "second", "third", "invalidFourth");
    }).toThrow("arguments");
  });
  it("should throw if the id cannot be found", () => {
    others.set({});
    setupNewPlayer("anId");
    expect(() => {
      updatePlayer("anotherId", "color", "whatever");
    }).toThrowError("id");
  });
  it("should throw if the passed in an invalid value", () => {
    others.set({});
    setupNewPlayer("testMe", { username: "Barbara" });
    expect(() => {
      updatePlayer("testMe", "username", 0);
    }).toThrowError("value");
  });
});
