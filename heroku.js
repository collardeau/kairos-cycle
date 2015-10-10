if(process.env.NODE_ENV === 'production') {
  var child_process = require('child_process');
  var proc = "webpack -p --config webpack-prod.config.js";
  child_process.exec(proc, function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null){
      console.log('exec error: ' + error);
    }
  });
}
