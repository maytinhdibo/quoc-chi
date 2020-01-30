import React from "react";
import { Link } from "react-router-dom";
import { FormGroup, Label, Input, Col, Row } from "reactstrap";
import language from "../../config/language";
import Select from "react-select";
import inputStyle from "../../config/inputStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChartBar,
  faSearch,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";
import ReactTable from "react-table";
import Pagination from "../../components/Pagination";
import duplicateAPI from "../../services/duplicate.services";
import formAPI from "../../services/form.services";
import { alertText } from "../../components/Alert";

const defaultValue = null;

class CheckDuplicate extends React.Component {
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
    let valueBook = this.state.valueBook && this.state.valueBook.value;
    let valueVolume = this.state.valueVolume && this.state.valueVolume.value;
    let valueChapter = this.state.valueChapter && this.state.valueChapter.value;
    console.log(valueBook, valueVolume, valueChapter);
    duplicateAPI.check(valueBook, valueVolume, valueChapter).then(object => {
      if (object.success) {
        this.setState({
          loading: 2,
          data: object.data
        });
        console.log(object);
      } else {
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
    const columns = [
      {
        Header: "STT",
        id: "row",
        maxWidth: 60,
        filterable: false,
        Cell: row => {
          return <div>{row.index + 1}</div>;
        }
      },
      {
        Header: "Mục",
        accessor: "section",
        style: { "font-weight": "700" },
        Cell: props => (
          <Link
            className="name"
            to={"/dashboard/sections/duplicate/" + props.original.section_id}
          >
            <span>
              {props.original.section_name != null
                ? props.original.section_name
                : ""}
            </span>
          </Link>
        )
      },
      {
        Header: "Chương",
        accessor: "chapter",
        Cell: props => (
          <Link
            className="name"
            to={"/dashboard/chapters/detail/" + props.original.chapter_id}
          >
            <span className="number">{props.original.chapter_name}</span>
          </Link>
        )
      },
      {
        Header: "Quyển",
        accessor: "volume",
        Cell: props => (
          <Link
            className="name"
            to={"/dashboard/volumes/detail/" + props.original.volume_id}
          >
            <span className="number">
              {props.original.volume_name && props.original.volume_name}
            </span>
          </Link>
        )
      },
      {
        Header: "Tập",
        accessor: "book",
        Cell: props => (
          <Link
            className="name"
            to={"/dashboard/books/detail/" + props.original.book_id}
          >
            <span className="number">
              {props.original.book_name && props.original.book_name}
            </span>
          </Link>
        )
      },
      {
        Header: "Số mục trùng lặp",
        accessor: "count",
        Cell: props => (
          <span className="number">{props.original.count - 1}</span>
        )
      },
      {
        style: { "font-weight": "700" },
        Cell: props => (
          <Link
            className="name"
            to={"/dashboard/sections/duplicate/" + props.original.section_id}
          >
            <button className="qc-btn">Xem chi tiết</button>
          </Link>
        )
      }
    ];

    return (
      <div>
        <div className="qc-content qc-card">
          <div className="qc-card-header">
            <span className="qc-header-title">{language.checkduplicate}</span>
          </div>
          <div className="qc-content">
            <Row>
              <Col md="6">
                <Label>Tập</Label>
                <Select
                  placeholder={"Chọn tập..."}
                  styles={inputStyle}
                  value={this.state.valueBook}
                  onChange={this.handleBook}
                  options={this.state.optionBook}
                />
              </Col>
              <Col md="6">
                <Label>Quyển</Label>
                <Select
                  placeholder={"Chọn quyển..."}
                  styles={inputStyle}
                  value={this.state.valueVolume}
                  onChange={this.handleVolume}
                  options={this.state.optionVolume}
                />
              </Col>
            </Row>
            <br />
            <FormGroup>
              <Label>Chương</Label>
              <Select
                styles={inputStyle}
                value={this.state.valueChapter}
                placeholder={"Chọn chương..."}
                onChange={value => this.setState({ valueChapter: value })}
                options={this.state.optionChapter}
              />
            </FormGroup>

            <div className="qc-align-center">
              <button onClick={this.filter} className="qc-btn">
                {language.search}
              </button>
            </div>
          </div>
        </div>

        {this.state.loading > 0 ? (
          <div className="qc-content qc-card">
            <div className="qc-card-header">
              <span className="qc-header-title">{language.list}</span>
              <span className="qc-header-tool">
                <input
                  onChange={evt => this.setState({ filter: evt.target.value })}
                  class="qc-input filter"
                  placeholder="Lọc tên"
                />
              </span>
            </div>
            {this.state.loading > 1 ? (
              <div>
                <p style={{ padding: "9px 0" }}>
                  Tổng số{" "}
                  <b>{this.state.data != null ? this.state.data.length : 0}</b>{" "}
                  kết quả
                </p>
                <ReactTable
                  PaginationComponent={Pagination}
                  defaultPageSize={10}
                  minRows={1}
                  data={
                    this.state.data &&
                    this.state.data.filter(object =>
                      object.section_name
                        ? object.section_name
                            .toUpperCase()
                            .indexOf(this.state.filter.toUpperCase()) != -1
                        : true
                    )
                  }
                  columns={columns}
                />
              </div>
            ) : (
              <ReactLoading className="qc-loading" type="spin" color="#888" />
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
export default CheckDuplicate;
