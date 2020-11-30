// URL to fetch the data from
const GET_URL = "./get-category-result";
const POST_URL = "./data-set";

// NOTE: remnant from getting returning pandas dataframe from the server
// convert json data produced by GET requests into a readable map
function jsonToMap(jsonData) {
    // convert the received column list into an array
    let columns = Object.keys(jsonData);
    let columnData = new Map();
    // use a map to map the columns from the array to their data
    for (let i = 0; i < columns.length; i++) {
        // NOTE: this mapping is assuming that the row indices start at zero
        let value = Object.values(jsonData[columns[i]]);
        columnData.set(columns[i], value == null ? value : jsonData[columns[i]]);
    }

    return columnData;
}

// creates a non-blocking GET request to the server and calls the callback function
// with the data converted to a map after it receives data
module.exports.requestData = function (callback) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch(GET_URL).then(res => res.json()).then(
    (result) => {
        // return data to the callback function
        callback(result);
    },
    (error) => {
        // log the error and callback with null if there was an error
        console.log(error);
        callback(null);
    });
};

// creates a post request depending on the provided data
// takes in json data such as: {"NAME": value1, "NAME2": value2}
// does not 
module.exports.pushData = function (jsonData) {
    fetch(POST_URL, {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(jsonData)
    }).then((res) => {
        if (res.status != 200)
            console.log(res);
        else if (res.redirected) {
            window.location.replace(res.url);
        }
    });
};