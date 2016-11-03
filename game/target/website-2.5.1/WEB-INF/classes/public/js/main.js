/* JavaScript */

/**
 * To initialize the select menu in Contáctenos page 
 */
$("#SelectJob").selectmenu();
$("#SelectCountry").selectmenu();
$("#SelectProv").selectmenu();

/**
 * To set the 100% width to the select menu in Contáctenos page
 */
$("#SelectJob-button").css('width', '100%');
$("#SelectCountry-button").css('width', '100%');
$("#SelectProv-button").css('width', '100%');

star=true;
function doScrollTo(scroll, myCallback){
	if(typeof myCallback=='undefined'){
		$("body, html").animate({ scrollTop : scroll }, 500);
		
	}else{
		$("body, html").animate({ scrollTop : scroll }, 500, myCallback);
	}
	
}
$(document).on('mousemove', function(){
	$('#container-layout').removeAttr('style');
	if(window.location.pathname === '/'){
		$('footer').removeAttr('style');
	}
	
})
$(document).on('click','.jstree-anchor', function(){
	var id = $(this).parent().attr('id');
	id = id.split('_')[0];
	var nodeName = $(this).text().replace(/\s/g,'');
	nodeName =  deleteAcentForWord(nodeName);
	var actualHref = decodeURIComponent(nodeName);
	actualHref = actualHref.replace(/á/gi,"a");
	actualHref = actualHref.replace(/é/gi,"e");
	actualHref = actualHref.replace(/í/gi,"i");
	actualHref = actualHref.replace(/ó/gi,"o");
	actualHref = actualHref.replace(/ú/gi,"u");
	actualHref = actualHref.replace(/ñ/gi,"n");
	location.href = MM_CONTEXT_PATH+actualHref+'/'+id;
})

/**
 * 
 * Function in charge of calculate the height
 * of the main menu in the mobile view
 * 
 * @returns {Number} - The menu's height
 */
function setHeight() {
	height = $(window).height() - 106;
	if( window.matchMedia("only screen and (max-width: 767px)").matches){
	$("#navigationBar .labelMenu").css('min-height', height);
	$("#loginMutualLinea .labelMenu").css('min-height', height);
	}
	else{
		$("#navigationBar .labelMenu").css('min-height', 40);
		$("#loginMutualLinea .labelMenu").css('min-height', 40);
	}
	return height;
}

/**
 * Function for detect when navigator
 */

function get_browser(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }

/**
 * Function for alert when navigator is not supported
 */
function isBrowserSupported(){
	var browser= get_browser();
	var version= Number(browser.version);
	if((browser.name=='IE'||browser.name=='MSIE')&&version<9){
		$('header, .container').hide();
		$('.isNotSupported').show();
	}else{
		$('.isNotSupported').hide();
	}
}



/**
 *  
 * Function in charge of calculate the height of body in views
 * 
 * @returns {Number} - The body's height
 */
//function setHeightBody() {
//	var height = $(window).height();
//	height = height - 160;
//	$(".containerContacts").css('min-height', height);
//	return height;
//}

/**
 * 
 * Function in charge of stop the default action of the event keydown * 
 * @param e - The event 
 * 
 */
function keydown(e) {
	/*
	 * Keycodes
	 * 37 - left arrow
	 * 38 - up arrow
	 * 39 - right arrow
	 * 40 - down arrow 
	 */
	var keys = [ 37, 38, 39, 40 ];
	for (var i = keys.length; i--;) {
		if (e.keyCode === keys[i]) {
			preventDefault(e);
			return;
		}
	}
}

/**
 * 
 * Function in charge of stop the default action of the event wheel * 
 * @param e - The event 
 * 
 */
function wheel(e) {
	preventDefault(e);
}

/**
 * 
 * Function in charge of stop the default action of event
 * @param e
 * 
 */
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}


/**
 * To disable scroll when the main menu is shown
 */
var disable_scroll = function() {
	if (window.addEventListener) {
		window.addEventListener('DOMMouseScroll', wheel, false);
		window.addEventListener('touchmove', preventDefault, false);
	}
	window.onmousewheel = document.onmousewheel = wheel;
	document.onkeydown = keydown;
};

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
        window.removeEventListener('touchmove', preventDefault, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}

/**
 * 
 * Function in charge of calculate and set the page's height
 * 
 */
function heightBody() {
	var heightScreen = $(window).height();
	var heightHeader = $('header').height();
	var heightFooter = $('footer').height();
	var heightCarrousel = $('.carouselContainer').height();
	var barFooter = $('.displayFooter').height();
	var absoluteRoute = self.location.href;
	var total = 0;
	
	if (absoluteRoute != MM_CONTEXT_PATH) {
		total = heightScreen - heightHeader - barFooter;
		$('.containerTemplete').css('min-height', total);
	} else {
		total = heightHeader + heightFooter + heightCarrousel;
		total = heightScreen - total;
		$('.containerTemplete').css('min-height', total);	
		
	}
}

/**
 * 
 * Function in charge of show a spinning circle animation, when the page is loading
 * 
 */
function waiting() {
	var heightScreen = $(window).height();
	var heightHeader = $('header').height();
	var total = heightScreen - heightHeader;
	$('.loader').css({
		'top' : heightHeader
	});


	
}

function setHeightMenu() {
	var heightScreen = $(window).height();
	var heightHeader = $('header').height();
	var carrou= $('.carouselContainer').height();
	var heightfooter= $('.bottom').height();
	var total = heightScreen - heightHeader-heightfooter-carrou;
//	$('.bodyContainer').css('height',total);
//	$('.bodyContainer').css('overflow','scroll');
	$('.bodyContainer').css('min-height',total);
	
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	
	if(true){
		if(window.innerHeight <= 1000 && window.innerWidth >= 1200){
			if(window.location.pathname === '/'){
				$('#container-layout').css('height',heightScreen-heightfooter);
				$('#container-layout').css('overflow','scroll');
				$('footer').css('position','fixed');
				$('footer').css('width','100%');
				$('footer').css('bottom','0');	
			}
		}else{
			
				$('#container-layout').removeAttr('style');
				$('footer').removeAttr('style');
			
		}
	}
	
}

function setBodywithOutFooter() {
	var heightScreen = $(window).height();
	var heightHeader = $('header').height();
	var barFooter = $('.displayFooter').height();
	var total = heightScreen - heightHeader - barFooter;
	 $('.map-menu').css('bottom',0); 
	$('.bodyContainer, #full-map, .main-content').css('min-height',total);
}


function deleteAcents(){
	var elements = $('a');
	try{
		var elements = $('a');
		for(var cont = 0; cont < elements.length; cont++){
			var actualElement = elements[cont];
			var actualHref = $(actualElement).attr('href');
			actualHref = decodeURIComponent(actualHref);
			actualHref = actualHref.replace(/á/gi,"a");
			actualHref = actualHref.replace(/é/gi,"e");
			actualHref = actualHref.replace(/í/gi,"i");
			actualHref = actualHref.replace(/ó/gi,"o");
			actualHref = actualHref.replace(/ú/gi,"u");
			actualHref = actualHref.replace(/ñ/gi,"n");
			$(actualElement).attr('href',actualHref);
		}
	}catch(e){
		console.log('Uncaught TypeError: ' + e);
	}

}


