import React, { Component } from "react";

export class ProgressBar extends Component {
  render() {
    const { value } = this.props;
    return (
      <span className="qc-progresss-bar">
        <span className="bar">
          <span
            style={{
              width: this.props.value * 100 + "%",
              backgroundColor:
                value >= 0.75 ? "#007f48" : value >= 0.4 ? "#faec25" : "#dd5740"
            }}
            className="status"
          ></span>
        </span>
        <span className="value">{Math.round(value * 100) + "%"}</span>
      </span>
    );
  }
}
