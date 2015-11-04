'use strict';

var path = require('path'),
      fs = require('fs'),
     eol = require('eol');

module.exports = function(eyeglass, sass) {
  return {
    sassDir: path.join(__dirname, 'sass'),
    // TODO: eyeglass assets?
    functions: {
      '_file-text($path, $encoding: \'utf8\')': function(path, encoding, done) {
        fs.readFile(path.getValue(), encoding.getValue(), function (err, data) {
          if (err) {
            done(sass.types.Error("File read error: \'" + err.toString() + "\'."));
            return;
          }

          var dataEol = data;
          if(encoding != 'base64') {
            dataEol = eol.auto(data);
          }

          done(sass.types.String( dataEol ));
        });
      }
    }
  };
};
