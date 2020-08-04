module.exports = function parse(lux) {
  const lines = lux.split("\n");
  const stack = [];
  for (const line of lines) {
    if (stack.length === 0) {
      if (line === "application") {
        stack.push({
          type: "application",
          children: [],
        });
      }
    } else {
      const cursor = stack.pop();
      if (cursor.type === "application" && line.startsWith("  effect ")) {
        const effect = {
          type: "effect",
          subscriber: line.split("  effect ")[1],
          children: [],
        };
        cursor.children.push(effect);
        stack.push(cursor);
        stack.push(effect);
      } else if (cursor.type === "effect" && line.startsWith("    cause ")) {
        const cause = {
          type: "cause",
        };
        if (line.split("    cause ")[1] === "`") {
          cause.string = null;
        }
        cursor.children.push(cause);
        stack.push(cursor);
        stack.push(cause);
      } else if (
        cursor.type === "cause" &&
        "string" in cursor &&
        !line.startsWith("    `")
      ) {
        if (cursor.string === null) {
          cursor.string = line.slice(6);
          stack.push(cursor);
        } else {
          cursor.string += line.slice(6);
          stack.push(cursor);
        }
      }
    }
  }
  return stack.pop();
};
