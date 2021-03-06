/**
 * @author John Pittman <johnrichardpittman@gmail.com>
 */

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
    'use strict'

    /**
     * @constructor
     * @param {object} [owner]
     */
    function EventHandler(owner) {
        this._owner = owner || this;
        this._events = {};
        this._subscribers;
        this._subscriptions;
    }

    /**
     * Executes all listeners attached to the event triggered.
     * @param  {string} id
     * @param  {*} [data]
     */
    EventHandler.prototype.emit = function(id, data) {
        var listeners = this._events[id];
        if (listeners !== undefined)
            for (var i = 0, n = listeners.length; i < n; ++i)
                listeners[i].call(this._owner, data);

        var subscribers = this._subscribers;
        if (subscribers !== undefined)
            for (var i = 0, n = subscribers.length; i < n; ++i)
                subscribers[i].emit(id, data);
    };

    /**
     * Alias to emit.
     */
    EventHandler.prototype.trigger = EventHandler.prototype.emit;

    /**
     * Adds a listener to the callback stack of the passed in event.
     * If there's no listener stack for the event, on is created.
     * @param  {string} id
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
     * @param  {string} id
     * @param  {function} callback
     */
    EventHandler.prototype.removeEventListener = function(id, callback) {
        var listeners = this._events[id];
        if (listeners !== undefined)
            for (var i = listeners.length - 1; i > -1; --i)
                if (listeners[i] === callback) {
                    for (; i > 0; --i)
                        listeners[i] = listeners[i - 1];
                    listeners.shift();
                    break;
                }
    };

    /**
     * Removes all listeners from the callback stack of the passed in event.
     * @param  {string} id
     */
    EventHandler.prototype.removeAllEventListeners = function(id) {
        var listeners = this._events[id];
        if (listeners !== undefined)
            for (var i = listeners.length - 1; i > -1; --i)
                listeners.shift();
    };

    /**
     * Drops all event keys and listeners objects.
     */
    EventHandler.prototype.removeAllListeners = function() {
        this._events = {};
    };

    /**
     * Subscribes an event handler to another.
     * Will receive the events emitted from the one subscribed to.
     * @param  {EventHandler} eventHandler - An event handler object to subscribe to.
     */
    EventHandler.prototype.subscribe = function(eventHandler) {
        if (eventHandler._subscribers === undefined)
            eventHandler._subscribers = [];
        if (this._subscriptions === undefined)
            this._subscriptions = [];
        eventHandler._subscribers.push(this);
        this._subscriptions.push(eventHandler);
    };

    /**
     * Unsubscribes an event handler from another.
     * @param  {EventHandler} eventHandler - An event handler object to unsubscribe from.
     */
    EventHandler.prototype.unsubscribe = function(eventHandler) {
        var subscribers = eventHandler._subscribers;
        var subscriptions = this._subscriptions;

        // Remove this event handler from the specified event handler it's subscribed to.
        var owner = this._owner;
        for (var i = subscribers.length - 1; i > -1; --i) {
            if (subscribers[i] === owner) {
                for (; i > 0; --i)
                    subscribers[i] = subscribers[i - 1];
                subscribers.shift();
                break;
            }
        }

        // Remove subscription reference of event handler subscribed to.
        for (i = subscriptions.length - 1; i > -1; --i) {
            if (subscriptions[i] === eventHandler) {
                for (; i > 0; --i)
                    subscriptions[i] = subscriptions[i - 1];
                subscriptions.shift();
                break;
            }
        }
    };

    /**
     * Removes all event handlers that are subscribed.
     */
    EventHandler.prototype.removeAllSubscribers = function() {
        var subscribers = this._subscribers;
        if (subscribers !== undefined) {
            var owner = this._owner;
            for (var i = subscribers.length - 1; i > -1; --i)
                subscribers[i].unsubscribe(owner);
        }
    };

    /**
     * Removes all references to other event handlers subscribed to.
     * Removes itself as a subscriber from each event handler subscribed to.
     */
    EventHandler.prototype.removeAllSubscriptions = function() {
        var subscriptions = this._subscriptions;
        if (subscriptions !== undefined)
            for (var i = subscriptions.length - 1; i > -1; --i)
                this.unsubscribe(subscriptions[i]);
    };

    /**
     * Sets the scope that will be used for each listener when called.
     * @param {object} [owner
     */
    EventHandler.prototype.setOwner = function(owner) {
        this._owner = owner || this;
    };

    return EventHandler;
}));
