var EventHandler = require('../src/EventHandler');

// using assert passed to the test function that just logs failures
exports['test that logs all failures'] = function(assert) {
    var count = 0;
    var cb = function(data) {
        count = data.count;
    };
    var cb2 = function() {};
    var cb3 = function() {};

    var eh = new EventHandler(this);
    assert.equal(eh._owner, this, 'create new event handler with arguments');
    var eh = new EventHandler();
    assert.equal(eh, eh._owner, 'create new event handler no arguments');
    eh.on('test', cb);
    eh.on('test', cb3);
    assert.equal(eh._events['test'].length, 2, 'on');
    eh.addEventListener('test', cb2);
    assert.equal(eh._events['test'].length, 3, 'addEventListener');
    eh.removeEventListener('test', cb);
    eh.removeEventListener('test', cb3);
    assert.equal(eh._events['test'].length, 1, 'removeEventListener');
    eh.removeAllEventListeners('test');
    assert.equal(eh._events['test'].length, 0, 'removeAllEventListeners');
    eh.removeAllListeners('test');
    assert.equal(eh._events['test'], undefined, 'removeAllListeners');
    eh.on('test', cb);
    eh.emit('test', {
        count: 5
    });
    assert.equal(count, 5, 'emit');
}

if (module === require.main) require('test').run(exports);
