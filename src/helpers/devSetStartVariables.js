import * as Me from "../components/Me";
import * as Players from "../components/Players";
import * as Game from "../components/Game";

export default function devSetStartVariables({ stage = 0, name = "" } = {}) {
  if (stage !== 0) {
    Game.currStageId.set(stage);
  }
  if (name !== "") {
    Me.name.set(name);
  }
}
