import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FormGroup, Label, Input, Col, Row } from 'reactstrap';
import language from '../../config/language';
class Search extends React.Component {
    render() {
        return (
            <div className="qc-content qc-card">
                <div className="qc-card-header">
                    Tìm kiếm
            </div>
                <div className="qc-content">
                    <FormGroup>
                        <Label for="exampleEmail">Nội dung tìm kiếm</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Nhập nội dung" />
                    </FormGroup>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="exampleEmail">Loại</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Mục</option>
                                    <option>Quyển</option>
                                    <option>Chương</option>
                                    <option>Tập</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="exampleEmail">Thành phần</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Chỉ tìm theo tên</option>
                                    <option>Chỉ tìm theo nội dung</option>
                                    <option>Tìm theo cả tên và nội dung</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <label for="tuongdoi">
                        <input id="tuongdoi" type="checkbox" />
                        Tìm kiếm tương đối
                        </label>
                    <div className="qc-align-right">
                        <button className="qc-btn"><FontAwesomeIcon icon={faSearch}/> {language.search}</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Search;