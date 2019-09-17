import React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table'
import { Col, Row } from 'reactstrap';
import Pagination from '../../../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactLoading from "react-loading";
import { faPlus, faFilePdf, faChartBar, faChevronDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import analyticsAPI from '../../../services/analytics.services';

class Chapter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filter: "",
            loaded: false,
            list: []
        }
    }
    componentDidMount() {
        analyticsAPI.getChapter(this.props.match.params.id).then(object => {
            console.log(object);
            if (object.success) {
                this.setState({
                    loaded: true,
                    data: object.data
                })
            }
        });
        analyticsAPI.getChapters(this.props.match.params.id).then(object => {
            console.log(object);
            if (object.success) {
                this.setState({
                    list: object.data
                })
            }
        })
    }
    userrender(data) {
        console.log(data)
        if (data.length == 0) return "";
        return data.map(object => {
            console.log(object);
            return <Link to={"/dashboard/user/" + object.id}>{object.name}</Link>
        }).reduce((prev, curr) => [prev, ', ', curr])
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
                Header: 'Tên chương',
                accessor: 'name',
                Cell: props => <Link to={"/dashboard/chapter/detail/" + props.original.id} className='number'>{props.original.name}</Link>

            }, {
                Header: 'Số mục đã hoàn thành',
                accessor: 'sum_done',
                Cell: props => <span className='number'>{props.value}</span>
            }, {
                Header: 'Số mục đang soạn',
                accessor: 'sum_editing',
                Cell: props => <span className='number'>{props.value}</span>
            }, {
                Header: 'Số mục chưa soạn',
                accessor: 'sum_empty',
                Cell: props => <span className='number'>{props.value}</span>
            }, {
                Header: 'Số biên tập viên',
                accessor: 'count_editor',
                Cell: props => <span className='number'>{props.value}</span>

            }]
        return (
            <div>
                <div className="qc-content qc-card">
                    <div className="qc-card-header">
                        <span className="qc-header-title">Thông tin chương: {this.state.data.chapter && this.state.data.chapter.name}</span>
                        <span className="qc-header-tool">
                            <button>Hành động <span className="icon"><FontAwesomeIcon icon={faChevronDown} /></span></button>
                            <div className="tool-dropdown">
                                <div className="content">
                                    <ul class="qc-dropdown-ul">
                                        <Link to="new"><li><span className="icon"><FontAwesomeIcon icon={faPlus} /></span>Thêm chương mới</li></Link>
                                        <Link to={`/dashboard/books/edit/${this.props.match.params.id}`}><li><span className="icon"><FontAwesomeIcon icon={faEdit} /></span>Chỉnh sửa</li></Link>
                                        <Link to="/"><li><span className="icon"><FontAwesomeIcon icon={faFilePdf} /></span>Kết xuất PDF</li></Link>
                                        <Link to="/"><li><span className="icon"><FontAwesomeIcon icon={faChartBar} /></span>Thống kê</li></Link>
                                    </ul>
                                </div>
                            </div>
                        </span>
                    </div>
                    {this.state.loaded ? <div className="qc-content">
                        <div className="qc-section-title">Trưởng quyển</div>
                        <p>{this.state.data.chapter.introduction}</p>
                        <br/>
                        <div className="qc-section-title">Giới thiệu</div>
                        <p dangerouslySetInnerHTML={this.state.data.chapter && { __html: this.state.data.chapter.description }}></p>
                    </div> : <ReactLoading className="qc-loading" type="spin" color="#888" />}
                </div>
                <div className="qc-content qc-card">
                    <div className="qc-card-header">
                        <span className="qc-header-title">Danh sách chương</span>
                        <span className="qc-header-tool">
                            <input onChange={(evt) => this.setState({ filter: evt.target.value })} class="qc-input filter" placeholder="Lọc tên" />
                        </span>
                    </div>

                    <ReactTable
                        PaginationComponent={Pagination}
                        defaultPageSize={10}
                        minRows={1}
                        data={this.state.list && this.state.list.filter(object => (object.name ? (object.name.toUpperCase().indexOf(this.state.filter.toUpperCase()) != -1) : true))}
                        columns={columns}
                    />
                </div>
            </div>
        )
    }
}
export default Chapter;