/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  // Function for escaping any user input that will be sent to server
  const escape =  function(str) {
    const htmlTag = document.createElement('div');
    htmlTag.appendChild(document.createTextNode(str));
    return htmlTag.innerHTML;
  };
  
  // Create new markup with tweet data for introducing dynamically into the DOM
  const createTweetElement = function(tweet) {
    const newTime = moment(tweet.created_at).toNow(true);
    const $tweet = $(`
      <article class="hvr-box-shadow-outset">
        <header>
          <div>
            <div>
              <img src="${tweet.user.avatars}" alt="User avatar">
            </div>
            <span>${escape(tweet.user.name)}</span>
          </div>
          
          <span class="handle">${escape(tweet.user.handle)}</span>
        </header>

        <p>
          ${escape(tweet.content.text)}
        </p>

        <footer>
          <span class="tweet-age">${newTime} ago</span>
          <div class="icons">
            <div class="flag"></div>
            <div class="share"></div>
            <div class="like"></div>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  /**
   * Loops through tweets
   * Calls createTweetElement for each tweet
   * Takes return value and appends it to the tweets container
   */
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    tweets.forEach(element => {
      const $newTweet = createTweetElement(element)[0];
      $('#tweets-container').prepend($newTweet);
    });
  };
    
  // Dynamically add multiple tweets to DOM
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const charsRemaining = Number($(this).children('div').children('output').val());
    const data = $(this).serialize();
    const errorMessage = $(this).parent().siblings('.error-message');

    if (charsRemaining === 140) {
      errorMessage.text('❌ Message field is empty. ❌');
      errorMessage.slideDown('fast');
    } else if (charsRemaining < 0) {
      errorMessage.text('❌ Sorry. Your message is too long. ❌');
      errorMessage.slideDown('fast');
    } else {
      $(this).children('textarea').val('');
      $(this).children('div').children('output').val('140');

      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: data
      })
        .then(function(data) {
          $('#tweets-container').append(data);
          loadTweets();
        })
        .catch(error => console.log(error));
    }
  });

  // Change cursor icon to pointing hand when hovering over new tweet text or arrows
  $('#toggle-header, .fa-angle-double-down').on('mouseover', function(event) {
    $(this).css('cursor', 'pointer');
  });

  /**
   * Toggle the message form with a click of a text
   * Also empties the form and any error message, and resets the char counter
   */
  $('#toggle-header, .fa-angle-double-down').on('click', function(event) {
    const container = $(this)
      .parents('nav')
      .siblings('.header-main-container')
      .children('.container');

    const newTweet = container.children('.new-tweet');
    const tweetText = newTweet.children('#tweet-form').children('#tweet-text');
    const charsRemaining = tweetText.siblings('#button-count').children('.counter');
    newTweet.slideToggle('fast', function() {
      tweetText.focus();
      tweetText.val('');
      charsRemaining.val('140');
      charsRemaining.removeClass('red');
    });

    const errorMessage = container.children('.error-message');
    if (errorMessage.is(":visible")) {
      errorMessage.slideToggle('fast');
    }
  });

  // AJAX call to load the tweets dynamically on the page without refresh
  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets'
    })
      .done((data) => {
        renderTweets(data);
      })
      .fail((error) => console.log(error));
  };

  // Submit tweet by pressing enter
  $("#tweet-text").keypress(function(e) {
    if (e.which === 13 && !e.shiftKey) {
      $(this).closest("form").submit();
      e.preventDefault();
    }
  });

  autosize($("#tweet-text"));
  
  loadTweets();
});
