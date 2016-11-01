$(function() {
	// $('.promotions-button').click(function() {
	// //_nearme.getPromotions();
	// });
	//    
	$('.dropdown-menu li').click(function(e) {
		e.stopPropagation();
	});
	
	// agencies
	$(document).on('click', '.category-1', function() {
		var categoryId = 1;
		_nearme.toggleCategory('category-1', categoryId);
		return false;
	});

	// atms
	$(document).on('click', '.category-2', function() {
		var categoryId = 2;
		_nearme.toggleCategory('category-2', categoryId);
		return false;
	});

	// stores
	$(document).on('click', '.category-3', function() {
		var categoryId = 3;
		_nearme.toggleCategory('category-3', categoryId);
		return false;
	});

	// selling-properties
	$(document).on('click', '.category-4', function() {
		var categoryId = 4;
		_nearme.toggleCategory('category-4', categoryId);
		return false;
	});
	var toogleFucntion = 0;
	$('#mutualEnLinea').on('click', function(){
		if(toogleFucntion ===0){
			$('.tablet-interest-points-list ').hide();
			toogleFucntion = 1;
		}
		else{
			toogleFucntion = 0;
			$('.tablet-interest-points-list ').show();
		}
	})
	
	$('.menuPrincipal .dropdown').on('mouseover', function(){
		$('.tablet-interest-points-list ').hide();
			toogleFucntion = 0;		
	})
	$('.menuPrincipal .dropdown').on('mouseout', function(){
		$('.tablet-interest-points-list ').show();
			toogleFucntion = 0;		
	})

	//current location
	$('.current-location-button').click(function() {
		currentLocation = 'Según mi Ubicación Actual';
		_nearme.updateDeviceGeolocationCurrentPosition();
		_nearme.init();
	});
	
	//display the map and the button back
	$(".a-back-ip-details").click(function() {
		_nearme.setCategories();
		_nearme.showMap();
		$('.list-content').hide();
		$(".a-back-ip-details").css('display', 'none');

	});


	$('header, #full-map').click(function() {
		$("#full-list").hide();
		$('.list-content').hide();
	});
	$(".a-show-map").click(function(event) {
		 event.stopPropagation();
		_nearme.setCategories();
		if($("#full-list").is(':visible')){
			$("#full-list").hide();
			$('.list-content').hide();
		}
		else{
		$("#full-list").show();
		$('.list-content').show();
		}

	});
	
	
	$('input.filter-box').bind('keypress', function (event) {
	     var regex = new RegExp("^[a-zA-Z0-9]+$");
	     var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	     if (!regex.test(key)) {
	        event.preventDefault();
	        return false;
	     }
	 });
	
	$('.a-show-list, .a-back-region-list').click(function() {
		_nearme.showList();
		$("#full-map").show();
		$('.filter-box').show();
	});

	$(".tablet-a-interest-points").click(function() {
		$("#search-bar").css('display', 'none');
	});

	$('.filter-list').click(function() {
		$('#autocomplete-list').focus();
	});

	$('.IP-list-header, .a-back-picker').click(function() {
		_nearme.showRegionList();
	});

	$(document).on('click', '.IP-list > .IP-list-results > li', function() {
		var index = $(this).index();
		_nearme.showInterestPointDetails(index, 1);
	});

	$(document).on('click', '.search-IP-list > .ui-listview > li', function() {
		var id = $(this).data('ipId');
		_nearme.centerInterestPoint(id);
		$("#search-bar").toggle();
	});

	$(document).on('click', '.tablet-interest-point-results > li', function() {
		var index = $(this).index();
		if (index > 0) {
			var id = $(this).data('ipId');
			_nearme.showInterestPointDetails(id, 2);
		}
	});

	$(document).on('click', '.tablet-show-list', function(event) {
		_nearme.showList();
		$("#location-list-picker").show();
		 event.stopPropagation();
	});

	$('.regions-list > li').click(function(event) {
		var type = $(this).index();
		_nearme.openLocationPicker(type);
		 event.stopPropagation();
	});

//	$('.a-Search').click(function() {
//		_nearme.showQuickSearch();
//		_nearme.updateInterestPointsListData();
//	});

	$('.a-search-location').click(function() {
		_nearme.getInterestPointsWithLocations();
		_nearme.showList();
	});

	$(window).on("orientationchange", function(event) {
		setTimeout(function() {
			_nearme.setHeights();
			_nearme.setListTabletStyle();

		}, 500);

	});
	$(window).on("resize", function(event) {
		setTimeout(function() {
			_nearme.setHeights();
			_nearme.setListTabletStyle();

		}, 500);

	});

	$('.tablet-interest-points-list > .input-group-btn').on({
		"shown.bs.dropdown" : function() {
			_nearme.toggleActiveIconOnAnchors('fa-List');
		},
		"hide.bs.dropdown" : function() {
			_nearme.toggleActiveIconOnAnchors('fa-List');
		}
	});

});

/**
 * Find us page Functions
 */

