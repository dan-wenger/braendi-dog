import {
  possibleStages,
  getStage,
  currStageId,
  getCurrStage,
} from "./game-store";

let $currStageId = null;
const unsubscribeCurrStageId = currStageId.subscribe(
  (id) => ($currStageId = id)
);
let $getCurrStage = null;
const unsubscribeGetCurrStage = getCurrStage.subscribe(
  (str) => ($getCurrStage = str)
);

//-> here i mocked ("simulated") the behaviour in a svelte file.
//   it should be possible to call the store with the prefix $ and it should
//   return it's state

describe("currStageId store", () => {
  it("should have a set method, which tells that the store is working", () => {
    expect(currStageId).toHaveProperty("set");
  });
  test("$currStageId should return the current stage id", () => {
    expect($currStageId).toEqual(0);
  });
  test("$currStageId should return 10 after the store was set to 10", () => {
    currStageId.set(10);
    expect($currStageId).toBe(10);
  });
});

describe("getStage function", () => {
  const i = 1;
  it("should return 'joining' with id 1", () => {
    expect(getStage(i)).toEqual("joining");
  });
  test("with index i it should equal possibleStages(i)", () => {
    expect(getStage(i)).toEqual(possibleStages[i]);
  });
});

describe("currStageId and getCurrStage", () => {
  test("$getCurrStage should return 'play' when currStageId changed to 3", () => {
    currStageId.set(3);
    expect($getCurrStage).toEqual("play");
  });
});

afterAll(() => {
  unsubscribeCurrStageId();
  unsubscribeGetCurrStage();
  //-> cleanup for store subscriptions
});
