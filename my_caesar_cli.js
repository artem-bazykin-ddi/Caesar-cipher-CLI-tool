const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const transformerStream = require('./Transform');
const caesar = require('./caesar');
const program = require('./console');

const { action, shift, input, output } = program.opts();

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

pipeline(readStream, transform, writeStream, (err) => {
  if (err) {
    console.error(`\nPipeline failed. ${err}`);
  } else {
    console.log('\nPipeline succeeded.');
  }
});
