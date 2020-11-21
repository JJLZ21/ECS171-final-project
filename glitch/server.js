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
function blackBoxCategorizationMagic(input) {
    // Return a random number between one and five
    return Math.floor(Math.random() * 5) + 1;
}

// Get request that will return as category a person is
// in based on their input data that was sent from /data-set
// and stored in data_set_history
app.get('/get-category-result', (req, res) => {
    if (data_set_history.length != 0) {
	// Use our most recent data set to determine a user's category
	let category_number = blackBoxCategorizationMagic(data_set_history[data_set_history.length - 1]);
	res.send({category: category_number});
    } else {
	// Server did not receive any data from the user so we can't
	// do anything
	res.send({category: -1});
    }
})

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
