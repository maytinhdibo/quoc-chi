import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faFileAlt, faUsers, faToolbox, faCogs, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
class NavGroup extends React.Component {
    render() {
        return (
            <div>
                <ul className="qc-sidebar-ul">
                <Link to="/dashboard/books/"><li><span className="icon"><FontAwesomeIcon icon={faBook} /></span>Quản lý tập</li></Link>

                <Link to="/dashboard/documentations/"> <li><span className="icon"><FontAwesomeIcon icon={faFileAlt} /></span>Quản lý tư liệu</li></Link>

                <Link to="/dashboard/users/">   <li><span className="icon"><FontAwesomeIcon icon={faUsers} /></span>Quản lý biên tập viên</li></Link>
                    <label for="one1"><li><span className="icon"><FontAwesomeIcon icon={faToolbox} /></span>Công cụ nâng cao</li></label>
                    <input id="one1" type="checkbox"></input>
                    <ul class="qc-ul-collapse">
                        <Link to="/dashboard/search/"><li>Tìm kiếm</li></Link>
                        <Link to="/dashboard/"><li>Thống kê</li></Link>
                        <Link to="/dashboard/duplicate"><li>Rà soát trùng lặp</li></Link>
                    </ul>
                    <li><span className="icon"><FontAwesomeIcon icon={faCogs} /></span>Quản lý hệ thống</li>
                </ul>

                <ul className="qc-sidebar-ul">
                    <Link to="/dashboard/about"><li><span className="icon"><FontAwesomeIcon icon={faQuestionCircle} /></span>Giới thiệu</li></Link>
                </ul>
            </div>
        )
    }
}
export default NavGroup;