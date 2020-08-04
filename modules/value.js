const Stream = require("./stream");

module.exports = class Value extends Stream {
  constructor(listeners, value) {
    super(listeners);
    this.value = value;
  }
  input() {
    console.log(this.value);
  }
};
