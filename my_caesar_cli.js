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

  const { action, shift, input, output } = program.opts();

  if (!action) errorHandler(new Error('Missing required action args'));
  if (!shift) errorHandler(new Error('Missing required shift args'));
  if (!input && !output) {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Please input phase: ', (answer) => {
      const result = caesar(answer, action === 'encode' ? shift : -shift);
      process.stderr.write(`Transformed phase: ${result}`);
      rl.close();
    });
  }
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

validationArgs();
