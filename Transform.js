const { Transform } = require('stream');

module.exports = class Transformer extends Transform {
  constructor(func, shift) {
    super();
    this.func = func;
    this.shift = shift;
  }

  _transform(data, encoding, callback) {
    this.push(this.func(data.toString(), this.shift));
    callback();
  }
};
