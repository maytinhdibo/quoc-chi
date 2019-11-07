import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons';
class Breadcrumb extends React.Component {
  render() {
    var pathold = null;
    var renderPath = this.props.data.map(element => {
      if (pathold == null) {
        pathold = element.path;
      } else {
        pathold = pathold + element.path;
      }
      if (element.name == null) return;
      return (
        <span>
          {" "}
          / <Link to={pathold + "/"}>{element.name}</Link>
        </span>
      );
    });
    return (
        <div className="qc-breadcrumb">
        <span className="title"> {this.props.title}</span>
        <span className="qc-page-path">
          <FontAwesomeIcon icon={faHome} />{" "}
        </span>
        {renderPath}
      </div>
    );
  }
}
export default Breadcrumb;
