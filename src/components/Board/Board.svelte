<script>
  const x = "booard";

  //const fieldsPerCircle = new Array(32);
</script>

<style lang="scss">
  //@import "board.scss";
  $color: #fff;

  #bigger-circle {
    width: 200px;
    height: 200px;
    background-color: #aaa;
  }

  #board {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
</style>

<div id="board">
  <div id="bigger-circle" />
</div>
