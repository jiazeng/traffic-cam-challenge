// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box


$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var center = {
        lat: 47.6,
        lng: -122.3
    };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();

    var stations;
    var markers = [];

    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function (data) {
            stations = data;

            data.forEach(function (station, itemIndex) { //adding item index?
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(station.location.latitude),
                        lng: Number(station.location.longitude)
                    },
                    map: map
                });

                markers.push(marker);

                google.maps.event.addListener(marker, 'click', function () {
                    map.panTo(marker.getPosition());

                    var html = '<p>' + station.cameralabel + '</p>';
                    html += '<img src="' + station.imageurl.url + '">';

                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                });

                $("#search").bind("search keyup", function () {
                    //var searchString = this.value.toLowerCase();
                    //iterate over the array to find the string
                    var value = station.cameralabel.toLowerCase().indexOf(this.value.toLowerCase());

                    if(value < 0) { //if the phrase does not exist, remove marker
                        marker.setMap(null);
                    }
                    else { //if the phrase exist, leave the marker on the map
                        marker.setMap(map);
                    }

                });
            });
        })
        .fail(function (error) {
            console.log(error)
        })
        .always(function () {
            $('#ajax-loader').fadeOut();
        });

});

/*
 javascript
 every object in the dataset, has an object, string camerallabel
 iterate over the array .for each
 is this substring in this string?? .index of
 casing: move both string to lowercase, and campare

 traffic map: camera and marker
 if camera does not qualify, remove the marker (which is a different array)
 can remove the marker by (index, associated markers has the same index)
 if on index 5 of the station array, then remove index 5 of the marker array

 itteating camera array
 if qualify(match search), leave alone
 if not, set corresponding = null
 itemIndex

 keyUp
 Search :bind

 */

