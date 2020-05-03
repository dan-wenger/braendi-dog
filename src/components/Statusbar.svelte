<script>
  import { hostId, others, all, count } from "./Players";
  import { name as myName, meAsObj, beingHost as iAmHost } from "./Me";
  import { currStage, currStageId } from "./Game";
</script>

<style>
  #wrapper {
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    color: black;
    z-index: 0;
    border-top: 1px solid black;
    padding: 0.3rem;
  }

  .item {
    margin: 0 0.5rem;
  }
</style>

<div id="wrapper">
  <p class="item">
    <strong>My name:</strong>
    {$myName}
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
