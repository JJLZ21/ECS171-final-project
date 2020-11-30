const React = require('react');
const { pushData } = require('./DataInterface');

// Questions to display
const labels = {
    label1: "How many days has it been since this customer's last purchase?",
    label2: "How much has this customer spent in total? (£)",
    label3: "How many purchases has this customer made in the past 3 years?"
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

        const r = this.FormItem1.current.state.value;  // Recency
        const m = this.FormItem2.current.state.value;  // Monetary
        const f = this.FormItem3.current.state.value;  // Frequency
        
        if (r == '' || m == '' || f == '') {
            let warning = document.getElementById('warning');
            warning.classList.remove('displayNone');
        }
        else {
            const responsesJSON = {
                // Answers to our three questions
                recencyIn: r,
                monetaryIn: m,
                frequencyIn: f,
            };
    
            // Send to server (through our DataInterface)
            pushData(responsesJSON);
        }
    }

    render() {
        return (
            <div style={{backgroundColor: "rgb(247, 247, 247)", padding: "20px", borderRadius: "5px", boxShadow: "9px 9px 18px -5px rgba(0,0,0,0.2)"}}>
                <FormItem myLabel={labels.label1} ref={this.FormItem1} myType='number'/> {/*Recency*/}
                <FormItem myLabel={labels.label2} ref={this.FormItem2} myType='number'/> {/*Monetary*/}
                <FormItem myLabel={labels.label3} ref={this.FormItem3} myType='number'/> {/*Frequency*/}
                <button type='button' onClick={this.handleSubmit}>Submit</button>
                <p id='warning' style={{color: 'red', margin: '16px 0 0 0'}} className='displayNone'>All values must be entered</p>
            </div>
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