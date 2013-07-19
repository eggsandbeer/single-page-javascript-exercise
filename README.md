### Your task is to write a responsive JavaScript application that allows a logged in user to search Github.com for other users' public repositories.

It is a pretty open ended exercise, so feel free to use any other javascript libraries you want. However, you **must** use Angular js for this exercise.

Requirements
* Show a login box initially for a github user to login with their username/password (basic auth is fine).
* Once the user logs in successfully, they are shown a username search box with a search button. This will search github for any username.
* Once the search is clicked, the results should show a list of that user's public repositories with each item in an "name/number of watchers" format.
* When a result is clicked, display an alert with the repo's id and the created_at time.
* Please note that subsequent searches for the same previously searched username should not trigger further requests (but the client should still see the previous results).
* Solution does not need to support older browsers.
* Please note that the web app should be optimized for screens with varying sizes.
* For more information about the github.js api, please refer to https://github.com/michael/github/tree/v0.7.x
