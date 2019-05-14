#!/usr/bin/env node
var argv = require('yargs')
    .usage('Usage: $0 -w [num] -h [num]')
    .alias('s', 'saleor-endpoint')
    .describe('s', 'Saleor endpoint')
    .alias('d', 'nosto-endpoint')
    .describe('d', 'Nosto endpoint')
    .alias('t', 'api-token')
    .describe('t', 'Token for the API')
    .demandOption(['s','d','t'])
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2019')
    .argv;

console.log(argv);
