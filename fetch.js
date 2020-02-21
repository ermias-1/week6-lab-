var url = 'https://api.wheretheiss.at/v1/satellites/25544'

var issLat = document.querySelector('#iss-lat')
var issLong = document.querySelector('#iss-long')

var issMarker  // Leaflet marker 
var update = 10000  // 10 seconds 

var map = L.map('iss-map').setView([0, 0], 1)

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY2xhcmFsIiwiYSI6ImNqcmdwenViYTAwcHQ0Ym5yYmZ1Z3E2bjgifQ.QQfUvVaqPsWb_jJbP2gvHg'
}).addTo(map)

iss()   // initial call to function
setInterval(iss, update)  // Call the iss function every update seconds


var icon = L.icon({
    iconUrl: 'noun_Satellite_2537348.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
})

function iss() {
    fetch(url)
        .then( res => res.json())
        .then( issData => {
            console.log(issData)
            let lat = issData.latitude
            let long = issData.longitude
            issLat.innerHTML = lat
            issLong.innerHTML = long

            if (!issMarker) {
                issMarker = L.marker([lat, long], {icon: icon}).addTo(map) // Create the marker 
            } else {
                issMarker.setLatLng([lat, long]) // Already exists - move to new location
            }

            // Update the time element to the current date and time 
            let date = Date()
            time.innerHTML = date

        })
        .catch( err => {
            console.log(err)
        })
        .finally( () => {
            // finally runs whether the fetch() worked or failed.
            setTimeout(iss, update)
        })
        
}