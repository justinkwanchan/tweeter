# Tweeter Project

Tweeter is a simple, single-page Twitter clone. Using AJAX requests to the server, it allows users to submit a message to the page, after which a tweet frame with avatar, name, handle, and tweet age are generated and dynamically added to the page. It follows mobile-first design and uses media queries to reformat the layout of the page to better suit wider desktop screens.

Additional features include:
* A Tweet form which is hidden away and can be activated by clicking on the command or arrows in the top right corner of the app
* A reactive counter showing how many characters are allowed until the tweet length limit
* Dynamic error messages that alert the user if they try to submit empty tweets or are beyond the character limit
* An auto-expanding text field (to contain multiple lines)
* CSS-animated arrows
* Accessibility features including alt text on images and autofocus on the text field

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.

## Final Product

| !["The main mobile-sized page on start up with text field hidden"](https://github.com/justinkwanchan/tinyapp/blob/master/docs/startup.png?raw=true) | !["Showing the activated text field"](https://github.com/justinkwanchan/tinyapp/blob/master/docs/text-field.png?raw=true) |
| ------------- |:-------------:|
| !["Error message"](https://github.com/justinkwanchan/tinyapp/blob/master/docs/error-message.png?raw=true) | !["The page reformatted to desktop size"](https://github.com/justinkwanchan/tinyapp/blob/master/docs/desktop.png?raw=true) |


## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- chance
- md5
- moment

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node server/index.js` command.