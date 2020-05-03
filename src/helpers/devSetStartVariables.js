import * as Me from "../components/Me";
import * as Players from "../components/Players";
import * as Game from "../components/Game";

export default function devSetStartVariables() {
  Game.currStageId.set(0);
  Me.name.set("Dan");

  //   setTimeout(() => {
  //     Me.setMeAsHost();
  //   }, 1000);
}
