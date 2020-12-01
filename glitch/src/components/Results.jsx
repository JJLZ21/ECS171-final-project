const React = require('react');

const di = require('./DataInterface');

// require the categories data json
const results_data = require('../categories.json');

// From starter-react on Glitch
const UnorderedList = function({ items }) {
    return (
        <ul>
            {items.map(function(item, i) {
                return <li key={i}>{item}</li>;
            })}
        </ul>
    );
}

function getRenderedCategory(categoryName, r_val, f_val, m_val) {
    // return the html body for that category according to what is in the json
    return (
        <div style={{margin: "auto", width: "50%"}}>
            <br /><h1>{categoryName}</h1>
            <div style={{backgroundColor: "rgb(247, 247, 247)", padding: "4px 20px 20px 20px", borderRadius: "5px", boxShadow: "9px 9px 18px -5px rgba(0,0,0,0.2)"}}>
                {results_data[categoryName].body.map(function (str) { // printing the lines
                    if (str.length > 1 && str.charAt(0) == '!') {
                        // Image
                        let delim = str.indexOf(",");
                        if (delim == -1) {
                            return <div style={{textAlign: "center"}}><img style={{width: "80%", height: "auto"}} src={str.substr(1)} /></div>;
                        } else {
                            return <div style={{textAlign: "center"}}><img style={{width: str.substr(delim + 1) + "%", height: "auto"}} src={str.substr(1, delim - 1)} /></div>;
                        }
                    } else if (str.length > 1 && str.charAt(0) == '@') {
                        // Unordered List
                        return <UnorderedList items={str.substr(1).split('|')}/>
                    } else {
                        // Paragraph
                        let bodyText = str.replaceAll("{r}", r_val).replaceAll("{f}", f_val).replaceAll("{m}", m_val);
                        return <p>{bodyText}</p>;
                    }
                })}
                <br /><a style={{color: "rgb(138, 122, 144)"}} href="/">Go back</a>
            </div>
        </div>
    );
}

class ResultBody extends React.Component {

    constructor(props) {
        super(props);

        // set the state to just have the category number
        this.state = {
            categoryNumber: -1,
            r_val: 0,
            f_val: 0,
            m_val: 0
        };
    }

    // after the component is successfully mounted, create a GET request to the python server
    // change the category number according to what is received
    componentDidMount() {
        // NON BLOCkING
        di.requestData((data) => {
            // if error
            try {
                this.setState({
                    categoryNumber: data.cluster,
                    r_val: data.R,
                    f_val: data.F,
                    m_val: data.M
                });
            } catch (error) {  // there was an error setting the state (data is null or any values don't exist)
                this.setState({categoryNumber: -2});
            }
        });
    }

    // function of what to render onto the DOM
    render() {
        // read in the current state
        const { categoryNumber, r_val, f_val, m_val } = this.state;

        // get all of the categories in the json file
        let categories = Object.keys(results_data);
        
        // loop through all of those categories
        for (let i = 0; i < categories.length; i++) {
            let categoryName = categories[i];

            // if the category_number matches the current state
            if (results_data[categoryName].category_number == categoryNumber) {
                return getRenderedCategory(categoryName, r_val, f_val, m_val);
            }
        }

        // there was no known categories in the json file, return the error category if it exists
        return results_data.hasOwnProperty("Error") ? getRenderedCategory("Error", -1, -1, -1) : "Unknown category";
    }
}
  
module.exports = ResultBody;