"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getData(_x) {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ipAddress) {
    var response, data, source, template, target, longitude, latitude;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("https://geo.ipify.org/api/v1?apiKey=at_N7bI2kkvX3c6QIv1J3m6dgvIbJugA&ipAddress=".concat(ipAddress));

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            data = _context.sent;
            source = document.querySelector('#IPTemplate').innerHTML;
            template = Handlebars.compile(source);
            target = document.querySelector('#IP');
            longitude = data.location['lng'];
            latitude = data.location['lat'];
            target.innerHTML += template(data);
            resetListDiv();
            updateMap();
            createMap(latitude, longitude);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getData.apply(this, arguments);
}

var displayError = function displayError(userInput) {
  var ValidIpAddressRegex = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";

  try {
    if (userInput === "") {
      throw {
        element: document.querySelector('.err'),
        message: 'This field is required! '
      };
    } else {
      if (!userInput.match(ValidIpAddressRegex)) {
        throw {
          element: document.querySelector('.err'),
          message: 'This is not a valid IP Address'
        };
      } else {
        document.querySelector('.err').textContent = "";
        getData(userInput);
      }
    }
  } catch (err) {
    err.element.textContent = err.message;
  }
};

var createMap = function createMap(latitude, longitude) {
  var mymap = L.map('mapid').setView([latitude, longitude], 13);
  var marker = L.marker([latitude, longitude]).addTo(mymap);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxpbmExMjM0IiwiYSI6ImNrcWNmM3JqeDFpbHEzMm12NXZlc3RpcjQifQ.WcfTMJ27XhqE3msnoapplg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'okyour.mapbox.access.ten'
  }).addTo(mymap);
};

var updateMap = function updateMap() {
  var container = L.DomUtil.get('mapid');

  if (container != null) {
    container._leaflet_id = null;
  }
};

var resetMap = function resetMap() {
  var mymap = L.map('mapid').setView([51.5074, 0.1278], 3);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxpbmExMjM0IiwiYSI6ImNrcWNmM3JqeDFpbHEzMm12NXZlc3RpcjQifQ.WcfTMJ27XhqE3msnoapplg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWxpbmExMjM0IiwiYSI6ImNrcWNmM3JqeDFpbHEzMm12NXZlc3RpcjQifQ.WcfTMJ27XhqE3msnoapplg'
  }).addTo(mymap);
};

var resetListDiv = function resetListDiv() {
  var searchedApi = document.querySelector('.list');

  if (searchedApi) {
    searchedApi.remove();
  }
};

document.querySelector(".button").addEventListener("click", function (e) {
  e.preventDefault();
  var userInput = document.querySelector(".form-control").value;
  displayError(userInput);
});
resetMap();
//# sourceMappingURL=app.js.map
