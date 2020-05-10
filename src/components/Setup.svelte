<script>
  import {
    currStageId as gameStage,
    gotoNextStage as gotoNextGameStage
  } from "./Game.js";
  import {
    beingHost as iAmTheHost,
    id as myId,
    username as myName,
    setMeAsHost
  } from "./Me.js";
  import { hostId } from "./Players";
  import { connectToPeer } from "../peer-communication.js";

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
      connectToPeer($hostId);
    }
  }
</script>

<style lang="scss">
  @use "src/styles/variables" as v;

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
    z-index: 2;
    background-color: v.$c100;
    padding: 1rem;
  }

  #background {
    position: fixed;
    background-color: v.$c010;
    opacity: 50%;
    width: 100%;
    height: 100%;
  }

  .space-left {
    margin-left: v.$spacing;
  }

  .above-container {
    display: block;
    font-weight: 700;
    margin-bottom: 0.5rem;
    position: absolute;
    bottom: 100%;
    left: 0;
    color: v.$c100;
  }

  .below-container {
    color: v.$c090;
    position: absolute;
    top: 100%;
    left: 0;
  }

  .hidden {
    opacity: 0;
  }
</style>

<!-- {@debug $gameStage} -->
<div id="wrapper">
  <div id="container" class="rounded">
    {#if $gameStage === 0}
      <button on:click={initGame}>Start new Game</button>
      <button on:click={joinGame} class="space-left">Join Game</button>
    {:else if $gameStage === 1}
      {#if $iAmTheHost}
        <label class="above-container" for="hostIdOut">
          Share this code with the others:
        </label>
        <input
          type="text"
          name="hostIdOut"
          value={$myId}
          readonly
          on:focus={selectAll} />
        <button
          id="copy"
          class="space-left"
          type="button"
          on:click={copyIdToClipboard}>
          Copy
        </button>
        <button class="strong space-left" on:click={gotoNextGameStage}>
          <i class="fas fa-angle-right fa-lg" />
        </button>
        <p class="below-container" class:hidden={!copiedMessage}>Copied</p>
      {:else}
        <label class="above-container" for="hostIdIn">
          Enter the code you received:
        </label>
        <input type="text" name="hostIdIn" bind:value={$hostId} />
        <button class="strong space-left" on:click={connectToHost}>
          <i class="fas fa-angle-right fa-lg" />
        </button>
        <p class="below-container" class:hidden={!idMissingWarning}>
          Please enter the Id first
        </p>
      {/if}
    {:else if $gameStage === 2}
      <label class="above-container" for="nameIn">Enter your name:</label>
      <input type="text" name="nameIn" bind:value={$myName} />
      <button class="strong space-left" on:click={gotoNextGameStage}>
        Enter
      </button>
    {/if}
  </div>
  <div id="background" />
</div>
