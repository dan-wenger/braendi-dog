import { writable, derived, get } from "svelte/store";
import { hostId } from "./Players";

//ANCHOR Stores
export const id = writable(0);
export const name = writable(null);
export const color = writable(null);

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
  const unsubscribe = id.subscribe((i) => {
    hostId.set(i);
  });
}
