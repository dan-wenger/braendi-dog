import * as Me from "../components/Me";
import * as Players from "../components/Players";
import * as Game from "../components/Game";

export default function devSetStartVariables({
  stage = 0,
  username = "",
  host = false,
} = {}) {
  if (stage !== 0) {
    Game.currStageId.set(stage);
  }
  if (username !== "") {
    Me.username.set(username);
  }
  if (host !== false) {
    Me.setMeAsHost();
  }
}
