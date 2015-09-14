'use strict';

var path = require('path'),
      fs = require('fs');

module.exports = function(eyeglass, sass) {
  return {
    sassDir: path.join(__dirname, 'sass'),
    // TODO: eyeglass assets?
    functions: {
      'file-text($path)': function(path, encoding: \'utf8\', done) {
        fs.readFile(path.getValue(), encoding, function (err, data) {
          if (err) throw new Error("File read error: \'" + err.toString() + "\'.");
          done(sass.types.String(data));
        });
      }
    }
  };
};
