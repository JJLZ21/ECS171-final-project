const fetchURL = "./run-example";

module.exports.requestData = function (callback) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch(fetchURL).then(res => res.json()).then(
    (result) => {
        // convert the received column list into an array
        let columns = Object.keys(result);
        let columnData = new Map();

        // use a map to map the columns from the array to their data
        for (let i = 0; i < columns.length; i++) {
            // NOTE: this mapping is assuming that the row indices start at zero
            columnData.set(columns[i], Object.values(result[columns[0]]));
        }

        // return data to the callback function
        callback(columnData);
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