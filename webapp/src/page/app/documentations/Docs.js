import React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table'
import Pagination from '../../../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChartBar, faChevronDown } from '@fortawesome/free-solid-svg-icons';

class Docs extends React.Component {
    render() {
        const data = [{
            name: 'Nguyen Van A',
            age: 26,
            friend: {
                name: 'Do Van C',
                age: 23,
            }
        }, {
            name: 'Dao Thi B',
            age: 22,
            friend: {
                name: 'Ngo Trung V',
                age: 24,
            }
        }, {
            name: 'Tran Duc C',
            age: 25,
            friend: {
                name: 'Ngo Thanh E',
                age: 25,
            }
        }, {
            name: 'Le Tien N',
            age: 27,
            friend: {
                name: 'Cao Cong G',
                age: 24,
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
                Header: 'Name',
                accessor: 'name'
            }, {
                Header: 'Age',
                accessor: 'age',
                Cell: props => <span className='number'>{props.value}</span>
            }, {
                id: 'friendName',
                Header: 'Friend Name',
                accessor: d => d.friend.name
            }, {
                Header: props => <span>Friend Age</span>,
                accessor: 'friend.age'
            }]
        return (
            <div className="qc-content qc-card">
                <div className="qc-card-header">
                    <span className="qc-header-title">Quản lý tư liệu</span>
                    <span className="qc-header-tool">
                        <button>Hành động <span className="icon"><FontAwesomeIcon icon={faChevronDown}/></span></button>
                        <div className="tool-dropdown">
                            <div className="content">
                                <ul class="qc-dropdown-ul">
                                    <Link to="new"><li><span className="icon"><FontAwesomeIcon icon={faPlus}/></span>Thêm tư liệu mới</li></Link>
                                    <Link to="/"><li><span className="icon"><FontAwesomeIcon icon={faChartBar}/></span>Thống kê</li></Link>
                                </ul>
                            </div>
                        </div>
                    </span>
                </div>
                <div className="qc-content">
                    <ReactTable
                        PaginationComponent={Pagination}
                        defaultPageSize={10}
                        minRows={3}
                        data={data}
                        columns={columns}
                    />
                </div>
            </div>
        )
    }
}
export default Docs;