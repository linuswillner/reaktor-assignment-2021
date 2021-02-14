<script>
  import Item from '../components/Item.svelte'
  import io from 'socket.io-client'

  export let currentView

  // Defying the convention of 'no capitalised object props'
  // for the sake of interoperability with currentView here
  const items = {
    Gloves: [],
    Facemasks: [],
    Beanies: []
  }

  const cacheToViewMap = {
    gloves: 'Gloves',
    facemasks: 'Facemasks',
    beanies: 'Beanies'
  }

  const socket = io()

  socket.on('connect', () => {
    console.debug('WebSocket connection established.')
  })

  socket.on('data', newData => {
    console.debug('Received new data.')

    for (const category in newData) {
      items[cacheToViewMap[category]] = newData[category]
    }
  })

  socket.on('data_partial', ({ category, data }) => {
    console.debug('Received partial new data via cache update.')
    items[cacheToViewMap[category]] = data
  })
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