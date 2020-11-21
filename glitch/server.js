var express = require("express");
const spawn = require("child_process").spawn;

var app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/react.html');
});

app.get('/plotting-test', (req, res) => {
    res.sendFile(__dirname + '/public/react.html');
});

let data_set_history = []
app.get('/data', (req, res) => {
    var dataToSend;

    const pyprocess = spawn('python', ['./model.py']);

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

app.get('/run-example', (req, res) => {
    // Run some example python code and send the results as json to the client
    var dataToSend;

    const pyprocess = spawn('python', ['./test.py']);

    // Collect the data from the script
    // Note: This data should already be in json format!!!
    // This should be easy to accomplish and is probably better
    // than trying to jsonify it here before sending it
    pyprocess.stdout.on('data', (data) => {
        dataToSend = data.toString();
        console.log(dataToSend);
    });

    pyprocess.on('close', (code) => {
        console.log('py process finished with code ' + code);
        res.send(dataToSend);
    });
});

// Post request to receive the one sent in DataInterface.jsx
app.post('/data-set', (req, res) => {
    console.log(req);

    // Assuming that the json sent in a POST request is
    // contained in the request body
    let received_json_data = json.loads(req.body);

    // Decide what to do with the data
    // 1. add to a dataset history for future reference
    // 2. send the json dataset to the python process that actually
    //    cares about it (this should be done when run-example or data
    //    are called
    let time = new Date().getTime();
    data_set_history.push({time:received_json_data});
});

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
});

