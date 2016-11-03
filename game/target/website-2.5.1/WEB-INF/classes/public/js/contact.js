
/**
 * Function to add the corresponding validations to the fields in the Section
 * Form
 * 
 * @author cvargas-as Avantica Technologies
 */

function contactMessage(numCompany){
	var parseCompany = numCompany.split('/');
	var select = document.getElementById("job");
	var selectLength = document.getElementById("job").length;
	var index=parseCompany.length-1
	var companyNum=1;
	switch (parseCompany[index]) {
	case "MutualValores":
		companyNum=2;
		break;
	case "MutualSeguros":
		companyNum=3;	
			break;
	case "MutualFondos":
		companyNum=4;
		break;
	case "MutualLeasing":
		companyNum=5;
		break;
	default:
		break;
	}
	if((companyNum == 1)|| (parseCompany.length == 1)){	
		for(var i = 0; i < selectLength; i++){
			var selectOption = select.options[i].value;		
			if((selectOption == "Mutual Leasing") || (selectOption == "Mutual Valores") || (selectOption ==  "Mutual Seguros") || 
					(selectOption == "Mutual Fondos")){ 
				select.remove(i);
				i = -1;
			}
			selectLength = document.getElementById("job").length;
		}
	}
	if((companyNum == 2)){	
		for(var i = 0; i < selectLength; i++){
			var selectOption = select.options[i].value;	
			if((selectOption == "Mutual Leasing") || (selectOption == "Cobros") || (selectOption == "Mutual En Línea") || 
					(selectOption ==  "Mutual Seguros") || (selectOption == "Recursos Humanos") || (selectOption == "Tarjetas") || 
					(selectOption == "Contraloria de Servicios") || (selectOption == "Captación y Ahorros") || (selectOption == "Mutual Fondos") || 
					(selectOption == "Préstamos") || (selectOption == "Ahorro e Inversión")){ 
				select.remove(i);
				i = -1;
			}
			selectLength = document.getElementById("job").length;
		}
	}
	if((companyNum == 3)){	
		for(var i = 0; i < selectLength; i++){
			var selectOption = select.options[i].value;	
			if((selectOption == "Mutual Leasing") || (selectOption == "Cobros") || (selectOption == "Mutual En Línea") || 
					(selectOption ==  "Mutual Valores") || (selectOption == "Recursos Humanos") || (selectOption == "Tarjetas") || 
					(selectOption == "Contraloria de Servicios") || (selectOption == "Captación y Ahorros") ||(selectOption == "Mutual Fondos") || 
					(selectOption == "Préstamos") || (selectOption == "Ahorro e Inversión")){
				select.remove(i);
				i = -1;
			}
			selectLength = document.getElementById("job").length;
		}
	}
	if((companyNum == 4)){	
		for(var i = 0; i < selectLength; i++){
			var selectOption = select.options[i].value;	
			if((selectOption == "Mutual Leasing") || (selectOption == "Cobros") || (selectOption == "Mutual En Línea") || 
					(selectOption ==  "Mutual Seguros") || (selectOption == "Recursos Humanos") || (selectOption == "Tarjetas") || 
					(selectOption == "Contraloria de Servicios") || (selectOption == "Captación y Ahorros") ||(selectOption == "Mutual Valores") || 
					(selectOption == "Préstamos") || (selectOption == "Ahorro e Inversión")){ 
				select.remove(i);
				i = -1;
			}
			selectLength = document.getElementById("job").length;
		}
	}
	if((companyNum == 5)){	
		for(var i = 0; i < selectLength; i++){
			var selectOption = select.options[i].value;	
			if((selectOption == "Mutual Valores") || (selectOption == "Mutual Seguros") || (selectOption == "Mutual En Línea") || 
					(selectOption ==  "Ahorro e Inversión") || (selectOption == "Recursos Humanos") || (selectOption == "Tarjetas") || 
					(selectOption == "Contraloria de Servicios") || (selectOption == "Captación y Ahorros") ||(selectOption == "Mutual Fondos") || 
					(selectOption == "Préstamos") || (selectOption == "Cobros")){ 
				select.remove(i);
				i = -1;
			}
			selectLength = document.getElementById("job").length;
		}
	}
}
	
