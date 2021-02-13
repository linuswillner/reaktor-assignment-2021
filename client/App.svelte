<script>
  import keymage from 'keymage'
  import Nav from './components/Nav.svelte'
  import doArrayRoundTrip from './utils/doArrayRoundTrip'

  const views = [
    'Gloves',
    'Facemasks',
    'Beanies'
  ]

  let currentView = views[0]

  function scrollActiveView (direction) {
    let newViewIndex = doArrayRoundTrip(direction, views.indexOf(currentView), views)
    currentView = views[newViewIndex]
  }

  keymage('ctrl-left', () => scrollActiveView('left'))
  keymage('ctrl-right', () => scrollActiveView('right'))
</script>

<main>
	<h1>Warehouse Stock Index</h1>
  <Nav views="{views}" currentView="{currentView}"/>
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
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin-top: 0;
  }
</style>
