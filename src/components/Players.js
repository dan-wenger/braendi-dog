import { writable, derived } from "svelte/store";
import { meAsObj } from "./Me.js";

//ANCHOR Writable Stores
export const others = writable({});

// export const data2 = derived(
//   [myId, myName, myColor],
//   ($myId, $myName, $myColor) => {
//     return "data2"; //{ "0": { id: $myId, name: $myName, color: $myColor } };
//   }
// );

export const all = derived([others, meAsObj], ([$others, $meAsObj]) => {
  return { ...$meAsObj, ...$others };
});

export const count = derived(others, ($others) => {
  return Object.keys($others).length + 1;
});

// STRUCTURE EXAMPLE
// {
//   0: { -> has to start there, otherwise it won't match with derived stores
//     id: "3yup5fa61rd00000"
//     name: "Uschi",
//     color: "yellow"
//   },
//   1: {
//     id: "scjftirfuh000000
//     name: "Linus",
//     color: "blue"
//   }
// }

export const hostId = writable(null);

//ANCHOR Derived Stores
export const ids = derived(others, (obj) => extract(obj, "id"));
export const names = derived(others, (obj) => extract(obj, "name"));
export const colors = derived(others, (obj) => extract(obj, "color"));

function extract(obj, prop) {
  const out = [];
  for (let id in obj) {
    out.push(obj[id][prop]);
  }
  return out;
}

//ANCHOR Mutating Data
export function addPlayer(id) {
  others.update((arr) => {
    arr[id] = {
      name: null,
      color: null,
    };
    return arr;
  });
}

export function addPlayerName(id, n) {
  others.update((arr) => {
    arr[id]["name"] = n;
    return arr;
  });
}
