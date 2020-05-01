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
  // $buttonWidth: 20em;
  // $buttonHeight: 4em;
  // $margin: 0.5em;

  // #wrapper {
  //   width: $buttonWidth + 2 * $margin;
  //   height: 2 * $buttonHeight + 4 * $margin;
  // }
  // button,
  // .label-wrapper,
  // input {
  //   display: table;
  //   vertical-align: middle;
  //   width: $buttonWidth;
  //   height: $buttonHeight;
  //   margin: $margin;
  //   text-align: center;
  // }
</style>

<!-- {@debug $gameStage} -->
<div id="wrapper">
  {#if $gameStage === 1}
    <button class="btn" on:click={initGame}>Start new Game</button>
    <button class="btn" on:click={joinGame}>Join Game</button>
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
      <button class="btn" id="copy" type="button" on:click={copyIdToClipboard}>
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
      <button class="btn strong" type="submit">Enter</button>
    {/if}
  {/if}
</div>
