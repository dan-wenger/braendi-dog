<script>
  import * as Game from "./Game.js";
  import * as Me from "./Me.js";
  import * as Others from "./Others";

  //ANCHOR Variables
  const gameStage = Game.currStageId;
  const iAmTheHost = Me.beingHost;
  const myId = Me.id;
  const hostId = Others.hostId;

  //ANCHOR Functions
  function initGame() {
    console.log("user wants to start a game");
    Me.beingHost.set(true);
    Game.gotoNextStage();
  }

  function joinGame() {
    console.log("user wants to join a game");
    Game.gotoNextStage();
  }

  function popUpDelay(state) {
    let delay = state ? 150 : 1500;
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
    return promise;
  }

  //Host Setup Section
  function selectAll(event) {
    event.target.select();
  }
  let copiedMessage = false;
  function copyIdToClipboard() {
    const el = document.getElementsByName("hostIdOut")[0];
    el.focus();
    el.select();
    document.execCommand("copy");
    popUpDelay(true).then(() => (copiedMessage = true));
    popUpDelay(false).then(() => (copiedMessage = false));
  }

  //Join Setup Section
  let idMissingWarning = false;
  function connectToHost() {
    if ($hostId == null) {
      popUpDelay(true).then(() => (idMissingWarning = true));
      popUpDelay(false).then(() => (idMissingWarning = false));
    } else {
      Game.gotoNextStage();
      console.log(`You entered with host id "${$hostId}"`);
    }
  }
</script>

<style lang="scss">
  #wrapper {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  #container {
    position: relative;
    width: 25rem;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    z-index: 1;
  }

  #background {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  #closeButton {
    border: 0;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
  }
</style>

<!-- {@debug $gameStage} -->
<div id="wrapper">
  <div id="container" class="bg-white rounded p-8">
    {#if $gameStage === 1}
      <button class="btn mx-3" on:click={initGame}>Start new Game</button>
      <button class="btn mx-3" on:click={joinGame}>Join Game</button>
    {:else if $gameStage === 2}
      {#if $iAmTheHost}
        <label class="label" for="hostIdOut">
          Share this code with the others:
        </label>
        <input
          class="box"
          type="text"
          name="hostIdOut"
          value={$myId}
          readonly
          on:focus={selectAll} />
        <button
          class="btn next-to-input"
          id="copy"
          type="button"
          on:click={copyIdToClipboard}>
          Copy
        </button>
        <p
          class={copiedMessage ? 'text-gray-500 my-1' : 'text-transparent my-1'}>
          Copied
        </p>
        <button id="closeButton" on:click={Game.gotoNextStage}>
          <i class="fas fa-times fa-2x" />
        </button>
      {:else}
        <label class="label" for="hostIdIn">Enter the code you received:</label>
        <input class="box" type="text" name="hostIdIn" bind:value={$hostId} />
        <button
          class="btn next-to-input strong"
          type="submit"
          on:click={connectToHost}>
          Enter
        </button>
        <p
          class={idMissingWarning ? 'text-gray-500 my-1' : 'text-transparent my-1'}>
          Please enter the Id first
        </p>
      {/if}
    {/if}
  </div>
  <div id="background" class="bg-black opacity-50" />
</div>
