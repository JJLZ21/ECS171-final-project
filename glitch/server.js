var express = require("express");
const spawn = require("child_process").spawn;

var app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    var dataToSend;

    const pyprocess = spawn('python', ['./test.py']);

    // Collect the data from the script
    pyprocess.stdout.on('data', (data) => {
        dataToSend = data.toString();
        console.log(dataToSend);
    });

    pyprocess.on('close', (code) => {
        console.log('py process finished with code ' + code);
        res.send(dataToSend);
    });
});

app.get('/react', (req, res) => {
    res.sendFile(__dirname + '/public/react.html');
});

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
});

