// URL to fetch the data from
const fetchURL = "./run-example";

// convert json data produced by GET requests into a readable map
// this is assuming the json format was produced by 'pandas'
function jsonToMap(jsonData) {
    // convert the received column list into an array
    let columns = Object.keys(jsonData);
    let columnData = new Map();

    // use a map to map the columns from the array to their data
    for (let i = 0; i < columns.length; i++) {
        // NOTE: this mapping is assuming that the row indices start at zero
        columnData.set(columns[i], Object.values(jsonData[columns[0]]));
    }

    return columnData;
}

// creates a non-blocking GET request to the server and calls the callback function
// with the data converted to a map after it receives data
module.exports.requestData = function (callback) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch(fetchURL).then(res => res.json()).then(
    (result) => {
        // return data to the callback function
        callback(jsonToMap(result));
    },
    (error) => {
        // log the error and callback with null if there was an error
        console.log(error);
        callback(null);
    });
};

module.exports.pushData = function () {
    // TODO
};