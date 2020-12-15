$(document).ready(function() {
  /**
   * Event handler for typing in the text area
   * Dynamically updates the character-remaining count
   * Count is grey when 0 or above, red when negative
   */ 
  $("#tweet-text").on('input', function (event) {
    const charCount = 140 - $(this).val().length;
    const counter = $(this)
      .siblings()
      .children('.counter');
      
    counter.text(charCount);

    if (charCount < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});