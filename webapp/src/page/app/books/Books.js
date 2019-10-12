import React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table'
import { Col, Row } from 'reactstrap';
import Pagination from '../../../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactLoading from "react-loading";
import { faPlus, faFilePdf, faChartBar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import analyticsAPI from '../../../services/analytics.services';

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filter: "",
            loaded: false
        }
    }
    componentDidMount() {
        analyticsAPI.getBooks().then(object => {
            console.log(object);
            if (object.success) {
                this.setState({
                    loaded: true,
                    data: object.data
                })
            }
        })
    }
    bookrender(data) {
        if (data.length > 0) {
            return data.map(object => {
                return <Link to={"/dashboard/user/" + object.id}>{object.name}</Link>
            }).reduce((prev, curr) => [prev, ', ', curr])
        } else return "";
    }
    render() {

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
                Header: 'Tên tập',
                accessor: 'name',
                Cell: props => <Link to={"/dashboard/books/detail/" + props.original.id} className='number'>{props.original.name}</Link>

            }, {
                Header: 'Trưởng tập',
                accessor: 'bookAdmins',
                Cell: props => <span className='number'>{this.bookrender(props.original.bookAdmins)}</span>

            }, {
                Header: 'Số quyển',
                accessor: 'volume',
                Cell: props => <span className='number'>{props.value}</span>
            }, {
                Header: 'Số chương',
                accessor: 'chapter',
                Cell: props => <span className='number'>{props.value}</span>
            }, {
                Header: 'Số mục',
                accessor: 'section',
                Cell: props => <span className='number'>{props.value}</span>
            }, {
                Header: 'Số biên tập viên',
                accessor: 'user',
                Cell: props => <span className='number'>{props.value}</span>

            }]
        return (
            <div className="qc-content qc-card">
                <div className="qc-card-header">
                    <span className="qc-header-title">Quản lý tập</span>
                    <span className="qc-header-tool">
                        <button>Hành động <span className="icon"><FontAwesomeIcon icon={faChevronDown} /></span></button>
                        <div className="tool-dropdown">
                            <div className="content">
                                <ul class="qc-dropdown-ul">
                                    <Link to="new"><li><span className="icon"><FontAwesomeIcon icon={faPlus} /></span>Thêm tập mới</li></Link>
                                    <Link to="/"><li><span className="icon"><FontAwesomeIcon icon={faFilePdf} /></span>Kết xuất PDF</li></Link>
                                    <Link to="/"><li><span className="icon"><FontAwesomeIcon icon={faChartBar} /></span>Thống kê</li></Link>
                                </ul>
                            </div>
                        </div>
                    </span>
                </div>
                {this.state.loaded ? <div className="qc-content">
                    <Row className="qc-tool-content">
                        <Col style={{ "display": "table-cell" }} md={6}>Tổng số có <b>{this.state.data.length}</b> kết quả.</Col>
                        <Col md={6}>
                            <div className="qc-align-right">
                                <input onChange={(evt) => this.setState({ filter: evt.target.value })} class="qc-input filter" placeholder="Lọc tên" />
                            </div>
                        </Col>
                    </Row>
                    <ReactTable
                        PaginationComponent={Pagination}
                        defaultPageSize={10}
                        minRows={1}
                        data={this.state.data && this.state.data.filter(object => (object.name ? (object.name.toUpperCase().indexOf(this.state.filter.toUpperCase()) != -1) : true))}
                        columns={columns}
                    />
                </div> : <ReactLoading className="qc-loading" type="spin" color="#888" />}
            </div>
        )
    }
}
export default Books;