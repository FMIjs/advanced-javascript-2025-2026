function EventEmitter() {
  this.events = {};
}

EventEmitter.prototype.on = function(event, listener) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(listener);
  return this;
};

EventEmitter.prototype.emit = function(event, data) {
  if (!this.events[event]) return;
  this.events[event].forEach(function(listener) {
    listener(data);
  });
};

EventEmitter.prototype.off = function(event, listenerToRemove) {
  if (!this.events[event]) return;
  this.events[event] = this.events[event].filter(function(listener) {
    return listener !== listenerToRemove;
  });
};