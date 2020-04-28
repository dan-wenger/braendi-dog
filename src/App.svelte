<script>
  // this is the top most Svelte file. Every svelte component used in this app should be imported here (also works indirectly, if another component referenced here imports it).
  import { onMount } from 'svelte';
  let mounted = false;
  let peerjsReady = false;
  let peerCreated = false;

  onMount(() => {
    console.log('mounted');
    mounted = true;
    if (peerjsReady) {
      setupPeer();
    }
  });

  function peerjsLoaded() {
    console.log('peerjs loaded from CDN');
    peerjsReady = true;
    if (mounted && !peerCreated) {
      setupPeer();
    }
  }

  function setupPeer() {
    console.log('setting up peer');
    const peer = new Peer({
      host: location.hostname,
      port: 4000,
      //location.port || (location.protocol === 'https:' ? 443 : 80),
      path: '/peerjs',
      debug: 3,
    });
    peerCreated = true;

    peer.on('open', id => {
      console.log(`received id: ${id}`);
      me.id = id;
    });
  }

  const game = {
    stage: 'joining',
  };

  const me = {
    id: '',
  };

  function initGame() {
    console.log('user wants to start a game');
  }
</script>

<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/npm/peerjs@0.3.20/dist/peer.min.js"
    on:load="{peerjsLoaded}">

  </script>
</svelte:head>
<h4>stage: {game.stage}</h4>
<h4>my id: {me.id}</h4>
{#if game.stage == 'joining'}
  <button on:click="{initGame}">Start new Game</button>
  <button>Join Game</button>
{/if}
