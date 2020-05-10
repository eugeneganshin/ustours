/* eslint-disable */
const locations = JSON.parse(document.querySelector('#map').dataset.locations)
console.log(locations)

// <div id='map' style='width: 400px; height: 300px;'></div>

mapboxgl.accessToken = 'pk.eyJ1IjoiZHVtaWh1dnVkIiwiYSI6ImNrYTE1Z2ZrZTFiYWczb2xpOWQ4MDQ3ZG4ifQ.yhGzpdw3DO8EAIQAP5MXgg'

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dumihuvud/cka15p3h22ad51iohrg9k9u03',
  scrollZoom: false
});

const bounds = new mapboxgl.LngLatBounds()

locations.forEach(loc => {
  // Create marker
  const el = document.createElement('div')
  el.className = 'marker'

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map)

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map)

  // Extends the map bounds to include current location
  bounds.extend(loc.coordinates)
});

map.fitBounds(bounds, {
  // zoom fix
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
})