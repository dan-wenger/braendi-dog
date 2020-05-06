import { currStageId, currStage, gotoNextStage } from "./Game";

import { mockStore } from "../helpers/mock-store-helper";

//should be called as functions!
let $currStageId = mockStore(currStageId);
let $currStage = mockStore(currStage);

describe("currStageId store", () => {
  it("should have a subscribe method, which tells that the store is working", () => {
    expect(currStageId).toHaveProperty("subscribe");
  });
  test("$currStageId should return the current stage id", () => {
    expect($currStageId()).toEqual(0);
  });
  test("$currStageId should return 10 after the store was set to 10", () => {
    currStageId.set(10);
    expect($currStageId()).toBe(10);
  });
});

describe("currStageId and getCurrStage", () => {
  test("$getCurrStage should return 'play' when currStageId changed to 6", () => {
    currStageId.set(6);
    expect($currStage()).toEqual("play");
  });
});

describe("gotoNextStage function", () => {
  it("should go from stage 2 to stage 3", () => {
    currStageId.set(2);
    gotoNextStage();
    expect($currStageId()).toEqual(3);
  });
});
