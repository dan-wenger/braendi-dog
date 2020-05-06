import { mockStore } from "./mock-store-helper";

import * as Me from "../components/Me";

describe("mockStore", () => {
  it("checks if a valid store is passed", () => {
    const test = "this is an invalid variable";
    expect(() => mockStore(test)).toThrow();
  });
  it("should return a stores content", () => {
    Me.color.set("pink");
    const $mock1 = mockStore(Me.color);
    expect($mock1()).toEqual("pink");
  });
  test("the content should change when the store is changed", () => {
    const $mock2 = mockStore(Me.color);
    expect($mock2()).toEqual("");
    Me.color.set("lila");
    expect($mock2()).toEqual("lila");
  });

  afterEach(() => {
    Me.color.set("");
  });
});
