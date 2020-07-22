#!/usr/bin/env node
const fs = require("fs");
const parse = require("./modules/parse");
const compile = require("./modules/compile");
const run = require("./modules/run");

const [, , filename] = process.argv;

const file = fs.readFileSync(filename, "utf8");
const ast = parse(file);
// console.log(JSON.stringify(ast, null, 2));
const app = compile(ast);
run(app);
