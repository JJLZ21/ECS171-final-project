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
            <label>
                {this.props.myLabel}
                <input type='text' value={this.state.value} onChange={this.handleChange} />
            </label>
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
            <form onSubmit={this.handleSubmit}>
                <FormItem myLabel={labels.label1} ref={this.FormItem1} />
                <FormItem myLabel={labels.label2} ref={this.FormItem2} />
                <FormItem myLabel={labels.label3} ref={this.FormItem3} />
                <input type='submit' value='Submit' />
            </form>
        );
    }
}

const Questions = function() {
    return(
        <div>
            <h1>Questions Page</h1>
            <QuestionsForm/>
        </div>
    );
}

module.exports = Questions;