const React = require('react');
const { pushData } = require('./DataInterface');

// Questions given by Mary in #se_and_ui-ux channel in Slack
// Subject to change
const labels = {
    label1: "How many days has it been since this customer's last purchase?",
    label2: "How much has this customer spent in total? (£)",
    label3: "How many purchases has this customer made in the past 3 years?"
}

// Options for recency dropdown
// Subject to change
const recencyOptions = [
    {
        label: 'Pick One',
        value: -1
    },
    {
        label: 'Very recently',
        value: 3
    },
    {
        label: 'Somewhat recently',
        value: 2
    },
    {
        label: 'Not very recently',
        value: 1
    }
];

class FormItemInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div style={{marginBottom: '16px'}}>
                <div style={{marginBottom: '5px'}}>{this.props.myLabel}</div>
                <input type={this.props.myType} value={this.state.value} onChange={this.handleChange} />
            </div>
        );
    }
}

class FormItemSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    render() {
        return (
            <div style={{marginBottom: '16px'}}>
                <div style={{marginBottom: '5px'}}>{this.props.myLabel}</div>
                <select value={this.state.value} onChange={this.handleChange}>
                    <OptionsList options={this.props.options}/>
                </select>
            </div>
        );
    }
}

class OptionsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const myOptions = this.props.options;
        return (
            myOptions.map((option) => 
                <option value={option.value}>{option.label}</option>
            )
        );
    }
}

class QuestionsForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.FormItem1 = React.createRef();
        this.FormItem2 = React.createRef();
        this.FormItem3 = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        const responsesJSON = {
            // Answers to our three questions
            recencyIn: this.FormItem1.current.state.value,
            monetaryIn: this.FormItem2.current.state.value,
            frequencyIn: this.FormItem3.current.state.value,
        };

        // Send to server (through our DataInterface)
        pushData(responsesJSON);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{backgroundColor: "rgb(247, 247, 247)", padding: "20px", borderRadius: "5px", boxShadow: "9px 9px 18px -5px rgba(0,0,0,0.2)"}}>
                <FormItemInput myLabel={labels.label1} ref={this.FormItem1} myType='number'/> {/*Recency*/}
                <FormItemInput myLabel={labels.label2} ref={this.FormItem2} myType='number'/> {/*Monetary*/}
                <FormItemInput myLabel={labels.label3} ref={this.FormItem3} myType='number'/> {/*Frequency*/}
                <input type='submit' value='Submit' />
            </form>
        );
    }
}

const Questions = function() {
    return(
        <div style={{margin: "auto", width: "50%"}}>
            <br /><h1>Questions Page</h1>
            <QuestionsForm/>
        </div>
    );
}

module.exports = Questions;