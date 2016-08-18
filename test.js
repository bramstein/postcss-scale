var postcss = require('postcss');
var fs = require('fs');
var scale = require('./index');

fs.readFile('input.css', function (err, data) {

  postcss([scale()]).process(data).then(function (result) {
    fs.writeFile('output.css', result.css, function (err) {
    });
  });
});
