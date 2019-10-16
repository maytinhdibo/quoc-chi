import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";
import inputStyle from "../../../config/inputStyle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import formAPI from "../../../services/form.services";
import { alertText } from "../../../components/Alert";
import bookAPI from "../../../services/book.services";

import language from "../../../config/language";
import sectionAPI from "../../../services/section.services";
import analyticsAPI from "../../../services/analytics.services";

class NewSection extends React.Component {
  state = {
    chapterName: "",
    description: "",
    name: ""
  };
  handleSection = actorValue => {
    this.setState({ actorValue });
  };

  componentDidMount() {
    analyticsAPI.getChapter(this.props.match.params.id).then(object => {
      if (object.success) {
        this.setState({ chapterName: object.data.chapter.name });
      }
    });
  }

  createNew = () => {
    const { name, description } = this.state;
    const chapterId = this.props.match.params.id;
    sectionAPI
      .newSection({ name, description }, chapterId)
      .then(object => {
        if (object.success) {
          this.props.history.push(
            "/dashboard/sections/detail/" + object.data.id
          );
        } else {
          throw new Error(object.reason);
        }
      })
      .catch(e => {
        alertText(e);
      });
  };

  render() {

    return (
      <div className="qc-content qc-card">
        <div className="qc-card-header">
          Thêm mục mới trong chương: {this.state.chapterName}
        </div>
        <div className="qc-content">
          <FormGroup>
            <Label for="exampleEmail">Tên mục</Label>
            <Input
              value={this.state.name}
              onChange={evt => this.setState({ name: evt.target.value })}
              type="text"
              placeholder="Nhập tên mục mới"
            />
          </FormGroup>

          <FormGroup>
            <Label>Giới thiệu</Label>
            <Input
              value={this.state.description}
              onChange={evt => this.setState({ description: evt.target.value })}
              style={{ height: "150px" }}
              type="textarea"
              name="text"
            />
          </FormGroup>

          <FormGroup>
            <Label>Từ khóa</Label>
            <Select
              isMulti
              styles={inputStyle}
              value={this.state.adminValue}
              onChange={value => this.setState({ adminValue: value })}
              options={this.state.users}
            />
          </FormGroup>
        </div>
        <div className="qc-align-right qc-content">
          <button onClick={this.createNew} class="qc-btn">
            <span className="icon">
              <FontAwesomeIcon icon={faCheck} />
            </span>
            {language.create}
          </button>
        </div>
      </div>
    );
  }
}
export default NewSection;
