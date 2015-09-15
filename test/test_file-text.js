"use strict";

var Eyeglass  = require("eyeglass").Eyeglass;
var sass      = require("node-sass");

var testutils = require("./testutils");


var testFileSuccess = function(path, done) {
  var input    = "@import 'file-text'; "+
                 "$test: file-text('" + path + "'); " +
                 ".test { text: #{$test}; }";
  var expected = ".test {\n text: ''; }\n";

  var rootDir  = testutils.fixtureDirectory("app_assets");
  var eg = new Eyeglass({
    root: rootDir,
    data: input
  }, sass);
  eg.assets.addSource(rootDir, {pattern: "text/**/*"});

  testutils.assertCompiles(eg, expected, done);
};

var testFileFailEnc = function(path, done) {
  var input         = "@import 'file-text'; "+
                      "$test: file-text('" + path + "'); " +
                      ".test { text: #{$test}; }";
  var expectedError = "error in C function file-text: Error: : " +
                      "''.\n\nBacktrace:\n\tstdin:1, in function `file-text`\n\tstdin:1";

  var rootDir  = testutils.fixtureDirectory("app_assets");
  var eg = new Eyeglass({
    root: rootDir,
    data: input
  }, sass);
  eg.assets.addSource(rootDir, {pattern: "text/**/*"});

  testutils.assertCompilationError(eg, expectedError, done);
};


describe("loads into a variable", function () {

  it("an empty text file successfuly", function (done) {
    testFileSuccess("text/empty.txt", done);
  });

  it("a small text file successfuly", function (done) {
    testFileSuccess("text/small/test.txt", done);
  });
  it("a large text file successfuly", function (done) {
    testFileSuccess("text/large/loremipsum.txt", done);
  });

  it("a small svg file successfuly", function (done) {
    testFileSuccess("svg/small/example.svg", done);
  });
  it("a large svg file successfuly", function (done) {
    testFileSuccess("svg/large/calypso_font_example.svg", done);
  });

  it("a small binary (non-text) file unsuccessfully with error", function (done) {
    testFileFail("binary/small/picture.jpg", done);
  });
  it("a large binary (non-text) file unsuccessfully with error", function (done) {
    testFileFail("binary/large/picture.jpg", done);
  });

  it("a non-existing file unsuccessfully with error", function (done) {
    var input         = "@import 'file-text'; "+
                        "$test: file-text('./non-existing-file!!!.txt'); " +
                        ".test { text: #{$test}; }";
    var expectedError = "error in C function file-text: Error: : " +
                        "''.\n\nBacktrace:\n\tstdin:1, in function `file-text`\n\tstdin:1";

    var rootDir  = testutils.fixtureDirectory("app_assets");
    var eg = new Eyeglass({
      root: rootDir,
      data: input
    }, sass);
    eg.assets.addSource(rootDir, {pattern: "text/**/*"});

    testutils.assertCompilationError(eg, expectedError, done);
  });
});
