import { writable, derived } from "svelte/store";

export const possibleStages = [
  "idle",
  "joining",
  "preparation",
  "play",
  "finish-play",
  "review",
];
export const getStage = (index) => {
  return possibleStages[index];
};

export const currStageId = writable(0);
export const getCurrStage = derived(currStageId, ($id) => possibleStages[$id]);
