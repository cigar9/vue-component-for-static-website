var navTrigger = $('#js-gnavTrigger'),
    navBody = $('#js-gnavBody');

if (!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)) {

  navTrigger.on('click', function() {
    $(this).toggleClass('is-active');
  });

} else {

  navTrigger.on('touchstart', function() {
    $(this).toggleClass('is-active');
  });

}