import React from "react";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import Pagination from "../../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactLoading from "react-loading";
import {
  faPlus,
  faFilePdf,
  faChartBar,
  faChevronDown,
  faEdit,
  faUserEdit,
  faCut,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import analyticsAPI from "../../../services/analytics.services";
import duplicateAPI from "../../../services/duplicate.services";
import language from "../../../config/language";
import EditorRole from "./components/EditorRole";
import DeleteItem from "../DeleteItem";
class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataList: [],
      filter: "",
      loaded: false,
      list: [],
      roleEditModal: false,
      DeleteModal : false,
      type : "section",
      item : "mục",
    };
  }
  toggleRoleEditModal = () => {
    this.setState({ roleEditModal: !this.state.roleEditModal });
  }
  toggleDeleteModal = () => {
    this.setState({ DeleteModal: !this.state.DeleteModal });
  }
  isBack =()=>{
    const path1 = localStorage.role && JSON.parse(localStorage.role).path;
    this.props.history.push("/dashboard"+ path1);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    analyticsAPI.getSection(id).then(object => {
      console.log(object);
      if (object.success) {
        this.setState({
          loaded: true,
          data: object.data
        });
      }
    });
    duplicateAPI.list(id).then(object => {
      if (object.success) {
        this.setState({
          loaded: true,
          dataList: object.data
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
          <a
            className="name"
            href={"/dashboard/sections/detail/" + props.original.section_id}
          >
            <span>
              {props.original.section_name != null
                ? props.original.section_name
                : ""}
            </span>
          </a>
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
      }
    ];

    return (
      <div>

        <EditorRole sectionId={this.props.match.params.id} isOpen={this.state.roleEditModal} toggleModal={this.toggleRoleEditModal} />
        < DeleteItem sectionId ={this.props.match.params.id} isOpen={this.state.DeleteModal} toggleModal={this.toggleDeleteModal} type = {this.state.type} item={this.state.item} Back={this.isBack}/>
        <div className="qc-content qc-card">
          <div className="qc-card-header">
            <span className="qc-header-title">
              {this.state.data.section && this.state.data.section.name}
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
                        Soạn thảo
                      </li>
                    </Link>
                    <Link onClick={() => this.toggleRoleEditModal()}>
                      <li>
                        <span className="icon">
                          <FontAwesomeIcon icon={faUserEdit} />
                        </span>
                        Biên tập viên
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
                    <Link onClick={() => this.toggleDeleteModal()}>
                      <li>
                        <span className="icon">
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                        Xóa mục
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </span>
          </div>
          {this.state.loaded ? (
            <div className="qc-content">
              <div className="qc-section-title">Giới thiệu</div>
              <p
                dangerouslySetInnerHTML={
                  this.state.data.section && {
                    __html: this.state.data.section.description
                  }
                }
              ></p>
              <hr />
              {/* <div className="qc-section-title">Người duyệt</div>
              <p>
                {this.state.data.section && this.state.data.section.reviewer ? (
                  <Link
                    to={
                      "/dashboard/user/" + this.state.data.section.reviewer.id
                    }
                  >
                    {this.state.data.section.reviewer.name}
                  </Link>
                ) : null}
              </p> */}
            </div>
          ) : (
              <ReactLoading className="qc-loading" type="spin" color="#888" />
            )}
        </div>
        <div className="qc-content qc-card">
          <div className="qc-card-header">
            <span className="qc-header-title">Danh sách mục trùng lặp</span>
          </div>

          <ReactTable
            {...language.table}
            PaginationComponent={Pagination}
            defaultPageSize={10}
            minRows={1}
            data={this.state.dataList}
            columns={columns}
          />
        </div>
      </div>
    );
  }
}
export default Section;
