var shelljs = require('shelljs');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/circle-rect.html');
});

app.get ('/api', function (req, res) {

	var cx = req.query.cx;
	var cy = req.query.cy;
	var r = req.query.r;
	var minX = req.query.minX;
	var minY = req.query.minY;
	var maxX = req.query.maxX;
	var maxY = req.query.maxY;
	//console.log(cx,cy,r,minX,minY,maxX,maxY);
	shelljs.exec('circle-rect.exe ' + cx + ' ' + cy +' '+ r +' '+ minX +' '+ minY +' '+ maxX +' '+ maxY , function(status, output) {
	  //console.log('Exit status:', status);
	  //console.log('Program output:', output);
		
      var output = {
        status: status,
        output: output
      };

		
      /*
        The response header for supporting CORS:
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      */

	  res.writeHead(200, {
		  "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
	  });
	
	  res.write( JSON.stringify(output) );
	  res.end();

	});

});


// or simply
// app.listen (1337); 
// will do

var server = app.listen (1337, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});

