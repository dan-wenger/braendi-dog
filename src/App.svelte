<script>
  // this is the top most Svelte file. Every svelte component used in this app should be imported here (also works indirectly, if another component referenced here imports it).
  import { onMount } from "svelte";
  import { setupPeer } from "./peer-communication.js";
  import * as Game from "./components/Game.js";
  import * as Me from "./components/Me.js";
  import Setup from "./components/Setup.svelte";
  import Board from "./components/Board.svelte";

  // ANCHOR Peer Setup
  onMount(() => {
    console.log("mounted");
    setupPeer().then(newId => {
      console.log(`peer created with id ${newId}`);
      Me.id.set(newId);
      Game.gotoNextStage();
    });
  });

  // ANCHOR Variables
  const gameStage = Game.currStageId;
</script>

<style>
  #wrapper {
    position: relative;
    height: 100%;
    align-items: center;
    justify-items: center;
  }
</style>

<!-- {@debug $myId} -->
<!-- {@debug $gameStage} -->

<div id="wrapper">
  {#if $gameStage < 3}
    <Setup />
    <!-- {:else if $gameStage === 4} -->
  {/if}
  <Board />
</div>
