var express = require("express");
const spawn = require("child_process").spawn;
const {streamWrite, streamEnd, onExit} = require('@rauschma/stringio');

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

    const pyprocess = spawn('python', ['./model.py'], {stdio: ['pipe', process.stdout, process.stderr]});

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

async function writeInputDataToStdio(handle) {
    if (data_set_history.length != 0) {
	console.log("Writing to stdin");
	// write the most recent data set sent to the server
	let to_write = data_set_history[data_set_history.length - 1];

	await streamWrite(handle, JSON.stringify(to_write));
	await streamEnd(handle);
    }
}

async function spawnPyProcess(name, whendone) {
    const pyprocess = spawn('python', [name]);
    let dataToSend = '';
    let time = new Date().toString();
    data_set_history.push({receivedTime: time, data:'This is a test'});

    console.log(data_set_history);
    await writeInputDataToStdio(pyprocess.stdin);

    pyprocess.stdout.on('data', (data) => {
        dataToSend = data.toString();
        console.log(dataToSend);
    });

    pyprocess.on('close', (code) => {
        console.log('py process finished with code ' + code);
	whendone(dataToSend)
    });
}

app.get('/run-example', (req, res) => {
    // Run some example python code and send the results as json to the client
    spawnPyProcess('./test.py', (data) => {
	res.send(data);
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
    let time = new Date().toString();
    data_set_history.push({time:received_json_data});
});

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
});

