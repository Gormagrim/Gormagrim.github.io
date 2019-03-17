$(function(){

  $('.imgChanger').click(function(){
    var imgArray = ['url(assets/img/annecy.JPG)', 'url(assets/img/cap.jpg)', 'url(assets/img/cheval.JPG)', 'url(assets/img/lanz.JPG)', 'url(assets/img/lindos.JPG)', 'url(assets/img/lindos2.jpg)', 'url(assets/img/plagne.JPG)', 'url(assets/img/temple.JPG)'];
    var imgNumber = Math.floor(Math.random()*8);
    $('.bg').css('background-image' , imgArray[imgNumber]);
    console.log(imgArray[imgNumber] );
  });


});
