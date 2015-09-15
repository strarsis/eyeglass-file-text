# eyeglass-file-text

Sass eyeglass module for getting the contents of a text file as string.


Installation
------------
````
npm install --save-dev eyeglass-file-text
````


Usage
-----
````
@import 'file-text';

$text: file-text('./loremipsum.txt');
    // encoding can be explicitly specified by 2nd argument

// Variable can be then used as any sass variable:
.test {
  content: $text;
}
````


Arguments
---------
### path
Path to the file.

### encoding
Encoding of the file.
Defaults to utf8.


Binary files
------------

For binary file content in CSS, load and inline it with base64 encoded, 
this module/function is only suited for text files.
