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


function distFromMean(input, mean, std) {
    let Z = (input - mean) / std;
    return Z;
}

function categoryZeroAnalysis(frequency, monetary, recency) {
    let mean_r = 17.23;
    let mean_f = 213.11;
    let mean_m = 4435.33;

    let std_r = 14.011974;
    let std_f = 288.561883;
    let std_m = 12952.823168;

    let zr = distFromMean(recency, mean_r, std_r);
    let zf = distFromMean(frequency, mean_f, std_f);
    let zm = distFromMean(monetary, mean_m, std_m);

    return [zf, zm, zr];
}

function categoryOneAnalysis(frequency, monetary, recency) {
    // Mean:     R = 24.34, F = 29.92, M = 497.39
    let mean_r = 24.34;
    let mean_f = 29.92;
    let mean_m = 497.39;

    let std_r = 14.168621;
    let std_f = 22.185703;
    let std_m = 440.082541;

    let zr = distFromMean(recency, mean_r, std_r);
    let zf = distFromMean(frequency, mean_f, std_f);
    let zm = distFromMean(monetary, mean_m, std_m);

    return [zf, zm, zr];
}

function categoryTwoAnalysis(frequency, monetary, recency) {
// Mean:  R = 185.89, F = 18.70, M = 300.99
    let mean_r = 185.89;
    let mean_f = 18.70;
    let mean_m = 300.99;

    let std_r = 97.394688;
    let std_f = 13.746029;
    let std_m = 206.843209;

    let zr = distFromMean(recency, mean_r, std_r);
    let zf = distFromMean(frequency, mean_f, std_f);
    let zm = distFromMean(monetary, mean_m, std_m);

    return [zf, zm, zr];
}

function categoryThreeAnalysis(frequency, monetary, recency ) {
    let mean_r = 118.59;
    let mean_f = 94.41;
    let mean_m = 1770.96;

    let std_r = 70.645585;
    let std_f = 93.843974;
    let std_m = 2053.940432;

    let zr = distFromMean(recency, mean_r, std_r);
    let zf = distFromMean(frequency, mean_f, std_f);
    let zm = distFromMean(monetary, mean_m, std_m);

    return [zf, zm, zr];
}

let data_set_history = []
function blackBoxCategorizationMagic(input) {
    // Pull out frequency, monetary scoring an
    let frequency = input['data']['frequencyIn'];
    let monetary = input['data']['monetaryIn'];
    let recency = input['data']['recencyIn'];

    let c0 = categoryZeroAnalysis(frequency, monetary, recency);
    let c1 = categoryOneAnalysis(frequency, monetary, recency);
    let c2 = categoryTwoAnalysis(frequency, monetary, recency);
    let c3 = categoryThreeAnalysis(frequency, monetary, recency);

    console.log(c0);
    console.log(c1);
    console.log(c2);
    console.log(c3);

    let recency_level = 0;
    let frequency_level = 0;
    let monetary_level = 0;
    let cluster =  Math.floor(Math.random() * 5) + 1;
    return {cluster: cluster, R: recency_level, F: frequency_level, M: monetary_level};
}

// Get request that will return as category a person is
// in based on their input data that was sent from /data-set
// and stored in data_set_history
app.get('/get-category-result', (req, res) => {
    if (data_set_history.length != 0) {
	    // Use our most recent data set to determine a user's category
	    let data = blackBoxCategorizationMagic(data_set_history[data_set_history.length - 1]);
        console.log("Determined values: " + JSON.stringify(data));
	    res.send(data);
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
