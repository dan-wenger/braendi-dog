import { get } from "svelte/store";

export function mockStore(store) {
  //check if it's a valid store -> if it has a subscribe fn
  if (typeof store.subscribe == "function") {
    return function() {
      return get(store);
    };
  } else {
    throw new Error("you didn't pass a valid store");
  }
}
