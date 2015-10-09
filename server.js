var express = require('express');
var logger = require('morgan');
var app = express();


app.use(logger("combined"));

app.use(function(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain"});
  res.end("Hello world!\n");
});

app.listen(3000);
