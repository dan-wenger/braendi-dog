<script>
  // this is the top most Svelte file. Every svelte component used in this app should be imported here (also works indirectly, if another component referenced here imports it).
  import { onMount } from "svelte";
  import { setupPeer } from "./peer-communication.js";
  import * as Game from "./components/Game.js";
  import * as Me from "./components/Me.js";

  // ANCHOR Peer Setup
  onMount(() => {
    console.log("mounted");
    setupPeer();
    Game.gotoNextStage();
  });

  function initGame() {
    console.log("user wants to start a game");
    Me.beingHost.set(true);
    Game.gotoNextStage();
  }

  function joinGame() {
    console.log("user wants to join a game");
    Game.gotoNextStage();
  }

  // ANCHOR Variables
  const gameStage = Game.currStage;
  const myId = Me.id;
  const iAmTheHost = Me.beingHost;
</script>

{#if $gameStage == 'ready'}
  <button on:click={initGame}>Start new Game</button>
  <button on:click={joinGame}>Join Game</button>
{:else if ($gameStage = 'joining')}
  {#if $iAmTheHost}
    Copy this code and send it to the others!
  {:else}Enter the code you received:{/if}
{/if}
