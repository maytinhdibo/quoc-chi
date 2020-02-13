import React from 'react';
import { Col, Row, Container, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faGraduationCap, faSchool, faClipboardList, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import userAPI from '../../services/user.services';
import { alertText } from '../../components/Alert';
import { Link } from 'react-router-dom';
import Select from 'react-select';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            academic_title: {
                name: null,
                fullname: null
            },
            organization: null,
            book_roles: []
        }
    }
    componentDidMount() {
        userAPI.getInfo(this.props.match.params.id).then(object => {
            console.log(object);
            if (object.success) {
                this.setState(object.data);
            } else {
                throw new Error(object.reason);
            }
        }).catch(e => {
            alertText(e.message);
        })
    }

    render() {
        let role = this.state.book_roles.filter(ele => (ele.book_role && ele.book_role.name != "No role")).map(ele => {
            return <div>{ele.book_role.name} {"tập "}
                <Link to={"../books/detail/" + ele.book.id}>{ele.book.name}</Link>
            </div>;
        })
        return (
            <div className="qc-content qc-card user">
                <div className="qc-card-header">
                    Thông tin tài khoản
                </div>
                <Row>
                    <Col style={{
                        overflowWrap: "break-word"
                    }}
                        className="column" md="4">
                        <FontAwesomeIcon className="user-avatar" icon={faUserCircle} />
                        <br />
                        <h4>{this.state.academic_title.name}{this.state.academic_title.name ? ". " : ""}{this.state.name}</h4>
                        <a href={"mailto:" + this.state.email}>{this.state.email}</a>

                        <br />
                        {this.props.match.params.id == localStorage.id ?
                            <Link to={"/dashboard/edit-info"}>
                                <button style={{ marginTop: "0.2em" }} className="qc-btn">
                                    <FontAwesomeIcon style={{ marginRight: 6 }} icon={faUserEdit} />
                                    Chỉnh sửa thông tin
                                </button>
                            </Link> : null}
                    </Col>
                    <Col className="column" md="8">
                        {this.state.academic_title.fullname ? <Row>
                            <Col xs="4" className="text-right">
                                <FontAwesomeIcon icon={faGraduationCap} /> Học vị
                        </Col>
                            <Col xs="8">
                                <span class="qc-color">
                                    {this.state.academic_title.fullname}
                                </span>
                            </Col>
                        </Row> : null
                        }
                        {console.log(role)}

                        {this.state.organization ?
                            <Row>
                                <Col xs="4" className="text-right">
                                    <FontAwesomeIcon icon={faSchool} /> Cơ quan
                        </Col>
                                <Col xs="8">
                                    <span class="qc-color">
                                        {this.state.organization.name}
                                    </span>
                                </Col>
                            </Row> : null
                        }
                        {role.length > 0 ? <Row>
                            <Col xs="4" className="text-right">
                                <FontAwesomeIcon icon={faClipboardList} />  Chức danh
                        </Col>
                            <Col xs="8">
                                <span class="qc-color">
                                    {role}
                                </span>
                            </Col>
                        </Row> : ""}

                    </Col>
                </Row>

            </div>
        )
    }
}

export default User;