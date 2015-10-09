var express = require('express');
var app = express();

app.use(function(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain"});
  res.end("Hello world!\n");
});

app.listen(3000);
