const { program } = require('commander');
program.version('0.0.1');

const errorHandler = (error) => {
  process.stderr.write(error.message);
  process.exit(1);
};

const validationArgs = () => {
  program
    .requiredOption('-a, --action [type],', 'an action encode/decode')
    .requiredOption('-s, --shift <number>', 'a shift')
    .option('-i, --input <filename>', 'an input file')
    .option('-o, --output <filename>', 'an output file');

  program.parse(process.argv);

  const options = program.opts();

  if (!options.action) errorHandler(new Error('Missing required action args'));
  if (!options.shift) errorHandler(new Error('Missing required shift args'));
};

validationArgs();
