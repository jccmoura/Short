
 var domain = '//api.mauricio.r42.in/';                    //PRO
 //var domain = 'http://localhost:8000/';                        //DEV
 
 var socket = io.connect(domain);
 
 
  socket.on('conn', function (data) {
    console.log(data);
  });
  
  socket.on('alt', function(dados){
    console.log('Disparou ALT : ', dados);
    shortCol.reset();
    shortColView.remove();
    for (var i=0; i < dados.length; i++) {
      var shorten = new ShortModel();
      shrt = domain  + dados[i].id;
      shorten.set({kurto: shrt, count: dados[i].count , url: dados[i].url});
      shortCol.add(shorten);
      shortColView.render();
    }
  });


//Cria short collection e View
var shortCol = new ShortCollection();
var shortColView = new ShortCollectionView({collection: shortCol});

$('table').append(shortColView.el);

$('#regmsg').hide();

log();

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
    encurtar(event);
  }
});

//login
$('#login').click(login);

//logoff
$('#logoff').click(logoff);

//Sign In
$(document).ready(function(){
    //Handles menu drop down
    $('.dropdown-menu').find('form').click(function (e) {
        e.stopPropagation();
    });
});

//Sign up
$('#sbmsignup').click(sbSignup);


//*****************************************************//
//                       Funções                 
//*****************************************************//

function login(evt){
  evt.preventDefault();
  var user = $('#user').val();
  var pwd = $('#pwd').val();
  console.log('login: ', user, pwd );
   // login
  $.ajax({
    url: domain  + 'login',
    type: 'POST',
    data: { email: user , password: pwd  },
    success: function(data) {
      var result = JSON.parse(data);
      localStorage.setItem('token', data);
      localStorage.setItem('util', result.email);
      log();
    },
    error: function(xhr){
        console.log(xhr.status );
        $('#msg').html('Dados Incorrectos. Volte a tentar.');
    }
  })
}

function logoff(evt){
  if (evt) evt.preventDefault();
  localStorage.removeItem('util');
  localStorage.removeItem('token');
  log();
}

function log() {
  if (localStorage.getItem('token')) {
    $('#hide').show();
    $('#logoff').show();
    $('#login').hide();
    $('#user').hide();
    $('#pwd').hide();
    $('#bt1').html(localStorage.getItem('util')).append($('<b class="caret"></b>'));;
    $('#msg').html('Logged In');
    $('#drop1').hide();
    $('#sign').hide();
  }
  else {
    $('#hide').hide();
    $('#logoff').hide();
    $('#login').show();
    $('#user').show();
    $('#pwd').show();
    $('#bt1').html('Sign In').append($('<b class="caret"></b>'));
    $('#msg').html('Logged Out');
    $('#drop1').show();
    $('#sign').show();
  }
}

function encurtar(evt){
  evt.preventDefault();
  console.log('encurtar');
  if ($('#tx').val()!='') {
    var iniUrl = $('#tx').val();
    var cleanUrl = iniUrl.replace(/(<([^>]+)>)/ig, '');

    console.log('URL Clean ', cleanUrl);
  
    //criar novo
    $.ajax({
      url: domain,
      type: 'POST',
      data: {
        url: cleanUrl ,
      },
       headers: {
        'X-Auth-Token' : localStorage.getItem('token'),
      },
      success: function(res) {
        console.log('Done! Result:', res)
        $('tbody').remove();
        $('table').append(shortColView.el);
        carrega();
        $('#tx').val('');
      },
      error: function(xhr){
        console.log(xhr.status );
        logoff();
    }
    });
  }
}

function carrega(){
   // obter lista de shortened urls
  $.ajax({url: domain  + 'recent',
    success: function(recent) {
      shortCol.reset();
      shortColView.remove();
      for (var i=0; i < recent.length; i++) {
        var shorten = new ShortModel();
        shrt = domain  + recent[i].id;
        shorten.set({kurto: shrt, count: recent[i].count , url: recent[i].url});
        shortCol.add(shorten);
      }
      console.log('Listou');
      shortColView.render();
    }
  })
}


function sbSignup(evt) {
  evt.preventDefault();
  console.log('Registar');
  if ($('#mailUp').val()!='') {
    var iniMail = $('#mailUp').val();
    var pass = $('#pwdUp').val();
    var cleanMail = iniMail.replace(/(<([^>]+)>)/ig, '');

    console.log('Mail Clean ', cleanMail);
  
    //criar novo
    $.ajax({
      url: domain + 'register',
      type: 'POST',
      data: {
        mail: cleanMail,
        pass: pass,
      },
      success: function(res) {
        console.log('Done! Result:', res)
        $('#drop1').hide();
        $('#sign').hide();
        $('#user').val(cleanMail);
        $('#pwd').val(pass);
        $('#regmsg').show();
      },
      error: function(xhr){
        console.log(xhr.status );
    }
    });
  }
  
}

