# BackSteroids
A solid Mobile App architecture for AppGyver's Steroids framework that's powered by Backbone + Steroids (BackSteroids)

AppGyver’s Steroids framework is built on top of the very popular open source Apache Cordova frame work which allows anyone to build a professional, cross OS mobile Apps (iOS, Android, Windows phone etc..)  using CSS, HTML and JavaScript.
AppGyver’s Steroids adds a layer of Native UIs so you get awesome native performance and none of that HTML choppiness.

While AppGyver developed some application structure on top of Angular, I believe Angular is a move in the wrong direction as it mixes business logic and presentation, extremely slow (even more so on mobile) and does way way way (waaaaay) too much “magic” (good luck debugging google’s code).

Backbone on the other hand is un-opinionated, has thousands of plugins to choose from and it just so happens to be the world's most popular JavaScript app library!
<b>And so BackSteroids was born.</b>


Benefits:
------------------------------------------------------------------------

Note: a View is a separate DOM, essentially a new page.
In a single Mobile App you will most likely have multiple Views.
Since Views are separate pages (think separate Tabs in a browser), we need a way to handle communication and data synchronization of models between Views.

BackSteroids is a collection of libraries (I guess you can consider it a framework) that delivers on the following patterns:

-	A global setup.js that is shared among all Views (Single change propagates to all Views)
-	Elements (HTML IDs) definition file per View
-	Uses require.js and some trickery to load only the modules needed per View and reuse the same init.js for the entire application
-	GPU powered smooth transition within a View (Fade / Slide) via StackView
-	Stickit MVVM two way model / view binding
-	A communication channel with set members
-	Support for Localization (dynamic multi language)
-	Support CORS server commands via Pre-flight checks (on node.js)
-	Uses a commBroker as a moderator and service provider within a View
-	Use a commBroker as a moderate for event communication between Views
-	Ability to share models in different Views (through LocalStore)
-	Ability to save the same LocalStore models to the server
-	General utilities such as log, jlog, global error catch for debugging etc…
-	Application structure with focus on OOP (privates remain _private)
-	Application architecture based on separation of concern and pure OOP

To use the project simply use the Steroids command to create a new project:

<pre>
steroids create [YOUR_PROJECT_NAME]
</pre>

Once created, override the entire project with the content of this BackSteroids.
Note that you will still use your config.json for your unique application id.

Screencast
------------------------------------------------------------------------

<a href="http://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID_HERE
" target="_blank"><img src="http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg"
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>