function addValidatorToContactForm() {

	$('#formContact').bootstrapValidator({
		fields : {
			
			'name' : {
				validators : {
					notEmpty : {
						message : 'El Nombre es requerido'
					},
					stringLength : {
						max : 50,
						message : 'El Nombre es demasiado lago'
					}
				}
			},
			'factory' : {
				validators : {
					notEmpty : {
						message : 'El Primer Apellido es requerida'
					},
					stringLength : {
						max : 50,
						message : 'El Primer Apellido es demasiado lago'
					}
				}

			},
			'address' : {
				validators : {
					notEmpty : {
						message : 'El Segundo Apellido es requerida'
					},
					stringLength : {
						max : 50,
						message : 'El Segundo Apellido es demasiado largo'
					}
				}

			},
			'ced' : {
				validators : {
					notEmpty : {
						message : 'La Cédula es requerida'
					},
					stringLength : {
						min:7,
						message : 'El número de Cédula debe tener al menos 7 carecteres.'
					},
					 regexp: {
	                        regexp: /^[a-zA-Z0-9#*]+$/,
	                        message: 'El número de cédula solo puede tener números y letras'
	                        }
				}

			},
			'phone' : {
				validators : {
					notEmpty : {
						message : 'El Número de Teléfono es requerido'
					},
					digits : {
						message : 'El Número de Teléfono deben ser números'
					},
					stringLength : {
						min : 8,
						message : 'El Número de Teléfono debe tener al menos 8 números'
					}

				}
			},
			'inputEmail' : {
				validators : {
					emailAddress : {
						message : 'El formato del E-mail es incorrecto'
					},
					notEmpty : {
						message : 'El E-mail requerido'
					}
				}
			},
			'comment' : {
				validators : {
					notEmpty : {
						message : 'El Comentario es requerido'
					},
					stringLength : {
						max : 200,
						message : 'El Comentario es demasiado lago'
					}
				}
			},
			'captchaConfirm':{
				validators : {
					notEmpty : {
						message : 'El Comentario es requerido'
					}
			}
			},
			
			'txtInput' : {
				validators : {
					notEmpty : {
						message : 'El Captcha es requerido'
					},
					stringLength : {
						max : 8,
						message : 'El Número del Captcha es demasiado lago'
					},
					identical:{
						field: 'captchaConfirm',
						 message: 'El texto no coincide con el Captcha'
					}
				}
			
			}
		}
	}).on('success.form.bv', function(e) {
        e.preventDefault();
        var data=	$( "#formContact" ).serialize();
        var typeSent= $( "#job option:selected").text().trim();
   	
   		  $.ajax({
   	      url:  MM_CONTEXT_PATH +'sendNotification',
   	      type: 'GET',
   	      data:data+"&AreaTrabajo="+typeSent,
   	      success: function(data) {       
   	      // console.log(data);        
   	       $('.container.containerTemplete.msjContact').css('display','block');
   	 	  $('.container.containerTemplete.first').css('display','none');
   	      },
   	      error: function (jqXHR, textStatus, errorThrown) {
   	      // console.log("Error.....");         
   	      }
   	     });
   	
//        _utils.sendEventsInteraction('Ayúdenos a mejorar', 'Usuario envío comentarios');         
//        sendFeedback();
//        $('#sendButton').removeAttr('disabled');
       });
}

var code;
function DrawCaptcha() {
	var abecedario = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
			"L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
			"Y", "Z" ];

	var a,b,c,d,e,f,g;
	
	 a = Math.ceil(Math.random() * 9) + '';
	 b = abecedario[Math.round(Math.random() * 26)] + '';
	 c = Math.ceil(Math.random() * 9) + '';
	 d = Math.ceil(Math.random() * 9) + '';
	 e = abecedario[Math.round(Math.random() * 26)] + '';
	 f = Math.ceil(Math.random() * 9) + '';
	 g = Math.ceil(Math.random() * 9) + '';
	 
	if(a==="undefined"){
		 a = Math.ceil(Math.random() * 9) + '';
	}
	if(b==='undefined'){
		 b = abecedario[Math.round(Math.random() * 26)] + '';
	}
	if(c==='undefined'){
		 c =  Math.ceil(Math.random() * 9) + '';
	}
	if(d==='undefined'){
		 d = Math.ceil(Math.random() * 9) + '';
	}
	if(e==='undefined'){
		 abecedario[Math.round(Math.random() * 9)] + '';
	}
	if(f==='undefined'){
		f = Math.ceil(Math.random() * 9) + '';
	}
	if(g==='undefined'){
		g = Math.ceil(Math.random() * 9) + '';
	}
	  
	code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
	
	var c = document.getElementById("txtCaptcha");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.font = "30px Comic Sans MS ";
	ctx.shadowColor = "rgba(0, 0, 0, 1)"; 
	ctx.fillText(code, 10, 50);

	$('#captchaConfirm').val(removeSpaces(code));
}

