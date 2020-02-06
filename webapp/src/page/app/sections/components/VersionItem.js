import React from "react";
import { Link as RouteLink } from "react-router-dom";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown, faChevronUp
} from "@fortawesome/free-solid-svg-icons";

class VersionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandCommit: false
        }
    }
    render() {
        const { data } = this.props
        return (
            <div className="version-item">
                <span className="id-badge">{data.id}</span>

                <div style={{ flex: 1 }}>
                    <RouteLink
                        to={
                            "/dashboard/sections/edit/" +
                            this.props.match.params.id +
                            "?version=" +
                            data.id
                        }
                    >
                        <b className="name">{data.name}</b>
                    </RouteLink>
                    <a
                    onClick={()=>this.setState({expandCommit:!this.state.expandCommit})}
                        className="expand-commit"
                    >
                        {this.state.expandCommit?"Thu gọn":"Xem thêm lịch sửa"} <FontAwesomeIcon icon={this.state.expandCommit?faChevronUp:faChevronDown} />
                    </a>
                    <ul style={{
                        display: this.state.expandCommit ? "block" : "none"
                    }}
                    dangerouslySetInnerHTML= {{__html:data.comments}}
                    >
                       
                    </ul>
                </div>
                <div className="status">
                    {data.published == 1 ? (
                        <span className="status-btn published">
                            Đã xuất bản
            </span>
                    ) : (
                            <span className="status-btn draft">Bản lưu nháp</span>
                        )}
                </div>
                <div className="date">
                    {moment(data.updated_at).format("h:mm:ss DD/MM/YYYY")}
                </div>
            </div>
        )
    }
}
export default VersionItem;
