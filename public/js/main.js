$(document).ready(function() {
  $('.btn-google-plus').click(function() {
    $('.form-group#wishlist').hide();
    $('.form-group#departments').css('display','inline-block');
    $(this).addClass("selected");
  });

  $('.btn-facebook').click(function() {
    $('.form-group#wishlist').show();
    $('.form-group#departments').css('display','none');
    $(this).addClass("selected");
  });

  $('.budget').children().click(function() {
    $(this).css('background', '#0A910C').addClass("selected");
  });

  $('#submitcontainer').click(function(e) {
    e.preventDefault();
    var budget = Number($('.budget').find('.selected').val());
    var method = $('.method').find('.selected').text();
    var wishlist = $('#wishlistValue').val();
    var _csrf = $('input[name=_csrf]').val();

    $.post("/",
      {budget: budget, method: method, wishlist: wishlist, _csrf: _csrf},
      function(data) {

      });
  });

});