// Validate the Entered input aganist the generated security code function
function ValidCaptcha() {
	var str1 = removeSpaces(code);
	var str2 = removeSpaces(document.getElementById('txtInput').value);
	if (str1 == str2)
		return true;
	return false;
}

// Remove the spaces from the entered and generated code
function removeSpaces(string) {
	return string.split(' ').join('');
}

	$('#newMsj').on('click',function(){
		$('#formContact').each (function(){
			this.reset();
			});
		$('.container.containerTemplete.msjContact').css('display','none');
		$('.container.containerTemplete.first').css('display','block');
		$('#btnrefresh').click();
	});
	
//	$( "#formContact" ).submit(function( event ) {	
//	 var data=	$( "#formContact" ).serialize();
//	 var typeSent= $( "#job ").text().trim();
//
//	
//		  $.ajax({
//	      url:  MM_CONTEXT_PATH +'sendNotification',
//	      type: 'GET',
//	      data:data+"&AreaTrabajo="+typeSent,
//	      success: function(data) {       
//	       console.log(data);        
//	       $('.container.containerTemplete.msjContact').css('display','block');
//	 	  $('.container.containerTemplete.first').css('display','none');
//	      },
//	      error: function (jqXHR, textStatus, errorThrown) {
//	       console.log("Error.....");         
//	      }
//	     });
//	  event.preventDefault();
//	 
//	}
//	);
	
	$('.itemJob').click(function(){
		var text = this.text;
		$('#valAreaJob').val(text);
	});
	
	
/**
 * Function to add the corresponding validations to the fields in the Section
 * Form
 * 
 * @author cvargas-as Avantica Technologies
 */