function deleteAcentForWord(word){
	try{
		
		word = word.replace(/á/gi,"a");
		word = word.replace(/é/gi,"e");
		word = word.replace(/í/gi,"i");
		word = word.replace(/ó/gi,"o");
		word = word.replace(/ú/gi,"u");
		word = word.replace(/ñ/gi,"n");
		return word;

	}catch(e){
		return "";
		console.log('Uncaught TypeError: ' + e);
	}

}

function loadContentMenu(id,parent, typeMenu) {
	
	if(typeof(id)==="number"){
		$.ajax({
		url:MM_CONTEXT_PATH+"contentCasilla?code="+id,
		type: "GET",
		dataType: "html",
		success:function(data) {	
			var elememt;
			if(typeMenu==="large"){
				elememt=parent.parent().children('.collapseDiv');
				elememt.children('.casillaContent').html(data);
			}
			else if(typeMenu==="medium"){
				$(parent.parentElement.parentElement.getElementsByClassName('casillaContent')).html(data);
			}
			else{
				
				try {
					elememt=$(parent.parentElement.getElementsByClassName('casillaContent'));
				}
				catch(err) {
					elememt=parent.parent().children('.collapseDiv').children('.casillaContent');
				}
				
				
				
				elememt.html(data);

			}
			
			$('.largeMenu').find('.smallMenu').remove();
			$('.largeMenu').find('.mediumMenu').remove();
			$('.mediumMenu').find('.largeMenu').remove();
			$('.mediumMenu').find('.smallMenu').remove();
			$('.smallMenu').find('.mediumMenu').remove();
			$('.smallMenu').find('.largeMenu').remove();
			deleteAcents();
		}
		});
	}
	else{
		$('.collapseDiv').removeClass('in');
		$('.opened').removeClass('opened');
		var w = window.open(id);
	}
	
}

$('#signon').submit(function(evt){
	if($('#signon #userid').val()===""){
		alert("Debe de Ingresar un Nombre de Usuario");
		 evt.preventDefault();
	}

});

$('input#userid, #factory, #address, #ced,#phone,#comment, #txtInput').bind('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ]+$");
    if(event.charCode===13||event.charCode===32||event.charCode===8||event.charCode===9||event.charCode===46||event.charCode===0||event.charCode===44){

    }
    else{
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
    }
});
$('#name').bind('keypress', function (event) {
    var regex = new RegExp("^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ]+$");
    if(event.charCode===13||event.charCode===32||event.charCode===241||event.charCode===8||event.charCode===9||event.charCode===46||event.charCode===0||event.charCode===44){
    	
    }
    else{
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
    }
});

$('#inputEmail').bind('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z0-9-_@.]+$");
    if(event.charCode===13||event.charCode===32){}
    else{
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
    }
});


/**
 * To show the spinning circle animation.
 */
$(document).load(waiting());


/**
 * When the page load is finished
 */

var objCompany={company:MM_CONTEXT_PATH, imagen:'http://www.grupomutual.fi.cr/wp-content/themes/mtl_grupo/images/brand/logo.png'}
var objCompany2={company:MM_CONTEXT_PATH, imagen:'http://www.grupomutual.fi.cr/wp-content/themes/mtl_grupo/images/brand/logo.png'}
var objArray=[objCompany];

