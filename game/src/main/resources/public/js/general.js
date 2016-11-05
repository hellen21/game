var listPlayerSimple = [];
var tournament = [];
var championship = [];
var listWinners = [];
var numTournament = 1;
window.addEventListener('load', inicio, false);

    function inicio() {
        document.getElementById('file').addEventListener('change', cargar, false);               
    }

    function cargar(ev) {
        document.getElementById('datos').innerHTML='Nombre del archivo:'+ev.target.files[0].name+'<br>'+
                                                   'Tamaño del archivo:'+ev.target.files[0].size+'<br>'+  
                                                   'Tipo MIME:'+ev.target.files[0].type;
        var arch=new FileReader();
        arch.addEventListener('load',leer,false);
        arch.readAsText(ev.target.files[0]);
    }
    
    function leer(ev) {
        document.getElementById('editor').value=ev.target.result;
        readFile(ev.target.result)
    }
    
    function readFile(text){
    	var data = "text="+text;
		$.ajax({
			url:MM_CONTEXT_PATH+"readText",
			type: "GET",
			data:data,
			}).done(function(data){
				if(data=="false"){
					alert('Ocurrio un error leyendo el archivo')
				}
			});
    }
    $(":file").filestyle({icon: false});
    
    $('#simple #addPlayer').click(function(evt){
    	evt.preventDefault();
    	var isTwoPlayer = addPlayerSimple('#simple');
    	if(isTwoPlayer == undefined){
    		return;
    	}
    	if(!isTwoPlayer){
    		$('.numPlayer').text('Player 2');
    		$('#simpleForm').trigger('reset');
    		$('#addPlayer').text('Play');
    		return
    	}
    	
    	var listPlayerSimpleString = JSON.stringify(listPlayerSimple);
    	$.ajax({
			url:MM_CONTEXT_PATH +"winPlayer",
			type:'POST',
			dataType: 'JSON',
			data: 'listPlayer='+listPlayerSimpleString,
			success: function(data){
				$('#addPlayer').text('Add Player');
				if(typeof data == 'string'){
					alert(data);
				}else{
					$('.numPlayer').text('Player 1');
		    		$('#simpleForm').trigger('reset');
		    		listPlayerSimple=[];
					$('.table td.name').text(data.name);
					$('.table td.strategy').text(data.strategy);
				}
				
			},
			error: function(error){
				alert(error.responseText);
				$('.numPlayer').text('Player 1');
	    		$('#simpleForm').trigger('reset');
	    		listPlayerSimple=[];
			}})
    });
    $('#champions #game').click(function(evt){
    	evt.preventDefault();
    	canGame = false;
    	if(tournament.length != 0 ){
    		if(tournament.length == 1 ){
        		canGame = true;
        	}else{
        		if(tournament.length%2 == 0){
        			canGame = true;
        		}
        	}
    	}
    	if(championship.length != 0){
    		if(championship.length == 1 ){
        		canGame = true;
        	}else{
        		if(championship.length%2 == 0){
        			canGame = true;
        		}
        	}
    	}
    	var listPlayerSimpleString = JSON.stringify(listPlayerSimple);
    	listPlayerSimple = [];
    	if(championship.length > 0){
    		if(0 < tournament.length){
    			championship.push(tournament);
    			tournament = [];
    		}
    	}
    	var data = 'simple=' + JSON.stringify(listPlayerSimple)+
    	'&tournament='+JSON.stringify(tournament)
    	+'&champions='+JSON.stringify(championship);
    	if(canGame){
    		$.ajax({
    			url:MM_CONTEXT_PATH +"winChampionsPlayer",
    			type: 'POST',
    			data: data,
    			dataType: 'JSON',
    			beforeSend: function(xhr){
    				xhr.overrideMimeType('text/html; charset=iso-8859-1');
    			},
    			success: function(data){
    				if(typeof data == 'string'){
    					alert(data);
    				}else{
    					$('.numPlayer').text('Player 1');
    		    		$('#simpleForm').trigger('reset');
    		    		listPlayerSimple = [];
    		    		tournament = [];
    		    		championship = [];
    					$('.table td.name').text(data.name);
    					$('.table td.strategy').text(data.strategy);
    				}
    				
    			},
    			error: function(error){
    				alert(error.responseText);
    			}})
    	}else{
    		alert('Please, Verify the data');
    		$('.numPlayer').text('Player 1');
        	$('#tournamentForm').trigger('reset');
        	$('h2').text('Tournament ' + 1);
    	}
    
    });
    
    $('#champions #addPlayer').click(function(evt){
    	evt.preventDefault();
//    	if(tournament.length == 2){
//    		alert('Only supports two items, please play or add another tournament');
//    		return;
//    	}
    	var isTwoPlayer = addPlayerSimple('#champions');
    	if(isTwoPlayer == undefined){
    		return;
    	}
    	if(listPlayerSimple.length == 2){
    		tournament.push(listPlayerSimple);
    		listPlayerSimple = [];
    	}
    	if(!isTwoPlayer){
    		$('.numPlayer').text('Player 2');
    		$('#tournamentForm').trigger('reset');
    	}
    	if(isTwoPlayer == true){
    		$('.numPlayer').text('Player 1');
    		$('#tournamentForm').trigger('reset');
    	}
    });
    
    $('#newTournament').click(function(evt){
    	evt.preventDefault();
    	if(tournament.length == 0){
    		alert('It must have at least one tournament');
    	}else{
    		$('.numPlayer').text('Player 1');
        	$('#tournamentForm').trigger('reset');
        	$('h2').text('Tournament ' + ++numTournament);
    		championship.push(tournament);
    		tournament = [];
    		listPlayerSimple = [];
    	}
    
    	
    
    });
    
    function addPlayerSimple(formSelect){
    	var name = $(formSelect+' #name').val();
    	var strategy = $(formSelect+' #strategy').val();
    	if(name == "" || strategy == ""){
    		alert('Fields are required');
    		return;
    	}
    	var player={"name":name,"strategy":strategy};
    	listPlayerSimple.push(player);
    	if(listPlayerSimple.length === 2){
    		return true;
    	}
    	else{
    		return false;
    	}
    }
   
    function addPlayerTournament(formSelect){
    	var name = $(formSelect+' #name').val();
    	var strategy = $(formSelect+' #strategy').val();
    	var player={"name":name,"strategy":strategy};
    	tournament1.push(player);
    }
    