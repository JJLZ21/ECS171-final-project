// from template: https://glitch.com/edit/#!/starter-react

const React = require('react');
const ReactDOM = require('react-dom');

/* Import Components */
const HelloWorld = require('./components/HelloWorld');
const PlottingTest = require('./components/PlottingTest');

// Check whether to render plotting-test page
const pltPath = "plotting-test"
const url = window.location.href;
const sub = url.slice(url.length - pltPath.length, url.length);
if (sub == pltPath) {
   console.log("nice")
   ReactDOM.render(<PlottingTest/>, document.getElementById('main'));
}
else {
   console.log("not nice", sub)
   ReactDOM.render(<HelloWorld/>, document.getElementById('main'));
}