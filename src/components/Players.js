import { writable, derived, get } from "svelte/store";
import { meAsObj } from "./Me.js";

//ANCHOR Writable Stores
export const others = writable({});

// STRUCTURE EXAMPLE
// {
//   "3yup5fa61rd00000": { -> peer id
//     username: "Uschi",
//     color: "yellow"
//   },
//   "scjftirfuh000000": {
//     username: "Linus",
//     color: "blue"
//   }
// }

export const hostId = writable(null);

//ANCHOR Derived Stores
export const all = derived([others, meAsObj], ([$others, $meAsObj]) => {
  return { ...$meAsObj, ...$others };
});

export const count = derived(others, ($others) => {
  return Object.keys($others).length + 1;
});

export const ids = derived(others, (obj) => extract(obj, "id"));
export const usernames = derived(others, (obj) => extract(obj, "username"));
export const colors = derived(others, (obj) => extract(obj, "color"));

function extract(obj, prop) {
  const out = [];
  for (let id in obj) {
    out.push(obj[id][prop]);
  }
  return out;
}

//ANCHOR Mutating Data
export function setupNewPlayer(id, rest = { username: "", color: "" }) {
  if (id !== undefined) {
    others.update((obj) => {
      obj[id] = rest;
      return obj;
    });
  } else {
    throw new Error("setupNewPlayer: you need to pass an id");
  }
}

/**
 * updates any value contained in the "others" store
 * takes three arguments:
 * @param {string} id - the player to target (his id)
 * @param {string} prop - the data to be changed. for example "username"
 * @param {string} value - the actual value to be set. for example "Uschi"
 */
export function updatePlayer(id, prop, value) {
  //checks if passed three arguments
  if (arguments.length !== 3) {
    throw new Error("you need to pass exactly three arguments");
  }

  others.update((obj) => {
    // checks if player exists
    if (!obj[id]) {
      throw new Error("player could not be found. please enter a valid id");
    }
    // checks value type
    if (typeof value !== typeof obj[id][prop]) {
      throw new Error("the value you passed differs from the one already set");
    }
    // everything fine, updating
    else {
      obj[id][prop] = value;
    }
  });
}
