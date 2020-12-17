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
  
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="hvr-box-shadow-outset">
        <header>
          <div>
            <div>
              <img src="${tweet.user.avatars}">
            </div>
            <span>${escape(tweet.user.name)}</span>
          </div>
          
          <span class="handle">${escape(tweet.user.handle)}</span>
        </header>

        <p>
          ${escape(tweet.content.text)}
        </p>

        <footer>
          <span class="tweet-age">${new Date(tweet.created_at).toDateString()}</span>
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
    const errorMessage = $(this).parent().siblings('#error-message');

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

  $('#tweet-text').on('input', function(event) {
    const errorMessage = $(this).parent().parent().siblings('#error-message');
    const charCount = 140 - $(this).val().length;

    if (charCount >= 0 && charCount <= 140 && errorMessage.is(':visible')) {
      errorMessage.slideUp('fast');
    }
  });
  
  $('#toggle-header').on('click', function(event) {
    const tweetForm = $(this)
      .parent()
      .parent()
      .siblings('.container')
      .children('.new-tweet');
    tweetForm.slideToggle('fast');
  });

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

  loadTweets();
});