function contactMessage(numCompany){
	var parseCompany = numCompany.split('/');
	var select = document.getElementById("job");
	var selectLength = document.getElementById("job").length
	var index=parseCompany.length-1
	if((parseCompany[index] == "")|| (parseCompany.length == 1)){	
		for(var i = 0; i < selectLength; i++){
			var selectOption = select.options[i].value;		
			if((selectOption == "Mutual Leasing") || (selectOption == "Mutual Valores") || (selectOption ==  "Mutual Seguros") || 
					(selectOption == "Mutual Fondos")){ 
				select.remove(i);
				i = -1;
			}
			selectLength = document.getElementById("job").length;
		}
	}
	if((parseCompany[index] == "MutualValores")){	
		for(var i = 0; i < selectLength; i++){
			var selectOption = select.options[i].value;	
			if((selectOption == "Mutual Leasing") || (selectOption == "Cobros") || (selectOption == "Mutual En Línea") || 
					(selectOption ==  "Mutual Seguros") || (selectOption == "Recursos Humanos") || (selectOption == "Tarjetas") || 
					(selectOption == "Contraloria de Servicios") || (selectOption == "Captación y Ahorros") || (selectOption == "Mutual Fondos") || 
					(selectOption == "Préstamos") || (selectOption == "Ahorro e Inversión")){ 
				select.remove(i);
				i = -1;
			}
			selectLength = document.getElementById("job").length;
		}
	}
	if((parseCompany[index] == "MutualSeguros")){	
		for(var i = 0; i < selectLength; i++){
			var selectOption = select.options[i].value;	
			if((selectOption == "Mutual Leasing") || (selectOption == "Cobros") || (selectOption == "Mutual En Línea") || 
					(selectOption ==  "Mutual Valores") || (selectOption == "Recursos Humanos") || (selectOption == "Tarjetas") || 
					(selectOption == "Contraloria de Servicios") || (selectOption == "Captación y Ahorros") ||(selectOption == "Mutual Fondos") || 
					(selectOption == "Préstamos") || (selectOption == "Ahorro e Inversión")){
				select.remove(i);
				i = -1;
			}
			selectLength = document.getElementById("job").length;
		}
	}
	if((parseCompany[index] == "MutualFondos")){	
		for(var i = 0; i < selectLength; i++){
			var selectOption = select.options[i].value;	
			if((selectOption == "Mutual Leasing") || (selectOption == "Cobros") || (selectOption == "Mutual En Línea") || 
					(selectOption ==  "Mutual Seguros") || (selectOption == "Recursos Humanos") || (selectOption == "Tarjetas") || 
					(selectOption == "Contraloria de Servicios") || (selectOption == "Captación y Ahorros") ||(selectOption == "Mutual Valores") || 
					(selectOption == "Préstamos") || (selectOption == "Ahorro e Inversión")){ 
				select.remove(i);
				i = -1;
			}
			selectLength = document.getElementById("job").length;
		}
	}
	if((parseCompany[index] == "MutualLeasing")){	
		for(var i = 0; i < selectLength; i++){
			var selectOption = select.options[i].value;	
			if((selectOption == "Mutual Valores") || (selectOption == "Mutual Seguros") || (selectOption == "Mutual En Línea") || 
					(selectOption ==  "Ahorro e Inversión") || (selectOption == "Recursos Humanos") || (selectOption == "Tarjetas") || 
					(selectOption == "Contraloria de Servicios") || (selectOption == "Captación y Ahorros") ||(selectOption == "Mutual Fondos") || 
					(selectOption == "Préstamos") || (selectOption == "Cobros")){ 
				select.remove(i);
				i = -1;
			}
			selectLength = document.getElementById("job").length;
		}
	}
}
	
