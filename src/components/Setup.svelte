<script>
  import {
    currStageId as gameStage,
    gotoNextStage as gotoNextGameStage
  } from "./Game.js";
  import {
    beingHost as iAmTheHost,
    id as myId,
    name as myName,
    setMeAsHost
  } from "./Me.js";
  import { hostId } from "./Players";

  //ANCHOR Functions
  function initGame() {
    console.log("user wants to start a game");
    gotoNextGameStage();
    setMeAsHost();
  }

  function joinGame() {
    console.log("user wants to join a game");
    gotoNextGameStage();
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
      gotoNextGameStage();
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
    z-index: 1;
  }

  #container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
    z-index: 2;
  }

  #background {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  // #closeButton {
  //   border: 0;
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   padding: 0.2rem 0.4rem;
  // }

  .above-container {
    position: absolute;
    bottom: 100%;
    left: 0;
    color: white;
  }

  .below-container {
    position: absolute;
    top: 100%;
    left: 0;
  }
</style>

<!-- {@debug $gameStage} -->
<div id="wrapper">
  <div id="container" class="bg-white rounded p-4">
    {#if $gameStage === 0}
      <button class="btn" on:click={initGame}>Start new Game</button>
      <button class="btn ml-4" on:click={joinGame}>Join Game</button>
    {:else if $gameStage === 1}
      {#if $iAmTheHost}
        <label class="label above-container" for="hostIdOut">
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
        <button class="btn strong w-20 ml-4" on:click={gotoNextGameStage}>
          <i class="fas fa-angle-right fa-lg" />
        </button>
        <p
          class={copiedMessage ? 'text-gray-500 my-1 below-container' : 'text-transparent my-1 below-container'}>
          Copied
        </p>
      {:else}
        <label class="label above-container" for="hostIdIn">
          Enter the code you received:
        </label>
        <input type="text" class="box" name="hostIdIn" bind:value={$hostId} />
        <button class="btn strong w-20 ml-4" on:click={connectToHost}>
          <i class="fas fa-angle-right fa-lg" />
        </button>
        <p
          class={idMissingWarning ? 'text-gray-500 my-1 below-container' : 'text-transparent my-1 below-container'}>
          Please enter the Id first
        </p>
      {/if}
    {:else if $gameStage === 2}
      <label class="label above-container" for="nameIn">Enter your name:</label>
      <input type="text" class="box" name="nameIn" bind:value={$myName} />
      <button class="btn strong ml-4" on:click={gotoNextGameStage}>
        Enter
      </button>
    {/if}
  </div>
  <div id="background" class="bg-black opacity-50" />
</div>
