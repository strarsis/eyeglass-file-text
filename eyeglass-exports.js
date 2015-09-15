'use strict';

var path = require('path'),
      fs = require('fs');

module.exports = function(eyeglass, sass) {
  return {
    sassDir: path.join(__dirname, 'sass'),
    // TODO: eyeglass assets?
    functions: {
      '_file-text($path, $encoding: \'utf8\')': function(path, encoding, done) {
        fs.readFile(path.getValue(), encoding.getValue(), function (err, data) {
          if (err) throw new Error("File read error: \'" + err.toString() + "\'.");
          done(sass.types.String(data));
        });
      }
    }
  };
};
