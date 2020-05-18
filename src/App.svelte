<script>
  // this is the top most Svelte file. Every svelte component used in this app should be imported here (also works indirectly, if another component referenced here imports it).
  import { onMount } from "svelte";
  import { setupPeer } from "./peer-communication.js";
  import * as Game from "./components/Game.js";
  import * as Me from "./components/Me.js";
  import Setup from "./components/Setup.svelte";
  import Board from "./components/Board/Board.svelte";
  import Statusbar from "./components/Statusbar.svelte";

  import devSetStartVariables from "./helpers/devSetStartVariables";

  // ANCHOR Peer Setup
  onMount(() => {
    console.log("mounted");
    setupPeer()
      .then(newId => {
        console.log(`peer created with id ${newId}`);
        Me.id.set(newId);
      })
      .catch(err => {
        throw new Error(`setupPeer ${err}`);
      });

    //NOTE only during development:
    devSetStartVariables({
      stage: 0,
      username: "Dan",
      host: false
    });
  });

  // ANCHOR Variables
  const gameStage = Game.currStageId;
</script>

<style>
  #app {
    position: relative;
    height: 100%;
    align-items: center;
    justify-items: center;
  }
</style>

<div id="app">
  {#if $gameStage < 3}
    <Setup />
  {/if}
  <Board />
  <Statusbar />
</div>
