<script>
  export let id
  export let name
  export let colors
  export let price
  export let manufacturer
  export let isInStock

  function getStockStatus (isInStock) {
    switch (isInStock) {
      case true:
        return 'Yes'
      case false:
        return 'No'
      case 'low':
        return '< 10'
      case 'unknown':
        return 'Unknown'
    }
  }

  function getStockStatusClass (isInStock) {
    switch (isInStock) {
      case true:
        return 'in-stock'
      case false:
        return 'out-of-stock'
      case 'low':
        return 'low-stock'
      case 'unknown':
        return 'unknown-stock'
    }
  }

  $: stockStatus = getStockStatus(isInStock)
  $: stockStatusClass = getStockStatusClass(isInStock)
</script>

<div class="item">
  <p>ID: <code>{id}</code></p>
  <p>Name: {name}</p>
  <p>
    Color:
    {#each colors as color}
      <span class="badge color {color}">{color}</span>
    {/each}
  </p>
  <p>Price: {price}</p>
  <p>Manufacturer: {manufacturer}</p>
  <p>In stock: <span class="badge {stockStatusClass}">{stockStatus}</span></p>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    border: 1px solid var(--color-secondary);
    padding: 0.5em;
    margin: 0.5em;
    text-align: left;
    border-radius: 0.3em;
  }

  p {
    margin: 0;
  }

  span {
    color: #ffffff;
  }

  span.in-stock {
    background-color: #00be00;
  }

  span.out-of-stock {
    background-color: #ff0000;
  }

  span.low-stock {
    background-color: #ff9100;
  }

  span.unknown-stock {
    background-color: #969696;
  }

  .badge.color:not(:last-child) {
    margin-right: 0.3em;
  }
</style>