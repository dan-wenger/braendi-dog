import { writable, derived, get } from "svelte/store";
import { hostId } from "./Players";

//ANCHOR Stores
export const peer = null;
export const id = writable(0);
export const username = writable("");
export const color = writable("");

export const meAsObj = derived(
  [id, username, color],
  ([$id, $username, $color]) => {
    let obj = {};
    obj[$id] = {
      username: $username,
      color: $color,
    };
    return obj;
  }
);

export const beingHost = writable(false);

//ANCHOR Functions
export function setMeAsHost() {
  beingHost.set(true);
  hostId.set(get(id));
}
