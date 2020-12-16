/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

$(document).ready(function() {
  $(document).on('dblclick', function (event) {
    console.log(createTweetElement(tweetData)[0]); // to see what it looks like
  });
});

const createTweetElement = function (tweet) {
  const $tweet = $(`
    <article class="hvr-box-shadow-outset">
      <header>
        <div>
          <div>
            <img src="${tweet.user.avatars}">
          </div>
          <span>Newton</span>
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

// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.