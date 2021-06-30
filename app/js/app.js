async function getData(ipAddress) {
    let response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_N7bI2kkvX3c6QIv1J3m6dgvIbJugA&ipAddress=${ipAddress}`)
    let data = await response.json()
    const source = document.querySelector('#IPTemplate').innerHTML
    const template = Handlebars.compile(source)
    const target = document.querySelector('#IP')
    const longitude = data.location['lng']
    const latitude = data.location['lat']
    target.innerHTML += template(data)
    resetListDiv()
    updateMap()
    createMap(latitude, longitude)
}

let displayError = (userInput) => {
    let ValidIpAddressRegex = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";

    try {
        if(userInput === "" ){
            throw {
                element: document.querySelector('.err'),
                message: 'This field is required! '
            }
        } else {
            if(!(userInput.match(ValidIpAddressRegex))){
                throw {
                    element: document.querySelector('.err'),
                    message: 'This is not a valid IP Address'
                }
            } else {
                document.querySelector('.err').textContent = "";
                getData(userInput)
            }
        }
    } catch (err) {
        err.element.textContent = err.message;
    }
}

let createMap = (latitude,longitude) =>

{
    let mymap = L.map('mapid').setView([latitude, longitude], 13);
    var marker = L.marker([latitude, longitude]).addTo(mymap);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxpbmExMjM0IiwiYSI6ImNrcWNmM3JqeDFpbHEzMm12NXZlc3RpcjQifQ.WcfTMJ27XhqE3msnoapplg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'okyour.mapbox.access.ten'
    }).addTo(mymap);
}

let updateMap = () =>
{
    let container = L.DomUtil.get('mapid');
    if (container != null) {
        container._leaflet_id = null;
    }
}

let resetMap = () => {
    let mymap = L.map('mapid').setView([51.5074, 0.1278], 3);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxpbmExMjM0IiwiYSI6ImNrcWNmM3JqeDFpbHEzMm12NXZlc3RpcjQifQ.WcfTMJ27XhqE3msnoapplg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYWxpbmExMjM0IiwiYSI6ImNrcWNmM3JqeDFpbHEzMm12NXZlc3RpcjQifQ.WcfTMJ27XhqE3msnoapplg'
    }).addTo(mymap);
}

let resetListDiv = () =>
{
    const searchedApi = document.querySelector('.list')
    if (searchedApi) {
        searchedApi.remove()
    }
}

document.querySelector(".button").addEventListener("click", e => {
    e.preventDefault()
    let userInput  = document.querySelector(".form-control").value;
    displayError (userInput)
})

resetMap()