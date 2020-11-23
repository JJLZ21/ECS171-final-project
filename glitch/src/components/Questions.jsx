const React = require('react');
const { pushData } = require('./DataInterface');

// Once we know our actual questions, place them here.
// If we have less than five questions, remove necessary code.
// If we have more than five questions, add necessary code.
const labels = {
    label1: 'Question 1',
    label2: 'Question 2',
    label3: 'Question 3',
    label4: 'Question 4',
    label5: 'Question 5'
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
        this.FormItem4 = React.createRef();
        this.FormItem5 = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        const responsesJSON = {
            responses: [
                this.FormItem1.current.state.value,
                this.FormItem2.current.state.value,
                this.FormItem3.current.state.value,
                this.FormItem4.current.state.value,
                this.FormItem5.current.state.value
            ]
        };
        console.log(responsesJSON);

        // Send to server (through our DataInterface)
        pushData(responsesJSON);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormItem myLabel={labels.label1} ref={this.FormItem1} />
                <FormItem myLabel={labels.label2} ref={this.FormItem2} />
                <FormItem myLabel={labels.label3} ref={this.FormItem3} />
                <FormItem myLabel={labels.label4} ref={this.FormItem4} />
                <FormItem myLabel={labels.label5} ref={this.FormItem5} />
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