<script>
  import NavButton from './NavButton.svelte'
  
  export let views
  export let currentView
</script>

<h2>Departments</h2>
<p>Tip: Use <code>Ctrl</code> and the left/right arrow keys to cycle between departments.</p>
<nav>
  {#each views as buttonTitle}
    <NavButton
      title={buttonTitle}
      active={buttonTitle === currentView}
      on:setView
    />
  {/each}
</nav>

<style>
  h2 {
    margin: 0;
    margin-bottom: 0.5em;
  }

  p {
    font-style: italic;
    margin: 0;
    margin-bottom: 0.5em;
  }

  nav {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
</style>