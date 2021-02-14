<script>
  import { paginate, LightPaginationNav } from 'svelte-paginate'
  import { notifier } from '@beyonk/svelte-notifications'
  import io from 'socket.io-client'
  import Item from '../components/Item.svelte'

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

  let currentPage = 1
  const pageSize = 28
  $: paginatedItems = paginate({ items: items[currentView], pageSize, currentPage })

  socket.on('connect', () => {
    notifier.success('Connected to server.')
    notifier.info('Please allow up to several minutes for all data to be available.')
    console.debug('WebSocket connection established.')
  })

  socket.on('connect_error', err => {
    notifier.danger('Could not connect to server!')
    console.error('WebSocket connection failed.', err)
  })

  socket.on('disconnect', reason => {
    notifier.danger('Disconnected from server!')
    console.error('Disconnected from WebSocket server.', reason)
  })

  socket.on('cache_update', newData => {
    console.debug('Received full cache update.')

    for (const category in newData) {
      items[cacheToViewMap[category]] = newData[category]
    }
  })

  socket.on('cache_update_partial', ({ category, data }) => {
    console.debug('Received partial cache update.')
    items[cacheToViewMap[category]] = data
  })

  socket.on('cache_update_finish', () => notifier.success('Cache update finished!'))
  socket.on('cache_expired', () => notifier.warning('Cache has expired and is being updated. You may be viewing outdated data for a brief moment.'))
  socket.on('cache_update_error', () => notifier.error('Cache update failed; you may be reading outdated data.'))
</script>

<div class="container">
  <div class="pagination-nav">
    <LightPaginationNav
      totalItems={items[currentView].length}
      pageSize={pageSize}
      currentPage={currentPage}
      limit={1}
      showStepOptions={true}
      on:setPage="{event => { currentPage = event.detail.page }}"
    />
  </div>
  <div class="items">
    {#each paginatedItems as item}
      <Item {...item}/>
    {/each}
  </div>
</div>

<style>
  .container {
    margin: 2em;
    margin-top: 0;
    display: flex;
    flex-direction: column;
    /* This is mainly to prevent the paginator from becoming too big */
    align-items: center;
  }

  .pagination-nav :global(.pagination-nav) {
    margin: 0.5em;
  }

  .pagination-nav :global(.option.active) {
    color: var(--color-primary) !important;
  }

  .pagination-nav :global(.option.prev) {
    color: var(--color-secondary) !important;
  }

  .pagination-nav :global(.option.next) {
    color: var(--color-secondary) !important;
  }

  .items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>