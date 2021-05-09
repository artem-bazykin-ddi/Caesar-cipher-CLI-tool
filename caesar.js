module.exports = function caesar(input, shift) {
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
