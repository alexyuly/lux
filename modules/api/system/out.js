const Stream = require("../../stream");

module.exports = class SystemOut extends Stream {
  input(value) {
    console.log(value);
  }
};