function addValidatorToContactForm() {

	$('#formContact').bootstrapValidator({
		fields : {
			
			'name' : {
				validators : {
					notEmpty : {
						message : 'El Nombre es requerido'
					},
					stringLength : {
						max : 50,
						message : 'El Nombre es demasiado lago'
					}
				}
			},
			'factory' : {
				validators : {
					notEmpty : {
						message : 'El Primer Apellido es requerido'
					},
					stringLength : {
						max : 50,
						message : 'El Primer Apellido es demasiado largo'
					}
				}

			},
			'address' : {
				validators : {
					notEmpty : {
						message : 'El Segundo Apellido es requerido'
					},
					stringLength : {
						max : 100,
						message : 'El Segundo Apellido demasiado largo'
					}
				}

			},
			'ced' : {
				validators : {
					notEmpty : {
						message : 'La Cédula es requerida'
					},
					stringLength : {
						min:7,
						message : 'El número de Cédula debe tener al menos 7 carecteres.'
					},
					 regexp: {
	                        regexp: /^[a-zA-Z0-9#*]+$/,
	                        message: 'El número de cédula solo puede tener números y letras'
	                        }
				}

			},
			'phone' : {
				validators : {
					notEmpty : {
						message : 'El Número de Teléfono es requerido'
					},
					digits : {
						message : 'El Número de Teléfono deben ser números'
					},
					stringLength : {
						min : 8,
						message : 'El Número de Teléfono debe tener al menos 8 números'
					}

				}
			},
			'inputEmail' : {
				validators : {
					emailAddress : {
						message : 'El formato del E-mail es incorrecto'
					},
					notEmpty : {
						message : 'El E-mail requerido'
					}
				}
			},
			'comment' : {
				validators : {
					notEmpty : {
						message : 'El Comentario es requerido'
					},
					stringLength : {
						max : 200,
						message : 'El Comentario es demasiado lago'
					}
				}
			},
			'captchaConfirm':{
				validators : {
					notEmpty : {
						message : 'El Comentario es requerido'
					}
			}
			},
			
			'txtInput' : {
				validators : {
					notEmpty : {
						message : 'El Captcha es requerido'
					},
					stringLength : {
						max : 8,
						message : 'El Número del Captcha es demasiado lago'
					},
					identical:{
						field: 'captchaConfirm',
						 message: 'El texto no coincide con el Captcha'
					}
				}
			
			}
		}
	}).on('success.form.bv', function(e) {
        e.preventDefault();
        var data=	$( "#formContact" ).serialize();
        var typeSent= $( "#job option:selected").text().trim();
   	
   		  $.ajax({
   	      url:  MM_CONTEXT_PATH +'sendNotification',
   	      type: 'GET',
   	      data:data+"&AreaTrabajo="+typeSent,
   	      success: function(data) {       
   	      // console.log(data);        
   	       $('.container.containerTemplete.msjContact').css('display','block');
   	 	  $('.container.containerTemplete.first').css('display','none');
   	      },
   	      error: function (jqXHR, textStatus, errorThrown) {
   	      // console.log("Error.....");         
   	      }
   	     });
   	
//        _utils.sendEventsInteraction('Ayúdenos a mejorar', 'Usuario envío comentarios');         
//        sendFeedback();
//        $('#sendButton').removeAttr('disabled');
       });
}

var code;
function DrawCaptcha() {
	var abecedario = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
			"L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
			"Y", "Z" ];

	var a,b,c,d,e,f,g;
	
	 a = Math.ceil(Math.random() * 9) + '';
	 b = abecedario[Math.round(Math.random() * 26)] + '';
	 c = Math.ceil(Math.random() * 9) + '';
	 d = Math.ceil(Math.random() * 9) + '';
	 e = abecedario[Math.round(Math.random() * 26)] + '';
	 f = Math.ceil(Math.random() * 9) + '';
	 g = Math.ceil(Math.random() * 9) + '';
	 
	if(a==="undefined"){
		 a = Math.ceil(Math.random() * 9) + '';
	}
	if(b==='undefined'){
		 b = abecedario[Math.round(Math.random() * 26)] + '';
	}
	if(c==='undefined'){
		 c =  Math.ceil(Math.random() * 9) + '';
	}
	if(d==='undefined'){
		 d = Math.ceil(Math.random() * 9) + '';
	}
	if(e==='undefined'){
		 abecedario[Math.round(Math.random() * 9)] + '';
	}
	if(f==='undefined'){
		f = Math.ceil(Math.random() * 9) + '';
	}
	if(g==='undefined'){
		g = Math.ceil(Math.random() * 9) + '';
	}
	  
	code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
	
	var c = document.getElementById("txtCaptcha");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.font = "30px Comic Sans MS ";
	ctx.shadowColor = "rgba(0, 0, 0, 1)"; 
	ctx.fillText(code, 10, 50);

	$('#captchaConfirm').val(removeSpaces(code));
}

// Validate the Entered input aganist the generated security code function
function ValidCaptcha() {
	var str1 = removeSpaces(code);
	var str2 = removeSpaces(document.getElementById('txtInput').value);
	if (str1 == str2)
		return true;
	return false;
}

// Remove the spaces from the entered and generated code
function removeSpaces(string) {
	return string.split(' ').join('');
}

	$('#newMsj').on('click',function(){
		$('#formContact').each (function(){
			this.reset();
			});
		$('.container.containerTemplete.msjContact').css('display','none');
		$('.container.containerTemplete.first').css('display','block');
		$('#btnrefresh').click();
	});
	
//	$( "#formContact" ).submit(function( event ) {	
//	 var data=	$( "#formContact" ).serialize();
//	 var typeSent= $( "#job ").text().trim();
//
//	
//		  $.ajax({
//	      url:  MM_CONTEXT_PATH +'sendNotification',
//	      type: 'GET',
//	      data:data+"&AreaTrabajo="+typeSent,
//	      success: function(data) {       
//	       console.log(data);        
//	       $('.container.containerTemplete.msjContact').css('display','block');
//	 	  $('.container.containerTemplete.first').css('display','none');
//	      },
//	      error: function (jqXHR, textStatus, errorThrown) {
//	       console.log("Error.....");         
//	      }
//	     });
//	  event.preventDefault();
//	 
//	}
//	);
	
	$('.itemJob').click(function(){
		var text = this.text;
		$('#valAreaJob').val(text);
	});
	
	