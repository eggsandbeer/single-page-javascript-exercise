# EA Single Page App Test

#### Your task is to write a responsive JavaScript application that allows a person to search Github.com for other users' public repositories.

### Setup

* Install Ruby 2.0 (http://rubyinstaller.org/).
* Install the SASS / Compass gems:
```
gem install compass sass
```
* Install NodeJS (http://nodejs.org/download/).
* Install Grunt, Bower, and Yeoman by running:
```
npm install -g grunt-cli bower yo generator-angular
```
* Clone this project and install dependencies by running this command inside the project directory:
```
npm install
```
* Serve the application using the Node web server by running the Grunt task:
```
grunt serve
```
* Navigate to http://localhost:9000 for the scaffolded application and use this as the starting point for your application.
* The application was scaffolded using Yeoman (http://yeoman.io/) and the Angular generator with Bootstrap(https://github.com/yeoman/generator-angular).
* After running the "serve" task, Grunt will watch your files for changes and automatically refresh, so you shouldn't need to run anything else.

### Requirements

* This exercise is to be completed within 3 hours. The requirements are open ended, just make sure to complete the following mandatory ones.
* Application files are located under the "app" folder.
* You must use AngularJS for this exercise (included in the starter application).
* Have a search field that allows searching for a GitHub user's repositories. Call the following API (where USER_NAME is the value typed into the search field). See http://developer.github.com/v3/repos/#list-user-repositories for more info.
```
https://api.github.com/users/USER_NAME/repos
```
* Once the search is clicked, the results should show a list of that user's public repositories with each item in a "name/number of watchers" format.
* When a result is clicked, display an alert with the repo's id and the created_at time.
* Please note that subsequent searches for the same previously searched username should not trigger further requests (but the client should still see the previous results).
* Solution does not need to support older browsers.
* A controller, service, and directive have been scaffolded out for you to save time (look under app/scripts), but you do not need to use them if you don't want to.

### Nice to Haves

* Responsive design.
* JS unit tests.