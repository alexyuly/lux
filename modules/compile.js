module.exports = function compile(lab) {
  if (lab.type === "application") {
    const lex = {
      type: "application",
      children: [],
    };
    for (const labChild of lab.children) {
      if (labChild.type === "effect") {
        const lexChild = {
          type: "component",
          consumer: {
            type: "subscriber",
            name: labChild.subscriber,
          },
          producers: [],
        };
        for (const effectChild of labChild.children) {
          if (effectChild.type === "cause" && "string" in effectChild) {
            lexChild.producers.push({
              type: "string",
              value: effectChild.string,
            });
          }
        }
        lex.children.push(lexChild);
      }
    }
    return lex;
  }
  // TODO
};
