import React from "react";
import { Col, Row, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faGraduationCap,
  faSchool,
  faClipboardList
} from "@fortawesome/free-solid-svg-icons";
import userAPI from "../../services/user.services";
import { alertText } from "../../components/Alert";
import { Redirect } from "react-router-dom";

class UserRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null
    };
  }
  componentDidMount() {
    const path = localStorage.role && JSON.parse(localStorage.role).path;
    this.setState({ path });
  }
  componentWillReceiveProps() {
    const path = localStorage.role && JSON.parse(localStorage.role).path;
    this.setState({ path });
  }
  render() {
    if(this.state.path){
        return <Redirect to={"/dashboard" + this.state.path} />;
    }else{
        return <div></div>
    }
  }
}

export default UserRouter;
