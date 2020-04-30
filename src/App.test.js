import App from "./App.svelte";
import { currStageId } from "./components/Game";

const testApp = new App({ target: document.body });

let $currStageId = null;
const unsubscribeCurrStageId = currStageId.subscribe(
  (id) => ($currStageId = id)
);

describe("App component", () => {
  it("should exist", () => {
    expect(testApp).toBeTruthy();
  });
});
