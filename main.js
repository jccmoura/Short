
//Cria short collection e View
var shortCol = new ShortCollection();
var shortColView = new ShortCollectionView({collection: shortCol});

$('tbody').append(shortColView.el);

carrega();


//*****************************************************//
//                       Eventos                  
//*****************************************************//
//encurtar
$('#submit').click(encurtar);

//actualizar
$('.link').click(carrega);

//Enter
$( '#tx' ).keypress(function( event ) {
  if ( event.which == 13 ) {
     event.preventDefault();
     encurtar();
  }
});

//*****************************************************//
//                       Funções                 
//*****************************************************//

function encurtar(){
  console.log('encurtar');
  //criar novo
  $.ajax({
    url: 'http://mauricio.r42.in/',
    type: 'POST',
    data: { url: $('#tx').val() },
    success: function(res) {
      console.log('Done! Result:', res)
      $('tbody').remove();
      $('table').append(shortColView.el);
      carrega();
      }
  });
}

function carrega(){
   // obter lista de shortened urls
  $.ajax({url: 'http://mauricio.r42.in/recent',
         success: function(recent) {
          console.log(recent);
          shortCol.reset();
          shortColView.remove();
          for (var i=0; i < recent.length; i++) {
            var shorten = new ShortModel();
            shrt = 'http://mauricio.r42.in/' + recent[i].id;
            shorten.set({kurto: shrt, count: recent[i].count , url: recent[i].url});
            shortCol.add(shorten);
          }
          shortColView.render();
          }
        })
}
