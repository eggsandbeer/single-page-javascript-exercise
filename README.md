# Hello EA Pulse Team

* Here's my work. This was a bit of challenge for me as I've been ensconsed in backbone world for the past month, but the ideas are the same -- separation of concerns, keep business logic in the service and make sure your methods are testable. To be honest though, some of my tests are less than wonderful and complete, but I'm pretty raw when it comes to writing angular tests. As stated in the interview though, I have no problem with the idea of writing tests and 100% am comitted to the rationale behind it. I'll just have to figure out how to write effective angular.js tests. I'm willing to put in extra time to learn how to do this and am hoping you are willing to work with me some too. I just found the scope and digest concepts tricky.

* So, I put most of my time into writing the actual angular js code as opposed to making the bootstrap css/markup nice and pretty. The site is responsive, but in a very barebones way. I'm pretty good with bootstrap, but after the interview, I realized that wasn't a skillset that mattered much to you guys, so I decided not to focus mmy three on hours on that task.

* I just wanted to say that when you asked me about JS patterns too, I was thinking of patterns outside of Backbone/Angular in a more traditional JS sense. In Backbone, I'm very familiar with taking the MV of Backbone and turning it into MVC Backbone/Marionette flavoured JS. I've attached a folder at the root level of his project titled Cameon Strandberg - Javascript Organization which contains a lot of the recent javascript I've written for QuickMobile. As I said above, entities (collections, models and their corresponding API calls) should be kept in files, scope, functions outside of the controllers and especially the view and exposed to the app through something like the reqres event aggregator thta Marionette provides. Controllers mediate the actions from the router and the view for getting new views and new models/collections from the DB. It's a very traditional sort of pattern and one that might not be best suited for web dev on the front end, but it's one I followed pretty strictly at QuickMobile.

* With these files, if you look at main-me-app.js in the root dir, you should be able to follow my workflow from there. The general idea is to keep code highly modular and highly reuseable, a standard I would hope to follow at EA too. If you have any questions feel free to contact me at <cameron.strandberg@gmail.com>.

* Thanks for your time and all the best in your search for a great dev -- which I believe is me :)

### Love, Cameron
