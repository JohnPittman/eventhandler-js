eventhandler-js
===============

<h1>Notes</h1>

Universal module defined to be used with <b>requirejs</b>, <b>node</b>, <b>commonjs</b>, or <b>global scoped</b> if no module loader is used.

All files in the <b>dist</b> folder are minified for <b>production</b> use.
All files in the <b>src</b> directory are the source code for <b>development</b> use.

<h1>Use</h1>

<h4>Installation</h4>

node: npm install eventhandler<br />
bower: bower install eventhandler

<h4>How to use...</h4>

var eventHandler = new EventHandler(this);

eventHandler.on('bang', function(data) {
    console.log('this = ' + this);
    console.log(data.superhero + ' (POW!), ' + data.sidekick + ' (BOOM!)');
});

eventHandler.emit('bang', {
    superhero: "Batman",
    sidekick: "Robin"
});

eventHandler.removeAllEventListeners('bang');

eventHandler.emit('bang');

<h1>Development</h1>

<h4>Requirements</h4>

- nodejs
- npm install
- npm install -g gulp bower

<h4>Test</h4>

npm test