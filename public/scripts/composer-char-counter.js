$(document).ready(function() {
  $("#tweet-text").on('input', function (event) {
    const charCount = 140 - $(this).val().length;
    $(this)
      .siblings()
      .children('.counter')
      .text(charCount);
  });
});