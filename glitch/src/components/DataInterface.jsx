const fetchURL = "./run-example";

module.exports.requestData = function (callback) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch(fetchURL).then(res => res.json()).then(
    (result) => {
        callback("success!");
    },
    (error) => {
        callback("error");
    });
};

module.exports.pushData = function () {
    // TODO
};