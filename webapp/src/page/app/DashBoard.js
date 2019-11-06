import React from "react";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import {
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Nav,
  Row,
} from "reactstrap";
import language from "../../config/language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import NavGroup from "../../components/NavGroup";
import Analytic from "./Analytic";
import About from "./../docs/About";
import User from "./User";
import Breadcrumb from "../../components/Breadcrumb";
import Search from "./Search";
import CheckDuplicate from "./CheckDuplicate";
import Books from "./books/Books";
import Book from "./books/Book";
import NewBook from "./books/NewBook";
import Docs from "./documentations/Docs";
import NewDoc from "./documentations/NewDoc";
import Users from "./users/Users";
import NewUser from "./users/NewUser";
import auth from "./../../services/auth.services";
import userAPI from "./../../services/user.services";
import history from "./../../services/history.services";
import { alertText } from "../../components/Alert";
import EditBook from "./books/EditBook";
import Volume from "./volumes/Volume";
import NewVolume from "./volumes/NewVolume";
import Chapter from "./chapters/Chapter";
import EditVolume from "./volumes/EditVolume";
import NewChapter from "./chapters/NewChapter";
import SectionDuplicate from "./sections/SectionDuplicate";
import EditChapter from "./chapters/EditChapter";
import Section from "./sections/Section";
import EditSection from "./sections/EditSection";
import Doc from "./documentations/Doc";
import NewSection from "./sections/NewSection";
import UserRouter from "./UserRouter";
import EditorDashboard from "./sections/EditorDashboard";

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      role: ""
    };

    userAPI
      .get()
      .then(object => {
        if (!object.success) {
          this.signout(true);
        } else {
          localStorage.token = object.data.token;
          localStorage.role = JSON.stringify(object.data.role);
          this.setState({ role: object.data.role });
        }
      })
      .catch(() => {
        this.signout();
      });
  }
  alert = () => {
    alertText("ahihi");
  };
  signout = expired => {
    localStorage.clear();
    if (expired) {
      localStorage.signout = false;
    } else {
      localStorage.signout = true;
    }
    auth.logout();
    this.props.history.push({
      pathname: "/",
      state: { from: this.props.location }
    });
  };
  toggleSideBar = () => {
    this.setState(prevState => ({
      sidebar: !prevState.sidebar
    }));
  };

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ sidebar: false });
      const role = localStorage.role && JSON.parse(localStorage.role);
      this.setState({ role });
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const routes = [
      {
        path: "/dashboard/",
        exact: true,
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard",
                name: null
              },
              {
                path: "/",
                name: "Thống kê tổng quan"
              }
            ]}
            title={<span>Thống kê tổng quan</span>}
          />
        ),
        main: UserRouter
      },
      {
        path: "/dashboard/analytics",
        exact: true,
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard",
                name: null
              },
              {
                path: "/",
                name: "Thống kê tổng quan"
              }
            ]}
            title={<span>Thống kê tổng quan</span>}
          />
        ),
        main: Analytic
      },
      {
        path: "/dashboard/editor",
        exact: true,
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard",
                name: null
              },
              {
                path: "/editor",
                name: "Công việc"
              }
            ]}
            title={<span>Danh sách mục cần biên soạn</span>}
          />
        ),
        main: EditorDashboard
      },
      {
        path: "/dashboard/about",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard",
                name: null
              },
              {
                path: "/about",
                name: "Giới thiệu"
              }
            ]}
            title={<span>Giới thiệu</span>}
          />
        ),
        main: About
      },
      {
        path: "/dashboard/user/:id",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "#",
                name: "Tài khoản"
              }
            ]}
            title={<span>Tài khoản</span>}
          />
        ),
        main: User
      },
      {
        path: "/dashboard/search",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "#",
                name: "Tìm Kiếm"
              }
            ]}
            title={<span>Tìm kiếm</span>}
          />
        ),
        main: Search
      },
      {
        path: "/dashboard/duplicate",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "",
                name: "Rà soát trùng lặp"
              }
            ]}
            title={<span>Rà soát trùng lặp</span>}
          />
        ),
        main: CheckDuplicate
      },
      {
        path: "/dashboard/books",
        exact: true,
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "",
                name: "Quản lý tập"
              }
            ]}
            title={<span>Quản lý tập</span>}
          />
        ),
        main: Books
      },
      {
        path: "/dashboard/books/new",
        exact: true,
        main: NewBook
      },
      {
        path: "/dashboard/books/detail/:id",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/books",
                name: "Quản lý tập"
              }
            ]}
            title={<span>Thông tin tập</span>}
          />
        ),
        main: Book
      },
      {
        path: "/dashboard/books/edit/:id",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/books",
                name: "Quản lý tập"
              }
            ]}
            title={<span>Sửa tập</span>}
          />
        ),
        main: EditBook
      },
      {
        path: "/dashboard/volumes/detail/:id",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/books",
                name: "Quản lý tập"
              }
            ]}
            title={<span>Thông tin quyển</span>}
          />
        ),
        main: Volume
      },
      {
        path: "/dashboard/volumes/edit/:id",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/books",
                name: "Quản lý tập"
              }
            ]}
          />
        ),
        main: EditVolume
      },
      {
        path: "/dashboard/books/:id/newvolume",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/books",
                name: "Quản lý tập"
              }
            ]}
            title={<span>Thêm chương mới</span>}
          />
        ),
        main: NewVolume
      },
      {
        path: "/dashboard/chapters/detail/:id",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/books",
                name: "Quản lý tập"
              }
            ]}
            title={<span>Thông tin chương</span>}
          />
        ),
        main: Chapter
      },
      {
        path: "/dashboard/volumes/:id/newchapter",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/books",
                name: "Quản lý tập"
              }
            ]}
            title={<span>Thêm chương mới</span>}
          />
        ),
        main: NewChapter
      },
      {
        path: "/dashboard/chapters/edit/:id",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/books",
                name: "Quản lý tập"
              }
            ]}
            title={<span>Chỉnh sửa chương</span>}
          />
        ),
        main: EditChapter
      },
      {
        path: "/dashboard/sections/duplicate/:id",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "#",
                name: "Quản lý mục"
              },
              {
                path: "",
                name: "Kiểm tra mục trùng lặp"
              }
            ]}
            title={<span>Kiểm tra mục trùng lặp</span>}
          />
        ),
        main: SectionDuplicate
      },
      {
        path: "/dashboard/sections/detail/:id",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/books",
                name: "Quản lý tập"
              }
            ]}
            title={<span>Thông tin mục</span>}
          />
        ),
        main: Section
      },
      {
        path: "/dashboard/sections/edit/:id",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/books",
                name: "Quản lý tập"
              }
            ]}
            title={<span>Chỉnh sửa mục</span>}
          />
        ),
        main: EditSection
      },
      {
        path: "/dashboard/chapters/:id/newsection",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/books",
                name: "Quản lý tập"
              }
            ]}
          />
        ),
        main: NewSection
      },
      {
        path: "/dashboard/documentations",
        exact: true,
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/documentations/",
                name: "Quản lý tư liệu"
              }
            ]}
            title={<span>Quản lý tư liệu</span>}
          />
        ),
        main: Docs
      },
      ,
      {
        path: "/dashboard/documentations/detail/:id",
        exact: true,
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/documentations/",
                name: "Quản lý tư liệu"
              }
            ]}
            title={<span>Tư liệu</span>}
          />
        ),
        main: Doc
      },
      {
        path: "/dashboard/documentations/new",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/documentations",
                name: "Quản lý tư liệu"
              },
              {
                path: "/new",
                name: "Tạo mới"
              }
            ]}
            title={<span>Thêm tư liệu</span>}
          />
        ),
        main: NewDoc
      },
      {
        path: "/dashboard/users",
        exact: true,
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/users",
                name: "Quản lý biên tập viên"
              }
            ]}
            title={<span>Quản lý biên tập viên</span>}
          />
        ),
        main: Users
      },
      {
        path: "/dashboard/users/new",
        sidebar: () => (
          <Breadcrumb
            data={[
              {
                path: "/dashboard/users",
                name: "Quản lý tư liệu"
              },
              {
                path: "/new",
                name: "Tạo mới"
              }
            ]}
          />
        ),
        main: NewUser
      }
    ];
    // <Route path="/dashboard/" exact component={Analytic} />
    //       <Route path="/dashboard/about" component={About} />
    //       <Route path="/dashboard/user/:id" component={User} />
    return (
      <Row className="page">
        <div
          style={{ display: this.state.sidebar ? "block" : "none" }}
          onClick={this.toggleSideBar}
          className="qc-sidebar-overlay"
        ></div>
        <div
          className={
            this.state.sidebar
              ? "qc-side qc-sidebar opened"
              : "qc-side qc-sidebar"
          }
        >
          <div className="page">
            <div className="qc-sidebar-header">
              <FontAwesomeIcon className="user-avatar" icon={faUserCircle} />
              {localStorage.name}
            </div>
            <NavGroup role={this.state.role} />
          </div>
        </div>
        <div className="qc-side main">
          <div className="qc-nav">
            <Nav className="ml-auto">
              <NavItem onClick={this.toggleSideBar} className="qc-nav-btn">
                <FontAwesomeIcon icon={faBars} />
              </NavItem>
              <NavItem>
                {/* <img src="/img/logo.png" className="qc-header-logo" /> */}
                <Link to="/dashboard" className="nav-link navigation__navlinks">
                  <b>Quốc Chí Việt Nam</b>
                </Link>
              </NavItem>

              <Nav className="ml-auto">
                <NavItem className="menu">
                  <Link className="nav-link navigation__navlinks text" to="/">
                    Danh mục
                  </Link>
                </NavItem>
                <NavItem className="menu">
                  <Link className="nav-link navigation__navlinks text" to="">
                    Tư liệu
                  </Link>
                </NavItem>
                <NavItem className="menu">
                  <Link
                    className="nav-link navigation__navlinks text"
                    to="/kuechen/"
                  >
                    Bản đồ Việt Nam
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    className="nav-link navigation__navlinks"
                    to="/dashboard/search"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Link>
                </NavItem>
              </Nav>

              <UncontrolledDropdown className="qc-account" setActiveFromChild>
                <DropdownToggle tag="a" className="nav-link" caret>
                  {localStorage.name}
                </DropdownToggle>
                <DropdownMenu>
                  <ul className="qc-dropdown-ul">
                    <Link to={"/dashboard/user/" + localStorage.id}>
                      <li>Tài khoản</li>
                    </Link>
                    <li onClick={()=>this.signout(false)}>Đăng xuất</li>
                  </ul>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </div>

          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.sidebar}
            />
          ))}

          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={props => <route.main {...props} />}
              />
            ))}
          </Switch>

          <div className="qc-footer">
            <span className="copyright">Phát triển bởi @ ĐHQG Hà Nội</span>
            <a href="#">Giới thiệu</a>
            <a href="#">Điều khoản</a>
          </div>
        </div>
      </Row>
    );
  }
}

export default DashBoard;
