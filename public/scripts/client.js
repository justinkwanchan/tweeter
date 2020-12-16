/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  const createTweetElement = function (tweet) {
    const $tweet = $(`
      <article class="hvr-box-shadow-outset">
        <header>
          <div>
            <div>
              <img src="${tweet.user.avatars}">
            </div>
            <span>${tweet.user.name}</span>
          </div>
          
          <span class="handle">${tweet.user.handle}</span>
        </header>

        <p>
          ${tweet.content.text}
        </p>

        <footer>
          <span class="tweet-age">${tweet.created_at} days ago</span>
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
    })
  };
    
  // Dynamically add multiple tweets to DOM
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const charsRemaining = Number($(this).children('div').children('output').val());
    console.log(charsRemaining);

    const data = $(this).serialize();
    
    if (charsRemaining === 140) {
      alert('Message field is empty');
    } else if (charsRemaining < 0) {
      alert('Over character limit');
    } else {
      $(this).children('textarea').val('');
      $(this).children('div').children('output').val('140');

      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: data
      })
      .then(function (data) {
        $('#tweets-container').append(data);
        loadTweets();
      })
      .catch(error => console.log(error));
    }
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

  // $(document).on('dblclick', function (event) {
  //   console.log(createTweetElement(data[0])[0]);
  //   // renderTweets(data);

  // });
});
