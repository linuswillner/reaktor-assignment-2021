<script>
  import Item from '../components/Item.svelte'

  export let currentView

  // Defying convention for 'no capitalised object props'
  // for the sake of interoperability with currentView here
  const items = {
    Gloves: [
      {
        id: '6ab1fdb1a5630a1ac616c0c',
        name: 'NYIL JUMP',
        colors: ['red', 'green'],
        price: 51,
        manufacturer: 'abiplos',
        isInStock: true
      },
      {
        id: '6ab1fdb1a5630a1ac616c0c',
        name: 'NYIL JUMP',
        colors: ['black'],
        price: 51,
        manufacturer: 'abiplos',
        isInStock: false
      }
    ],
    Facemasks: [
      {
        id: '6ab1fdb1a5630a1ac616c0c',
        name: 'NYIL JUMP',
        colors: ['blue'],
        price: 51,
        manufacturer: 'abiplos',
        isInStock: true
      },
      {
        id: '6ab1fdb1a5630a1ac616c0c',
        name: 'NYIL JUMP',
        colors: ['green'],
        price: 51,
        manufacturer: 'abiplos',
        isInStock: false
      }
    ],
    Beanies: [
      {
        id: '6ab1fdb1a5630a1ac616c0c',
        name: 'NYIL JUMP',
        colors: ['white'],
        price: 51,
        manufacturer: 'abiplos',
        isInStock: true
      },
      {
        id: '6ab1fdb1a5630a1ac616c0c',
        name: 'NYIL JUMP',
        colors: ['yellow'],
        price: 51,
        manufacturer: 'abiplos',
        isInStock: false
      }
    ]
  }
</script>

<div>
  {#each items[currentView] as item}
    <Item {...item}/>
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 2em;
  }
</style>