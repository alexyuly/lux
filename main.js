const fs = require("fs");
const path = require("path");
const parse = require("./modules/parse");
const compile = require("./modules/compile");
const run = require("./modules/run");

const filename = process.argv[2];
const { dir, name } = path.parse(filename);

const lux = fs.readFileSync(filename, "utf8");
const lab = parse(lux);

fs.writeFileSync(`${dir}${path.sep}${name}.lab`, JSON.stringify(lab, null, 2));

const lex = compile(lab);

fs.writeFileSync(`${dir}${path.sep}${name}.lex`, JSON.stringify(lex, null, 2));

run(lex);
