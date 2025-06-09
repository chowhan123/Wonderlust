// This file is used to initialize the map on the page

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: "map",
    center: listing.geometry.coordinates,
    zoom: 9,
});


 // Create a default Marker and add it to the map.
  const marker1 = new mapboxgl.Marker({ color: 'red'})
    .setLngLat(listing.geometry.coordinates)
    .setPopup( 
        new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML( `<h3>${listing.title}</h3> <p>Exact location will be provided after booking!</p>`) // sets a popup on marker
    ) 
    .addTo(map);
