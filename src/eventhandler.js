(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.EventHandler = factory();
    }
}(this, function() {

    /**
     * @constructor
     * @param {object} owner
     */
    function EventHandler(owner) {
        this._owner = owner || this;
        this._events = {};
    }

    /**
     * Executes all listeners attached to the event triggered.
     * @param  {string|number} id
     * @param  {object|string|number} data
     */
    EventHandler.prototype.emit = function(id, data) {
        var listeners = this._events[id];
        if (listeners !== undefined)
            for (var i = 0, n = listeners.length; i < n; ++i)
                listeners[i].call(this._owner, data);
    };

    /**
     * Alias to emit.
     */
    EventHandler.prototype.trigger = EventHandler.prototype.emit;

    /**
     * Adds a listener to the callback stack of the passed in event.
     * If there's no listener stack for the event, on is created.
     * @param  {string|number} id
     * @param  {function} callback
     */
    EventHandler.prototype.on = function(id, callback) {
        var listeners = this._events[id];
        if (listeners === undefined)
            listeners = this._events[id] = [];
        listeners.push(callback);
    };

    /**
     * Alias to on.
     */
    EventHandler.prototype.addEventListener = EventHandler.prototype.on;

    /**
     * Removes a single listener from the callback stack of the passed in event.
     * @param  {string|number} id
     * @param  {function} callback
     */
    EventHandler.prototype.removeEventListener = function(id, callback) {
        var listeners = this._events[id];
        if (listeners !== undefined) {
            for (var i = 0, n = listeners.length; i < n; ++i) {
                if (listeners[i] === callback) {
                    listeners.splice(i, i + 1);
                    break;
                }
            }
        }
    };

    /**
     * Removes all listeners from the callback stack of the passed in event.
     * @param  {string|number} id
     */
    EventHandler.prototype.removeAllEventListeners = function(id) {
        var listeners = this._events[id];
        if (listeners !== undefined) {
            for (var i = 0, n = listeners.length; i < n; ++i) {
                listeners.shift();
            }
        }
    };

    /**
     * Drops all event keys and listeners objects.
     */
    EventHandler.prototype.removeAllListeners = function() {
        this._events = {};
    };

    /**
     * Sets the scope that will be used for each listener when called.
     * @param {object} owner
     */
    EventHandler.prototype.setOwner = function(owner) {
        this._owner = owner || this;
    };

    return EventHandler;
}));
