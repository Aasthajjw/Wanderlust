maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
container: 'map', // container's id or the HTML element in which the SDK will render the map
style: maptilersdk.MapStyle.STREETS,
center: coordinates, // starting position [lng, lat]
zoom: 14 // starting zoom
});

const marker = new maptilersdk.Marker({color: 'red'})
.setLngLat(coordinates)
.setPopup(new maptilersdk.Popup({ offset: 25}).setText('Exact Location provided after booking'))
.addTo(map);