const path = require("path");
const Value = require("./value");

module.exports = function run(lex) {
  if (lex.type === "application") {
    for (const child of lex.children) {
      if (child.type === "component") {
        if (child.consumer.type === "subscriber") {
          const Subscriber = require(path.resolve(
            __dirname,
            "api",
            ...child.consumer.name.split(":")
          ));
          const subscriber = new Subscriber();
          for (const producer of child.producers) {
            if (producer.type === "string") {
              const value = new Value([subscriber], producer.value);
              value.input();
            }
          }
        }
      }
    }
  }
};
