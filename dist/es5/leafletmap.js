(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Define map:
'use strict';

var mymap = L.map('map');

var popup;

// Set a custom icons:
var lostIcon = L.icon({
  iconUrl: 'assets/images/lost.png',
  iconAnchor: [16, 16]
});

var foundIcon = L.icon({
  iconUrl: 'assets/images/bullseye.png',
  iconAnchor: [16, 16]
});

// Custom marker set to Coastal Court.
var myMarker = L.marker([41.349130445526036, -71.76293939352036], { icon: lostIcon, title: "Lost: My Favorite Penny!", clickable: true }).addTo(mymap);

// Test icon: Near Valenti subaru:
var foundMarker = L.marker([41.350187539517876, -71.76687955856323], { icon: foundIcon, title: "Found: Me Lucky Charm!", clickable: true }).addTo(mymap);

// Lost:
myMarker.bindPopup("<h2>Lost my favorite penny!</h2>" + "<h3>Area Lost:</h3>" + "<p>Near mailbox</p>" + "<h3>Description of item:</h3>" + "<p>Shiny penny circa 1976</p>" + "<h3>Contact/Return item:</h3>" + "<p>Christopher Adams</p>" + "<p>10A Coastal Court</p>" + "<p>Westerly, RI 02891</p>" + "<p><a href='mailto:chrismichaeladams@gmail.com'>chrismichaeladams@gmail.com</a></p>");

// Found:
foundMarker.bindPopup("<h2>Found a four leaf clover!</h2>" + "<h3>Area Found:</h3>" + "<p>In the grass.</p>" + "<h3>Description of item:</h3>" + "<p>Looks kina like grass.</p>" + "<h3>Contact/Return item:</h3>" + "<p>Mr. Lucky Charms</p>" + "<p>End o' the Rainbow Circle</p>" + "<p>Pot of Gold, RI 02891</p>" + "<p><a href='mailto:#'>kidsAlwaysBeEatingMeLuckyCharms@fake.com</a></p>");

// Polyline outline the area item was lost on Coastal Court:
// Coordinates found w/ http://www.findlatitudeandlongitude.com/
var polyline = L.rectangle([[41.349059971982975, -71.76286697387695], [41.349068026106046, -71.76307618618011], [41.34884653735865, -71.7630922794342]], { color: 'red', weight: 1 }).addTo(mymap);

// Add Layers:
var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Hydda_RoadsAndLabels = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/roads_and_labels/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

mymap.addLayer(Esri_WorldImagery);
mymap.addLayer(Hydda_RoadsAndLabels);

mymap.on('locationfound', foundLocation);
mymap.on('locationerror', notFoundLocation);
mymap.on('click', onMapClicked);
mymap.on('mousemove', onMapHover);

// Locate current user's geolocation:
mymap.locate({ setView: false });

// When geolocation is found, add marker and set a radius circle around it.
function foundLocation(e) {
  var location = e.latlng;
  var radius = e.accuracy / 2;

  // Set a custom icon:
  var homeIcon = L.icon({
    iconUrl: 'assets/images/placeholder.png',
    iconAnchor: [16, 16]
  });

  L.marker(location, { icon: homeIcon, title: "Your Location" }).addTo(mymap);
  L.circle(location, { color: 'red', radius: radius }).addTo(mymap);
  mymap.setView([e.latlng.lat, e.latlng.lng], 12);
}

// If not found then set zoom further out to generic Westerly, RI location:
function notFoundLocation(e) {
  alert("Unable to find your location, You may need to enable Geolocation. Setting to default location.");
  mymap.setView([41.34884653735865, -71.7630922794342], 10);
}

function onMapHover(e) {
  $('#latLngVal').text(e.latlng);
}

// Create new marker when map is clicked
function onMapClicked(e) {
  console.log("Map right click");
  var createMarker = confirm("Enter marker here?");

  if (createMarker) {
    var lostOrFound = prompt("lost or found?").toLowerCase();

    if (lostOrFound === "lost") {
      var createMarkerLat = e.latlng.lat;
      var createMarkerLng = e.latlng.lng;
      var userMarker = L.marker([createMarkerLat, createMarkerLng], { icon: lostIcon, title: "New Lost Marker created!", clickable: true, draggable: true }).addTo(mymap);
    } else if (lostOrFound === "found") {
      var createMarkerLat = e.latlng.lat;
      var createMarkerLng = e.latlng.lng;
      var userMarker = L.marker([createMarkerLat, createMarkerLng], { icon: foundIcon, title: "New Found Marker created!", clickable: true, draggable: true }).addTo(mymap);
    } else {
      console.log("User cancelled");
    }
  } else {
    console.log("No don't create marker");
  }
}

},{}]},{},[1]);
