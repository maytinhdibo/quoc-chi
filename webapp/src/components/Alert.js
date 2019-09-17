import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

var alert;
var setTime;

export class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            display: false
        }
    }
    setText = (text) => {
        this.setState({ text });
    }
    display = () => {
        this.setState({ display: true });
    }
    hidden = () => {
        this.setState({ display: false });
    }
    render() {
        return (
            <div id="alert" onClick={this.hidden} className={this.state.display ? "" : "hidden"}>
                {this.state.text}
            </div>
        )
    }
}

export const setAlert = (element) => {
    alert = element;
    console.log(alert);
}
export const alertText = (text, auto) => {
    try {
        clearTimeout(setTime);
        alert.current.display();
        alert.current.setText(text);
        if(!auto){
            setTime = setTimeout(function () { alert.current.hidden(); }, 4000);
        }
    } catch (e) { }
}
