import React from "react";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import Pagination from "../../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChartBar,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import analyticsAPI from "../../../services/analytics.services";
import { alertText } from "../../../components/Alert";
import moment from "moment";

class Docs extends React.Component {
  state = {
    data: []
  };
  componentDidMount() {
    analyticsAPI
      .getDocs()
      .then(object => {
        if (object.success) {
          this.setState({ data: object.data.documentations });
        } else {
          throw new Error(object.reason);
        }
      })
      .catch(e => {
        alertText(e.message);
      });
  }
  stateColor(value) {
    switch (value) {
      case 2:
        return "#f45";
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
        Header: "Tên tư liệu",
        accessor: "name",
        Cell: props => <Link to={"detail/" + props.original.id}>{props.value}</Link>
      },
      {
        Header: "Cập nhật",
        accessor: "updated_at",
        Cell: props => <span className="number">{moment(props.value).format("h:mm:ss DD/MM/YYYY")}</span>
      },
      {
        Header: "Người cung cấp",
        accessor: "user",
        Cell: props => <span className="number">{props.value.name}</span>
      },
      {
        Header: "Người phê duyệt",
        accessor: "approver",
        Cell: props => <span className="number">{props.value.name}</span>
      },
      {
        Header: "Trạng thái",
        accessor: "state",
        Cell: props => (
          <span
            style={{ color: this.stateColor(props.value.id) }}
            className="number"
          >
            {props.value.name}
          </span>
        )
      },
      {
        Header: "Số mục liên kết",
        accessor: "total_section",
        Cell: props => (
          <span className="number">{props.value ? props.value : 0}</span>
        )
      }
    ];
    return (
      <div className="qc-content qc-card">
        <div className="qc-card-header">
          <span className="qc-header-title">Danh sách tư liệu</span>
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
                  <Link to="new">
                    <li>
                      <span className="icon">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      Thêm tư liệu mới
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
        <div className="qc-content">
          <ReactTable
            PaginationComponent={Pagination}
            defaultPageSize={10}
            minRows={0}
            data={this.state.data}
            columns={columns}
          />
        </div>
      </div>
    );
  }
}
export default Docs;
