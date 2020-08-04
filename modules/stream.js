module.exports = class Stream {
  constructor(listeners = []) {
    this.listeners = listeners;
  }
  output(value) {
    for (const listener of this.listeners) {
      listener.input(value);
    }
  }
};
