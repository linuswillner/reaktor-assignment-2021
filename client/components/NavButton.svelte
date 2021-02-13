<script>
  export let title;
  export let active;
</script>

<button class:active="{active}">
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