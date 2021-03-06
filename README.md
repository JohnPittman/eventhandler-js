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

    var eventHandler1 = new EventHandler();
    var eventHandler2 = new EventHandler();
    var eventHandler3 = new EventHandler();
    console.log('Subscribing EventHandler 2 to EventHandler 1.');
    eventHandler2.subscribe(eventHandler1);
    console.log('Subscribing EventHandler 3 to EventHandler 1.');
    eventHandler3.subscribe(eventHandler1);

    var data = {
        superhero: "Batman",
        sidekick: "Robin"
    };

    console.log('Adding a random event listener to EventHandler 1.');
    eventHandler1.on('bang', function(data) {
        console.log('cb eventHandler: 1');
        console.log('this = ' + this);
        console.log(data.superhero + ' (POW!), ' + data.sidekick + ' (BOOM!)');
    });

    eventHandler2.on('bang', function(data) {
        console.log('cb eventHandler: 2');
        console.log('this = ' + this);
        console.log(data.superhero + ' (BAM!), ' + data.sidekick + ' (OUCH!)');
    });

    eventHandler3.on('bang', function(data) {
        console.log('cb eventHandler: 3');
        console.log('this = ' + this);
        console.log(data.superhero + ' (KABLOOM!), ' + data.sidekick + ' (KICK!)');
    });

    eventHandler1.emit('bang', data);

    console.log('EventHandler 2 is unsubscribing from EventHandler 1.');
    eventHandler2.unsubscribe(eventHandler1);

    eventHandler1.emit('bang', data);

    console.log('Removing all event listeners from EventHandler 1.');
    eventHandler1.removeAllEventListeners('bang');

    eventHandler1.emit('bang', data);

    // Add some more subscribers for testing.
    console.log('Subscribing EventHandler 2 to EventHandler 1.');
    eventHandler2.subscribe(eventHandler1);
    console.log('Removing all subscribers.');
    eventHandler1.removeAllSubscribers();
    eventHandler1.emit('bang', data);

    // Add some more subscribers for testing.
    console.log('Subscribing EventHandler 2 to EventHandler 1.');
    eventHandler2.subscribe(eventHandler1);
    console.log('Removing all subscriptions for EventHandler 2.');
    eventHandler2.removeAllSubscriptions();
    eventHandler1.emit('bang', data);

<h1>Release Notes</h1>

<h3>v2.1.0</h3>

<h4>Bug Fixes...</h4>

- removeEventListener and unsubscribe now work properly. In turn this leads to removeAllSubscribers working.

<h4>Additional Changes...</h4>

- Added removeAllSubscriptions which will remove all hooks from every other EventHandler that it's subscribed to.

<h3>v2.0.4</h3>

<h4>Additional Changes...</h4>

- Enhanced performance of unsubscribe and removeEventListener even though they're rarely used but in some situations where something is adding and removing callbacks every process this is huge.

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
