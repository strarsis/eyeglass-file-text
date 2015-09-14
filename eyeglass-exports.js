'use strict';

var path = require('path'),
      fs = require('fs');

module.exports = function(eyeglass, sass) {
  return {
    sassDir: path.join(__dirname, 'sass'),
    // TODO: eyeglass assets?
    functions: {
      'file-text($path)': function(path, encoding: \'utf8\', done) {
        fs.readFile(path.getValue(), encoding, function (err,data) {
          if (err) return console.log(err); // TODO: sass error object?
          done(sass.types.String(data));
        });
      }
    }
  };
};
