// from template: https://glitch.com/edit/#!/starter-react

const React = require('react');
const UnorderedList = require('./UnorderedList');

const di = require('./DataInterface');

const dependenciesArray = [
  'express - middleware for the node server',
  'react - for generating the views of the app',
  'react-dom - powers the rendering of elements to the DOM, typically paired with React',
  'webpack - for bundling all the javascript',
  'webpack-cli - command line support for webpack',
  'jsx-loader - allows webpack to load jsx files'
];

const componentsMade = [
  'HelloWorld - which is the view you are seeing now!',
  'UnorderedList - which takes an array of "items" and returns a <ul> element with <li>, elements of each of those items within it',
];

// based on: https://reactjs.org/docs/faq-ajax.html
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
        di.requestData((data) => {
            let columns = [...data.keys()];
            this.setState({
                requestResult: columns[0] + ": " + data.get(columns[0])[0] + ", " + data.get(columns[0])[1]
            });
        });
    }

    // function of what to render onto the DOM
    render() {
        const { requestResult } = this.state;
        return requestResult;
    }
}

/* the main page for the index route of this app */
const HelloWorld = function() {
  return (
    <div>
      <h1><TestRequest /></h1>

      <p>This is a starter <a href="http://glitch.com">Glitch</a> app for React! It uses 
        only a few dependencies to get you started on working with React:</p>

      <UnorderedList items={dependenciesArray} />

      <p>Look in <code>app/components/</code> for two example components:</p>

      <UnorderedList items={componentsMade} />
    </div>
  );
}

module.exports = HelloWorld;