var listPlayerSimple = [];
var tournament = [];
var championship = [];
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
    
    $('#simple #addPlayer').click(function(evt){
    	evt.preventDefault();
    	var isTwoPlayer = addPlayerSimple('#simple');
    	if(!isTwoPlayer){
    		$('.numPlayer').text('Player 2');
    		$('#simpleForm').trigger('reset')
    	
    		return
    	}
    	var listPlayerSimpleString = JSON.stringify(listPlayerSimple);
    	$.ajax({
			url:MM_CONTEXT_PATH +"winPlayer",
			type:'POST',
			dataType: 'JSON',
			data: 'listPlayer='+listPlayerSimpleString,
			success: function(data){
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
				alert("Error");
			}})
    });
    $('#champions #game').click(function(evt){
    	evt.preventDefault();
    	var listPlayerSimpleString = JSON.stringify(listPlayerSimple);
    	
    	var data = 'simple=' + JSON.stringify(listPlayerSimple)+
    	'&tournament='+JSON.stringify(tournament)
    	+'&champions='+JSON.stringify(championship);
    	
    	$.ajax({
			url:MM_CONTEXT_PATH +"winChampionsPlayer",
			type: 'POST',
			data: data,
			beforeSend: function(xhr){
				xhr.overrideMimeType('text/html; charset=iso-8859-1');
			},
			success: function(data){
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
				alert("Error");
			}})
    });
    
    $('#champions #addPlayer').click(function(evt){
    	evt.preventDefault();
    	var isTwoPlayer = addPlayerSimple('#champions');
    	if(!isTwoPlayer){
    		$('.numPlayer').text('Player 2');
    		$('#tournamentForm').trigger('reset');
    	}
    	if(isTwoPlayer == true){
    		$('.numPlayer').text('Player 1');
    		$('#tournamentForm').trigger('reset');
    		tournament.push(listPlayerSimple);
    		listPlayerSimple = [];
    	}
    });
    
    $('#newTournament').click(function(evt){
    	evt.preventDefault();
    	$('.numPlayer').text('Player 1');
    	$('#tournamentForm').trigger('reset');
    	$('h2').text('Tournament ' + ++numTournament);
    	if(tournament.length == 0){
    		alert('Debe haber almenos un torneo');
    	}else{
    		championship.push(tournament);
    		tournament = [];
    	}
    
    });
    
    function addPlayerSimple(formSelect){
    	var name = $(formSelect+' #name').val();
    	var strategy = $(formSelect+' #strategy').val();
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
    