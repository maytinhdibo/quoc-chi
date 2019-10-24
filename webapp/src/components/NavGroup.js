import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faFileAlt, faUsers, faCogs, faChartBar, faSearch, faFileContract } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
class NavGroup extends React.Component {
    render() {
        return (
            <div>
                <ul className="qc-sidebar-ul">
                <label>Quản lý</label>
                <NavLink activeClassName="selected" to="/dashboard/books/"><li><span className="icon"><FontAwesomeIcon icon={faBook} /></span>Tập</li></NavLink>
                <NavLink activeClassName="selected" to="/dashboard/documentations/"> <li><span className="icon"><FontAwesomeIcon icon={faFileAlt} /></span>Tư liệu</li></NavLink>
                <NavLink activeClassName="selected" to="/dashboard/users/">   <li><span className="icon"><FontAwesomeIcon icon={faUsers} /></span>Biên tập viên</li></NavLink>
                </ul>

                <ul className="qc-sidebar-ul">
                <label>Thống kê</label>
                <Link activeClassName="selected" to="/dashboard/"><li><span className="icon"><FontAwesomeIcon icon={faChartBar} /></span>Thống kê tổng quát</li></Link>
                </ul>

                <ul className="qc-sidebar-ul">
                <label>Công cụ nâng cao</label>
                <NavLink activeClassName="selected" to="/dashboard/search"><li><span className="icon"><FontAwesomeIcon icon={faSearch} /></span> Tìm kiếm</li></NavLink>
                <NavLink activeClassName="selected" to="/dashboard/duplicate"><li><span className="icon"><FontAwesomeIcon icon={faFileContract} /></span> Rà soát trùng lặp</li></NavLink>
               </ul>

                <ul className="qc-sidebar-ul">
                <label>Hệ thống</label>
                <li><span className="icon"><FontAwesomeIcon icon={faCogs} /></span>Sao lưu dữ liệu</li>
                </ul>

            </div>
        )
    }
}
export default NavGroup;