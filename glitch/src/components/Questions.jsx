const React = require('react');
const { pushData } = require('./DataInterface');

// Questions given by Mary in #se_and_ui-ux channel in Slack
// Subject to change
const labels = {
    label1: 'When was the last time this client shopped at your store?',
    label2: 'How much has this customer spent in total? (£)',
    label3: 'How often does this customer make a purchase?'
}

class FormItem extends React.Component {
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
                <FormItem myLabel={labels.label1} myType='date' ref={this.FormItem1} />
                <FormItem myLabel={labels.label2} myType='number' ref={this.FormItem2} />
                <FormItem myLabel={labels.label3} myType='text' ref={this.FormItem3} />
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