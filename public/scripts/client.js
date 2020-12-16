/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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
    tweets.forEach(element => {
      const $newTweet = createTweetElement(element)[0];
      $('#tweets-container').prepend($newTweet);
    })
  };
    
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    console.log($(this).serialize());
    
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize()
    })
    .then(function (data) {
      $('#tweets-container').prepend(data);
    })
    .catch(error => console.log(error));
  });

  

  // $(document).on('dblclick', function (event) {
  //   console.log(createTweetElement(data[0])[0]);
  //   // renderTweets(data);

  // });
  
  renderTweets(data);
});
