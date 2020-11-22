// from template: https://glitch.com/edit/#!/starter-react

const React = require('react');
const ReactDOM = require('react-dom');

/* Import Components (Pages) */
const HelloWorld = require('./components/HelloWorld');
const Questions = require('./components/Questions');
const Results = require('./components/Results');

// Choose which page to render
const url = window.location.href;
const sub = url.slice(url.lastIndexOf("/") + 1);
switch (sub) {
    case "results": ReactDOM.render(<Results/>, document.getElementById('main')); break;
    default: ReactDOM.render(<HelloWorld/>, document.getElementById('main'));
}