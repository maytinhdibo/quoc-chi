import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FormGroup, Label, Input, Col, Row } from 'reactstrap';
import language from '../../config/language';
import Select from 'react-select';
import inputStyle from '../../config/inputStyle';

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

class CheckDuplicate extends React.Component {
    state = {
        sectionValue: null,
        bookValue: null,
        chapterValue: null
    };
    handleSection = sectionValue => {
        this.setState({ sectionValue });
    };
    handleBook = bookValue => {
        this.setState({ bookValue });
    };
    handleChapter = chapterValue => {
        this.setState({ chapterValue });
    };
    render() {
        const { sectionValue, bookValue, chapterValue } = this.state;
       

        return (
            <div className="qc-content qc-card">
                <div className="qc-card-header">
                   Rà soát trùng lặp
            </div>
                <div className="qc-content">

                    <Row>
                        <Col md="6">
                            <Label>Tập</Label>
                            <Select
                                styles={inputStyle}
                                value={sectionValue}
                                onChange={this.handleSection}
                                options={optionSection}
                            />
                        </Col>
                        <Col md="6">
                            <Label>Quyển</Label>
                            <Select
                                styles={inputStyle}
                                value={bookValue}
                                onChange={this.handleBook}
                                options={optionBook}
                            />
                        </Col>
                    </Row>
                    <br />
                    <FormGroup>
                        <Label>Chương</Label>
                        <Select
                            styles={inputStyle}
                            value={chapterValue}
                            onChange={this.handleChapter}
                            options={optionChapter}
                        />
                    </FormGroup>
                    <label for="tuongdoi">
                        <input id="tuongdoi" type="checkbox" />
                        Tìm kiếm tương đối
                        </label>
                    <div className="qc-align-right">
                        <button className="qc-btn"><FontAwesomeIcon icon={faSearch} /> {language.analysis}</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default CheckDuplicate;