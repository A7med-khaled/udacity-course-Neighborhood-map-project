

//// show or hide the menu
 function toggel_button() {
    document.getElementsByClassName("menu")[0].classList.toggle("show")
 }

///auto filter the list 
$('#mySearchInput').keyup(function(){
    var valThis = $(this).val();
     $('#palces_list>li').each(function(){
      var text = $(this).text().toLowerCase();
         (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();         
    });
 });

 