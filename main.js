
 var domain = 'http://api.mauricio.r42.in/';                    //PRO
 //var domain = 'http://localhost:8000/';                        //DEV
 
 
 var socket = io.connect(domain);
 
  socket.on('conn', function (data) {
    console.log(data);
  });
  
  socket.on('alt', function(dados){
    console.log('Disparou ALT : ', dados);
    var shorten = new ShortModel();
    shrt = domain  + dados['hash'].id;
    shorten.set({kurto: shrt, count: dados['hash'].count , url: dados['hash'].url});
    shortCol.add(shorten);
    shortColView.render();
  });


//Cria short collection e View
var shortCol = new ShortCollection();
var shortColView = new ShortCollectionView({collection: shortCol});

$('table').append(shortColView.el);

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
  var escape = $('#tx').val();
  var url = $(escape).text();                                                          //Prevenir Hacks por inserção de html
  //criar novo
  $.ajax({
    url: domain,
    type: 'POST',
    data: { url: url},
    success: function(res) {
      console.log('Done! Result:', res)
      $('tbody').remove();
      $('table').append(shortColView.el);
      carrega();
      $('#tx').val('');
    }
  });
}

function carrega(){
   // obter lista de shortened urls
  $.ajax({url: domain  + 'recent',
    success: function(recent) {
      console.log(recent);
      shortCol.reset();
      shortColView.remove();
      for (var i=0; i < recent.length; i++) {
        var shorten = new ShortModel();
        shrt = domain  + recent[i].id;
        shorten.set({kurto: shrt, count: recent[i].count , url: recent[i].url});
        shortCol.add(shorten);
      }
      shortColView.render();
    }
  })
}
