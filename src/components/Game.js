import { writable, derived } from "svelte/store";

//ANCHOR Stages
export const possibleStages = [
  "init",
  "idSetup",
  "nameSetup",
  "colorSetup",
  "joining",
  "preparation",
  "play",
  "finish-play",
  "review",
];

export const currStageId = writable(0);
export const currStage = derived(currStageId, ($id) => possibleStages[$id]);

export function gotoNextStage() {
  currStageId.update((n) => n + 1);
}

//ANCHOR Colors
export const colors = ["green", "yellow", "red", "blue"];
export const colorsUnchosen = writable([...colors]);
