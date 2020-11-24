const React = require('react');

const di = require('./DataInterface');

// require the categories data json
const results_data = require('../categories.json');

class ResultBody extends React.Component {

    constructor(props) {
        super(props);

        // set the state to just have the category number
        this.state = {
            categoryNumber: -1
        };
    }

    // after the component is successfully mounted, create a GET request to the python server
    // change the category number according to what is received
    componentDidMount() {
        // NON BLOCkING
        di.requestData((data) => {
            let columns = [...data.keys()];
            this.setState({
                categoryNumber: data.get(columns[0])
            });
        });
    }

    // function of what to render onto the DOM
    render() {
        // read in the current state
        const { categoryNumber } = this.state;

        // get all of the categories in the json file
        let categories = Object.keys(results_data);
        
        // loop through all of those categories
        for (let i = 0; i < categories.length; i++) {
            let categoryName = categories[i];

            // if the category_number matches the current state
            if (results_data[categoryName].category_number == categoryNumber) {
                // return the html body for that category according to what is in the json
                return (
                    <div style={{margin: "auto", width: "50%"}}>
                        <br /><h1>{categoryName}</h1>
                        <div style={{backgroundColor: "rgb(247, 247, 247)", padding: "20px", borderRadius: "5px", boxShadow: "9px 9px 18px -5px rgba(0,0,0,0.2)"}}>
                            {results_data[categoryName].body.map(function (str) {
                                return <div>{str}<br /></div>;
                            })}
                            <br /><img style={{width: "100%", height: "auto"}} src="img/placeholder.jpg" />
                        </div>
                    </div>
                );
            }
        }

        // there was no known categories in the json file
        return "Unknown Category";
    }
}
  
module.exports = ResultBody;