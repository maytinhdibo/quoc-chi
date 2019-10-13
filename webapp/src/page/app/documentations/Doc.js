import React from "react";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { Col, Row } from "reactstrap";
import Pagination from "../../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactLoading from "react-loading";
import moment from "moment";
import {
  faPlus,
  faFilePdf,
  faChartBar,
  faChevronDown,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import analyticsAPI from "../../../services/analytics.services";
import docAPI from "../../../services/documentation.services";

class Doc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: "",
      loaded: false,
      list: []
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    analyticsAPI.getDoc(id).then(object => {
      console.log(object);
      if (object.success) {
        this.setState({
          loaded: true,
          data: object.data
        });
      }
    });
    docAPI.getSection(id).then(object => {
      if (object.success) {
        this.setState({
          loaded: true,
          list: object.data.sections
        });
      }
    });
  }
  userrender(data) {
    console.log(data);
    if (data.length == 0) return "";
    return data
      .map(object => {
        console.log(object);
        return <Link to={"/dashboard/user/" + object.id}>{object.name}</Link>;
      })
      .reduce((prev, curr) => [prev, ", ", curr]);
  }
  stateColor(value) {
    switch (value) {
      case 6:
        return "#f45";
      case 2:
        return "#353f8c";
      case 3:
        return "#353f8c";
      case 4:
        return "#c4d435";
      default:
        return "#31a83d";
    }
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
        Header: "Tên mục",
        accessor: "name",
        minWidth: 175,
        Cell: props => (
          <Link
            to={"/dashboard/sections/detail/" + props.original.id}
            className="number"
          >
            {props.original.name}
          </Link>
        )
      },
      {
        Header: "Người duyệt",
        accessor: "reviewer",
        Cell: props => (
          <Link to={"/dashboard/user/" + props.value.id} className="number">
            {props.value.name}
          </Link>
        )
      },
      {
        Header: "Người soạn",
        accessor: "users",
        Cell: props => this.userrender(props.value)
      },
      {
        Header: "Số tư liệu sử dụng",
        accessor: "document_count",
        Cell: props => <span className="number">{props.value}</span>
      },
      {
        Header: "Trạng thái",
        accessor: "state",
        Cell: props => (
          <span
            style={{
              color: this.stateColor(props.value.id)
            }}
          >
            {props.value.name}
          </span>
        )
      },
      {
        Header: "Cập nhật",
        width: 100,
        accessor: "updated_at",
        Cell: props => (
          <span className="number">
            {moment(props.value).format("h:mm:ss DD/MM/YYYY")}
          </span>
        )
      }
    ];

    return (
      <div>
        <div className="qc-content qc-card">
          <div className="qc-card-header">
            <span className="qc-header-title">
              Tư liệu: {this.state.data && this.state.data.name}
            </span>
            <span className="qc-header-tool">
              <button>
                Hành động{" "}
                <span className="icon">
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </button>
              <div className="tool-dropdown">
                <div className="content">
                  <ul class="qc-dropdown-ul">
                    <Link
                      to={`/dashboard/sections/edit/${this.props.match.params.id}`}
                    >
                      <li>
                        <span className="icon">
                          <FontAwesomeIcon icon={faEdit} />
                        </span>
                        Chỉnh sửa
                      </li>
                    </Link>
                    <Link to="/">
                      <li>
                        <span className="icon">
                          <FontAwesomeIcon icon={faFilePdf} />
                        </span>
                        Kết xuất PDF
                      </li>
                    </Link>
                    <Link to="/">
                      <li>
                        <span className="icon">
                          <FontAwesomeIcon icon={faChartBar} />
                        </span>
                        Thống kê
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </span>
          </div>
          {this.state.loaded ? (
            <div className="qc-content">
              <div className="qc-section-title">Nội dung</div>
              <p
                dangerouslySetInnerHTML={
                  this.state.data && {
                    __html: this.state.data.content
                  }
                }
              ></p>
              <hr />
              <div className="qc-section-title">Đường dẫn tư liệu</div>
              <p>
                <a href={this.state.data.url} target="_blank">
                  {this.state.data.url}
                </a>
              </p>
              <hr />

              <div className="qc-section-title">Người cung cấp</div>
              <p>
                {this.state.data.user ? (
                  <Link to={"/dashboard/user/" + this.state.data.user.id}>
                    {this.state.data.user.name}
                  </Link>
                ) : null}
              </p>
              <hr />
              <div className="qc-section-title">Người duyệt</div>
              <p>
                {this.state.data.approver ? (
                  <Link to={"/dashboard/user/" + this.state.data.approver.id}>
                    {this.state.data.approver.name}
                  </Link>
                ) : null}
              </p>
            </div>
          ) : (
            <ReactLoading className="qc-loading" type="spin" color="#888" />
          )}
        </div>
        <div className="qc-content qc-card">
          <div className="qc-card-header">
            <span className="qc-header-title">Danh sách mục sử dụng tư liệu</span>
          </div>

          <ReactTable
            PaginationComponent={Pagination}
            defaultPageSize={10}
            minRows={1}
            data={
              this.state.list &&
              this.state.list.filter(object =>
                object.name
                  ? object.name
                      .toUpperCase()
                      .indexOf(this.state.filter.toUpperCase()) != -1
                  : true
              )
            }
            columns={columns}
          />
        </div>
      </div>
    );
  }
}
export default Doc;
