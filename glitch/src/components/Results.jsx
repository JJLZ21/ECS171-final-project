const React = require('react');

const di = require('./DataInterface');

class TestRequest extends React.Component {

    constructor(props) {
        super(props);

        // set the state to just have the request result
        this.state = {
            requestResult: "None"
        };
    }

    // after the component is successfully mounted, create a GET request to the python server
    // change the requestResult to whether it was succesfully received or not
    // **use json to read data from the server, see the above link
    componentDidMount() {
        // NON BLOCkING
        di.requestData((data) => {
            let columns = [...data.keys()];
            this.setState({
                requestResult: columns[0] + ": " + data.get(columns[0])
            });
        });
    }

    // function of what to render onto the DOM
    render() {
        const { requestResult } = this.state;
        return requestResult;
    }
}

const Results = function() {
    return (
      <div>
        <h1>Results Page</h1>
        <p><TestRequest /></p>
      </div>
    );
  }
  
  module.exports = Results;