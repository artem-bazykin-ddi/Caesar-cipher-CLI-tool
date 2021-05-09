const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const transformerStream = require('./Transform');

const { program } = require('commander');
program
  .requiredOption('-a, --action [type],', 'an action encode/decode')
  .requiredOption('-s, --shift <number>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file');
program.parse(process.argv);
const { action, shift, input, output } = program.opts();

const errorHandler = (error) => {
  process.stderr.write(error.message);
  process.exit(1);
};

const caesar = (input, shift) => {
  if (shift < 0) shift += 26;
  let output = '';
  for (let i = 0; i < input.length; i++) {
    let c = input[i];
    if (c.match(/[a-z]/i)) {
      const code = input.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + +shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + +shift) % 26) + 97);
      }
    }
    output += c;
  }

  return output;
};

const readStream = input
  ? fs.createReadStream(path.join(__dirname, input))
  : process.stdin;

const writeStream = output
  ? fs.createWriteStream(path.join(__dirname, output), { flags: 'a+' })
  : process.stdout;

const transform = new transformerStream(
  caesar,
  action === 'encode' ? +shift : -shift
);

if (action !== 'decode' && action !== 'encode')
  errorHandler(new Error('Please input decode or encode for action'));

pipeline(readStream, transform, writeStream, (err) => {
  if (err) {
    errorHandler(`Pipeline failed. ${err}`);
  } else {
    errorHandler('Pipeline succeeded.');
  }
});
