import React from "react";
import { Link } from "react-router-dom";
import { FormGroup, Label, Input, Col, Row } from "reactstrap";
import language from "../../../config/language";
import Select from "react-select";
import inputStyle from "../../../config/inputStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChartBar,
  faSearch,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";
import ReactTable from "react-table";
import Pagination from "../../../components/Pagination";
import userAPI from "../../../services/user.services";
import formAPI from "../../../services/form.services";
import { alertText } from "../../../components/Alert";

const optionSection = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const optionBook = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const optionChapter = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const defaultValue = null;

class EditUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      academic_title: {
        id: null,
        name: null,
        fullname: null
      },
      organization: {
        id: null,
        name: null
      },
      book_roles: [],
      optionOrganization: [],
      optionTitle: [],
      valueOrganization: null
    }
  }

  editInfo = () => {
    let { name, email, valueTitle, valueOrganization } = this.state;
    userAPI.editInfo({
      name, email, academic_title: valueTitle.value, organization: valueOrganization.value
    }).then(res => {
      if (res.success) {
        alertText("Chỉnh sửa thông tin thành công");
        this.props.history.push({
          pathname: "/dashboard/user/" + localStorage.id
        });
      } else {
        throw new Error("Có lỗi xảy ra trong quá trình chỉnh sửa");
      }
    }).catch(err => {
      alertText(err.message);
    })
  }

  componentDidMount() {
    formAPI
      .get("organization,academic_title")
      .then(object => {
        console.log(object);
        if (object.success) {
          this.setState({
            optionOrganization: object.data.organization.map(ele => {
              return {
                value: ele.id,
                label: ele.name
              };
            }),
            optionTitle: object.data.academic_title.map(ele => {
              return {
                value: ele.id,
                label: ele.name + " - " + ele.fullname
              };
            })
          });

          userAPI.getInfo(localStorage.id).then(object => {
            console.log(object);
            if (object.success) {
              this.setState(object.data);
              this.setState({
                valueOrganization: {
                  value: this.state.organization.id,
                  label: this.state.organization.name
                }
              });

              this.setState({
                valueTitle: {
                  value: this.state.academic_title.id,
                  label: this.state.academic_title.name + " - " + this.state.academic_title.fullname
                }
              });
            } else {
              throw new Error(object.reason);
            }
          }).catch(e => {
            alertText(e.message);
          });

        } else {
          throw new Error(object.reason);
        }
      })
      .catch(e => {
        alertText(e.message);
      });
  }

  render() {


    return (
      <div className="qc-content qc-card user">
        <div className="qc-card-header">
          Thông tin tài khoản
                </div>
        <br />
        <Row>
          <Col md={6}>
            <Label for="exampleEmail">Họ và tên</Label>
            <Input
              value={this.state.name}
              onChange={evt => this.setState({ name: evt.target.value })}
              name="name"
              type="text"
              placeholder="Họ và tên"
            />
          </Col>

          <Col md={6}>
            <Label for="exampleEmail">Địa chỉ email</Label>
            <Input
              value={this.state.email}
              onChange={evt => this.setState({ email: evt.target.value })}
              name="email"
              type="text"
              placeholder="Email"
            />
          </Col>
        </Row>

        <br />
        <Row>
          <Col md={6}>
            <Label>Cơ quan</Label>
            <Select
              placeholder="Chọn cơ quan"
              value={this.state.valueOrganization}
              onChange={value => this.setState({ valueOrganization: value })}
              styles={inputStyle}
              options={this.state.optionOrganization}
            />
          </Col>
          <Col md={6}>
            <Label>Học vị</Label>
            <Select
              placeholder="Chọn học vị"
              value={this.state.valueTitle}
              onChange={value => this.setState({ valueTitle: value })}
              styles={inputStyle}
              options={this.state.optionTitle}
            />
          </Col>
        </Row>

        <div className="qc-align-right qc-content">
          <button onClick={this.editInfo} className="qc-btn">
            Đổi thông tin
               </button>
        </div>
      </div>
    );
  }
}
export default EditUser;
