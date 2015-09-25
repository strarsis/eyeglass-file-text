# eyeglass-file-text

Sass eyeglass module for getting the contents of text or binary files as (encoded) string.

[![NPM](https://nodei.co/npm/eyeglass-file-text.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/eyeglass-file-text/)


New: Supports binary files now (encodes to base64).

New: Normalizes line endings to prevent issues with quotes and later output of the string.



Installation
------------
````
npm install --save-dev eyeglass-file-text
````


Usage
-----
````
@import 'file-text';

// Fetch text file:
$text  : file-text('./loremipsum.txt');
    // encoding can be explicitly specified by 2nd argument

// Fetch binary file:
$base64: file-binary('./test.jpg');
    // binary file content is represented as base64 text


// The string can then be used as usual in sass:
.test-text {
  content: $text;
}

.test-binary {
  background: url("data:image/jpeg;base64,#{$base64}");
}
````


Arguments
---------
### file-text
#### path
Path to the file.

#### encoding
Encoding of the file.
Defaults to utf8.


### file-binary
#### path
Path to the file.
