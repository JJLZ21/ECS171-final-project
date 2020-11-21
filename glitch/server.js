var express = require("express");
var bodyParser = require('body-parser')

var app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/react.html');
});

app.get('/results', (req, res) => {
    res.sendFile(__dirname + '/public/react.html');
});

let data_set_history = []
// Post request to receive the one sent in DataInterface.jsx
app.post('/data-set', (req, res) => {
    // Assuming that the json sent in a POST request is
    // contained in the request body
    let received_json_data = req.body;
    console.log(received_json_data);

    // Decide what to do with the data
    // 1. add to a dataset history for future reference
    // 2. send the dataset into our black box and expect
    //    a category to be returned
    let time = new Date().toString();
    data_set_history.push({time:received_json_data});
});

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
});
