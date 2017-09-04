var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var staticFiles = __dirname + '/public';
var indexHTML = __dirname + '/views/index.html';

// Serve up the Index Home page for the Client
app.get('/', function(req, res) {
    res.sendFile(indexHTML);
});

// Serve up the Challange result as JSON Object
app.get('/headers', function(req, res) {

    //var ip = req.headers["x-forwarded-for"].split(',').splice(0,1).toString();
    var url = req.headers['host'];
    var lang  = req.headers['accept-language'].split(',')[0]
    var sys = req.headers['user-agent'].match(/\(([^)]+)\)/g)[0].slice(1,-1);

    // Creat object with values from req.headers
    var obj = {
        //"IP Address": ip,
        "IP Address": url,
        "Language" : lang,
        "Operating System": sys
    }

    // Send response object
    res.json(obj);
});

// Serve up CSS and JS files
app.use(express.static(staticFiles));

app.listen(port, function() {
    console.log(`Server is listening on port : ${port}`)
});