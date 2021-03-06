// ********** SETUP **********

var express = require("express");
var bodyParser = require('body-parser')

var app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json()); 


// ********** CLUSTERING FUNCTIONS **********

function distFromMean(input, mean, std) {
    const Z = (input - mean) / std;
    return Z;
}

function categoryZeroAnalysis(frequency, monetary, recency) {
    const mean_r = 14.702544;
    const mean_f = 235.156556;
    const mean_m = 4964.604020;

    const std_r = 12.832362;
    const std_f = 304.915722;
    const std_m = 13877.918795;

    const zr = distFromMean(recency, mean_r, std_r);
    const zf = distFromMean(frequency, mean_f, std_f);
    const zm = distFromMean(monetary, mean_m, std_m);

    return [zf, zm, zr];
}

function categoryOneAnalysis(frequency, monetary, recency) {
    const mean_r = 24.342105;
    const mean_f = 29.918546;
    const mean_m = 497.385001;

    const std_r = 14.168621;
    const std_f = 22.185703;
    const std_m = 440.082541;

    const zr = distFromMean(recency, mean_r, std_r);
    const zf = distFromMean(frequency, mean_f, std_f);
    const zm = distFromMean(monetary, mean_m, std_m);

    return [zf, zm, zr];
}

function categoryTwoAnalysis(frequency, monetary, recency) {
    const mean_r = 185.894650;
    const mean_f = 18.695473;
    const mean_m = 300.994051;

    const std_r = 97.394688;
    const std_f = 13.746029;
    const std_m = 206.843209;

    const zr = distFromMean(recency, mean_r, std_r);
    const zf = distFromMean(frequency, mean_f, std_f);
    const zm = distFromMean(monetary, mean_m, std_m);

    return [zf, zm, zr];
}

function categoryThreeAnalysis(frequency, monetary, recency ) {
    const mean_r = 103.312636;
    const mean_f = 91.077342;
    const mean_m = 1657.715819;

    const std_r = 72.055165;
    const std_f = 86.325331;
    const std_m = 1906.586092;

    const zr = distFromMean(recency, mean_r, std_r);
    const zf = distFromMean(frequency, mean_f, std_f);
    const zm = distFromMean(monetary, mean_m, std_m);

    return [zf, zm, zr];
}

function distanceFromZero(scores) {
    return Math.abs(scores[0]) + Math.abs(scores[1]) + Math.abs(scores[2]);
}

let data_set_history = []
function determineCluster(input) {
    // Pull out frequency, monetary scoring an
    const frequency = input['data']['frequencyIn'];
    const monetary = input['data']['monetaryIn'];
    const recency = input['data']['recencyIn'];

    // Calculate the z-scores for each category/cluster
    // NOTE: The array indexes indicate the cluster number
    // i.e. index 0 is cluster zero, index 1 is cluster one, etc.
    const zscores = [categoryZeroAnalysis(frequency, monetary, recency),
                     categoryOneAnalysis(frequency, monetary, recency),
                     categoryTwoAnalysis(frequency, monetary, recency),
                     categoryThreeAnalysis(frequency, monetary, recency)];

    // Determine which zscores are closest to zero.
    // The closest array of zscores will be the one that
    // we should recommend
    const zscores_summed = [distanceFromZero(zscores[0]),
                            distanceFromZero(zscores[1]),
                            distanceFromZero(zscores[2]),
                            distanceFromZero(zscores[3])];

    // The summed absolute value of zscores should be good
    // to determine which cluster is the best fit for our
    // input data. 
    //
    // EXAMPLE:
    // For a particular cluster for recency and monetary are
    // VERY low, but the frequency zscore could be VERY high,
    // making it hard to actually categorize our input data
    // as that cluster
    //
    // Because of the summed calculation of zscores, all three
    // zscores need to be relatively small for our input data
    // to actually be categorized as a particular cluster
    const min = Math.min.apply(Math, zscores_summed); 
    const determined_cluster = zscores_summed.indexOf(min);
    
    console.log("Z-Scores: " + JSON.stringify(zscores));
    console.log("Z-Scores Summed: " + JSON.stringify(zscores_summed));
    console.log("Determined Minimum: " + min);
    console.log("Determined Cluster: " + determined_cluster);

    return {cluster: determined_cluster,
            R: recency,
            F: frequency,
            M: monetary,
            zscore_r: zscores[determined_cluster][2],
            zscore_f: zscores[determined_cluster][0],
            zscore_m: zscores[determined_cluster][1]};
}


// ********** CLIENT/SERVER COMMUNICATION **********

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/react.html');
});

app.get('/results', (req, res) => {
    res.sendFile(__dirname + '/public/react.html');
});

// Get request that will return as category a person is
// in based on their input data that was sent from /data-set
// and stored in data_set_history
app.get('/get-category-result', (req, res) => {
    if (data_set_history.length != 0) {
	    // Use our most recent data set to determine a user's category
	    let data = determineCluster(data_set_history[data_set_history.length - 1]);
        console.log("Determined values: " + JSON.stringify(data));
	    res.send(data);
    } else {
	// Server did not receive any data from the user so we can't
	// do anything
	res.send({category: -1});
    }
});

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
