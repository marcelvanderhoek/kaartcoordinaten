(function() {
'use strict';

/**
* Selectors
*/
var knop = document.getElementById("zoekop");

/**
* Methods
*/
function converteerNaarLengteBreedte(x, y) {
    // Converteert Rijksdriehoekscoördinaten naar lengte- en breedtegraden voor Maps
    // Bronfunctie in C#: https://www.roelvanlisdonk.nl/?p=2950
    var resultaat;

    // Gebruik Amersfoort als referentiepunt
    var referentieRdX = 155000;
    var referentieRdY = 463000;
    var referentieWgs84X = 52.15517;
    var referentieWgs84Y = 5.387206;

    var dX = (x - referentieRdX) * (Math.pow(10,-5));
    var dY = (y - referentieRdY) * (Math.pow(10,-5));

    var somN = 
        (3235.65389 * dY) + 
        (-32.58297 * Math.pow(dX, 2)) + 
        (-0.2475 * Math.pow(dY, 2)) + 
        (-0.84978 * Math.pow(dX, 2) * dY) + 
        (-0.0655 * Math.pow(dY, 3)) + 
        (-0.01709 * Math.pow(dX, 2) * Math.pow(dY, 2)) + 
        (-0.00738 * dX) + 
        (0.0053 * Math.pow(dX, 4)) + 
        (-0.00039 * Math.pow(dX, 2) * Math.pow(dY, 3)) + 
        (0.00033 * Math.pow(dX, 4) * dY) + 
        (-0.00012 * dX * dY);

    var somO = 
        (5260.52916 * dX) + 
        (105.94684 * dX * dY) + 
        (2.45656 * dX * Math.pow(dY, 2)) + 
        (-0.81885 * Math.pow(dX, 3)) + 
        (0.05594 * dX * Math.pow(dY, 3)) + 
        (-0.05607 * Math.pow(dX, 3) * dY) + 
        (0.01199 * dY) + 
        (-0.00256 * Math.pow(dX, 3) * Math.pow(dY, 2)) + 
        (0.00128 * dX * Math.pow(dY, 4)) + 
        (0.00022 * Math.pow(dY, 2)) + 
        (-0.00022 * Math.pow(dX, 2)) + 
        (0.00026 * Math.pow(dX, 5));

    var breedte = referentieWgs84X + (somN / 3600);
    var lengte = referentieWgs84Y + (somO / 3600);

    resultaat = {
        lat: breedte,
        lng: lengte
    };

    return resultaat;
}

function initMap(lengteBreedte) {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: lengteBreedte,
        zoom: 16
    });

    var marker = new google.maps.Marker({
        position: lengteBreedte,
        map: map,
    }); 
}

function drukOpKnop(e) {
    e.preventDefault();
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;
    initMap(converteerNaarLengteBreedte(x,y));
}

/**
* Event listeners, init
*/
knop.addEventListener('click', drukOpKnop, false);

window.onload = function() {
    initMap({lat: 51.93012494616005, lng: 4.642782949904703});
};

})();