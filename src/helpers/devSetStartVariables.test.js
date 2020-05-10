import devSetStartVariables from "./devSetStartVariables";

import * as Me from "../components/Me";
import * as Game from "../components/Game";

import { mockStore } from "./mock-store-helper";

const $stageId = mockStore(Game.currStageId);
const $myName = mockStore(Me.username);

describe("devSetStartVariables", () => {
  it("should by default do nothing", () => {
    const before = { id: $stageId(), username: $myName() };
    devSetStartVariables();
    const after = { id: $stageId(), username: $myName() };
    expect(before).toEqual(after);
  });
  it("should be able to change the game state from 0 to three", () => {
    devSetStartVariables({ stage: 3 });
    expect($stageId()).toEqual(3);
  });
  it("should be able to set Me.username", () => {
    devSetStartVariables({ username: "Leo" });
    expect($myName()).toEqual("Leo");
  });
});