var _nearme = (function($) {

	currentLocation = 'Según mi Ubicación Actual';
	var atms = 2, agencies = 1, stores = 3, sellingProperties = 4;
	var actualCanton = 0, actualDistrict = 0, actualProvince = 0;
	var interestPointsData = [];
	var canvasId = 'full-map';
	var categoriesDetailElement = '<li class="bottom-border"><a href="javascript:" class="category-{code}" ><i class="fa fa-option-category-{code} fa-categories-active"></i><i class="fa fa-categories fa-category-{code}"></i><span">{name}</span></a></li>';
	var category1Icon = MM_CONTEXT_PATH + "assets/nearMe/bubble_cajero.png";
	var category2Icon = MM_CONTEXT_PATH + "assets/nearMe/bubble_agencias.png";
	var category3Icon = MM_CONTEXT_PATH + "assets/nearMe/bubble_comercios.png";
	var category4Icon = MM_CONTEXT_PATH + "assets/nearMe/bubble_bienesraices.png";
	var currentDeviceLocationIcon = MM_CONTEXT_PATH + "assets/nearMe/icono.jpg";
	var deviceLatitude = 0; // 10.0140029
	var deviceLongitude = 0; // -84.2239917
	var geolocationenableHighAccuracy = true;
	var geolocationMaximumAge = 75000;
	var geolocationTimeout = 80000;
	var interestPointDropDownTabletElement = '<li data-ip-id="{index}" class="bottom-border"><a href="#"><i class="fa fa-{category} tablet-fa-IP-list"></i><span class="tablet-IP-list-name">{name}</span><span class="tablet-IP-list-address">{address}</span></a></li>';
	var interestPointDropDownElement = '<li data-ip-id="{index}" class="ui-screen-hidden"><a href="javascript:"><i class="fa fa-{category} fa-IP-list"></i><span class="IP-list-name">{name}</span><span class="IP-list-address">{address}</span></a></li>';
	 var interestPointDetailElement = '<div class="interest-point-detail-img">' + 
		'<img id="imgInterestPont" alt="{name}" src="{url}" />' +
	'</div>' +
	
	'<div class="menu-container">'+
	'<a href="{callAction}" class="details-link {displayStatusCall}">' +
		'<i class="glyphicons earphone"></i>' +
	'</a>'+
	'<a href="{addressAction}" class="details-link">' +
		'<i class="waze glyphicons"></i>' +
	'</a>'+
	'<a href="{emailAction}" class="details-link {displayStatusEmail}">' +
		'<i class="glyphicons envelope"></i>' +
	'</a>'+											
	'</div>'+	
	'<div class="IP-detail-header">' +
		'<span>{name}</span>' +
	'</div>' +
	'<div class="interest-point-details-body">' +
		'<ul>' +
			'<li>' +
				'<div class="fa fa-details fa-details-address"></div>' +
				'<div class="fa-details-value"><span class="details-label">Direcci&oacute;n: </span>' +
				'<span class="details-value">{address}</span>' +									
			'</div>' +							
			'</li>' +
			'{hasLocation}' +
			'{hasPhone}' +
			'{hasAdditionalPhone}' +
			'{hasFax}' +
			'{hasEmail}' +
			'{hasProvince}' +
			'{hasCanton}' +
			'{hasDistrict}' +	
			'{hasCategory}' +	
			'{hasHorary}' +
			'{hasSaturday}' +
			'{hasSunday}' +
			'{hasDetails}' +	
			'{hasAdditionalInfo}' +
			'{hasLink}' +
		
		'</ul>' +								
	'</div>';

	var interestPointDetailAdditionalInfoElement = '<li>'
			+ '<div class="fa fa-details fa-details-info"></div>'
			+ '<div class="fa-details-value"><span class="details-label">Informaci&oacute;n Adicional: </span>'
			+ '<span class="details-value">{info}</span></div>' + '</li>';

	var interestPointLinkElement = '<li>'
		+ '<div class="fa fa-details fa-details-info"></div>'
		+ '<div class="fa-details-value"><span class="details-label">Enlace: </span>'
		+ '<a class="details-value" href= "{link}">{link}</a></div>' + '</li>';
	
	var interestPointDetailAdditionalPhoneElement = '<li>'
			+ '<div class="fa fa-details fa-details-phone"></div>'
			+ '<div class="fa-details-value"><span class="details-label">Tel&eacute;fono Adicional: </span>'
			+ '<span class="details-value">{phone2}</span></div>' + '</li>';

	var interestPointDetailCantonElement = '<li>'
			+ '<div class="fa fa-details fa-details-address"></div>'
			+ '<div class="fa-details-value"><span class="details-label">Cant&oacute;n: </span>'
			+ '<span class="details-value">{canton}</span>' + '&nbsp;&nbsp;'
			+ '</li>';

	var interestPointDetailCategoryElement = '<li>'
			+ '<div class=""></div>'
			+ '<div class="fa-details-value"><span class="details-label">Categor&iacute;a: </span>'
			+ '<span class="details-value">{category}</span>' + '&nbsp;&nbsp;'
			+ '</li>';

	// var interestPointDetailCodeElement = '<li>' +
	// '<div class="fa fa-details fa-details-id"></div>' +
	// '<div class="fa-details-value"><span class="details-label">ID: </span>' +
	// '<span class="details-value">{code}</span></div>' +
	// '</li>';

	var interestPointDetailDetailsElement = '<li>'
			+ '<div class="fa fa-details fa-details-details"></div>'
			+ '<div class="fa-details-value"><span class="details-label">Detalles: </span>'
			+ '<a href="{detailsAction}" class="details-link">{detailsAction}</a></div>'
			+ '</li>';

	var interestPointDetailDistrictElement = '<li>'
			+ '<div class="fa fa-details fa-details-address"></div>'
			+ '<div class="fa-details-value"><span class="details-label">Distrito: </span>'
			+ '<span class="details-value">{district}</span>' + '&nbsp;&nbsp;'
			+ '</li>';

	var interestPointDetailFaxElement = '<li>'
			+ '<div class="fa fa-details fa-details-fax"></div>'
			+ '<div class="fa-details-value"><span class="details-label">Fax: </span>'
			+ '<span class="details-value">{fax}</span></div>' + '</li>';

	var interestPointDetailHoraryElement = '<li>'
			+ '<div class="fa fa-details fa-details-horary"></div>'
			+ '<div class="fa-details-value"><span class="details-label">Horario Regular: </span>'
			+ '<span class="details-value">{horary}</span></div>' + '</li>';

	var interestPointDetailHorarySaturdayElement = '<li>'
			+ '<div class="fa fa-details fa-details-horary"></div>'
			+ '<div class="fa-details-value hor"><span class="details-label">Sabado: </span>'
			+ '<span class="details-value">{saturday}</span></div>' + '</li>';
	
	var interestPointDetailHorarySundayElement = '<li>'
			+ '<div class="fa fa-details fa-details-horary"></div>'
			+ '<div class="fa-details-value hor"><span class="details-label">Domingo: </span>'
			+ '<span class="details-value">{sunday}</span></div>' + '</li>';


	var interestPointDetailLocationElement = '<li>'
			+ '<div class="fa fa-details fa-details-location"></div>'
			+ '<div class="fa-details-value"><span class="details-label">Latitud: </span>'
			+ '<span class="details-value">{latitude}</span>' + '&nbsp;&nbsp;'
			+ '<span class="details-second-label">Longitud: </span>'
			+ '<span class="details-value">{longitude}</span></div>' + '</li>';

    var interestPointDetailEmailElement = '<li>' +
	'<div class="fa fa-details fa-details-fax"></div>' +
	'<div class="fa-details-value"><span class="details-label">Correo Electronico: </span>' +
	'<span class="details-value">{email}</span></div>' +																												
	'	</li>';
	var interestPointDetailPhoneElement = '<li>'
			+ '<div class="fa fa-details fa-details-phone"></div>'
			+ '<div class="fa-details-value"><span class="details-label">Tel&eacute;fono Principal: </span>'
			+ '<span class="details-value">{phone}</span></div>' + '</li>';

	var interestPointDetailProvinceElement = '<li>'
			+ '<div class="fa fa-details fa-details-address"></div>'
			+ '<div class="fa-details-value"><span class="details-label">Provincia: </span>'
			+ '<span class="details-value">{province}</span>' + '&nbsp;&nbsp;'
			+ '</li>';

	var interestPointTableHeaderElement = '<li class="bottom-border"><a href="javascript:" class="tablet-show-list"> <span id="ubicationSpan"> '
			+ currentLocation + ' </span></a></li>';

    var PromotionsDetailElement = '         <div class="interest-point-detail-img promotion-image">' + 
	'<img id="imgPromo" class="promo-img" src="{url}" />' +
'</div>' +
'<div class="IP-detail-header">' +
	'<span class="promo-name"></span>' +
'</div>' +
'<div class="interest-point-details-body">' +
	'<ul>' +
		'<li>' +
			'<div class=""><span class="details-label">Descripcion: </span>' +
				'<span class="details-value description-promo"></span>' +									
			'</div>' +							
		'</li>' +
		'<li>' +
			
			'<div class=""><span class="details-label">Inicio: </span>' +
			'<span class="details-value start-promo"></span>' +									
		'</div>' +							
		'</li>' +
		'<li>' +
			
			'<div class=""><span class="details-label">Valido hasta: </span>' +
			'<span class="details-value end-promo"></span>' +									
		'</div>' +							
	'</li>' +
		
	'</ul>' +								
'</div>';
	var isMapActive = true;
	var map = null;
	var atmMarkersArray = [];
	var atmMarkersArrayProvisional = [];
	var agencyMarkersArray = [];
	var agencyMarkersArrayProvisional = [];
	var currentPositionMarkersArray = [];
	var storeMarkersArray = [];
	var storeMarkersArrayProvisional = [];
	var selectedCanton = 0, selectedDistrict = 0, selectedProvince = 0;
	var sellingPropertyMarkersArray = [];
	var sellingPropertyMarkersArrayProvisional = [];
	var interestPointsDataList = [];

	var init = function() {
		categoryCode = [];
		actualCanton = 0;
		actualDistrict = 0;
		actualProvince = 0;
		atmMarkersArray = [];
		atmMarkersArrayProvisional = [];
		agencyMarkersArray = [];
		agencyMarkersArrayProvisional = [];
		currentPositionMarkersArray = [];
		storeMarkersArray = [];
		storeMarkersArrayProvisional = [];
		sellingPropertyMarkersArray = [];
		sellingPropertyMarkersArrayProvisional = [];
		interestPointsDataList = [];
		setCategories();
		setHeights();
		_utils.checkProvincesData("_nearme");
		drawMenus();
		fullScreenMap();
		$('.canton-picker').html("Seleccionar");
		$('.province-picker').html("Seleccionar");
		$('.district-picker').html("Seleccionar");
		$("#main").css('background', '#fff');

		_gaTracker('send', 'pageview'); // Send analytics pageview
	};

	var addCurrentLocationMarker = function(deviceCurrentLatandLong) {

		var markerOptions = {
			position : deviceCurrentLatandLong,
			map : map,
			icon : currentDeviceLocationIcon,
			clickable : false
		};
		var marker = new google.maps.Marker(markerOptions);
		currentPositionMarkersArray.push(marker);
	};

	var addInterestPointData = function(interestPoint) {
		var idCategory = interestPoint['CategoriaPuntoInteres']['Codigo'];
		idCategory = parseInt(idCategory);

		switch (idCategory) {
		case atms:
			atmMarkersArray.push(interestPoint);
			break;
		case agencies:
			agencyMarkersArray.push(interestPoint);
			break;
		case stores:
			storeMarkersArray.push(interestPoint);
			break;
		case sellingProperties:
			sellingPropertyMarkersArray.push(interestPoint);
			break;
		}
	};

	var addInterestPointToList = function(val) {
		interestPointsDataList.push(val);
	};

	var infoWindowArray = [];

	var addMarker = function(categoryId, latlong, title, content, info) {
		var array = [];
		var infowindow = new google.maps.InfoWindow({
			content : content
		});
		var urlIcon = '';
		categoryId = parseInt(categoryId);
		switch (categoryId) {
		case atms:
			urlIcon = category1Icon;
			array = atmMarkersArrayProvisional;
			break;
		case agencies:
			urlIcon = category2Icon;
			array = agencyMarkersArrayProvisional;
			break;
		case stores:
			urlIcon = category3Icon;
			array = storeMarkersArrayProvisional;
			break;
		case sellingProperties:
			urlIcon = category4Icon;
			array = sellingPropertyMarkersArrayProvisional;
			break;
		}
		var markerOptions = {
			position : latlong,
			map : map,
			title : title,
			clickable : true,
			icon : urlIcon
		};
		var marker = new google.maps.Marker(markerOptions);
		if (info === 1) {
			infowindow.open(map, marker);
		}
		array.push(marker);
		infoWindowArray.push(infowindow);
		google.maps.event.addListener(marker, 'click', function() {
			clearInfoWindowArray();
			infowindow.open(map, marker);
			map.setCenter(marker.getPosition());
		});
		google.maps.event.addListener(map, 'click', function() {
			infowindow.close();
		});
	};

	var clearInfoWindowArray = function() {
		$.each(infoWindowArray, function(key, val) {
			val.close();
		});
	};

	var centerInterestPoint = function(id) {
		var interestPoint = interestPointsDataList[id];
		var title = interestPoint['Nombre'];
		var address = interestPoint.direccion['Direccion'];
		var categoryId = interestPoint['CategoriaPuntoInteres']['Codigo'];
		var latitude = interestPoint.direccion['Latitud'];
		var longitude = interestPoint.direccion['Longitud'];
		var markerLatLong = new google.maps.LatLng(latitude, longitude);
		var content = '<div id="content" style="with:auto; height:80px"><a href=javascript:_nearme.showInterestPointDetails('
				+ id
				+ ',2);>'
				+ '<h4 class="firstHeading cards-entity-address">'
				+ title
				+ '</h4><span class="marker-details-address">'
				+ address
				+ '</span></a>' + '</div>';

		map.setCenter(markerLatLong);

		addMarker(categoryId, markerLatLong, title, content, 1);
	};

	var changeCanton = function(canton) {
		selectedCanton = canton;
		if (selectedCanton !== 'Seleccionar') {
			currentLocation = selectedProvince + ', ' + selectedCanton;
		}
		$('.canton-picker').html(canton);
	};

	var changeDistrict = function(district) {
		selectedDistrict = district;
		if (selectedDistrict !== 'Seleccionar') {
			currentLocation = selectedProvince + ', ' + selectedCanton + ', '
					+ selectedDistrict;
		}
		$('.district-picker').html(district);

	};

	var changeProvince = function(province) {
		selectedProvince = province;
		currentLocation = province;
		$('.province-picker').html(province);
	};

	var changeTitle = function(categoryId) {
		var propertyTitle = 'Propiedades';
		var infoTitle = 'Informaci&oacute;n';
		var title = categoryId == sellingProperties ? propertyTitle : infoTitle;
		$(".title").html(title);
	};

	var clearMarkers = function() {
		atmMarkersArray = [];
		clearMarkersCategory(atmMarkersArrayProvisional);
		agencyMarkersArray = [];
		clearMarkersCategory(agencyMarkersArrayProvisional);
		storeMarkersArray = [];
		clearMarkersCategory(storeMarkersArrayProvisional);
		sellingPropertyMarkersArray = [];
		clearMarkersCategory(sellingPropertyMarkersArrayProvisional);
	};

	var clearMarkersCategory = function(markersArray) {
		for (var i = 0; i < markersArray.length; i++) {
			markersArray[i].setMap(null);
		}
		markersArray.length = 0;
	};

	var drawInterestPointsList = function(interestPointsData) {
		var interestPointDropdown = '';
		var interestPointElement;

		var tabletInterestPointDropdown = '';
		var tabletInterestPointElement;

		$.each(interestPointsData, function(key, val) {
			interestPointElement = getCategoryName(
					val['CategoriaPuntoInteres']['Codigo'], false);
			interestPointElement = interestPointElement
					.replace(/{index}/g, key);
			interestPointElement = interestPointElement.replace(/{name}/g,
					val['Nombre'].replace(/ /g, '&nbsp;'));
			interestPointElement = interestPointElement.replace(/{address}/,
					val.direccion['Direccion']);
			interestPointDropdown += interestPointElement;
			tabletInterestPointElement = getCategoryName(
					val['CategoriaPuntoInteres']['Codigo'], true);
			tabletInterestPointElement = tabletInterestPointElement.replace(
					/{index}/g, key);
			tabletInterestPointElement = tabletInterestPointElement.replace(
					/{name}/g, val['Nombre'].replace(/ /g, '&nbsp;'));
			tabletInterestPointElement = tabletInterestPointElement.replace(
					/{address}/, val.direccion['Direccion']);
			tabletInterestPointDropdown += tabletInterestPointElement;

		});

		$('.tablet-interest-point-results').html(
				interestPointTableHeaderElement + tabletInterestPointDropdown);
		$('#ubicationSpan').html(currentLocation);
		$('.a-show-list').css('visibility', 'shown');
		
//		if (tabletInterestPointDropdown == '') {
//			$('.tablet-interest-point-results').html(
//					interestPointTableHeaderElement
//							+ '<span class="interest-points-error">'
//							+ _messages.globals.nearme.interestPointError
//							+ '</span>');
//		}

		$('.IP-list-results, .IP-list-results-search').html(
				interestPointDropdown);
	    // $('.IP-list-results, .IP-list-results-search').listview( "refresh" );
		// $( ".IP-list-results-search" ).filterable({ filterReveal: true });

//		if ($('input.filter-box').is(':visible')) {
//			$("input.filter-box").filterThis();
//			$('input.filter-box').val('');
//		}
		if (interestPointDropdown == '') {
			$('.IP-list-results, .IP-list-results-search').html(
					'<h5>' + 'No existen Puntos de Interés para mostrar'
							+ '</h5>');
		}
	};

	var drawMenus = function() {
		$('#content').addClass('full-content');
		$('.fa-nearme').addClass('fa-nearme-active');
	};

	var drawMarkers = function(data) {
		var latitude, longitude, name, interestPoint, categoryId;

		for (var i = 0; i < data.length; i++) {
			interestPoint = data[i];
			categoryId = interestPoint['CategoriaPuntoInteres']['Codigo'];
			latitude = interestPoint.direccion['Latitud'];
			longitude = interestPoint.direccion['Longitud'];
			name = interestPoint['Nombre'];
			address = interestPoint.direccion['Direccion'];

			drawMarker(categoryId, i, latitude, longitude, name, address);
		}
		if ((latitude == !undefined) && (longitude == !undefined)) {
			_nearme.setMapPosition(latitude, longitude);
		}
	};

	var drawMarker = function(categoryId, id, latitude, longitude, title,
			address) {

		var content = '<div id="content"><a href=javascript:_nearme.showInterestPointDetails('
				+ id
				+ ',2);>'
				+ '<h4 class="firstHeading cards-entity-address">'
				+ title
				+ '</h4><span class="marker-details-address">'
				+ address
				+ '</span></a>' + '</div>';

		var markerLatLong = new google.maps.LatLng(latitude, longitude);

		addMarker(categoryId, markerLatLong, title, content);
	};

	var errorDeviceLocationCallback = function(error) {
		$(".errorGetLocation").show();
		setTimeout(function() {
			$(".errorGetLocation").fadeOut(2000);
		}, 8000);
	//	console.log(error);
		_nearme.zoomLevel = 10;
		var setCurrentLocation = false;
		initialize(setCurrentLocation, "10.013720", "-84.223742");
	};

	var fullScreenMap = function() {
		navigator.geolocation.getCurrentPosition(successDeviceLocationCallback,
				errorDeviceLocationCallback, {
					timeout : geolocationTimeout,
					enableHighAccuracy : geolocationenableHighAccuracy,
					maximumAge : geolocationMaximumAge
				});
	};

	var getCantons = function(provinceId, province) {

		changeProvince(province);
		actualProvince = provinceId;
		actualCanton = 0;
		actualDistrict = 0;
		selectedCanton = '';
		selectedDistrict = '';
		changeCanton("Seleccionar");
		changeDistrict("Seleccionar");
		showRegionList();

		$('.ul-cantons').html('');
		$('.ul-districts').html('');
		$('.IP-list-header-locations').html(selectedProvince);

		var data = 'provinceId=' + provinceId;

		$.ajax({
			url : MM_CONTEXT_PATH + 'nearme/getCantons',
			type : 'GET',
			data : data,
			success : function(data) {
				_utils.processCantons(data, provinceId, '_nearme');
			},
			error : function(jqXHR, textStatus, errorThrown) {
			//	console.log(errorThrown);
			}
		});
		// updateInterestPointsListData();
		getInterestPointsWithLocations();
		//showList();
		// $('.a-search-location').click();

	};

	var getCategoryName = function(categoryId, isTablet) {
		var categoryName = '';
		categoryId = parseInt(categoryId);
		switch (categoryId) {
		case atms:
			categoryName = 'category-2';
			break;
		case agencies:
			categoryName = 'category-1';
			break;
		case stores:
			categoryName = 'category-3';
			break;
		case sellingProperties:
			categoryName = 'category-4';
			break;
		}
		var response = isTablet ? interestPointDropDownTabletElement.replace(
				/{category}/g, categoryName) : interestPointDropDownElement
				.replace(/{category}/g, categoryName);
		return response;
	};

	var getDeviceLatitude = function(position) {
		return position.coords.latitude;
	};

	var getDeviceLongitude = function(position) {
		return position.coords.longitude;
	};

	var getDistricts = function(provinceId, cantonId, cantonName, namespace) {

		actualCanton = cantonId;
		actualDistrict = 0;
		changeCanton(cantonName);
		changeDistrict("Seleccionar");
		showRegionList();

		selectedDistrict = '';
		$('.IP-list-header-locations').html(
				selectedProvince + ', ' + selectedCanton);
		$('.ul-districts').html('');

		var data = 'provinceId=' + provinceId + '&cantonId=' + cantonId;

		$.ajax({
			url : MM_CONTEXT_PATH + 'nearme/getDistricts',
			type : 'GET',
			data : data,
			success : function(data) {
				_utils.processDistricts(data, provinceId, namespace);
			},
			error : function(jqXHR, textStatus, errorThrown) {
			//	console.log(errorThrown);
			}
		});

		// updateInterestPointsListData();
		getInterestPointsWithLocations();
		//showList();
		// $('.a-search-location').click();

	};

	var getInterestPoints = function(latitude, longitude) {
		var data = 'latitude=' + latitude + '&longitude=' + longitude;

		$.ajax({
			url : MM_CONTEXT_PATH + 'nearme/getInterestPoints',
			type : 'GET',
			data : data,
			success : function(data) {

				interestPointsDataList = data;
				interestPointsData = data;
				updateInterestPointsListData();
			},
			error : function(jqXHR, textStatus, errorThrown) {
			//	console.log(errorThrown);
			}
		});
	};

	var getInterestPointsWithLocations = function() {
		var deviceLocation = "provinceId=" + actualProvince + '&cantonId='
				+ actualCanton + '&districtId=' + actualDistrict;
		
		$.ajax({
			url : MM_CONTEXT_PATH + 'nearme/getInterestPointsWithLocations',
			type : 'GET',
			data : deviceLocation,
			success : function(data) {
				if (data.length == 0) {
					$('.IP-list-results, .IP-list-results-search')
					.html('<h5>' + "No existen Puntos de Interés para mostrar" + '</h5>');
					}
				interestPointsDataList = data;
				interestPointsData = data;
				updateInterestPointsListData();
				//showList();
				},
				error : function(jqXHR, textStatus, errorThrown) {
					//console.log(errorThrown);
					}
				});
		};

	var getPhoneType = function(phoneList, type) {
		
		var response = '';
		$.each(phoneList, function(key, val) {
			if (val['TipoTelefono']['Nombre'] == type) {
				response = val['Numero'];
				return;
			}
		});
		return response;
	};

	 var getPromotions = function() {
	        var deviceLocation = 'latitude=' + deviceLatitude + '&longitude=' + deviceLongitude;
	        $.ajax({
	            url: MM_CONTEXT_PATH +'nearme/getPromotions',
	            type: 'GET',
	            data: deviceLocation,
	            success: function(data) {
	                //drawMarkers(data);
	            },
	            error: function(jqXHR, textStatus, errorThrown) {
	             //   console.log(errorThrown);
	            }
	        });
	    };

	var hideLocationPickers = function(remaingLocations) {
		$.each(remaingLocations, function(key, val) {
			$('#' + val + '-list-picker').hide();
		});
	};

	var hideSearchInput = function() {
		$("#search-bar").hide();
	};

	var initialize = function(isCurrentLocation, latitude, longitude) {

		
		var deviceCurrentLatandLong = new google.maps.LatLng(latitude,
				longitude);

		var mapOptions = {
			center : deviceCurrentLatandLong,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			zoom : _nearme.zoomLevel,
			panControl : false,
			zoomControlOptions : {
				position : google.maps.ControlPosition.LEFT_TOP
			}
		};

		map = new google.maps.Map(document.getElementById(canvasId), mapOptions);
		if (isCurrentLocation) {
			addCurrentLocationMarker(deviceCurrentLatandLong);
		}
		getInterestPoints(latitude, longitude);
	};

	var loadMarkerInfo = function(code, name, phone, fax, address,
			weekSchedule, weekendSchedule) {

		var url = MM_CONTEXT_PATH + 'markerdetails.html';
		var faxField = '<tr><td>Fax :</td><td colspan="2"> {fax-value} </td></tr>';
		var phoneField = '<tr><td>Tel&eacute;fonos :</td><td colspan="2"> {phone-value} </td></tr>';
		var scheduleField = '<tr><td colspan="3">Horario :</td></tr><tr><td style="width: 20%"></td><td style="width: 27%">Lunes &#45; Viernes :</td><td>{week-schedule}</td></tr><tr><td></td><td>S&aacute;bado :	</td><td>{weekend-schedule}</td></tr>';

		$.ajax({
			mimeType : 'text/html; charset=utf-8', // ! Need set mimeType only
													// when run from local file
			url : url,
			type : 'GET',
			success : function(data) {

				data = data.replace('{name}', name);
				data = data.replace('{address}', address);

				if (phone != 'null') {
					phoneField = phoneField.replace('{phone-value}', fax);

					data = data.replace('{phone}', phoneField);
				} else {
					data = data.replace('{phone}', '');
				}

				if (fax != 'null') {
					faxField = faxField.replace('{fax-value}', fax);
					data = data.replace('{fax}', faxField);
				} else {
					data = data.replace('{fax}', '');
				}

				if (weekSchedule != 'null') {
					scheduleField = scheduleField.replace('{week-schedule}',
							weekSchedule);
					scheduleField = scheduleField.replace('{weekend-schedule}',
							weekendSchedule);
					data = data.replace('{schedule}', scheduleField);
				} else {
					data = data.replace('{schedule}', '');
				}

				$('#ajax-content').html(data);

			},
			error : function(jqXHR, textStatus, errorThrown) {
				//console.log(errorThrown);
			},
			dataType : "html",
			async : false
		});
	};

	var openLocationPicker = function(type) {
		var province = 0, canton = 1, district = 2;

		switch (type) {
		case province:
			$('#provinces-list-picker').toggle();
			hideLocationPickers([ 'cantons', 'districts' ]);
			break;
		case canton:
			$('#cantons-list-picker').toggle();
			hideLocationPickers([ 'provinces', 'districts' ]);
			break;
		case district:
			$('#districts-list-picker').toggle();
			hideLocationPickers([ 'provinces', 'cantons' ]);
			break;
		}
	};

	var replaceInterestPointDetailAddressInfo = function(body, detail, element,
			detailToReplace, bodyToReplace, addressElement,
			detailAddressToReplace) {
		if (element == null || element == 'null') {
			return body.replace('{' + bodyToReplace + '}', '');
		} else {
			detail = detail.replace('{' + detailAddressToReplace + '}',
					addressElement);

			detail = detail.replace('{' + detailToReplace + '}', element);
			return body.replace('{' + bodyToReplace + '}', detail);
		}
	};

	var replaceInterestPointDetailInfo = function(body, detail, element,
			detailToReplace, bodyToReplace) {
		if (element == null || element == 'null') {
			return body.replace('{' + bodyToReplace + '}', '');
		} else {
			if (element !== '') {
				detail = detail.replace('{' + detailToReplace + '}', element);
			} else {
				detail = '';
			}
			detail = detail.replace('{' + detailToReplace + '}', element);
			return body.replace('{' + bodyToReplace + '}', detail);
		}
	};

	var setCategories = function() {
		var categoriesDropdown = '', categoriesElement = '';
		if (_nearme.categories) {
			$.each(_nearme.categories, function(key, val) {
				categoriesElement = categoriesDetailElement.replace(/{code}/g,
						val.code);
				categoriesElement = categoriesElement.replace(/{name}/g,
						val.description.replace(/ /g, '&nbsp;'));
				categoriesDropdown += categoriesElement;
			});

			$('.categories-list').html(categoriesDropdown);
		} else {
			$('.categories-list').html(
					'<span class="categories-error">' + "La Pagina no Existe"
							+ '</span>');
		}
	};

	var setCurrentPosition = function(latitude, longitude) {
		var currentLatandLong = new google.maps.LatLng(latitude, longitude);
		map.setCenter(currentLatandLong);
		clearMarkersCategory(currentPositionMarkersArray);
		addCurrentLocationMarker(currentLatandLong);
	};

	var setMapPosition = function(latitude, longitude) {
		var currentLatandLong = new google.maps.LatLng(latitude, longitude);
		map.setCenter(currentLatandLong);
		map.setZoom(13);
		// clearMarkersCategory(currentPositionMarkersArray);
		// addCurrentLocationMarker(currentLatandLong);
	};

	var setDistrict = function(districtId, districtName) {
		actualDistrict = districtId;
		changeDistrict(districtName);

		$('.IP-list-header-locations').html(
				selectedProvince + ', ' + selectedCanton + ', '
						+ selectedDistrict);

		showRegionList();

		// updateInterestPointsListData();
		getInterestPointsWithLocations();
		//showList();

	};

	var setHeights = function() {
		 
		$('#content').addClass('full-content');
	//	_utils.setMenuHeights();
		_utils.setMinBlockHeight($('.fullscreenmap'));
		var screenHeight = window.innerHeight;
		$('.search-IP-list').css('max-height', screenHeight - 108-220);
		$('.main-content').css('max-height', screenHeight );

		var ipListHeightToReduce = true ? 324 : 190;
		$('.IP-list-results').css('max-height',
				screenHeight - ipListHeightToReduce );
		$('.ul-provinces, .ul-cantons, .ul-districts').css('max-height',
				screenHeight - 150 -220);

		$('.tablet-interest-point-results').css('max-height',
				screenHeight - 300-220);
		$('#interest-point-details').css('max-height', screenHeight - 120);
		$('#interest-point-details').css('height', screenHeight - 270);
		$('.list-content').css('height', screenHeight - 122-220);
		$('.ul-provinces, .ul-cantons, .ul-districts').css('max-height',
				screenHeight - 500-220);

		$('.IP-list-results').css('max-height', screenHeight - 368);

		if (window.innerHeight > window.innerWidth) { // portrait mode
			$('.IP-list-results').css('max-height', screenHeight - 653);
			$('.list-content').css('height', screenHeight - 401-220);
		}

	};

	var setListTabletStyle = function() {
		var height = $(window).height();
		var width = $(window).width();
		if (width > height & !isMapActive) {
			// Landscape
			$('#interest-point-details').addClass(
					'interest-point-details-landscape');
		} else {
			$('#interest-point-details').removeClass(
					'interest-point-details-landscape');
		}

		var screenHeight = window.innerHeight;
		$('.main-content').css('max-height', screenHeight - 118);
	};

	var showInterestPointDetails = function(index, type) {
		var fromList = 1;

		var interestPoint = interestPointsDataList[index];

		var address = interestPoint.direccion['Direccion'];
		var addressAction = interestPoint['Enlace'] == null ? ''
				: interestPoint['Enlace'];
		var addressAction = 'waze://?ll='+interestPoint.direccion['Latitud']+','+interestPoint.direccion['Longitud'];
    	var emailAction = 'mailto:'+interestPoint['CorreoGrupo']+'?subject='+interestPoint['Nombre'];
    	var callAction = 'tel:'+getPhoneType(interestPoint.telefono,'PRINCIPAL');
		var additionalInfo = interestPoint.InformacionAdicional;
		var canton = interestPoint.direccion['Canton']['Nombre'];
		var cantonId = interestPoint.direccion['Canton']['Codigo'];
		var category = interestPoint['CategoriaPuntoInteres']['Descripcion'];
		var categoryId = interestPoint['CategoriaPuntoInteres']['Codigo'];
		var code = interestPoint['Codigo'];
		var email = interestPoint['CorreoGrupo'];
		var details = null;// interestPoint.details;
		var district = interestPoint.direccion['Distrito']['Nombre'];
		var districtId = interestPoint.direccion['Distrito']['Codigo'];
		var fax = getPhoneType(interestPoint.telefono, 'FAX');
		var latitude = interestPoint.direccion['Latitud'];
		var longitude = interestPoint.direccion['Longitud'];
		var name = interestPoint['Nombre'];
		var phone = getPhoneType(interestPoint.telefono, 'PRINCIPAL');
		var phone2 = getPhoneType(interestPoint.telefono, 'ADICIONAL');
		var province = interestPoint.direccion['Provincia']['Nombre'];
		var provinceId = interestPoint.direccion['Provincia']['Codigo'];
		var schedule = interestPoint.horario;
		if(schedule !== null){
        	var weekSchedule = schedule[0] != null ? schedule[0]['Nombre'] : '';
            var weekendSchedule = schedule[1] != null ? schedule[1]['Nombre'] : null ;
            var weekendScheduleSunday = schedule[2] != null ? schedule[2]['Nombre'] : null ;
            var horary = weekSchedule;
            var saturday = weekendSchedule;
            var sunday = weekendScheduleSunday;
            
        }
		var link=interestPoint.Enlace;
		// /////////********************************//////////////
	    var interestPointDetailBody = interestPointDetailElement;
	    
        interestPointDetailBody = replaceInterestPointDetailInfo(interestPointDetailBody, interestPointDetailAdditionalInfoElement, additionalInfo, 'info', 'hasAdditionalInfo');
        interestPointDetailBody = replaceInterestPointDetailInfo(interestPointDetailBody, interestPointDetailAdditionalPhoneElement, phone2, 'phone2', 'hasAdditionalPhone');
      //  interestPointDetailBody = replaceInterestPointDetailInfo(interestPointDetailBody, interestPointDetailCodeElement, code, 'code', 'hasCode');
        interestPointDetailBody = replaceInterestPointDetailInfo(interestPointDetailBody, interestPointDetailDetailsElement, details, 'detailsAction', 'hasDetails');
        interestPointDetailBody = replaceInterestPointDetailInfo(interestPointDetailBody, interestPointDetailFaxElement, fax, 'fax', 'hasFax');
        interestPointDetailBody = replaceInterestPointDetailInfo(interestPointDetailBody, interestPointDetailPhoneElement, phone, 'phone', 'hasPhone');
        interestPointDetailBody = replaceInterestPointDetailInfo(interestPointDetailBody, interestPointDetailEmailElement, email, 'email', 'hasEmail');
        interestPointDetailBody = replaceInterestPointDetailInfo(interestPointDetailBody, interestPointDetailAdditionalInfoElement, additionalInfo, 'info', 'hasAdditionalInfo');

        if(link !=null){
        	 interestPointDetailBody = replaceInterestPointDetailInfo(interestPointDetailBody, interestPointLinkElement, link, 'link', 'hasLink');
        }
        else{
        	interestPointDetailBody = interestPointDetailBody.replace(/{hasLink}/g, '');          
        }
        var isSaturday=false;
        var isSunday=false;
        
        if(weekSchedule != null){
        	interestPointDetailBody = replaceInterestPointDetailInfo(interestPointDetailBody, interestPointDetailHoraryElement, horary, 'horary', 'hasHorary');
        	if(saturday!=null){
        		isSaturday=true;
        		interestPointDetailBody = replaceInterestPointDetailInfo(interestPointDetailBody, interestPointDetailHorarySaturdayElement, saturday, 'saturday', 'hasSaturday');
        	}
        	if(sunday!=null){
        		isSunday=true;
        		interestPointDetailBody = replaceInterestPointDetailInfo(interestPointDetailBody, interestPointDetailHorarySundayElement, sunday, 'sunday', 'hasSunday');
        	}
        	if(!isSaturday){
        		interestPointDetailBody = interestPointDetailBody.replace(/{hasSaturday}/g, '');      
        	}
        	if(!isSunday){
        		interestPointDetailBody = interestPointDetailBody.replace(/{hasSunday}/g, '');      
        	}
        }else{
        	
        	interestPointDetailBody = interestPointDetailBody.replace(/{hasHorary}/g, '');      
        	interestPointDetailBody = interestPointDetailBody.replace(/{hasSaturday}/g, '');           
        	interestPointDetailBody = interestPointDetailBody.replace(/{hasSunday}/g, '');           
        }
        
        interestPointDetailBody = interestPointDetailBody.replace(/{name}/g, name);
        
        if(interestPoint.Imagen !== null){
        	interestPointDetailBody = interestPointDetailBody.replace(/{url}/g, interestPoint.Imagen.Url);
        }
        else{
        	interestPointDetailBody = interestPointDetailBody.replace(/{url}/g, "http://wvw.nacion.com/ln_ee/2009/junio/10/_Img/2443301_0.jpg");
        }
        
        interestPointDetailBody = interestPointDetailBody.replace(/{address}/g, address);
        interestPointDetailBody = interestPointDetailBody.replace(/{addressAction}/g, addressAction);
       
         
        if(phone == null){
        	 interestPointDetailBody = interestPointDetailBody.replace(/{displayStatusCall}/g, 'displayStatus');
        }
        if(email == null){
       	 interestPointDetailBody = interestPointDetailBody.replace(/{displayStatusEmail}/g, 'displayStatus');
        }
        interestPointDetailBody = interestPointDetailBody.replace(/{emailAction}/g, emailAction);
        
        interestPointDetailBody = interestPointDetailBody.replace(/{callAction}/g, callAction);
        
        interestPointDetailBody = replaceInterestPointDetailAddressInfo(interestPointDetailBody, interestPointDetailCantonElement, canton, 'canton', 'hasCanton', cantonId, 'cantonId');
        interestPointDetailBody = replaceInterestPointDetailAddressInfo(interestPointDetailBody, interestPointDetailCategoryElement, category, 'category', 'hasCategory', categoryId, 'categoryId');
        interestPointDetailBody = replaceInterestPointDetailAddressInfo(interestPointDetailBody, interestPointDetailDistrictElement, district, 'district', 'hasDistrict', districtId, 'districtId');
        interestPointDetailBody = replaceInterestPointDetailAddressInfo(interestPointDetailBody, interestPointDetailLocationElement, latitude, 'latitude', 'hasLocation', longitude, 'longitude');
        interestPointDetailBody = replaceInterestPointDetailAddressInfo(interestPointDetailBody, interestPointDetailProvinceElement, province, 'province', 'hasProvince', provinceId, 'provinceId'); 

		$("#interest-point-details").html(interestPointDetailBody);
		$("figcaption").html(interestPointDetailBody);
		
		if (type == fromList) {
			showInterestPointFromList();
			setListTabletStyle();
			var image = document.getElementById('imgInterestPont');
	        image.onerror = function () {
	        	if(categoryId==1){
	        	     this.src = MM_CONTEXT_PATH + "assets/nearMe/Sucursales.png"; // replace with other image
	        	}
	        	else if(categoryId==2){
	        		 this.src =  MM_CONTEXT_PATH + "assets/nearMe/CajerosAutomaticos.png"; // replace with other image
	        	}
	        	else if(categoryId==3){
	        		 this.src = MM_CONTEXT_PATH + "assets/nearMe/ComerciosAfiliados.png"; // replace with other image
	        	}
	        	else if(categoryId==4){
	        		 this.src =  MM_CONTEXT_PATH + "assets/nearMe/BienesRaices.png"; // replace with other image
	        	}
	     
	        };


		} else{
			showInterestPointFromMarker();
			var image = document.getElementById('imgInterestPont');
	        image.onerror = function () {
	        	if(categoryId==1){
	        	     this.src =  MM_CONTEXT_PATH + "assets/nearMe/Sucursales.png"; // replace with other image
	        	}
	        	else if(categoryId==2){
	        		 this.src =  MM_CONTEXT_PATH +"assets/nearMe/CajerosAutomaticos.png"; // replace with other image
	        	}
	        	else if(categoryId==3){
	        		 this.src =  MM_CONTEXT_PATH +"assets/nearMe/ComerciosAfiliados.png"; // replace with other image
	        	}
	        	else if(categoryId==4){
	        		 this.src =  MM_CONTEXT_PATH + "assets/nearMe/BienesRaices.png"; // replace with other image
	        	}
	     
	        };

		}
				
		changeTitle(categoryId);
	};
	$('.promotions-div > .input-group-btn, .categories-div > .input-group-btn').on({
        "shown.bs.dropdown": 
        	function() { 
        		var parent = $(this);
        		_nearme.toggleActiveIconOnButtons(parent);
        },
        "hide.bs.dropdown":  
        	function() { 
	    		var parent = $(this);
	    		_nearme.toggleActiveIconOnButtons(parent);
        }
    }); 
    
    $('.promotion-li').on('click', function(){
    	_nearme.showPromotion();
    	var startDate = $(this).data('startdate').substring(0,10).split('-');
    	var endDate = $(this).data('enddate').substring(0,10).split('-')
    	$('.promo-img').attr('src',$(this).find('div').html());
    	$('.promo-name').html($(this).find('a').html());
    	$('.description-promo').html($(this).data('descripcion'));
    	$('.start-promo').html(_utils.formatDateWithDate(startDate[2]+'-'+startDate[1]+'-'+startDate[0]));
    	$('.end-promo').html(_utils.formatDateWithDate(endDate[2]+'-'+endDate[1]+'-'+endDate[0]));
    	
    	var slider=$(this).find('.promotions-slider').clone();
    	var imgsSlider= slider.find('img');
    	if(imgsSlider.length>0){
    		for(var x=0; x<imgsSlider.length; x++){
    			changeImgError(imgsSlider[x]);
    		}
    		$('.promotion-image').html(slider);
        	$('.promotion-image > ul').css('display','inline');
        	$('.promotion-image > ul').bxSlider({mode: 'fade'});
    		
    	}
    	else{
    		
    		$('#imgPromo').attr('src',MM_CONTEXT_PATH + "assets/nearMe/promociones.png");
    		
    	}
    	
    	
    	$('.a-back-ip-details').show();
//    	if(_utils.isDeviceTablet){
//    		$('.bx-viewport').height('20em');
//    	}else{
//    		$('.bx-viewport').height('160px');
//    	}
//    	$('.bx-viewport').css('overflow','scroll');
//    	$('.bx-wrapper').css('margin','0');
 
       
    	
    });
    var changeImgError= function(img){
    
    	img.onerror = function () {
    		 this.src = MM_CONTEXT_PATH + "assets/nearMe/promociones.png"; // replace with other image
    	
    	};
    }
    
    
	var showInterestPointFromList = function() {

		//$("#full-list").hide();
		$(".a-back-ip-details").css('display', 'inline');
//		$(".a-Search").css('display', 'none');
		$("#full-map").hide();
		$("#interest-point-details").show();
		$(".list-content").hide();
		$(".promotions-div").hide();
		$(".categories-div").hide();
		$(".current-location-div").hide();
		$(".promotions-div").hide();

	};
	

	var showInterestPointFromMarker = function() {
		$("#full-map").hide();
		$(".promotions-div").hide();
		$(".categories-div").hide();
		$(".current-location-div").hide();
		$(".a-show-list").css('display', 'none');
		$(".a-Search").css('display', 'none');
		$(".tablet-a-interest-points").css('display', 'none');
		$("#interest-point-details").show();
		$(".a-back-ip-details").css('display', 'inline');
		$('#search-bar').hide();
		$('.list-content').hide();
	};

	var showList = function() {

		// $(".title").html(_messages.globals.home.nearme);
		// $("#full-map").hide();
		$("#location-list-picker").hide();
		//$("#interest-point-details").hide();
		$(".a-show-list").css('display', 'none');
		$(".tablet-a-interest-points").css('display', 'none');
		// $(".promotions-div").hide();
		// $(".categories-div").hide();
		// $(".current-location-div").hide();
		$("#full-list").show();
//		$('.list-content').show();
//		$(".promotions-div").show();
//	    $(".categories-div").show();
//		$(".current-location-div").show();
		$('input.filter-box').show();
		$("input.filter-box").filterThis();
		
		$(".a-show-map").css('display', 'inline');
		
		$(".a-search-location").css('display', 'none');
		//$(".a-back-ip-details").css('display', 'none');
		$(".a-back-region-list").css('display', 'none');
		$(".a-Search").css('display', 'none');
		//$(".filter-box").css('display', 'none')
		// $(".promotions-div").hide();

		hideSearchInput();
		isMapActive = false;
		$(".a-back").css('display', 'inline');
		// $("#location-list-picker").show();
		 var screenHeight = window.innerHeight;
		 $('.main-content').css('max-height', screenHeight);
		 hideLocationPickers(['provinces','cantons','districts']);
		// $("#location-list-picker").show();

	};

	var showMap = function() {
		// $(".title").html(_messages.globals.home.nearme);

		$("#full-list").hide();

		$(".a-show-map").css('display', 'none');

		$(".a-back").css('display', 'none');
		$("#location-list-picker").hide();
		$("#interest-point-details").hide();
		$("#full-map").show();
		$(".a-show-list").css('display', 'inline');
		$(".tablet-a-interest-points").css('display', 'inline');
		$(".promotions-div").show();
		$(".categories-div").show();
		$(".current-location-div").show();
		$(".promotions-div").show();
		$(".a-Search").css('display', 'inline');
		isMapActive = true;
		var screenHeight = window.innerHeight;
		$('.main-content').css('max-height', screenHeight);
		setListTabletStyle();

	};

	var showQuickSearch = function() {
		$("#search-bar").toggle();
		$('.filter-box').toggle();
	};

	var showRegionList = function() {

		$(".title").html('Localizaci&oacute;n');

		$(".a-Search").css('display', 'none');
		$(".a-show-map").css('display', 'none');
		$(".a-search-location").css('display', 'inline');
		$("#full-list").hide();
		$("#provinces-list-picker").hide();
		$("#cantons-list-picker").hide();
		$("#districts-list-picker").hide();
		$("#location-list-picker").show();
		$(".a-show-map").css('display', 'none');
		$(".a-back-region-list").css('display', 'inline');
		$('.a-back-picker').css('display', 'none');

		$("#full-list").show();
		$(".a-show-map").css('display', 'inline');
		$(".a-search-location").css('display', 'none');
		$(".a-back-region-list").css('display', 'none');

	};

	var storeMarkers = function(data) {
		for (var i = 0; i < data.length; i++) {
			addInterestPointData(data[i]);
		}
	};

	var successDeviceLocationCallback = function(position) {

		var deviceLatitude = getDeviceLatitude(position);
		var deviceLongitude = getDeviceLongitude(position);

		// deviceLatitude = "10.013720";
		// deviceLongitude = "-84.223742";

		var setCurrentLocation = true;
		initialize(setCurrentLocation, deviceLatitude, deviceLongitude);
	};

	var successUpdateDeviceLocationCallback = function(position) {
		deviceLatitude = getDeviceLatitude(position);
		deviceLongitude = getDeviceLongitude(position);
		setCurrentPosition(deviceLatitude, deviceLongitude);
	};

	var toggleActiveIconOnAnchors = function(elementClass) {
		$('a > i.' + elementClass).toggleClass(elementClass + '-active');
	};

	var toggleActiveIconOnButtons = function(parent) {
		var element = parent.find('i');
		element.toggleClass('glyphicons-active');
	};

	var toggleCategory = function(category, categoryId) {
		$('.fa-option-' + category).toggle(function() {
			var isVisible = $(this).css('display');
			if (isVisible == 'none') {
				updateMarkers(categoryId, false);
			} else {
				updateMarkers(categoryId, true);
			}
		});
	};

	var updateInterestPointsListData = function() {

		interestPointsDataList = [];
		$
				.each(
						interestPointsData,
						function(key, val) {
							if (actualProvince == 0) {
								// current location and category not selected
								// yet
								addInterestPointToList(val);

							} else {
								// all three search criteria by
								// location(province, canton, district) match
								// actual search results
								if (actualDistrict > 0
										&& actualDistrict == val.direccion['Distrito']['Codigo']
										&& actualCanton == val.direccion['Canton']['Codigo']
										&& actualProvince == val.direccion['Provincia']['Codigo']) {
									addInterestPointToList(val);
								} else {
									// district is not selected yet, search
									// criteria by location(province, canton)
									// match actual search results
									if (actualCanton > 0
											&& actualCanton == val.direccion['Canton']['Codigo']
											&& actualProvince == val.direccion['Provincia']['Codigo']
											&& actualDistrict == 0) {
										addInterestPointToList(val);
									} else { // district and canton are not
												// selected yet, search criteria
												// by location(province) match
												// actual search results
										if (actualProvince > 0
												&& actualProvince == val.direccion['Provincia']['Codigo']
												&& actualCanton == 0) {
											addInterestPointToList(val);
										}
									}

								}
							}
						});
		drawInterestPointsList(interestPointsDataList);
		clearMarkers();
		storeMarkers(interestPointsDataList);
		drawMarkers(interestPointsDataList);
	};

	var updateDeviceGeolocationCurrentPosition = function() {

		navigator.geolocation.getCurrentPosition(
				successUpdateDeviceLocationCallback,
				errorDeviceLocationCallback, {
					timeout : geolocationTimeout,
					enableHighAccuracy : geolocationenableHighAccuracy,
					maximumAge : geolocationMaximumAge
				});

	};

	var updateMarkers = function(category, show) {

		switch (category) {
		case atms:
			show ? drawMarkers(atmMarkersArray)
					: clearMarkersCategory(atmMarkersArrayProvisional);
			break;
		case agencies:
			show ? drawMarkers(agencyMarkersArray)
					: clearMarkersCategory(agencyMarkersArrayProvisional);
			break;
		case stores:
			show ? drawMarkers(storeMarkersArray)
					: clearMarkersCategory(storeMarkersArrayProvisional);
			break;
		case sellingProperties:
			show ? drawMarkers(sellingPropertyMarkersArray)
					: clearMarkersCategory(sellingPropertyMarkersArrayProvisional);
			break;
		}
	};
	 var showPromotion = function(){
		 $(".title").html("Promociones");
	     $("#full-map").hide();
	 	 $("#location-list-picker").hide();
	 	 $(".a-back").css('display', 'inline');
	 	 $(".a-show-list").css('display', 'none');
	 	 $(".a-Search").css('display', 'none');
	 	 $(".promotions-div").hide();
	 	 $(".categories-div").hide();
	 	 $(".current-location-div").hide();
	 	 $('#interest-point-details').html(PromotionsDetailElement);

	 	 $('#interest-point-details').show();
    };


	return {

		init : init,
		centerInterestPoint : centerInterestPoint,
		getCantons : getCantons,
		getDistricts : getDistricts,
		getInterestPointsWithLocations : getInterestPointsWithLocations,
		getPromotions : getPromotions,
		fullScreenMap : fullScreenMap,
		loadMarkerInfo : loadMarkerInfo,
		showPromotion:showPromotion,
		openLocationPicker : openLocationPicker,
		setDistrict : setDistrict,
		setHeights : setHeights,
		setListTabletStyle : setListTabletStyle,
		showInterestPointDetails : showInterestPointDetails,
		showList : showList,
		showMap : showMap,
		setCategories : setCategories,
		currentLocation : currentLocation,
		setCurrentPosition : setCurrentPosition,
		setMapPosition : setMapPosition,
		showQuickSearch : showQuickSearch,
		showRegionList : showRegionList,
		toggleActiveIconOnAnchors : toggleActiveIconOnAnchors,
		toggleActiveIconOnButtons : toggleActiveIconOnButtons,
		toggleCategory : toggleCategory,
		updateDeviceGeolocationCurrentPosition : updateDeviceGeolocationCurrentPosition,
		updateInterestPointsListData : updateInterestPointsListData
	};

})(jQuery);