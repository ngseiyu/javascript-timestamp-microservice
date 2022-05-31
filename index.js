// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.use(express.json());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});

// answer to the problem
app.get("/api/:date", (req, res) => {
    const { date } = req.params;
    let year, month, day, d;
    if (date.includes("-")) {
        [year, month, day] = date.match(/[0-9]+/g);
        d = new Date(Date.UTC(year, month - 1, day));
    } else {
        d = new Date(Number(date));
    }
    const result = {
        unix: d.getTime(),
        utc: d.toUTCString()
    }
    res.send(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Listening on port ' + listener.address().port);
});
/* app.listen(8080, () => {
    console.log(`Listening on port 8080`);
}); */