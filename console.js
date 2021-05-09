const { program } = require('commander');

const errorHandler = (error) => {
  process.stderr.write(error.message);
  process.exit(1);
};

program
  .requiredOption('-a, --action [type],', 'an action encode/decode')
  .requiredOption('-s, --shift <number>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file');
program.parse(process.argv);

const { action } = program.opts();

if (action !== 'decode' && action !== 'encode')
  errorHandler(new Error('Please input decode or encode for action'));

module.exports = program;
