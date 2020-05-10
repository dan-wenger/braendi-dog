<script>
  import { hostId, others, all, count } from "./Players";
  import {
    username as myName,
    meAsObj,
    beingHost as iAmHost,
    peer as myPeer
  } from "./Me";
  import { currStage, currStageId } from "./Game";
  import { writable } from "svelte/store";
  import { tellOthers } from "../peer-communication.js";

  const testInput = writable("whaaat");
  function sendText() {
    tellOthers($testInput);
  }
</script>

<style>
  #statusbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    color: black;
    z-index: 0;
  }
  #stats {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid black;
    padding: 0.3rem;
  }

  #interaction {
    display: flex;
    padding: 1rem 0.5rem;
    border-top: 1px solid black;
  }

  .item {
    margin: 0 0.5rem;
  }

  /* input {
    position: absolute;
    bottom: 100%;
    left: 0;
    margin: 10px;
  } */
</style>

<div id="statusbar">
  <div id="interaction">
    <input type="text" value={$testInput} />
    <button id="send" on:click={sendText}>Send</button>
  </div>
  <div id="stats">
    <p class="item">
      <strong>My name:</strong>
      {$myName}
    </p>
    <p class="item">
      <strong>Peer object:</strong>
      {$myPeer}
    </p>
    <p class="item">
      <strong>Host:</strong>
      {$iAmHost}
    </p>
    <p class="item">
      <strong>Game Stage:</strong>
      {$currStageId}: "{$currStage}"
    </p>
    <p class="item">
      <strong>Game Id:</strong>
      {$hostId}
    </p>
    <p class="item">
      <strong>Players count:</strong>
      {$count}
    </p>
    <p class="item">
      <strong>My data:</strong>
      {JSON.stringify($meAsObj)}
    </p>
    <p class="item">
      <strong>Others data:</strong>
      {JSON.stringify($others)}
    </p>
  </div>
</div>
