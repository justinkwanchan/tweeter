$(document).ready(function() {
  /**
   * Event handler for typing in the text area
   * Dynamically updates the character-remaining count
   * Count is grey when 0 or above, red when negative
   * 
   * Also removes the error message when the character count enter acceptable range
   */
  $("#tweet-text").on('input', function(event) {
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

    const errorMessage = $(this).parent().parent().siblings('.error-message');

    if (charCount >= 0 && charCount <= 140 && errorMessage.is(':visible')) {
      errorMessage.slideUp('fast');
    }
  });
});