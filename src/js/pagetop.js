module.exports = function(str) {

  var pagetop = $(str);

  pagetop.on('click', function() {
    $('html,body').animate({
      scrollTop: '0'
    }, 1000, 'easeOutExpo');
  });
};
