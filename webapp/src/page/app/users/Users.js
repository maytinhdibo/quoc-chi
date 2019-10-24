import React from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, Label, Input, Col, Row } from 'reactstrap';
import language from '../../../config/language';
import Select from 'react-select';
import inputStyle from '../../../config/inputStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChartBar, faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ReactLoading from "react-loading";
import ReactTable from 'react-table'
import Pagination from '../../../components/Pagination';
import userAPI from '../../../services/user.services';
import formAPI from '../../../services/form.services';
import { alertText } from '../../../components/Alert';

const optionSection = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const optionBook = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const optionChapter = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const defaultValue = null;

class Users extends React.Component {
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
        }
    }
    handleSection = sectionValue => {
        this.setState({ sectionValue });
    };
    handleBook = (value) => {
        this.setState({ valueBook: value });
        this.setState({ valueVolume: null, valueChapter: null });

        this.setState({
            optionVolume: [],
            optionChapter: []
        })

        formAPI.getVolumes(value.value).then(object => {
            console.log(object);
            if (object.success) {
                this.setState({
                    optionVolume: object.data.map(ele => {
                        return {
                            value: ele.id,
                            label: ele.name
                        }
                    })
                });
            }
        })
        this.setState({ valueBook: value });
    };

    handleVolume = (value) => {
        this.setState({ valueVolume: value });
        formAPI.getChapters(value.value).then(object => {
            console.log(object);
            if (object.success) {
                this.setState({
                    optionChapter: object.data.map(ele => {
                        return {
                            value: ele.id,
                            label: ele.name
                        }
                    })
                });
            }
        })
        this.setState({ valueChapter: null });
        this.setState({
            optionChapter: []
        })
    };

    filter = () => {
        this.setState({ loading: 1 });
        console.log(this.state.valueBook);
        if (!this.state.valueBook) return alertText("Vui lòng nhập đủ thông tin.");
        let valueBook = this.state.valueBook && this.state.valueBook.value;
        let valueVolume = this.state.valueVolume && this.state.valueVolume.value;
        let valueChapter = this.state.valueChapter && this.state.valueChapter.value;
        userAPI.getList(valueBook, valueVolume, valueChapter).then(object => {
            if (object.success) {
                this.setState({
                    loading: 2,
                    data: object.data
                });
                console.log(object);
            } else {
                this.setState({ loading: 0 });
                alertText(object.reason);
            }
        })
    }

    renderRole = (datas) => {
        return datas.map(data => {
            if (!data.bookRole.id || !data.id) {
                return "";
            } else {
                if (data.bookRole.id != 7) {
                    return (
                        <div>
                            {data.bookRole.name}  <a href={"/dashboard/book/" + data.id}> {data.name} </a>
                        </div>
                    )
                } else return "";
            }
        })
    }
    componentDidMount() {
        formAPI.getBooks().then(object => {
            if (object.success) {
                this.setState({
                    optionBook: object.data.map(ele => {
                        return {
                            value: ele.id,
                            label: ele.name
                        }
                    })
                });
            }
        })
    }
    render() {
        const dataNew = [
            {
                user: {
                    id: 76,
                    name: 'Vũ Minh Giang',
                    email: 'giangvm@vnu.edu.vn',
                    academicTitleId: 7,
                    organization: {
                        name: "Đại học Quốc gia Hà Nội"
                    },
                    academic_title: {
                        name: "GS. TSKH"
                    }
                },
                book: {
                    id: 1,
                    name: 'Cương vực'
                },
                book_role: {
                    id: 1,
                    name: 'Chủ nhiệm đề tài'
                }
            },
            {
                user: {
                    id: 77,
                    name: 'Nguyễn Văn Kim',
                    email: '30b786dc_d689_49ec_aa61_0b003a06871c@test.com',
                    academicTitleId: 1,
                    organization: {
                        name: "Đại học Quốc gia Hà Nội"
                    },
                    academic_title: {
                        name: "GS. TSKH"
                    }
                },
                book: {
                    id: 1,
                    name: 'Cương vực'
                },
                book_role: {
                    id: 6,
                    name: 'Thành viên thực hiện chính'
                }
            }
        ];
        const data = [{
            name: 'Nguyen Van A',
            email: 26,
            friend: {
                name: 'Do Van C',
                email: 23,
            }
        }, {
            name: 'Dao Thi B',
            email: 22,
            friend: {
                name: 'Ngo Trung V',
                email: 24,
            }
        }, {
            name: 'Tran Duc C',
            email: 25,
            friend: {
                name: 'Ngo Thanh E',
                email: 25,
            }
        }, {
            name: 'Le Tien N',
            email: 27,
            friend: {
                name: 'Cao Cong G',
                email: 24,
            }
        }];

        const columns = [
            {
                Header: "STT",
                id: "row",
                maxWidth: 60,
                filterable: false,
                Cell: (row) => {
                    return <div>{row.index + 1}</div>;
                }
            }, {
                Header: 'Chức danh',
                maxWidth: 120,
                accessor: 'title',
                Cell: props => <span className='number'>{props.original.academic_title && props.original.academic_title.name}</span>
            }, {
                Header: 'Họ và tên',
                accessor: 'name',
                style: { 'font-weight': '700' },
                Cell: props => <Link className='name' to={"/dashboard/user/" + props.original.id}><span>{props.original.name != null ? props.original.name : ""}</span></Link>
            }, {
                Header: 'Email',
                accessor: 'email',
                Cell: props => <span className='number'>{props.original.email}</span>
            }, {
                Header: 'Phụ trách',
                accessor: 'role',
                Cell: props => <span className='number'>{this.renderRole(props.original.books)}</span>
            }, {
                Header: 'Cơ quan',
                accessor: 'organization',
                Cell: props => <span className='number'>{props.original.organization && props.original.organization.name}</span>
            }
        ]

        return (
            <div>
                <div className="qc-content qc-card">
                    <div className="qc-card-header">
                        <span className="qc-header-title">{language.filter}</span>
                        <span className="qc-header-tool">
                            <button>Hành động <span className="icon"><FontAwesomeIcon icon={faChevronDown} /></span></button>
                            <div className="tool-dropdown">
                                <div className="content">
                                    <ul class="qc-dropdown-ul">
                                        <Link to="new"><li><span className="icon"><FontAwesomeIcon icon={faPlus} /></span>Thêm người dùng</li></Link>
                                        <Link to="/"><li><span className="icon"><FontAwesomeIcon icon={faChartBar} /></span>Thống kê</li></Link>
                                    </ul>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div className="qc-content">

                        <Row>
                            <Col md="6">
                                <Label>Quyển</Label>
                                <Select
                                    placeholder={"Chọn quyển..."}
                                    styles={inputStyle}
                                    value={this.state.valueBook}
                                    onChange={this.handleBook}
                                    options={this.state.optionBook}
                                />
                            </Col>
                            <Col md="6">
                                <Label>Tập</Label>
                                <Select
                                    placeholder={"Chọn tập..."}
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
                                onChange={(value) => this.setState({ valueChapter: value })}
                                options={this.state.optionChapter}
                            />
                        </FormGroup>

                        <div className="qc-align-center">
                            <button onClick={this.filter} className="qc-btn"><FontAwesomeIcon icon={faSearch} /> {language.search}</button>
                        </div>
                    </div>
                </div>

                {this.state.loading > 0 ? <div className="qc-content qc-card">
                    <div className="qc-card-header">
                        <span className="qc-header-title">{language.list}</span>
                        <span className="qc-header-tool">
                            <input onChange={(evt) => this.setState({ filter: evt.target.value })} class="qc-input filter" placeholder="Lọc tên" />
                        </span>
                    </div>
                    {this.state.loading > 1 ?
                        <div>
                            <p style={{ padding: "9px 0" }}>Tổng số <b>{this.state.data!=null?this.state.data.length:0}</b> kết quả</p>
                            <ReactTable
                                PaginationComponent={Pagination}
                                defaultPageSize={10}
                                minRows={1}
                                data={this.state.data && this.state.data.filter(object => (object.name ? (object.name.toUpperCase().indexOf(this.state.filter.toUpperCase()) != -1) : true))}
                                columns={columns}
                            />
                        </div>
                        : <ReactLoading className="qc-loading" type="spin" color="#888" />}
                </div> : null}
            </div>
        )
    }
}
export default Users;