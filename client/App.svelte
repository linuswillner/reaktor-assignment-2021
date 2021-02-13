<script>
  import keymage from 'keymage'
  import Gloves from './views/Gloves.svelte'
  import Facemasks from './views/Facemasks.svelte'
  import Beanies from './views/Beanies.svelte'
  import Nav from './components/Nav.svelte'
  import doArrayRoundTrip from './utils/doArrayRoundTrip'

  import './styles/main.css'

  const views = [
    'Gloves',
    'Facemasks',
    'Beanies'
  ]

  let currentView = views[0]

  function scrollCurrentView (direction) {
    const newViewIndex = doArrayRoundTrip(direction, views.indexOf(currentView), views)
    currentView = views[newViewIndex]
  }

  function setCurrentView (event) {
    currentView = event.detail.view
  }

  keymage('ctrl-left', () => scrollCurrentView('left'))
  keymage('ctrl-right', () => scrollCurrentView('right'))
</script>

<main>
	<h1>Warehouse Stock Index</h1>
  <Nav views={views} currentView={currentView} on:setView={setCurrentView}/>
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
