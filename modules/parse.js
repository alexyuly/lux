module.exports = function parse(source) {
  const lines = source.split("\n");
  const stack = [];

  for (const line of lines) {
    if (stack.length === 0) {
      if (line === "application") {
        stack.push({
          declaration: "application",
          statements: [],
        });
      }
    } else {
      const cursor = stack.pop();
      if (
        cursor.declaration === "application" &&
        line.startsWith("  effect ")
      ) {
        const effect = {
          statement: "effect",
          consumer: {
            subscriber: line.split("  effect ")[1],
          },
          statements: [],
        };
        cursor.statements.push(effect);
        stack.push(cursor);
        stack.push(effect);
      } else if (
        cursor.statement === "effect" &&
        line.startsWith("    cause ")
      ) {
        const cause = {
          statement: "cause",
          producer: {},
        };
        if (line.split("    cause ")[1] === "`") {
          cause.producer.string = null;
        }
        cursor.statements.push(cause);
        stack.push(cursor);
        stack.push(cause);
      } else if (
        cursor.statement === "cause" &&
        "string" in cursor.producer &&
        !line.startsWith("    `")
      ) {
        if (cursor.producer.string === null) {
          cursor.producer.string = line.slice(6);
          stack.push(cursor);
        } else {
          cursor.producer.string += line.slice(6);
          stack.push(cursor);
        }
      }
    }
  }

  return stack.pop();
};
