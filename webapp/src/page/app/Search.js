import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FormGroup, Label, Input, Col, Row } from "reactstrap";
import language from "../../config/language";
import searchAPI from "../../services/search.services";
import ReactTable from "react-table";
import ReactLoading from "react-loading";
import Pagination from "../../components/Pagination";
import { alertText } from "../../components/Alert";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "section", //tìm kiếm ở chương, mục,....
      type: "2", // 1 - tìm kiếm theo tên, 2 tìm kiếm theo nội dung, 3 tìm kiếm theo cả 2
      query: "",
      isLoading: 0,
      locationRes: null,
      data: []
    };
  }

  search = () => {
    const { type, query, location } = this.state;
    this.setState({ isLoading: 1 });
    searchAPI
      .search(type, query, location)
      .then(res => {
        if (res.success) {
          this.setState({
            isLoading: 2,
            data: res.data.data,
            locationRes: res.data.location
          });
        } else {
          throw new Error(res.reason);
        }
      })
      .catch(e => {
        alertText(e.message);
      });
  };

  checkVisible = location => {
    const col = ["section", "chapter", "volume", "book"];

    switch (this.state.locationRes) {
      case "section":
        return true;
        break;
      case "chapter":
        if (col.splice(1, 4).includes(location)) return true;
        break;
      case "volume":
        if (col.splice(2, 4).includes(location)) return true;
        break;
      case "book":
        if (col.splice(3, 4).includes(location)) return true;
        break;
    }

    return false;
  };
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
        show: this.checkVisible("section"),
        Cell: props => (
          <Link className="name" to={"/dashboard/sections/detail/"+props.original.section_id}>{props.original.section_name}</Link>
        )
      },
      {
        Header: "Chương",
        show: this.checkVisible("chapter"),
        Cell: props => (
          <Link className="name" to={"/dashboard/chapters/detail/"+props.original.chapter_id}>{props.original.chapter_name}</Link>
        )
      },
      {
        Header: "Tập",
        show: this.checkVisible("volume"),
        Cell: props => (
          <Link className="name" to={"/dashboard/volumes/detail/"+props.original.volume_id}>{props.original.volume_name}</Link>
        )
      },
      {
        Header: "Quyển",
        show: this.checkVisible("book"),
        Cell: props => (
          <Link className="name" to={"/dashboard/books/detail/"+props.original.book_id}>{props.original.book_name}</Link>
        )
      }
    ];
    return (
      <div>
        <div className="qc-content qc-card">
          <div className="qc-card-header">Tìm kiếm</div>
          <div className="qc-content">
            <FormGroup>
              <Label for="exampleEmail">Nội dung tìm kiếm</Label>
              <Input
                type="text"
                name="email"
                id="exampleEmail"
                value={this.state.query}
                onChange={event => this.setState({ query: event.target.value })}
                placeholder="Nhập nội dung"
              />
            </FormGroup>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="exampleEmail">Loại</Label>
                  <Input
                    onChange={event =>
                      this.setState({ location: event.target.value })
                    }
                    value={this.state.location}
                    type="select"
                    name="select"
                  >
                    <option value="section">Mục</option>
                    <option value="book">Quyển</option>
                    <option value="chapter">Chương</option>
                    <option value="volume">Tập</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="exampleEmail">Thành phần</Label>
                  <Input
                    onChange={event =>
                      this.setState({ type: event.target.value })
                    }
                    value={this.state.type}
                    type="select"
                    name="select"
                    id="exampleSelect"
                  >
                    <option value="1">Chỉ tìm theo tên</option>
                    <option value="2">Chỉ tìm theo nội dung</option>
                    <option value="3">Tìm theo cả tên và nội dung</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <label for="tuongdoi">
              <input id="tuongdoi" type="checkbox" />
              Tìm kiếm tương đối
            </label>
            <div className="qc-align-right">
              <button onClick={this.search} className="qc-btn">
                <FontAwesomeIcon icon={faSearch} /> {language.search}
              </button>
            </div>
          </div>
        </div>

        {this.state.isLoading > 0 ? (
          <div className="qc-content qc-card">
            <div className="qc-card-header">
              <span className="qc-header-title">{language.list}</span>
            </div>
            {this.state.isLoading > 1 ? (
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
                  columns={columns}
                  data={this.state.data}
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

export default Search;
