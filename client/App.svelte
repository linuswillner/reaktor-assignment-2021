<script>
  import { createEventDispatcher } from 'svelte'
  import { NotificationDisplay } from '@beyonk/svelte-notifications'
  import keymage from 'keymage'
  import Items from './views/Items.svelte'
  import Nav from './components/Nav.svelte'
  import doArrayRoundTrip from './utils/doArrayRoundTrip'

  import './index.css'

  const dispatch = createEventDispatcher()

  const views = [
    'Gloves',
    'Facemasks',
    'Beanies'
  ]

  let currentView = views[0]

  function scrollCurrentView (direction) {
    const newViewIndex = doArrayRoundTrip(direction, views.indexOf(currentView), views)
    currentView = views[newViewIndex]
    dispatch('scrollCurrentView', { direction })
  }

  function setCurrentView (event) {
    currentView = event.detail.view
  }

  keymage('ctrl-left', () => scrollCurrentView('left'))
  keymage('ctrl-right', () => scrollCurrentView('right'))
</script>

<NotificationDisplay
  timeout={5000}
/>
<main>
	<h1>Warehouse Stock Index</h1>
  <Nav
    views={views}
    currentView={currentView}
    on:setView={setCurrentView}
  />
  <Items currentView={currentView}/>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
    padding: 1em;
  }

  h1 {
    color: var(--color-primary);
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin-top: 0;
  }
</style>
