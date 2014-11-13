eventhandler-js
===============

<h1>Development Requirements</h1>

nodejs
npm install -g gulp bower

<h1>Notes</h1>

Universal module defined to be used with requirejs, node, commonjs, or global scoped if no module loader is used.

All files in the dist folder are minified for production use.
All files in the src directory are the source code for development use.

<h1>Use</h1>

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