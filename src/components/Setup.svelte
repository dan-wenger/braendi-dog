<script>
  import * as Game from "./Game.js";
  import * as Me from "./Me.js";

  function initGame() {
    console.log("user wants to start a game");
    Me.beingHost.set(true);
    Game.gotoNextStage();
  }

  function joinGame() {
    console.log("user wants to join a game");
    Game.gotoNextStage();
  }

  function selectAll(event) {
    event.target.select();
  }

  let copied = false;
  function copyIdToClipboard() {
    const el = document.getElementsByName("hostIdOut")[0];
    el.focus();
    el.select();
    document.execCommand("copy");
    setTimeout(() => {
      copied = true;
    }, 150);
    setTimeout(() => {
      copied = false;
    }, 1500);
  }

  //ANCHOR Variables
  const gameStage = Game.currStageId;
  const iAmTheHost = Me.beingHost;
  const myId = Me.id;
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
        <div class="block">
          <p class={copied ? 'text-gray-500 my-1' : 'text-transparent my-1'}>
            Copied
          </p>
        </div>
      {:else}
        <label class="label" for="hostIdIn">Enter the code you received:</label>
        <input class="box" type="text" name="hostIdIn" />
        <button class="btn next-to-input strong" type="submit">Enter</button>
      {/if}
    {/if}
  </div>
  <div id="background" class="bg-black opacity-50" />
</div>
