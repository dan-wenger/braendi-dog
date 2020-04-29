import App from "./App.svelte";

const testApp = new App({ target: document.body });

describe("App component", () => {
  it("should exist", () => {
    expect(testApp).toBeTruthy();
  });
});
