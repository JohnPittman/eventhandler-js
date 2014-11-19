eventhandler
============

<h1>Notes</h1>

Universal module defined to be used with <b>requirejs</b>, <b>node</b>, <b>commonjs</b>, or <b>global scoped</b> if no module loader is used.

All files in the <b>dist</b> folder are minified for <b>production</b> use.
All files in the <b>src</b> directory are the source code for <b>development</b> use.

<h1>Development</h1>

<h4>Requirements</h4>

- nodejs
- npm install
- npm install -g gulp

<h4>Test</h4>

gulp test

<h4>Gulp Commands</h4>

Each process is dependent upon the previous. If one fails the build process exits.

- gulp 
- gulp test (Unit specifications)
- gulp build (Test, folder clean-ups, minification, source maps, renaming)
- gulp deploy (Test, build, versioning)

<h1>Usage</h1>

<h4>Installation</h4>

npm: npm install eventhandler<br />
bower: bower install eventhandler

<h4>How to use...</h4>

    var eventHandler1 = new EventHandler(this);
    var eventHandler2 = new EventHandler(this);
    eventHandler2.subscribe(eventHandler1);

    var data = {
        superhero: "Batman",
        sidekick: "Robin"
    };

    eventHandler1.on('bang', function(data) {
        console.log('eventHandler11 callback');
        console.log('this = ' + this);
        console.log(data.superhero + ' (POW!), ' + data.sidekick + ' (BOOM!)');
    });

    eventHandler2.on('bang', function(data) {
        console.log('eventHandler2 callback');
        console.log('this = ' + this);
        console.log(data.superhero + ' (BAM!), ' + data.sidekick + ' (OUCH!)');
    });

    eventHandler1.emit('bang', data);

    eventHandler1.removeAllEventListeners('bang');

    eventHandler1.emit('bang', data);

    eventHandler2.unsubscribe(eventHandler1);

    eventHandler1.emit('bang', data);

<h1>Release Notes</h1>

<h3>v2.0.0</h3>

<h4>Breaking Changings...</h4>

- Changed the name of the eventhandler.js to EventHandler.js. Captial file names for classes just make more sense to me so I can distiguish bundles and frameworks from single classes.

<h4>New Features...</h4>

- Added subscribe and unsubscribe. Each EventHandler can subscribe to one another. The event handler that subscribes to the other will emit the events in sync with the one subscribed to.

<h4>Additional...</h4>

- Change the "main" property in package.json to point to the src/EventHandler.js since node is what uses it and needs the source code for debugging. If using things like Browserify it won't matter since the minification process happens after all files are compiled into one. This is better for everyone.

<h3>v1.0.8</h3>

<h4>Bug Fixes...</h4>

- Fixed sourcemap linking for minified files. This is also fixed as part of the build process to automate proper sourcemap creation and linking.
