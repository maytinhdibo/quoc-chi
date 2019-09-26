import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";
import { Container, NavLink, Collapse, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Nav, Row, Col } from 'reactstrap';
import language from '../../config/language';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars } from '@fortawesome/free-solid-svg-icons';
import NavGroup from '../../components/NavGroup';
import Analytic from './Analytic';
import About from './../docs/About';
import User from './User';
import Breadcrumb from '../../components/Breadcrumb';
import Search from './Search';
import CheckDuplicate from './CheckDuplicate';
import Books from './books/Books';
import Book from './books/Book';
import NewBook from './books/NewBook';
import Docs from './documentations/Docs';
import NewDoc from './documentations/NewDoc';
import Users from './users/Users';
import NewUser from './users/NewUser';
import auth from './../../services/auth.services';
import userAPI from './../../services/user.services';
import history from './../../services/history.services';
import { alertText } from '../../components/Alert';
import EditBook from './books/EditBook';
import Volume from './volumes/Volume';
import NewVolume from './volumes/NewVolume';
import Chapter from './chapters/Chapter';
import EditVolume from './volumes/EditVolume';
import NewChapter from './chapters/NewChapter';

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false
    };
    userAPI.get().then(object => {
      console.log("ahi");
      if (!object.success) {
        this.signout();
      } else {
        localStorage.token = object.data.token;
      }
    }).catch(() => {
      this.signout();
    }
    );
  }
  alert = () => {
    alertText("ahihi");
  }
  signout = () => {
    auth.logout();
    localStorage.clear();
    this.props.history.push({
      pathname: "/",
      state: { from: this.props.location }
    });
  }
  toggleSideBar = () => {
    this.setState(prevState => ({
      sidebar: !prevState.sidebar
    }));
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ sidebar: false });
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const routes = [
      {
        path: "/dashboard",
        exact: true,
        sidebar: () => <span></span>,
        main: Analytic
      },
      {
        path: "/dashboard/about",
        sidebar: () => <Breadcrumb data={[{
          path: "/dashboard",
          name: null
        }, {
          path: "/about",
          name: "Giới thiệu"
        }]} />,
        main: About
      },
      {
        path: "/dashboard/user/:id",
        sidebar: () => <Breadcrumb data={[{
          path: "#",
          name: "Tài khoản"
        }]} />,
        main: User
      }, {
        path: "/dashboard/search",
        sidebar: () => <Breadcrumb data={[{
          path: "#",
          name: "Tìm Kiếm"
        }]} />,
        main: Search
      },
      {
        path: "/dashboard/duplicate",
        sidebar: () => <Breadcrumb data={[{
          path: "",
          name: "Rà soát trùng lặp"
        }]} />,
        main: CheckDuplicate
      },
      {
        path: "/dashboard/books",
        exact: true,
        sidebar: () => <Breadcrumb data={[{
          path: "",
          name: "Quản lý tập"
        }]} />,
        main: Books
      },
      {
        path: "/dashboard/books/new",
        exact: true,
        main: NewBook
      },
      {
        path: "/dashboard/books/detail/:id",
        sidebar: () => <Breadcrumb data={[{
          path: "/dashboard/books",
          name: "Quản lý tập"
        }]} />,
        main: Book
      }, {
        path: "/dashboard/books/edit/:id",
        sidebar: () => <Breadcrumb data={[{
          path: "/dashboard/books",
          name: "Quản lý tập"
        }]} />,
        main: EditBook
      }, {
        path: "/dashboard/volumes/detail/:id",
        sidebar: () => <Breadcrumb data={[{
          path: "/dashboard/books",
          name: "Quản lý tập"
        }]} />,
        main: Volume
      }, 
       {
        path: "/dashboard/volumes/edit/:id",
        sidebar: () => <Breadcrumb data={[{
          path: "/dashboard/books",
          name: "Quản lý tập"
        }]} />,
        main: EditVolume
      },
       {
        path: "/dashboard/books/:id/newvolume",
        sidebar: () => <Breadcrumb data={[{
          path: "/dashboard/books",
          name: "Quản lý tập"
        }]} />,
        main: NewVolume
      },
      {
        path: "/dashboard/chapters/detail/:id",
        sidebar: () => <Breadcrumb data={[{
          path: "/dashboard/books",
          name: "Quản lý tập"
        }]} />,
        main: Chapter
      },
      {
       path: "/dashboard/volumes/:id/newchapter",
       sidebar: () => <Breadcrumb data={[{
         path: "/dashboard/books",
         name: "Quản lý tập"
       }]} />,
       main: NewChapter
     },
      {
        path: "/dashboard/documentations",
        exact: true,
        sidebar: () => <Breadcrumb data={[{
          path: "",
          name: "Quản lý tư liệu"
        }]} />,
        main: Docs
      },
      {
        path: "/dashboard/documentations/new",
        sidebar: () => <Breadcrumb data={[{
          path: "/dashboard/documentations",
          name: "Quản lý tư liệu"
        }, {
          path: "/new",
          name: "Tạo mới"
        }]} />,
        main: NewDoc
      },
      {
        path: "/dashboard/users",
        exact: true,
        sidebar: () => <Breadcrumb data={[{
          path: "/dashboard/users",
          name: "Quản lý biên tập viên"
        }]} />,
        main: Users
      },
      {
        path: "/dashboard/users/new",
        sidebar: () => <Breadcrumb data={[{
          path: "/dashboard/users",
          name: "Quản lý tư liệu"
        }, {
          path: "/new",
          name: "Tạo mới"
        }]} />,
        main: NewUser
      },
    ];
    // <Route path="/dashboard/" exact component={Analytic} />
    //       <Route path="/dashboard/about" component={About} />
    //       <Route path="/dashboard/user/:id" component={User} />
    return (
      <Row className="page">
        <div style={{ display: this.state.sidebar ? "block" : "none" }} onClick={this.toggleSideBar} className="qc-sidebar-overlay"></div>
        <div className={this.state.sidebar ? "qc-side qc-sidebar opened" : "qc-side qc-sidebar"}>
          <div className="page">
            <div className="qc-logo">
              Quốc Chí</div>
            <NavGroup />
            <div className="qc-sidebar-footer">Phát triển bởi ĐHQG Hà Nội</div>
          </div>
        </div>
        <div className="qc-side main">

          <div className="qc-nav">
            <Nav className="ml-auto">
              <NavItem onClick={this.toggleSideBar} className="qc-nav-btn">
                <FontAwesomeIcon icon={faBars} />
              </NavItem>
              <NavItem>
                <img src="/img/logo.png" className="qc-header-logo" />
              </NavItem>
              <NavItem className="menu">
                <Link className="nav-link navigation__navlinks" to="/">
                  Danh mục
                    </Link>
              </NavItem>
              <NavItem className="menu">
                <Link
                  className="nav-link navigation__navlinks"
                  to=""
                >
                  Tư liệu
                    </Link>
              </NavItem>
              <NavItem className="menu">
                <Link
                  className="nav-link navigation__navlinks"
                  to="/kuechen/"
                >
                  Bản đồ Việt Nam
                    </Link>
              </NavItem>

              <button onClick={this.alert} >ahihi</button>


              <UncontrolledDropdown className="ml-auto qc-account" setActiveFromChild>
                <DropdownToggle tag="a" className="nav-link" caret>
                  {localStorage.name}
                </DropdownToggle>
                <DropdownMenu>
                  <ul className="qc-dropdown-ul">
                    <Link to="/dashboard/user/1"><li>Tài khoản</li></Link>
                    <li onClick={this.signout}>Đăng xuất</li>
                  </ul>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </div>


          <div className="qc-card qc-breadcrumb">
            <span>
              <span className="qc-page-title">Bảng điều khiển</span>
              |
                <span className="qc-page-path"><FontAwesomeIcon icon={faHome} /> </span>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.sidebar}
                />
              ))}
            </span>
          </div>

          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={props => (<route.main {...props} />)}
              />
            ))}
          </Switch>
        </div>
      </Row >
    )
  }

}

export default DashBoard;