import * as Me from "../components/Me";
import * as Players from "../components/Players";
import * as Game from "../components/Game";

export default function devSetStartVariables({
  stage = 0,
  name = "",
  host = false,
} = {}) {
  if (stage !== 0) {
    Game.currStageId.set(stage);
  }
  if (name !== "") {
    Me.name.set(name);
  }
  if (host !== false) {
    Me.setMeAsHost();
  }
}