localStorage['companies'];
$(document).ready(function() {
	isBrowserSupported();

	deleteAcents();
	
	$(document).on('click', 'a', function(){
		this;
		var href= this.getAttribute('href');
		var numHref=Number(href);
		if(href!=null){
			if(!isNaN(href)){
				var title=$(this).text().replace(' ','');
				this.setAttribute('href',MM_CONTEXT_PATH+title+'/'+href)
			}
		}
		
	});
	
	if(window.screen.width<1199){
		$('.dropdown-toggle').attr('data-toggle', 'dropdown');
	}
	else{
		$('.dropdown-toggle').attr('data-toggle', '');
	}
	
	if(localStorage['srcHome']!=undefined&&localStorage['hrefHome']!=undefined){
		$('.rateChange').show()
		if(window.location.search===""&&window.location.pathname===MM_CONTEXT_PATH){
//			location.href=MM_CONTEXT_PATH;
			objArray=JSON.parse(localStorage["objArray"]);
			var exist=false;
			for(x in objArray){
				if(objArray[x].company===MM_CONTEXT_PATH){
					exist=true;
					$('#imgHeaderCompany').attr('href', objArray[x].company);
					$('#imgHeaderCompany img').attr('src', objArray[x].imagen);
				}
				if(objArray[x].company===MM_CONTEXT_PATH+'MutualValores'){
					$('.rateChange').hide();
				}
			}
			window.localStorage.clear();
		}
		else{
			objArray=JSON.parse(localStorage["objArray"]);
			var exist=false;
			for(x in objArray){
				if(objArray[x].company.indexOf(window.location.pathname) > -1){
					exist=true;
					if(objArray[x].company===MM_CONTEXT_PATH+'MutualValores'){
						$('.rateChange').hide();
					}	
//					if(objArray[x].company.split('/')[1]==""){
						$('#imgHeaderCompany').attr('href', objArray[x].company);
						$('.start').attr('href', objArray[x].company);
						$('#imgHeaderCompany img').attr('src', objArray[x].imagen);
						$('#icon-header').attr('href', objArray[x].company);
//					}else{
//						
//					}
				}
				else{
					if(company!=null){
						company=company.replace('/','');
						if(objArray[x].company===MM_CONTEXT_PATH+company){
							exist=true;
							if(objArray[x].company===MM_CONTEXT_PATH+'MutualValores'){
								$('.rateChange').hide();
							}
							$('#imgHeaderCompany').attr('href', objArray[x].company);
							$('#icon-header').attr('href', objArray[x].company);
							$('.start').attr('href', objArray[x].company);
							$('#imgHeaderCompany img').attr('src', objArray[x].imagen);
						}
					}
				}
			}
			if(exist===false){
			$('#imgHeaderCompany').attr('href', localStorage['hrefHome']);
			$('#icon-header').attr('href', objArray[x].company);
			$('.start').attr('href', objArray[x].company);
			$('#imgHeaderCompany img').attr('src',localStorage['srcHome']);
			}
		}
	}
	else{
		$('.rateChange').show()
		if(window.location.pathname.indexOf("MutualValores") > -1){
			$('#imgHeaderCompany').attr('href', MM_CONTEXT_PATH+"MutualValores");
			$('#icon-header').attr('href', MM_CONTEXT_PATH+"MutualValores");
			$('.start').attr('href',MM_CONTEXT_PATH+"MutualValores");
			$('.rateChange').hide();
			$('#imgHeaderCompany img').attr('src', MM_CONTEXT_PATH+'images/header/valores-168x64.png');
		}
		else if(window.location.pathname.indexOf("MutualSeguros") > -1){
			$('#imgHeaderCompany').attr('href', MM_CONTEXT_PATH+"MutualSeguros");
			$('#icon-header').attr('href', MM_CONTEXT_PATH+"MutualSeguros");
			$('.start').attr('href',MM_CONTEXT_PATH+"MutualSeguros");
			$('#imgHeaderCompany img').attr('src', MM_CONTEXT_PATH+'images/header/seguros-168x64.png');
		}
		else if(window.location.pathname.indexOf("MutualFondos") > -1){
			$('#imgHeaderCompany').attr('href', MM_CONTEXT_PATH+"MutualFondos");
			$('#icon-header').attr('href', MM_CONTEXT_PATH+"MutualFondos");
			$('.start').attr('href',MM_CONTEXT_PATH+"/MutualFondos");
			$('#imgHeaderCompany img').attr('src', MM_CONTEXT_PATH+'images/header/fondos-168x64.png');
		}
		else if(window.location.pathname.indexOf("MutualLeasing") > -1){
			$('#imgHeaderCompany').attr('href', MM_CONTEXT_PATH+"MutualLeasing");
			$('#icon-header').attr('href', MM_CONTEXT_PATH+"MutualLeasing");
			$('.start').attr('href',MM_CONTEXT_PATH+"MutualLeasing");
			$('#imgHeaderCompany img').attr('src', MM_CONTEXT_PATH+'images/header/leasing-168x64.png');
		}
		
		localStorage['beforehrefHome']=$('#imgHeaderCompany').attr('href');
		localStorage['beforeSRCHome']=$('#imgHeaderCompany img').attr('src');
		localStorage['hrefHome'] =$('#icon-header').attr('href');
		localStorage['srcHome']= $('#imgHeaderCompany img').attr('src');
	
		objArray=localStorage["objArray"];
		if(objArray==null){
			objArray=[];
		}
		else{
			objArray=JSON.parse(localStorage["objArray"]);
		}
		if(objArray.length===0){
			objArray[0]= objCompany;
			objCompany2.company=$('#icon-header').attr('href');
			objCompany2.imagen=$('#imgHeaderCompany img').attr('src');
			objArray[1]=objCompany2;
		}
		else{
			var existCompany=false;
			for(x in objArray){
			
				if(objArray[x].company===$('#icon-header').attr('href')){
					existCompany=true;
				}
			}
			if(existCompany===false){
				objCompany.company=$('#icon-header').attr('href');
				objCompany.imagen=$('#imgHeaderCompany img').attr('src');
				objArray[objArray.length]=objCompany;
			}
		}
		localStorage["objArray"]= JSON.stringify(objArray);
		localStorage['companies']= JSON.stringify(objArray);
	}
	$('.rateChange').show();
	var numCompany=company.split('=');	
	if(numCompany.length>1){
		numCompany=numCompany[1];
	}
	
	if(window.location.pathname.indexOf("MutualValores") > -1||(numCompany=="2")){
		$('#imgHeaderCompany').attr('href', MM_CONTEXT_PATH+"MutualValores");
		$('#icon-header').attr('href', MM_CONTEXT_PATH+"MutualValores");
		$('.start').attr('href',MM_CONTEXT_PATH+"MutualValores");
		$('.rateChange').hide();
		$('#imgHeaderCompany img').attr('src', MM_CONTEXT_PATH+'images/header/valores-168x64.png');
	}
	else if(window.location.pathname.indexOf("MutualSeguros") > -1||(numCompany=="3")){
		$('#imgHeaderCompany').attr('href', MM_CONTEXT_PATH+"MutualSeguros");
		$('#icon-header').attr('href', MM_CONTEXT_PATH+"MutualSeguros");
		$('.start').attr('href',MM_CONTEXT_PATH+"MutualSeguros");
		$('#imgHeaderCompany img').attr('src', MM_CONTEXT_PATH+'images/header/seguros-168x64.png');
	}
	else if(window.location.pathname.indexOf("MutualFondos") > -1||(numCompany=="4")){
		$('#imgHeaderCompany').attr('href', MM_CONTEXT_PATH+"MutualFondos");
		$('#icon-header').attr('href', MM_CONTEXT_PATH+"MutualFondos");
		$('.start').attr('href',MM_CONTEXT_PATH+"/MutualFondos");
		$('#imgHeaderCompany img').attr('src', MM_CONTEXT_PATH+'images/header/fondos-168x64.png');
	}
	else if(window.location.pathname.indexOf("MutualLeasing") > -1||(numCompany=="5")){
		$('#imgHeaderCompany').attr('href', MM_CONTEXT_PATH+"MutualLeasing");
		$('#icon-header').attr('href', MM_CONTEXT_PATH+"MutualLeasing");
		$('.start').attr('href',MM_CONTEXT_PATH+"MutualLeasing");
		$('#imgHeaderCompany img').attr('src', MM_CONTEXT_PATH+'images/header/leasing-168x64.png');
	}
	else {
		$('#imgHeaderCompany').attr('href',MM_CONTEXT_PATH);
		$('#icon-header').attr('href', MM_CONTEXT_PATH);
		$('.start').attr('href',MM_CONTEXT_PATH);
		$('#imgHeaderCompany img').attr('src','https://gmapp.fi.cr/biblioteca//1/logos//logoGM.png');
	}
	localStorage['beforehrefHome']=$('#imgHeaderCompany').attr('href');
	localStorage['beforeSRCHome']=$('#imgHeaderCompany img').attr('src');
	localStorage['hrefHome'] =$('#icon-header').attr('href');
	localStorage['srcHome']= $('#imgHeaderCompany img').attr('src');

	objArray=localStorage["objArray"];
	if(objArray==null){
		objArray=[];
	}
	else{
		objArray=JSON.parse(localStorage["objArray"]);
	}
	if(objArray.length===0){
		objArray[0]= objCompany;
		objCompany2.company=$('#icon-header').attr('href');
		objCompany2.imagen=$('#imgHeaderCompany img').attr('src');
		objArray[1]=objCompany2;
	}
	else{
		var existCompany=false;
		for(x in objArray){
		
			if(objArray[x].company===$('#icon-header').attr('href')){
				existCompany=true;
			}
		}
		if(existCompany===false){
			objCompany.company=$('#icon-header').attr('href');
			objCompany.imagen=$('#imgHeaderCompany img').attr('src');
			objArray[objArray.length]=objCompany;
		}
	
	}
	localStorage["objArray"]= JSON.stringify(objArray);
	localStorage['companies']= JSON.stringify(objArray);
	colorMenuBorderTop(document.getElementById("imgHeaderCompany").getAttribute("href"));	
	function colorMenuBorderTop(numCompany){ /*cambia el color del borde menu dependiendo de la empresa*/
		var parseCompany = numCompany.split('/');
		var index=parseCompany.length-1
		var numCompany;
		switch(parseCompany[index]) {
	    case 'MutualFondos':
	    	numCompany=4;
	        break;
	    case 'MutualValores':
	    	numCompany=2;
	        break;
	    case 'MutualSeguros':
	    	numCompany=3;
	        break;
	    case 'MutualLeasing':
	    	numCompany=5;
	        break;
	    case '':
	    	numCompany=1;
	        break;
		}
		parseCompany[1]=numCompany;
		if((parseCompany[1] == 1) || (parseCompany.length == 1)){
			document.getElementById("img-gris").style.borderTop = " 6px solid  rgb(227, 30, 37)";
			//Cambia el color del borde de la lista del menu
	        $('.dropdown a').hover(function() {
	            $(this).css('border-bottom', '4px solid rgb(227, 30, 37)');
	        },
	        function() {
	            $(this).css('border-bottom', 'none');
	        });	
	        
	        //Cambiar color borde al submenu
	        $('.dropdown-menu li a').hover(function() {
	            $(this).css('border-bottom', '4px solid rgb(227, 30, 37)');
	        },
	        function() {
	            $(this).css('border-bottom', 'none');
	        });	
		}
		if(parseCompany[1] == 2){ //Valores
			document.getElementById("img-gris").style.borderTop = "6px solid #C4D5AE"; 
	        $('.dropdown a').hover(function() {
	            $(this).css('border-bottom', '4px solid #C4D5AE');
	        },
	        function() {
	            $(this).css('border-bottom', 'none');
	        });
	        $('.dropdown-menu li a').hover(function() {
	            $(this).css('border-bottom', '4px solid #C4D5AE');
	        },
	        function() {
	            $(this).css('border-bottom', 'none');
	        });	
		}
		if(parseCompany[1] == 3){//Seguros
			document.getElementById("img-gris").style.borderTop = "6px solid #E6B905";
	        $('.dropdown a').hover(function() {
	            $(this).css('border-bottom', '4px solid #E6B905');
	        },
	        function() {
	            $(this).css('border-bottom', 'none');
	        });
	        $('.dropdown-menu li a').hover(function() {
	            $(this).css('border-bottom', '4px solid #E6B905');
	        },
	        function() {
	            $(this).css('border-bottom', 'none');
	        });	
		}
		if(parseCompany[1] == 4){//SFI
			document.getElementById("img-gris").style.borderTop = "6px solid #036EC0";
	        $('.dropdown a').hover(function() {
	            $(this).css('border-bottom', '4px solid #036EC0');
	        },
	        function() {
	            $(this).css('border-bottom', 'none');
	        });
	        $('.dropdown-menu li a').hover(function() {
	            $(this).css('border-bottom', '4px solid #036EC0');
	        },
	        function() {
	            $(this).css('border-bottom', 'none');
	        });	
		}
		if(parseCompany[1] == 5){//Leasing
			document.getElementById("img-gris").style.borderTop = "6px solid #E5E0D4";
	        $('.dropdown a').hover(function() {
	            $(this).css('border-bottom', '4px solid #E5E0D4');
	        },
	        function() {
	            $(this).css('border-bottom', 'none');
	        });
	        $('.dropdown-menu li a').hover(function() {
	            $(this).css('border-bottom', '4px solid #E5E0D4');
	        },
	        function() {
	            $(this).css('border-bottom', 'none');
	        });	
		}
	}
	
	
	var smallItem = $('.smallMenu .panel').children('.accordion-toggle');
	var mediumItem = $('.mediumMenu .internMenu');
	var largeItem = $('.largeMenu .internMenu');	
	var currentMediumElement;
	var currentLargeElement;
	var isMobile = window.matchMedia("only screen and (max-width: 767px)");
	var buttonLogin = $("#mutualEnLinea");
	var navbar_toggle = $('.navbar-toggle');
	var navbar_collapse = $('.navbar-collapse');	
	var menuLog = $("#buttonMenu");
	var menuPrincipal = $("#myNavbar");	
	var divShowFooter = $(".displayFooter");
	var menuDropdown = $('.menuPrincipal .dropdown-toggle');
	var loginMutualLinea = $('#loginMutualLinea');
	var largeAccordion = $('.largeMenu .accordion-toggle');
	var scrollMenuPosition;
	var itemToOpen = '';
	var toRefresh = false;
	setHeight();
	var currentMenu = "";
	styleTheMenu();

	
	$(window).scroll(function() {
	    var windscroll = $(window).scrollTop();
	    if (windscroll >= 100) {
	        $('div#img-gris').addClass('fixed');
	    } else {

	        $('div#img-gris').removeClass('fixed');
	    }

	}).scroll();
	
	$('#btnContinuar').on('click', function(evt){
		 evt.preventDefault();
		 var input=$('#userid');
		 if(input.val()===""){
			 alert('Digite un Nombre de Usuario');
		 }
		 else{
		$('#userid').val('');
		$('#mutualEnLinea').click();
		$('#signon').submit();
		}
		
	});
	

	$('#navigationBar').on('show.bs.collapse', function(event) {		
		$('.carouselContainer').css('opacity','0.1');
		$('.bodyContainer').css('opacity','0.1');
	});
	
	$('#navigationBar').on('hide.bs.collapse', function(event) {	
		$('.carouselContainer').css('opacity','1');
		$('.bodyContainer').css('opacity','1');
	});
	
	function styleTheMenu(){
		
		for(var x=0; x<smallItem.size();x++){
			var templItem= smallItem[x];
			var valueIdMenu = Number(templItem.getAttribute('data-contentid'));
			if(isNaN(valueIdMenu)){
				
				var replaceIconPlus= templItem.lastChild;
				replaceIconPlus.classList.remove('circle_plus');
				replaceIconPlus.classList.add('link');
			}
		}
		for(var x=0; x<mediumItem.size();x++){
			var templItem= mediumItem[x];
			var valueIdMenu = Number(templItem.getAttribute('data-contentid'));
			if(isNaN(valueIdMenu)){
				var replaceIconPlus= templItem.lastChild;
				replaceIconPlus.classList.remove('circle_plus');
				replaceIconPlus.classList.add('link');
			}
		}
		for(var x=0; x<largeItem.size();x++){
			var templItem= largeItem[x];
			var valueIdMenu = Number(templItem.getAttribute('data-contentid'));
			if(isNaN(valueIdMenu)){
				var replaceIconPlus= templItem.children[2];
				replaceIconPlus.classList.remove('circle_plus');
				replaceIconPlus.classList.add('link');
			}
		}
	
	}
	
	/* Set the path of the close arrow indicator */
	$('.arrowIndicatorClose img').attr('src', MM_CONTEXT_PATH +'images/content/icons_78.png');
	
	/* Set the menu height */
	setHeightMenu();
	
	/* Set the body's height */
	heightBody();
	
	$( document.body ).on( 'click', 'form .dropdown-menu li', function( event ) {
		var $target = $( event.currentTarget );
		$target.closest( '.btn-group' ).find( '[data-bind="label"]' ).text($target.text()).end().children( '.dropdown-toggle' ).dropdown( 'toggle' );
		return false;
		});
	
	
	/*Validate the captcha*/
	
	var validateInputsCaptcha = function( data,text ){
		$.ajax({
			url:  MM_CONTEXT_PATH +'validateInputsCaptcha',
		    type: 'GET',
		    data:{value:data, text:text}, 
		    success: function(data, value) {},
		    error: function (jqXHR, textStatus, errorThrown) {}
		    });
		};
	
	/**
	 * Event trigger when the device orientation change is executed
	 */
	var clickLabel = 0;
	$('.dropdown label').on('click tap', function(e){
		e.preventDefault();
	    if(isTablet && clickLabel == 0){
	    	$('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
	        $(this).toggleClass('open');
	        $('b', this).toggleClass("caret caret-up");    
	        if ($('form').is(':visible')) {
	        	buttonLogin.css('background', 'transparent');
	    		clickFast();
	    	}
	        clickLabel++;
		}
	    else{
	    	clickLabel = 0;
	    	var href = $(this).parent().attr('href');
	    	window.location.href = href;
	    	//console.log(href);
	    }
	 });
		 
	$(window).on( "orientationchange resize", function( event ) {
		var pageWidth = $(window).width() - 10;
		var absoluteRoute = self.location.href;
		if(absoluteRoute.endsWith('cercaDeMi')||absoluteRoute.endsWith('mutualBeneficios')||absoluteRoute.endsWith('DelSitio')||absoluteRoute.endsWith('contactenos')){
			setBodywithOutFooter();
		}else{
			setHeightMenu();
		}
		$('.dropdown-menu.mega-menu').css('min-width', pageWidth);
		var height = $(window).height();
		height = height - 106;
		if(isMobile.matches){
			$("#navigationBar .labelMenu").css('min-height', height);
			$("#loginMutualLinea .labelMenu").css('min-height', height);
			if(window.screen.width<1199){
				$('.dropdown-toggle').attr('data-toggle', 'dropdown');
			}
			if(window.screen.width>767){
				$('.carouselContainer').css('opacity','1');
				$('.bodyContainer').css('opacity','1');
			}
			else{
				$('.dropdown-toggle').attr('data-toggle', '');
			}
		}
		else{
			$("#navigationBar .labelMenu").css('min-height', 40);
			$("#loginMutualLinea .labelMenu").css('min-height', 40);
			$('.dropdown-toggle').attr('data-toggle', '');

			if(window.screen.width<1199){
				$('.dropdown-toggle').attr('data-toggle', 'dropdown');
			}
			else{
				$('.dropdown-toggle').attr('data-toggle', '');
			}
		}
		var oc_timer;
		clearTimeout(oc_timer);
		oc_timer = setTimeout(function () {
			var menuToShow;
			if($(window).width() < 480){
				menuToShow = "smallMenu";				
			}else if($(window).width() >= 480 && $(window).width() <= 1199 ){
				menuToShow = "mediumMenu";				
			}else{
				menuToShow = "largeMenu";
			}
//			alert("Current: "+currentMenu+" - ToShow: "+menuToShow);
			if(currentMenu !== menuToShow){
				if(toRefresh && menuToShow !== "" ){
					$("."+menuToShow +' .'+localStorage.getItem('shownItem')).click();
					toRefresh = false;
					currentMenu="";	
				}
				else{					
					if(currentMenu !== ""){
						currentMenu="";			
						if("."+menuToShow !== "" && menuToShow !== "smallMenu"){
							$("."+menuToShow+" .opened").find("[data-status='1']").click();
						}else{
							$("."+menuToShow+" .opened").click();
						}
						localStorage.clear();
					}
				}
			}
		}, 500);
	});
	
	/**
	 * Event trigger when the device orientation change is executed
	 */
//	window.addEventListener("orientationchange", function(e) {	
//		$(window).orientationchange();		
//	}, false);
	
	/**
	 * 
	 * To stop the event propagation, when clicked
	 * outside the boxes in the large menu
	 * 
	 */
	largeAccordion.on('click', function(e) {
		if (e.target.classList[0] === 'accordion-toggle') {
			e.stopPropagation();
		}
	});
		
	/**
	 * 
	 * To animate the scroll to top, when clicked on a small item menu
	 * 
	 */
	$('.smallMenu').on('shown.bs.collapse', function(event) {		
		var toScroll = $(this).children().find(".opened").offset().top;
		doScrollTo(toScroll);
	});
	
	/**
	 * 
	 * To animate the scroll to top, when clicked on a medium item menu
	 * 
	 */
	$('.mediumMenu').on('shown.bs.collapse', function(event) {
		var toScroll = $(this).children().find(".opened").parent().offset().top;
		doScrollTo(toScroll);
	});
	
	/**
	 * 
	 * To animate the scroll to top, when clicked on a large item menu
	 * 
	 */
	$('.largeMenu').on('shown.bs.collapse', function(event) {
		var toScroll = $(this).children().find(".opened").parent().offset().top;
		doScrollTo(toScroll);
	});

	
	/**
	 * When the navigation bar is shown
	 */
	navbar_collapse.on('shown.bs.collapse', function() {
		$('.carousel').carousel('pause');	
		disable_scroll();		
//		$('body').bind('touchmove', function(e){e.preventDefault()});
//		$('body').bind('mousewheel', function(e){e.preventDefault()});
	});
	
	
	/**
	 * When the navigation bar is hidden
	 */
	navbar_collapse.on('hidden.bs.collapse', function() {
		$('.carousel').carousel();	
		enable_scroll();
//		$('body').unbind('touchmove');
//		$('body').unbind('mousewheel');
	});
	
	/**
	 * When the navigation bar starts to show
	 */
	navbar_collapse.on('show.bs.collapse', function() {
		
		if (loginMutualLinea.is(':visible')) {
			clickFast();
		}
	});
		
//	window['home'] = CarouselsInitializer;
//	CarouselsInitializer.init();

	var colorMenu="rgb(235, 235, 235)"
	
	$('.arrowIndicatorClose img').on('click', function(e) {
		var divClose = this.parentNode.classList[0];
		var parent = this.parentNode.parentNode.parentNode;
		if (divClose == 'closeSmall') {	
			parent.firstChild.click();
		}
		else if (divClose == 'closemedium') {
			parent = parent.firstChild;
			var mediumMe = $(".mediumMenu .panel .accordion-toggle");
			var cantItemsMenu = mediumMe.get(0).children.length;
			for (var cont = 0; cont < cantItemsMenu; cont++) {
				if (parent.children.item(cont).style.background == "white") {
					var index = cont;
					$(parent.children.item(index)).click();
				}
			}
		} else {
			parent = parent.firstChild;
			var LargeMe = $(".largeMenu .panel .accordion-toggle");
			var cantItemsMenu = parent.children.length;
			for (var cont = 0; cont < cantItemsMenu; cont++) {
				
				if (parent.children.item(cont).style.background.indexOf(colorMenu)!=-1) {
					var index = cont;
				//	doScrollTo(parent.offsetTop, function(){});					
					parent.children.item(index).click();
				}
			}
		}
	});
	
	/**
	 * 
	 * When a small item menu is clicked, this event set some styles 
	 * like background, change the circle_minus icon instead of circle_plus icon.
	 * 
	 */	
	
	$('.accordion-toggle').click(function(event ){
	
		if(star!==true){
			event.stopPropagation();
			star =false;
		}else{
			 event.preventDefault();
			 star =false;
		}
		  // Do something
	});
	
	smallItem.on('click', function(e) {
		star=true;
		var classNames = $(this).attr('class').split(' ');
		itemToOpen = classNames[1];
		currentMenu="smallMenu";
		
		if ($(this).hasClass('opened')) {
			$(this).removeClass('opened');
			$(this).find(".circle_minus").removeClass("circle_minus").addClass("circle_plus");
			$(this).attr('data-status','0');
			$(this).css('background', 'transparent');			
			toRefresh = false;			
		} else {
			$('.smallMenu .accordion-toggle').removeClass('opened');
			$('.smallMenu .accordion-toggle').css('background','transparent');
			$('.smallMenu .circle_minus').removeClass("circle_minus").addClass("circle_plus");
			$(this).addClass('opened');
			$(this).find(".circle_plus").removeClass("circle_plus").addClass("circle_minus");
			$(this).attr('data-status','1');
			$(this).css({'background' : 'white'});	
			
			var id = $(this).data('contentid');
			if(typeof(id)==="number"){
				loadContentMenu(id, this, "small");
			}
			else{
				e.stopPropagation();
				loadContentMenu(id, this, "small");		
			}
			toRefresh = true;
			localStorage.setItem('shownItem',itemToOpen);
		}
	});
	
	/**
	 * 
	 * When a medium item menu is clicked, this event set some styles 
	 * like background, change the circle_minus icon instead of circle_plus icon.
	 * 
	 */
	
	mediumItem.on('click', function(e) {
				star=true;
				var classNames = $(this).attr('class').split(' ');
				itemToOpen = classNames[1];
				currentMenu="mediumMenu";
				
				scrollMenuPosition = $(document).scrollTop();
				var parent = $(this).parent();
				if (parent.hasClass('opened')) {
					if (currentMediumElement === itemToOpen) {
						//console.log('Close Carousel');
						parent.removeClass('opened');
						for (var x = 1; x <= mediumItem.length; x++) {
							var item = "item" + x;
							if ($(this).hasClass(item)) {
								$('.mediumMenu .' + item).attr('data-status','0');
								$('.mediumMenu .' + item).css({ 'background' : 'transparent' });
							}
						}						
						toRefresh = false;						
					} else {
						//console.log('Change Content');
						$('.mediumMenu .internMenu .circle_minus').removeClass("circle_minus").addClass("circle_plus");
						for (var x = 1; x <= mediumItem.length; x++) {
							var item = "item" + x;
							if ($(this).hasClass(item)) {
								//console.log(item);
								$('.mediumMenu .' + item).attr('data-status','1');
								$('.mediumMenu .' + item).css({ 'background' : 'white' 	});
								} else {
									$('.mediumMenu .' + item).attr('data-status','0');
								$('.mediumMenu .' + item).css({ 'background' : 'transparent' });
							}							
						}
						e.stopPropagation();
						currentMediumElement = itemToOpen;
						var id = $(this).data('contentid');
						loadContentMenu(id, this, "medium");
						
						toRefresh = true;
						localStorage.setItem('shownItem',itemToOpen);
					}
				} else {
					$('.mediumMenu .panel').children().removeClass('opened');
					var closeFirstMedMenu = $('.mediumMenu .panel .internMenu');
					closeFirstMedMenu.attr('data-status','0');
					closeFirstMedMenu.css({ 'background' : 'transparent' });
					$('.mediumMenu .internMenu .circle_minus').removeClass("circle_minus").addClass("circle_plus");
					parent.addClass('opened');
					for (var x = 1; x <= mediumItem.length; x++) {
						if(typeof($(this).data('contentid'))==="number"){
						var item = "item" + x;
						if ($(this).hasClass(item)) {
						//	console.log(item);
							$('.mediumMenu .' + item).attr('data-status','1');
							$('.mediumMenu .' + item).css({ 'background' : 'white' });
						}}
						else{
							$('.collapseDiv').removeClass('in');
							e.stopPropagation();
						}
					}
					//console.log('Open Carousel');
					currentMediumElement = itemToOpen;
					var id = $(this).data('contentid');
					loadContentMenu(id, this,"medium");

					toRefresh = true;
					localStorage.setItem('shownItem',itemToOpen);
				}
				if (parent.hasClass('opened')) {
					$(this).find(".circle_plus").removeClass("circle_plus").addClass("circle_minus");
					for (var x = 1; x <= mediumItem.length; x++) {
						var item = "item" + x;
						if ($(this).hasClass(item)) {
							$('.mediumMenu .' + item).attr('data-status','1');
							$('.mediumMenu .' + item).css({ 'background' : 'white' });
							}
					}
				} else {
					$(this).find(".circle_minus").removeClass("circle_minus").addClass("circle_plus");
					for (var x = 1; x <= mediumItem.length; x++) {
						var item = "item" + x;
						if ($(this).hasClass(item)) {
							$('.mediumMenu .' + item).attr('data-status','0');
							$('.mediumMenu .' + item).css({ 'background' : 'transparent' });
						}
					}
				}			
	});
	largeItem.on('click', function(e) {
	
		star=true;
		var classNames = $(this).attr('class').split(' ');
		itemToOpen = classNames[1];
		currentMenu="largeMenu";
		
		var parent = $(this).parent();
		if (parent.hasClass('opened')) {
			if (currentLargeElement === itemToOpen) {
				//console.log('Close Carousel');
				parent.removeClass('opened');
				for (var x = 1; x <= largeItem.length; x++) {
					var item = "item" + x;
					if ($(this).hasClass(item)) {
						var idItem=$(this).parent().parent().parent().parent().attr('id');
						$('#'+idItem+' '+'.' + item).css({
							'height' : '150',
							'margin-bottom' : '20',
							'box-shadow' : 'rgba(255, 255, 255, 0.701961) 0px 0px 0px inset, rgba(0, 0, 0, 0.0980392)'+
								'0px 0px 1px inset, rgba(0, 0, 0, 0.0980392) 1px 1px 10px'
						});
						$('#'+idItem+' '+'.' + item).addClass('casillaClose');
						$('#'+idItem+' '+'.' + item).removeClass('casillaOpen');
					}
				}
				toRefresh = false;
			} else {
				//console.log('Change Content');
				var idItem=$(this).parent().parent().parent().parent().attr('id');
				$('#'+idItem+' .internMenu .circle_minus').removeClass("circle_minus").addClass("circle_plus");
				for (var x = 1; x <= largeItem.length; x++) {
					var item = "item" + x;
					if ($(this).hasClass(item)) {
						//console.log(item);
						var idItem=$(this).parent().parent().parent().parent().attr('id');
						$('.'+idItem+' '+'.' + item).css({
							'background' : '#ddd',
							'height' : '170',
							'margin-bottom' : '0',
							'box-shadow' : 'none'
						});
						$('#'+idItem+' '+'.' + item).removeClass('casillaClose');
						$('#'+idItem+' '+'.' + item).addClass('casillaOpen');
					
					} else {
						var idItem=$(this).parent().parent().parent().parent().attr('id');
						$('#'+idItem+' '+'.' + item).css({
							'background' : '#ddd',
							'height' : '120',
							'height' : '150',
							'margin-bottom' : '20',
							'box-shadow' : 'rgba(255, 255, 255, 0.701961) 0px 0px 0px inset, rgba(0, 0, 0, 0.0980392)'+
							'0px 0px 1px inset, rgba(0, 0, 0, 0.0980392) 1px 1px 10px'
						});
						$('#'+idItem+' '+'.' + item).addClass('casillaClose');
						$('#'+idItem+' '+'.' + item).removeClass('casillaOpen');
					}
				}
				e.stopPropagation();
				
				currentLargeElement = itemToOpen;
				var id = $(this).data('contentid');
				loadContentMenu(id,parent, "lage");

				toRefresh = true;
				localStorage.setItem('shownItem',itemToOpen);
				
			}
		} else {
			var idItem=$(this).parent().parent().parent().parent().attr('id');
			$('#'+idItem+' .panel').children().removeClass('opened');
			var closeFirstLargMenu = $('#'+idItem+' .panel .internMenu');
			closeFirstLargMenu.css({
				'height' : '150',
				'margin-bottom' : '20',
				'box-shadow' : 'rgba(255, 255, 255, 0.701961) 0px 0px 0px inset, rgba(0, 0, 0, 0.0980392)'+
				'0px 0px 1px inset, rgba(0, 0, 0, 0.0980392) 1px 1px 10px'
			});
			$('#'+idItem+' '+'.' + item).addClass('casillaClose');
			$('#'+idItem+' '+'.' + item).removeClass('casillaOpen');
			$('#'+idItem+' .internMenu .circle_minus').removeClass("circle_minus").addClass("circle_plus");
			
			parent.addClass('opened');
			//console.log('Open Carousel');
			
			for (var x = 1; x <= largeItem.length; x++) {
				var item = "item" + x;
				if ($(this).hasClass(item)) {
					if(typeof($(this).data('contentid'))==="number"){
					//console.log(item);
					$('#'+idItem+' '+'.' + item).css({
						'background' : 'rgb(235,235,235)',
						'height' : '170',
						'margin-bottom' : '0',
						'box-shadow' : 'none'
					});
					$('#'+idItem+' '+'.' + item).addClass('casillaOpen');
					$('#'+idItem+' '+'.' + item).removeClass('casillaClose');
					}
					else{
						$('.collapseDiv').removeClass('in');
						e.stopPropagation();
					}
					
				}
					
			}
			currentLargeElement = itemToOpen;
			var id = $(this).data('contentid');
			loadContentMenu(id,parent, "large");
			
			toRefresh = true;
			localStorage.setItem('shownItem',itemToOpen);
			
		}
		if (parent.hasClass('opened')) {
			$(this).find(".circle_plus").removeClass("circle_plus").addClass("circle_minus");
			for (var x = 1; x <= largeItem.length; x++) {
				var item = "item" + x;
				var idItem=$(this).parent().parent().parent().parent().attr('id');
				if ($(this).hasClass(item)) {
					$('#'+idItem+' '+'.' + item).css({
						'background' : 'rgb(235,235,235)',
						'height' : '170',
						'margin-bottom' : '0',
						'box-shadow' : 'none'
					});
					$('#'+idItem+' '+'.' + item).addClass('casillaOpen');
					$('#'+idItem+' '+'.' + item).removeClass('casillaClose');
					for (var i = 1; i <= largeItem.length; i += 4) {
				      if ((item === 'item'+ i)) {
				       $('.collapseDiv div').css({
				        'border-top-left-radius' : 0,
				        'border-top-right-radius' : 10
				       });
				       return;
				       } else {
					       $('.collapseDiv div').css({ 
					        'border-top-right-radius' : 10,
					        'border-top-left-radius' : 10
					       });
					   }
					}
				     for (var i = 4; i <= largeItem.length; i += 4) {
				    	 if ((item === 'item'+ i)) {
				         $('.collapseDiv div').css({
				        	 'border-top-right-radius' : 0,
				        	 'border-top-left-radius' : 10
				         });
				         return;
				    	 } else {
				    		 $('.collapseDiv div').css({
				    			 'border-top-right-radius' : 10,
				    			 'border-top-left-radius' : 10
				    		 });
				    	 }
				     }
				}
			}
		  } else {
		   $(this).find(".circle_minus").removeClass("circle_minus").addClass("circle_plus");
		   $(this).css({
				'background' : '#ddd'
			});
		   for (var x = 1; x <= largeItem.length; x++) {
		    var item = "item" + x;
		    
		   }
		  }
		 });
	
	var _gaq = _gaq || [];
	_gaq.push([ '_setAccount', 'UA-36251023-1' ]);
	_gaq.push([ '_setDomainName', 'jqueryscript.net' ]);
	_gaq.push([ '_trackPageview' ]);
	
	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
	
//	
//	divShowFooter.on('click', function(e) {
//		var options = {};
//		$("footer").toggle("blind");
//		doScrollTo($('body')[0].scrollHeight);
//		 
//		if($('footer').is(':visible')){
//			$('.displayFooterArrow').css({'border-top':'10px solid rgb(227, 30, 37)', 'border-bottom':0,'top':20});
//		}
//		else{
//			$('.displayFooterArrow').css({'border-top':0, 'border-bottom':'10px solid rgb(227, 30, 37)','top':0});
//		}
//		
//	});
//	
	$('.displayFooter').on('click',function(){
	    //mostramos la capa que está oculta
		if($('footer').is(':visible')){
			$('footer').hide(); //ocultamos el enlace que fue clickeado
			doScrollTo($('body')[0].scrollHeight);
			$('.displayFooterArrow').css({'border-top':0, 'border-bottom':'10px solid rgb(227, 30, 37)','top':-10});
			$('.displayFooterArrow span').removeClass().addClass('glyphicon glyphicon-chevron-up');
			
		}
		else{$('footer').show('fast',function(){
			doScrollTo($('body')[0].scrollHeight);
			$('.displayFooterArrow').css({'border-top':'10px solid rgb(227, 30, 37)', 'border-bottom':0,'top':20});
			$('.displayFooterArrow span').removeClass().addClass('glyphicon glyphicon-chevron-down');
			
	    });
		}
	});
	

	buttonLogin.on('click ', function(e) {
		if (isMobile.matches && navbar_collapse.is(':visible')) {
			$('#userid').val('');
			setHeight();
			navbar_toggle.trigger('click');
			var myVar = setInterval(function() {
				myTimer()
			}, 300);
			var timesRun = 0;
		
		
			
			function myTimer() {
				timesRun += 1;
				
				$("#loginMutualLinea").toggle('slide', {
					direction : "right"
				}, 600);
				disable_scroll();
				$('.carouselContainer').css('opacity','0.1');
				$('.bodyContainer').css('opacity','0.1');
				if (timesRun === 1) {
					clearInterval(myVar);
				}
			}
		} else {
			if (isMobile.matches) {
				$('#userid').val('');
				setHeight();
				if($("#loginMutualLinea").is(':visible')){
					$("#loginMutualLinea").toggle('slide', {
						direction : "right"
					}, 600);
					$('.main-content').css('opacity','1');
					$('.bodyContainer').css('opacity','1');
					$('.carouselContainer').css('opacity','1');
					$('.tablet-interest-points-list ').show();
					enable_scroll();
				}
				else{
					$("#loginMutualLinea").toggle('slide', {
						direction : "right"
					}, 600);
					$('.tablet-interest-points-list ').hide();
					$('.carouselContainer').css('opacity','0.1');
					$('.main-content').css('opacity','0.1');
					$('.bodyContainer').css('opacity','0.1');
					disable_scroll();
				}
			
				
			} else if ($('.dropdown-menu').is(':visible')) {
				$('li.dropdown').trigger('click');

				rgb(218, 218, 218).css('background','rgb(218, 218, 218)');
				$("#loginMutualLinea").toggle('blind', function() {
					if ($("#loginMutualLinea").is(':visible')) {
						buttonLogin.css('background','rgb(218, 218, 218)');
					} else {
						buttonLogin.css('background','transparent');
						$('#userid').val('');
					}
				});
			} else if ($('.dropdown-menu').is(':visible') == false) {
				buttonLogin.css('background','rgb(218, 218, 218)');
				$("#loginMutualLinea").toggle('blind', function() {
					if ($("#loginMutualLinea").is(':visible')) {
						buttonLogin.css('background','rgb(218, 218, 218)');
					} else {
						buttonLogin.css('background','transparent');
						$('#userid').val('');
					}
				});
			}
		}
	});

	// Cerrar menuLogin cuando se presiona un submenu del
	// principal
	menuDropdown.on('click ', function(e) {
		if(e.type=="mouseover"){
			if ($('form').is(':visible')) {
				buttonLogin.css('background', 'transparent');
				clickFast();
				
			}
			$(this).click();
			
		}
		if ($('form').is(':visible')) {
			buttonLogin.css('background', 'transparent');
			clickFast();
		}
	});
	
	$(".dropdown").hover(    
	            function() {
	            	if (!isMobile.matches) {
	                $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
//	                if($('.dropdown-menu').is(':visible')){
//	                	  $('.tablet-interest-points-list ').hide();
//	                }
	              
	                $(this).toggleClass('open');
	                $('b', this).toggleClass("caret caret-up");  
	                if ($('form').is(':visible')) {
	        			buttonLogin.css('background', 'transparent');
	        			$('#userid').val('');
	        			clickFast();
	        			
	        		}}
	            },
	            function() {
	            	if (!isMobile.matches) {
	                $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
	           
	             
	                $(this).toggleClass('open');
	                $('b', this).toggleClass("caret caret-up");    
	                if ($('form').is(':visible')) {
	        			buttonLogin.css('background', 'transparent');
	        			clickFast();
	        			
	        		}}
	            });


	$(document).on('shown.bs.dropdown','.dropdown',	function() {
		var currentMenuItem = $(this);
		if (isMobile.matches) {
			var pageWidth = $(window).width() - 10;
			currentMenuItem.children('ul').css('min-width', pageWidth);
			currentMenuItem.parent().children().hide();
			currentMenuItem.children().children().eq(0).removeClass().addClass('glyphicons left_arrow white');
			currentMenuItem.children().children().eq(2).hide()
			currentMenuItem.children().children().eq(1).hide();
		}
		$('.tablet-interest-points-list').hide()
	});

	$(document).on('hidden.bs.dropdown','.dropdown', function() {
		var currentMenuItem = $(this);
		if (isMobile.matches) {
			currentMenuItem.children().children().eq(0).removeClass().addClass('glyphicons factory white');
			currentMenuItem.children().children().eq(2).show()
			currentMenuItem.children().children().eq(1).show();
			currentMenuItem.parent().children().show();
			currentMenuItem.children().children().eq(0).css('right', '0');
			currentMenuItem.children().children().eq(1).css('right', '0');	
		}
		$('.tablet-interest-points-list').show();
	});

	function clickFast() {
		buttonLogin.click(loginMutualLinea.hide());
	}
	
	menuLog.on('click', function(e) {
		e.stopPropagation();
		if (menuPrincipal.hasClass("in")) {
			menuPrincipal.removeClass("in");
			$("#loginMutualLinea").css('display', 'none');
			//console.log("cerrar");
		} else {
			menuPrincipal.addClass("in");
			//console.log("abrir");
		}
	});
	
	$('.holder_bu').on('click', function(){
		localStorage['beforehrefHome']=$('#imgHeaderCompany').attr('href');
		localStorage['beforeSRCHome']=$('#imgHeaderCompany img').attr('src');
		localStorage['hrefHome'] =$(this.children).attr('href');
		var element=$(this.children);
		localStorage['srcHome']= element.children().attr('src');
		//console.log('click');
		objArray=localStorage["objArray"];
		if(objArray==null){
			objArray=[];
		}
		else{
			
			objArray=JSON.parse(localStorage["objArray"]);
		}
		if(objArray.length===0){
			objArray[0]= objCompany;
			objCompany2.company=$(this.children).attr('href');
			objCompany2.imagen=element.children().attr('src');
			objArray[1]=objCompany2;
		}
		else{
			var existCompany=false;
			for(x in objArray){
			
				if(objArray[x].company===$(this.children).attr('href')){
					existCompany=true;
				}
			}
			if(existCompany===false){
				objCompany.company=$(this.children).attr('href');
				objCompany.imagen=element.children().attr('src');
				objArray[objArray.length]=objCompany;
			}
		
		}
		localStorage["objArray"]= JSON.stringify(objArray);
		localStorage['companies']= JSON.stringify(objArray);
			
	});
});