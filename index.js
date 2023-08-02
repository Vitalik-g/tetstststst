const express = require('express')
const app = express()
var http = require('http');
var options = {
  host: 'test-server',
  path: '/'
};


app.get('/', (req, res) => {
  getter(res)
})
function getter(res){
  var req = http.get(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
  
    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    res.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      res.send(body)
      // ...and/or process the entire body here.
    })
  });
  req.on('error', function(e) {
    res.send('ERROR: ' + e.message);
  });
}

app.listen(3000)
