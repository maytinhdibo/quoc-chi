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
      filter: "",
      loading: 0,
      data: 0,
      defaultValue: defaultValue,
      valueUserRole: defaultValue,
      valueEditorRole: defaultValue,
      valueBook: defaultValue,
      optionBook: [],
      valueVolume: defaultValue,
      optionVolume: [],
      valueChapter: defaultValue,
      optionChapter: []
    };
  }
  handleSection = sectionValue => {
    this.setState({ sectionValue });
  };
  handleBook = value => {
    this.setState({ valueBook: value });
    this.setState({ valueVolume: null, valueChapter: null });

    this.setState({
      optionVolume: [],
      optionChapter: []
    });

    formAPI.getVolumes(value.value).then(object => {
      console.log(object);
      if (object.success) {
        this.setState({
          optionVolume: object.data.map(ele => {
            return {
              value: ele.id,
              label: ele.name
            };
          })
        });
      }
    });
    this.setState({ valueBook: value });
  };

  handleVolume = value => {
    this.setState({ valueVolume: value });
    formAPI.getChapters(value.value).then(object => {
      console.log(object);
      if (object.success) {
        this.setState({
          optionChapter: object.data.map(ele => {
            return {
              value: ele.id,
              label: ele.name
            };
          })
        });
      }
    });
    this.setState({ valueChapter: null });
    this.setState({
      optionChapter: []
    });
  };

  filter = () => {
    this.setState({ loading: 1 });
    console.log(this.state.valueBook);
    if (!this.state.valueBook) return alertText("Vui lòng nhập đủ thông tin.");
    let valueBook = this.state.valueBook && this.state.valueBook.value;
    let valueVolume = this.state.valueVolume && this.state.valueVolume.value;
    let valueChapter = this.state.valueChapter && this.state.valueChapter.value;
    userAPI.getList(valueBook, valueVolume, valueChapter).then(object => {
      if (object.success) {
        this.setState({
          loading: 2,
          data: object.data
        });
        console.log(object);
      } else {
        this.setState({ loading: 0 });
        alertText(object.reason);
      }
    });
  };

  renderRole = datas => {
    return datas.map(data => {
      if (!data.bookRole.id || !data.id) {
        return "";
      } else {
        if (data.bookRole.id != 7) {
          return (
            <div>
              {data.bookRole.name}{" "}
              <a href={"/dashboard/book/" + data.id}> {data.name} </a>
            </div>
          );
        } else return "";
      }
    });
  };
  componentDidMount() {
    formAPI.getBooks().then(object => {
      if (object.success) {
        this.setState({
          optionBook: object.data.map(ele => {
            return {
              value: ele.id,
              label: ele.name
            };
          })
        });
      }
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
                            onChange={this.handleChange}
                            name="name"
                            type="text"
                            placeholder="Họ và tên"
                        />
                    </Col>

                    <Col md={6}>
                        <Label for="exampleEmail">Địa chỉ email</Label>
                        <Input
                            value={this.state.email}
                            onChange={this.handleChange}
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
                        //   onChange={value => this.setState({ valueOrganization: value })}
                        //   styles={inputStyle}
                        //   options={this.state.optionOrganization}
                        />
                    </Col>
                    <Col md={6}>
                        <Label>Học vị</Label>
                        <Select
                            placeholder="Chọn học vị"
                        //   onChange={value => this.setState({ valueTitle: value })}
                        //   styles={inputStyle}
                        //   options={this.state.optionTitle}
                        />
                    </Col>
                </Row>

                <div className="qc-align-right qc-content">
                    <button className="qc-btn">
                        Đổi thông tin
               </button>
                </div>
      </div>
    );
  }
}
export default EditUser;
