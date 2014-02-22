$(document).ready(function() {

  $('.btn-google-plus').click(function() {
    $('.form-group#wishlist').hide();
    $('.form-group#departments').css('display','inline-block');
    $('.btn-facebook').css('background', '#3b5998').removeClass("selected");
    $(this).css('background', "#E81313").addClass("selected");
  });

  $('.btn-facebook').click(function() {
    $('.form-group#wishlist').show();
    $('.form-group#departments').css('display','none');
    $('.btn-google-plus').css('background', '#dd4b39').removeClass("selected");
    $(this).css('background', "#1D278C").addClass("selected");
  });

  $('.budget').children().click(function() {
    $(this).css('background', '#0A910C').addClass("selected");
  });

  var opts = {
    lines: 13, // The number of lines to draw
    length: 13, // The length of each line
    width: 8, // The line thickness
    radius: 16, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#202d3b', // #rgb or #rrggbb or array of colors
    speed: 1.3, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  };

  $('#submitcontainer').click(function(e) {
    e.preventDefault();
    var budget = Number($('.budget').find('.selected').val());
    var method = $('.method').find('.selected').text();
    var wishlist = $('#wishlistValue').val();
    var _csrf = $('input[name=_csrf]').val();

    var target = document.getElementById('spinner');
    var spinner = new Spinner(opts).spin(target);

    window.setTimeout(function() {
      spinner.stop();
    }, 3000);

    $.post("/",
      {budget: budget, method: method, wishlist: wishlist, _csrf: _csrf},
      function(data) {

      });
  });

});
