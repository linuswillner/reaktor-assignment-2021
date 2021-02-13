<script>
  import { createEventDispatcher } from 'svelte'

  export let title
  export let active

  const dispatch = createEventDispatcher()

  function dispatchSetView () {
    dispatch('setView', { view: title })
  }
</script>

<button
  class:active={active}
  on:click={dispatchSetView}
>
  {title}
</button>

<style>
  button {
    margin: 0.75em;
    padding: 0.5em;
    border-radius: 0.3em;
  }

  .active {
    color: #ff3e00;
  }
</style>