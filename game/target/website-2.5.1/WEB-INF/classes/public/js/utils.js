

jQuery(function() {
    $('.btn-nearme').click(function(){
    	 location.href =MM_CONTEXT_PATH+ "nearme";     	
    });

    
    $('.products-section-header > h4 ').click(function() {
		var section = $(this).parent();
		_utils.changeActiveSection(section);
	});	
 
   // _utils.getProvinces();
    _utils.init();
    
});

/**
 * utils page Functions
 */


var _utils = (function($) {
	
	var cantons, districts;
	var cantonsDropDownElement = "<li><a href=javascript:{namespace}.getDistricts({provinceId},{cantonId},'{cantonName}','{namespace}');><span class='province-list-picker'>{cantonName}</span></a></li>";
	var districtsDropDownElement = "<li><a href=javascript:{namespace}.setDistrict({districtId},'{districtName}');><span class='province-list-picker'>{districtName}</span></a></li>";

    var isDeviceTablet=true;
    var reloadPage;
    var currectActiveMenuElement;
    var name;
    var provinceDropDownElement = "<li><a href=javascript:{namespace}.getCantons({provinceId},'{provinceName}');><span class='province-list-picker'>{provinceName}</span></a></li>";    
	var provincesList = [];
	
	var init = function(){
	    $('.fake-menu').hide();
		$('.menu').hide();	  
		initAjaxSetup();
	};
	
	var initAjaxSetup = function(){
		
		$.ajaxSetup({
			beforeSend: function(xhr) {
				if($.mobile){
					$.mobile.loading( 'show' );
				}else{
					$('html').addClass('ui-loading');
				}
			}
		});
			
		$(document).ajaxComplete(function( event, xhr, settings ) {
			if($.mobile){
				$.mobile.loading( 'hide' );	
			}else{
				$('html').removeClass('ui-loading');				
			}
		});			
		
	};
	
	var addHeaderActive = function(div, section){
		div.slideToggle(800, function(){
			var isVisible = div.css('display');
			if(isVisible !== 'none'){				
				section.addClass('products-section-header-active');
			}
		});		
	};
	
	var checkProvincesData = function(namespace){
		var provinces = null
		if(!provinces || provinces === null){		
			getProvinces(namespace);			
		}
		else{
			drawProvinces(provinces, namespace);
		}		
	};

    
    var disable_scroll = function() {
    	if (window.addEventListener) {
    		window.addEventListener('DOMMouseScroll', wheel, false);
    		window.addEventListener('touchmove', preventDefault, false);
        }
        window.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;
	};
    
    var drawCantons = function(provinceId, namespace) {
        var cantonDropdown = '';
        var cantonElement;
        $.each(cantons, function(key, val) {
            cantonElement = cantonsDropDownElement.replace(/{cantonName}/g, val.name.replace(/ /g, '&nbsp;'));
            cantonElement = cantonElement.replace(/{cantonId}/, val.code);
            cantonElement = cantonElement.replace(/{provinceId}/, provinceId);
            cantonElement = cantonElement.replace(/{namespace}/g, namespace);
            cantonDropdown += cantonElement;
        });

        $('.ul-cantons').html(cantonDropdown);
   //     $('.ul-cantons').listview( "refresh" );
    };
	
	var drawProvinces = function(provinceData, namespace) {
        var provinceDropdown = '';
        var provinceElement;

        $.each(provinceData.provinces, function(key, val) {
            provinceElement = provinceDropDownElement.replace(/{provinceName}/g, val.name.replace(/ /g, '&nbsp;'));
            provinceElement = provinceElement.replace(/{provinceId}/, val.code);
            provinceElement = provinceElement.replace(/{namespace}/, namespace);
            provinceDropdown += provinceElement;
        });
        
        $('.ul-provinces').html(provinceDropdown);
    };
    
    var enable_scroll = function() {
    	if (window.removeEventListener) {
    		window.removeEventListener('DOMMouseScroll', wheel, false);
    		window.removeEventListener('touchmove', preventDefault, false);
    	}
    	window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
	};

    var formatDate = function(miliseconds) {
        var dateToFormat = new Date(miliseconds);
        return dateToFormat.format("dd/mm/yyyy");
    };
    
   var getTimeOfaDate = function(miliseconds) {
        var dateToFormat = new Date(miliseconds);
        return dateToFormat.format("hh:mm:ss");
    };
    
    var formatDateWithDate = function(dte) {
    	dte = dte.trim();
    	var year = dte.substring(6,10);
    	var parseMonth = dte.substring(3,5);
    	var parseDay	= dte.substring(0,2);
    	var month = (parseMonth-1);
    	var day = (parseInt(parseDay)+1);
    	var date = new Date(Date.UTC(year, month, day, 3, 0, 0));
    	var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    	var formatDate = capitalizeFirstLetterEachWordSplitBySpace(date.toLocaleDateString("ES", options).replace(',', ''));
    	return formatDate.replace(/De/g, 'de');
	};
    var formatDateWithMoment = function(miliseconds) {    	
        var dateToFormat = new Date(miliseconds);
        return relative_time(dateToFormat);
    };
    
   var capitalizeFirstLetterEachWordSplitBySpace = function (string){
    	var words = string.split(" ");
    	var output = "";
    	for (i = 0 ; i < words.length; i ++){
	    	lowerWord = words[i].toLowerCase();
	    	lowerWord = lowerWord.trim();
	    	capitalizedWord = lowerWord.slice(0,1).toUpperCase() + lowerWord.slice(1);
	    	output += capitalizedWord;
	    	if (i != words.length-1){
	    		output+=" ";
	    	}
    	}
    		output[output.length-1] = '';
    		return output;
    	};

    var formatAmount = function(number) {
        return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    };

    var getColonSymbol = function() {
        return colonSymbol;
    };

    var getCurrencyDescription = function(currencyCode) {
    	var currencyDescription = currencyCode == 1 ? _utils.getColonSymbol() : _utils.getDollarSymbol();
    	return currencyDescription;
    };

    var getDollarSymbol = function() {
        return dollarSymbol;
    };

    var getProvinces = function(namespace) {
        $.ajax({
            url: MM_CONTEXT_PATH+'nearme/getProvinces',
            type: 'GET',
            success: function(data) {
                processProvinces(data, namespace);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              //  console.log(errorThrown);
            }
        });
    };
    
    var getUserMessagesQuantity = function(){
    	$('.a-notifications').css('display','inline');
    	$.get(MM_CONTEXT_PATH+ 'getUserMessagesQuantity', function(data) {
    		$('.badge-notifications').text(data)
        });    	
    };

    var hideErrorMessages = function() {
        $("#errorEmptyLoanInfo").hide();
        $("#errorNotFeeSelected").hide();
    };
    
    var isFeeNotChecked = function() {
        $('#errorNotFeeSelected').hide();

        var checked = $('input[name=payLoan]:checked', '#pay_fees_form').val();
        if (checked !== undefined) {
            return false;
        } else {
            $('#errorNotFeeSelected').show();
            return true;
        }
    };
    
    function keydown(e) {
    	var keys = [37, 38, 39, 40];
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }

    //
    //  Function for load content from url and put in $('.ajax-content') block
    //
    var loadAjaxContent = function(url){
    	
    	$.ajax({
    		mimeType: 'text/html; charset=utf-8', // ! Need set mimeType only when run from local file
    		url: url,
    		type: 'GET',
    		success: function(data) {
    			$('#ajax-content').html(data);
    		},
    		error: function (jqXHR, textStatus, errorThrown) {
    			//console.log(errorThrown);
    		},
    		dataType: "html",
    		async: false
    	});
    };
//    
    //
    //  Dynamically load Bootstrap Validator Plugin
    //  homepage: https://github.com/nghuuphuoc/bootstrapvalidator
    //
    var loadBootstrapValidatorScript = function(callback){
    	if (!$.fn.bootstrapValidator){
    		$.getScript(MM_CONTEXT_PATH+ 'resources/plugins/bootstrapvalidator/bootstrapValidator.min.js', callback);
    	}
    	else {
    		if (callback && typeof(callback) === "function") {
    			callback();
    		}
    	}
    };
    
    var parseJsonValue = function(data){
    	var code = data['Codigo'];
    	var name = data['Nombre'];
    	var response = {code : code, name : name};
    	return response;
    };
    
    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;  
	}

    var processCantons = function(data, provinceId, namespace){
    	var cantonsList = [];
    	var jsonElement;
    	$.each(data, function(key, val) {
    		jsonElement = _utils.parseJsonValue(val);
    		cantonsList.push(jsonElement);
    	}); 
    	cantons = cantonsList;
    	drawCantons(provinceId, namespace);    	   
    };   
    
    var processDistricts = function(data, provinceId, namespace){
    	var jsonElement;
        var districtDropdown = '';
        var districtElement;

        $.each(data, function(key, val) {
        	jsonElement = _utils.parseJsonValue(val);
    		districtElement = districtsDropDownElement.replace(/{districtName}/g, jsonElement.name.replace(/ /g, '&nbsp;'));
    		districtElement = districtElement.replace(/{districtId}/, jsonElement.code);
    		districtElement = districtElement.replace(/{namespace}/g, namespace);
            districtDropdown += districtElement;
            
        });

        $('.ul-districts').html(districtDropdown);
    //    $('.ul-districts').listview( "refresh" );
    };
    
    var processProvinces = function(data, namespace){
    	provincesList = [];
    	var jsonElement;
    	$.each(data, function(key, val) {
    		jsonElement = parseJsonValue(val);
    		provincesList.push(jsonElement);
    	});  
    	_storageAPI.addProvincesData(provincesList);
    	var provincesData = _storageAPI.getProvincesData();
		drawProvinces(provincesData, namespace);
    };
    
    var relative_time = function(date_str) {
        if (!date_str) {return;}
        var date = date_str;
        date_str = date_str.toDateString();
        date_str = replaceMonth(date_str);
        date_str = $.trim(date_str);
        date_str = date_str.replace(/\.\d\d\d+/,""); // remove the milliseconds
        date_str = date_str.replace(/-/,"/").replace(/-/,"/"); //substitute - with /
        date_str = date_str.replace(/T/," ").replace(/Z/," UTC"); //remove T and substitute Z with UTC
        date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // +08:00 -> +0800
        var parsed_date = new Date(date_str);
        var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
        var delta = parseInt((relative_to.getTime()-parsed_date)/1000);
        delta=(delta<2)?2:delta;
        var response = '';
        if(delta < (24*60*60)) {
        	response = 'Hoy, ';
        } else
        if(delta < (48*60*60)) {
        	response = 'Ayer, ';
        }
        
        return  response + ' ' + date.getDate() + ' de ' + getMonthName(date.getMonth()) + ' ' + date.getFullYear();
    };
    
    var getMonthName = function(month){
        
    	switch (month) {
			case 0: return 'Enero';
			case 1: return 'Febrero';
			case 2: return 'Marzo';
			case 3: return 'Abril';
			case 4: return 'Mayo';
			case 5: return 'Junio';
			case 6: return 'Julio';
			case 7: return 'Agosto';
			case 8: return 'Septiembre';
			case 9: return 'Octubre';
			case 10: return 'Noviembre';
			case 11: return 'Diciembre';
			default: break;
		}
    };	
    
    var sendEventsInteraction = function(action, label){
    	  _gaTracker('send', {
        	  'hitType': 'event',
        	  'eventCategory': 'button',
        	  'eventAction': action,
        	  'eventLabel': label
        });
    };
	
    
    var sendSocialInteraction = function(socialNetwork){
    	  _gaTracker('send', {
        	  'hitType': 'social',
        	  'socialNetwork': socialNetwork,
        	  'socialAction': 'login',
        	  'socialTarget': 'prospect-info-sync'
        });
    };
    
    var setBlurImg = function(isVisible){
    	var img = $('.home-background');
    	isVisible == 'block' ? img.addClass('blur') : img.removeClass('blur');    	
    };
    
    var setLogoutAvatar = function(){
    	location.href = MM_CONTEXT_PATH+ "logout";
    };
    
    var setMenuActive = function(isVisible){
    	var img = $('.fa-menu');
    	isVisible == 'block' ? img.addClass('fa-menu-active') : img.removeClass('fa-menu-active');      	
    };
    
    var setMenuHeights = function(){
		
    	var deviceScreenHeightToReduce = _utils.isDeviceTablet ? 503 : 254;
    	var screenHeight = window.innerHeight;
    	
    	var menuHeight = _utils.isDeviceTablet ? screenHeight - deviceScreenHeightToReduce : 210;
    	
    	var fakeMenu = $('.fake-menu');
    	var menu = $('.menu');
    	if(screenHeight <= 380){
    		menuHeight = screenHeight - 107;
    		fakeMenu.css('visibility','hidden');
    	}
    	else{    	
    		var isHided = menu.css('display');
    		fakeMenu.css('visibility','');
    		fakeMenu.css('display', isHided);
    	}
        	
    	//alert(menuHeight);
    	menu.css('height', menuHeight + 'px');
    	var fakeMenuHeightToReduce = _utils.isDeviceTablet ? 342 : 317;
    	
		var fakeMenuHeight = screenHeight - fakeMenuHeightToReduce;
		fakeMenu.css('height', fakeMenuHeight + 'px');
		
		_utils.isDeviceTablet ? $('.fake-menu').css('bottom','-206px') : '';
		
	};

    //
    //  Function set min-height of window (required for this theme)
    //
    var setMinBlockHeight = function(elem){
    	elem.css('min-height', window.innerHeight - 38);
    };
    
    var transformAmount = function(amount) {
        var data = amount.split('.');
        var number = data[0];
        number = number.replace(/,/g, '');
        number += '.' + data[1]; 
        return parseFloat(number);
    };
    
    function isPortrait() {
        return window.innerHeight > window.innerWidth;
    }
    
    function isLandscape() {
        return (window.orientation === 90 || window.orientation === -90);
    }
    
    var isPrivateBrowser = function() {
    	try {
  		  localStorage.test = 2;// try to use localStorage      
	  	} catch (e) {//there was an error so...
	  		    alert('Estas usando tu navegador en Modo Privado. Esto puede ocasionar que algunas funcionalidades de la aplicación se vean afectadas.');
	  	}	
	}
    return {
    	init: init,
		checkProvincesData: checkProvincesData,
		drawCantons: drawCantons,
        formatAmount: formatAmount,
        formatDate: formatDate,
        formatDateWithDate:formatDateWithDate,
        formatDateWithMoment: formatDateWithMoment,
        getColonSymbol: getColonSymbol,
        getCurrencyDescription: getCurrencyDescription,
        getDollarSymbol: getDollarSymbol,
        getTimeOfaDate:getTimeOfaDate,
        getUserMessagesQuantity: getUserMessagesQuantity,
        hideErrorMessages: hideErrorMessages,
        isFeeNotChecked: isFeeNotChecked,
        isPortrait:isPortrait,
        isLandscape:isLandscape,
        isPrivateBrowser:isPrivateBrowser,
        loadAjaxContent: loadAjaxContent,
        loadBootstrapValidatorScript: loadBootstrapValidatorScript,
        parseJsonValue: parseJsonValue,
        processCantons: processCantons,
        processDistricts: processDistricts,
        reloadPage:reloadPage,
        sendEventsInteraction: sendEventsInteraction,
        sendSocialInteraction: sendSocialInteraction,
        setLogoutAvatar: setLogoutAvatar,
        setMenuHeights: setMenuHeights,
        setMinBlockHeight: setMinBlockHeight,
        name:name,
        transformAmount: transformAmount
        
    };

    function wheel(e) {
    	preventDefault(e);
    }
    
})(jQuery);