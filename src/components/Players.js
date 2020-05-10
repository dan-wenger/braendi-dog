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
export function setupNewPlayer(id, rest = {}) {
  if (id !== null) {
    others.update((obj) => {
      obj[id] = rest;
      return obj;
    });
  } else {
    throw new Error("setupNewPlayer: you need to pass at least an id");
  }
}

export function updatePlayer(index, prop, value) {
  others.update((obj) => {
    obj[index][prop] = value;
  });
}
