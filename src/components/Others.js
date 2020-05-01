import { writable, derived } from "svelte/store";

//ANCHOR Writable Stores
export const data = writable({});
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

export const host = writable(null);

//ANCHOR Derived Stores
export const ids = derived(data, (obj) => extract(obj, "id"));
export const names = derived(data, (obj) => extract(obj, "name"));
export const colors = derived(data, (obj) => extract(obj, "color"));

function extract(obj, prop) {
  const out = [];
  for (let id in obj) {
    out.push(obj[id][prop]);
  }
  return out;
}

//ANCHOR Mutating Data
export function addPlayer(id) {
  data.update((arr) => {
    arr[id] = {
      name: null,
      color: null,
    };
    return arr;
  });
}

export function addPlayerName(id, n) {
  data.update((arr) => {
    arr[id]["name"] = n;
    return arr;
  });
}
