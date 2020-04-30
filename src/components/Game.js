import { writable, derived } from "svelte/store";

export const possibleStages = [
  "init",
  "ready",
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
export const currStage = derived(currStageId, ($id) => possibleStages[$id]);

export function gotoNextStage() {
  currStageId.update((n) => n + 1);
}
