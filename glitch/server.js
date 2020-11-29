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

// the ranges for frequency in 3 years: 1: 0-25, 2: 26-77, 3: >77 
// should we use 1 year instead of 3 years? just divide the range by 3
// the ranges for frequency in 1 year: 1: 0-8.33, 2: 8.34-25.66, 3: >25.66 
function decideLevelFromFrequency(freq) {
    if (freq >= 0 && freq <= 25) {
	return 1;
    } else if (freq > 25 && freq <= 77) {
	return 2;
    } else if (freq > 77) {
	return 3;
    } else {
	return -1;
    }
}

// the ranges for Monetary in 3 years: 1: 0-290.8533, 2: 290.8533-1229.34, 3: >1299.34 
// should we use 1 year instead of 3 years? just divide the range by 3
// the ranges for frequency in 1 year: 1: 0-96.9511, 2: 96.96-433.11, 3: >433.11
function decideLevelFromMonetary(monetary) {
    if (monetary >= 0 && monetary <= 290.8533) {
	return 1;
    } else if (monetary > 290.8533 && monetary <= 1229.34) {
	return 2;
    } else if (monetary > 1299.34) {
	return 3;
    } else {
	return -1;
    }
}

let data_set_history = []
function blackBoxCategorizationMagic(input) {
    // Pull out frequency, monetary scoring an
    let frequency = input['data']['frequencyIn'];
    let monetary = input['data']['monetaryIn'];
    let recency = input['data']['recencyIn'];

    let frequency_level = decideLevelFromFrequency(frequency);
    let monetary_level = decideLevelFromMonetary(monetary);

    // TODO: Error handling if any return -1
    // TODO: What are the recency levels

    // TODO: Should the return value be the three
    // levels added together? Or should I just return
    // the 3 individual levels?

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
    data_set_history.push({time:time,
			   data:received_json_data});

    // Redirects the client to the Results page
    // Assumes that this post request is only called from the Quetsions page
    // (A pretty safe assumption)
    res.redirect('./results');
});

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
});
