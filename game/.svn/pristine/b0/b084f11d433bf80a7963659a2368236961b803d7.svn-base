
function initialize() {
	var mapOptions = {
		zoom : 17,
		center : new google.maps.LatLng(9.9333333, -84.0833333)
	};

	var map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
	var mapSelect = new google.maps.Map(document.getElementById('map-select'),
			mapOptions);

}

function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&'
			+ 'callback=initialize';
	document.body.appendChild(script);
}

window.onload = loadScript;

var map;
AmCharts.ready(function() {
	map = new AmCharts.AmMap();
	map.pathToImages = "http://www.amcharts.com/lib/3/images/";
	map.panEventsEnabled = true;
	map.backgroundColor = "transparent";
	map.backgroundAlpha = 1;

	map.zoomControl.panControlEnabled = false;
	map.zoomControl.zoomControlEnabled = false;

	var dataProvider = {
		map : "costaRicaLow",
		getAreasFromMap : true
	};

	map.dataProvider = dataProvider;

	map.areasSettings = {
		autoZoom : false,
		color : "#A9A9A9", // color de las provincias
		colorSolid : "#DFDFDF",
		selectedColor : "#C8C8C8",
		outlineColor : "#DFDFDF",
		rollOverColor : "#88CAE7",
		rollOverOutlineColor : "#FFFFFF",
		selectable : true
	};

	map.addListener('clickMapObject', function(event) {
		// deselect the area by assigning all of the dataProvider as selected
		// object
		map.selectedObject = map.dataProvider;

		// toggle showAsSelected
		event.mapObject.showAsSelected = !event.mapObject.showAsSelected;

		// bring it to an appropriate color
		map.returnInitialColor(event.mapObject);

		// let's build a list of currently selected states
		var states = [];
		for ( var i in map.dataProvider.areas) {
			var area = map.dataProvider.areas[i];
			if (area.showAsSelected) {
				states.push(area.title);
			}
		}
	});

	map.write("mapCostaRica");

});

$(document).ready(function() {
	var buttonSearch = $(".clickSearch");
	buttonSearch.on('click', function(e) {

		$("#textSearchOffi").toggle('slide', {
			direction : "right"
		}, 600);
	});
	var selectProv = $("path");
	selectProv.on('click', function(e) {

		$('.selectItemMap').toggle()
	});
});