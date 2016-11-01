$('.benefictElement').on('click', function(){
	
	var codebenefictCurrent=$(this).attr('data-code');
	var objectReturn;
	for(var x=0; x<listBeneficts.length;x++){
		if(listBeneficts[x].code==codebenefictCurrent)
			{
			replaceInfoBenefic(listBeneficts[x]);
			}
		
	}
	
//	listBeneficts;
});

$('.backDetails').on('click', function(){
	  $('.filter-box').val('');
	  $('.benefictElement').css('display','inline-block');
	  $('#benefictDetails').hide();
	  $('.contentBeneficts').show();
	 
});

function replaceInfoBenefic(beneficts){
	  $(".img-local").attr("src", beneficts.image.url);
	  var sunday =false, saturday=false;
	  $('#direction').text(beneficts.address.address);
	  $('#title').text(beneficts.name);
	  if(beneficts.wazeLink==null){
		  $('#link').parent().parent().hide();
	  }else{
		  $('#link').text(beneficts.wazeLink);  
		  $('#link').attr('href', beneficts.wazeLink);
		  $('#link').parent().parent().show();
	  }
	  
	  $('#latitud').text(beneficts.address.latitude);
	  $('#longitud').text(beneficts.address.longitude);
	  if(beneficts.phone[0].phone!=null){
		  $('#phonePrincipal').parent().show();
		  $('#phonePrincipal').text(beneficts.phone[0].phone);
	  }
	  else{
		  $('#phonePrincipal').parent().hide();
	  }
	  $('#province').text(beneficts.direccion.idProvince.name);
	  $('#canton').text(beneficts.direccion.idCanton.name);
	  $('#distric').text(beneficts.direccion.idDistrict.name);
	  $('#category').text(beneficts.categoriaPuntoInteres.descriptionCategory);
	  if(beneficts.horario!=null){
		  $('#hour').text(beneficts.horario[0].horary);
		  if(beneficts.horario[1]!==undefined)
		  {  
			  saturday=true;
			  $('#saturday').text(beneficts.horario[1].horary);
			  $('#saturday').parent().show();
		  }
		  if(beneficts.horario[2]!==undefined){
			  sunday=true;
			  $('#sunday').text(beneficts.horario[2].horary);
			  $('#sunday').parent().show();
		  }
		  if(!saturday){
			  $('#saturday').parent().parent().hide(); 
		  }
		  if(!sunday){
				  $('#sunday').parent().parent().hide();
		  }
		  $('#hour').parent().show();
	  }
	  else{
		  $('#hour').parent().hide();
		  $('#saturday').parent().hide();
		  $('#sunday').parent().hide();
	  }
	  if(beneficts.additionalInfo!=null){
		  $('#information').text(beneficts.additionalInfo);
		  $('#information').parent().show();
	  }
	  else{
		  $('#information').parent().hide();
	  }
	  $('.contentBeneficts').hide();
	  $('#benefictDetails').show();
	  
}
$(document).ready(function(){
    $(".filter-box").keyup(function(){
 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
 
        // Loop through the comment list
        $(".contImgsBenefi ul li").each(function(){
 
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count++;
            }
        });
 
        // Update the count
        var numberItems = count;
        $("#filter-count").text("Number of Comments = "+count);
    });
});
