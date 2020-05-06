import { writable, derived, get } from "svelte/store";
import { hostId } from "./Players";

import { mockStore } from "../helpers/mock-store-helper";

//ANCHOR Stores
export const id = writable(0);
export const name = writable("");
export const color = writable("");

export const meAsObj = derived([id, name, color], ([$id, $name, $color]) => {
  return {
    "0": {
      id: $id,
      name: $name,
      color: $color,
    },
  };
});

export const beingHost = writable(false);

//ANCHOR Functions
export function setMeAsHost() {
  beingHost.set(true);
  hostId.set(get(id));
}
