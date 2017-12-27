if (!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)) {

  bodyElement = document.body
  bodyElement.classList.add('hover')

} else {

  var linkTouchStart = function() {
    thisAnchor = $(this);
    touchPos = thisAnchor.offset().top;
    moveCheck = function() {
      nowPos = thisAnchor.offset().top;
      if (touchPos == nowPos) {
        thisAnchor.addClass("is-hover");
      }
    }
    setTimeout(moveCheck, 100);
  }
  var linkTouchEnd = function() {
    thisAnchor = $(this);
    hoverRemove = function() {
      thisAnchor.removeClass("is-hover");
    }
    setTimeout(hoverRemove, 250);
  }
  $(document).on('touchstart mousedown', 'a', linkTouchStart);
  $(document).on('touchend mouseup', 'a', linkTouchEnd);
  
}