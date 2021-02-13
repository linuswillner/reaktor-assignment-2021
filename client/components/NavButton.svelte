<script>
  import { createEventDispatcher } from 'svelte'
  import keymage from 'keymage'

  export let title
  export let active

  let button

  const dispatch = createEventDispatcher()

  function handleClick () {
    dispatch('setView', { view: title })
  }

  function defocus () {
    button.blur()
  }

  // To prevent user confusion, defocus all buttons every time tab
  // navigation has been used before using Ctrl-arrowkey navigation
  keymage('ctrl-left', defocus)
  keymage('ctrl-right', defocus)
</script>

<button
  bind:this={button}
  class:active={active}
  on:click={handleClick}
>
  {title}
</button>

<style>
  button {
    margin: 0.75em;
    padding: 0.5em;
    border-radius: 0.3em;
  }

  button.active {
    color: var(--color-primary);
    border-color: #666;
    background-color: #f4f4f4;
  }

  button:hover {
    color: var(--color-primary);
    border-color: rgb(150, 150, 150);
    background-color: #f0f0f0;
    transition: all 100ms;
  }
</style>