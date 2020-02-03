import React from "react";
import {
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col
} from "reactstrap";

import { Link as RouteLink } from "react-router-dom";
import queryString from "query-string";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlayCircle,
  faAngleDown,
  faAngleUp,
  faEdit,
  faClock,
  faSave,
  faBookMedical,
  faBars
} from "@fortawesome/free-solid-svg-icons";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/base64uploadadapter";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor";
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily";
import language from "../../../config/language";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import Clipboard from "@ckeditor/ckeditor5-clipboard/src/clipboard";

import formAPI from "../../../services/form.services";
import { alertText } from "../../../components/Alert";
import sectionAPI from "../../../services/section.services";
import analyticsAPI from "../../../services/analytics.services";
import moment from "moment";

const editorConfiguration = {
  plugins: [
    Essentials,
    Bold,
    Clipboard,
    Table,
    Alignment,
    FontSize,
    FontColor,
    FontFamily,
    Heading,
    Table,
    TableToolbar,
    Italic,
    Paragraph,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Base64UploadAdapter
  ],
  toolbar: [
    "Heading",
    "|",
    "Bold",
    "Italic",
    ,
    "link",
    "imageUpload",
    "Alignment",
    "FontColor",
    "fontsize",
    "fontfamily",
    "|",
    "insertTable",
    "list",
    "ListUI",
    "BlockQuote",
    "Undo",
    "Redo",
    "Paragraph",
    "Copy"
  ],
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1"
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2"
      }
    ]
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
  },
  fontSize: {
    options: [9, 11, 13, "default", 17, 19, 21]
  },
  image: {
    toolbar: [
      "imageTextAlternative",
      "|",
      "imageStyle:alignLeft",
      "imageStyle:full",
      "imageStyle:side",
      "imageStyle:alignRight"
    ],
    styles: ["full", "alignLeft", "alignRight"]
  }
};

class EditSection extends React.Component {
  state = {
    content: "",
    description: "",
    name: "",
    user_id: null,
    modalPreview: false,
    modalInfo: false,
    modalListDraft: false,
    fullScreen: true,
    listVersion: [],
    menuTool: false,
    version: null,
    modalPublish: false,
    modalSave: false
  };
  handleSection = actorValue => {
    this.setState({ actorValue });
  };

  loadSection = () => {
    const version = queryString.parse(this.props.location.search).version;
    const { id } = this.props.match.params;
    analyticsAPI.getSectionFull(id, version).then(object => {
      if (object.success) {
        let { name, description, content, user_id, id } = object.data.section;
        this.setState({
          name,
          description,
          content: content ? content : "",
          user_id,
          version: object.data.section.id && 0,
          modalListDraft: false,
          menuTool: false
        });
      } else {
        alertText(object.reason);
      }
    });
  };

  componentDidMount() {
    this.loadSection();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params != this.props.match.params) {
      this.loadSection();
      console.log("load");
    }
  }

  toggleListDraft = () => {
    if (!this.state.modalListDraft) {
      sectionAPI.getListDraft(this.props.match.params.id).then(object => {
        if (object.success) {
          this.setState({ listVersion: object.data });
        }
      });
    }
    this.setState({ modalListDraft: !this.state.modalListDraft });
  };

  publishSection = () => {
    let { description, name, content } = this.state;
    let version = queryString.parse(this.props.location.search).version;
    sectionAPI
      .publishSection(
        { description, name, content },
        this.props.match.params.id,
        version
      )
      .then(object => {
        if (object.success) {
          alertText("Sửa đổi thành công.");
          this.setState({ modalPublish: false });
        } else {
          alertText(object.reason);
        }
      })
      .catch(e => {
        alertText(e.message);
      });
  };

  saveNewDraft = () => {
    let { description, name, content } = this.state;
    sectionAPI
      .saveNewDraft({ description, name, content }, this.props.match.params.id)
      .then(object => {
        if (object.success) {
          alertText("Bản nháp mới đã tạo thành công.");
        } else {
          alertText(object.reason);
        }
      })
      .catch(e => {
        alertText(e.message);
      });
  };

  saveDraft = () => {
    let { description, name, content } = this.state;
    let version =
      queryString.parse(this.props.location.search).version &&
      this.state.version;
    sectionAPI
      .saveDraft(
        { description, name, content },
        this.props.match.params.id,
        version
      )
      .then(object => {
        if (object.success) {
          alertText("Bản nháp được lưu thành công.");
        } else {
          alertText(object.reason);
        }
      })
      .catch(e => {
        alertText(e.message);
      });
  };

  previewSection = () => {
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({ modalPreview: !this.state.modalPreview });
  };

  render() {
    return (
      <div
        className={
          this.state.fullScreen ? "qc-rich-editor" : "qc-rich-editor mini"
        }
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Modal
            toggle={this.toggleModal}
            size="lg"
            isOpen={this.state.modalPreview}
          >
            <ModalHeader toggle={this.toggleModal}>Xem trước</ModalHeader>
            <ModalBody>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.content
                }}
              ></div>
            </ModalBody>
          </Modal>

          <Modal
            toggle={this.toggleListDraft}
            size="lg"
            isOpen={this.state.modalListDraft}
          >
            <ModalHeader toggle={this.toggleListDraft}>
              Lịch sử phiên bản
            </ModalHeader>
            <ModalBody className="modal-version-list">
              {this.state.listVersion.map(data => {
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
                      <RouteLink
                        to={"/dashboard/user/" + (data.user && data.user.id)}
                        className="editor-name"
                      >
                        {data.user && data.user.name}
                      </RouteLink>
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
                );
              })}
            </ModalBody>
          </Modal>

          <Modal
            toggle={() => {
              this.setState({ modalInfo: !this.state.modalInfo });
            }}
            size="lg"
            isOpen={this.state.modalInfo}
          >
            <ModalHeader
              toggle={() => {
                this.setState({ modalInfo: !this.state.modalInfo });
              }}
            >
              Thông tin mục
            </ModalHeader>
            <ModalBody>
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
                  onChange={evt =>
                    this.setState({ description: evt.target.value })
                  }
                  style={{ height: "150px" }}
                  type="textarea"
                  name="text"
                />
              </FormGroup>
            </ModalBody>
          </Modal>



          <Modal
            toggle={() => {
              this.setState({ modalPublish: !this.state.modalPublish });
            }}
            size="lg"
            isOpen={this.state.modalPublish}
          >
            <ModalHeader
              toggle={() => {
                this.setState({ modalPublish: !this.state.modalPublish });
              }}
            >
              Thông tin xuất bản
            </ModalHeader>
            <ModalBody>
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
                  onChange={evt =>
                    this.setState({ description: evt.target.value })
                  }
                  style={{ height: "150px" }}
                  type="textarea"
                  name="text"
                />
              </FormGroup>

              <span class="qc-badge warn"><sup><b>*</b> </sup>Vui lòng xác nhận các thông tin về mục trước khi xuất bản</span>
              <div className="qc-align-right qc-content">
                <button onClick={this.publishSection} class="qc-btn">
                  <span className="icon"><FontAwesomeIcon icon={faCheck} /></span>
                  Xuất bản
                    </button>
              </div>
            </ModalBody>
          </Modal>


          <Modal
            toggle={() => {
              this.setState({ modalSave: !this.state.modalSave });
            }}
            size="lg"
            isOpen={this.state.modalSave}
          >
            <ModalHeader
              toggle={() => {
                this.setState({ modalSave: !this.state.modalSave });
              }}
            >
              Thông tin bản lưu
            </ModalHeader>
            <ModalBody>

              <FormGroup>
                <Input
                  value={this.state.description}
                  onChange={evt =>
                    this.setState({ description: evt.target.value })
                  }
                  style={{ height: "150px" }}
                  type="textarea"
                  name="text"
                  placeholder="Nhập mô tả cho bản lưu này"
                />
              </FormGroup>
              <sup><i>* Bạn cần chú thích những nội dung sửa đổi trong phần này</i></sup>

              <div className="qc-align-right qc-content">
                <button onClick={this.saveDraft} class="qc-btn">
                  <span className="icon"><FontAwesomeIcon icon={faCheck} /></span>
                  Lưu nháp
                    </button>
              </div>
            </ModalBody>
          </Modal>


          <div className="qc-header">
            <div
              onClick={() => {
                this.setState({ fullScreen: !this.state.fullScreen });
              }}
              className="qc-gr-btn window"
            >
              <button class="bar-btn">
                <FontAwesomeIcon
                  icon={this.state.fullScreen ? faAngleDown : faAngleUp}
                />
              </button>
            </div>
            <span className="qc-title">
              {this.state.name}
              {this.state.user_id != localStorage.id &&
                this.state.user_id != -1 ? (
                  <span
                    style={{ marginLeft: "6px" }}
                    title="Bạn đang sửa trên nội dung của người khác, bạn chỉ có thể xem hoặc lưu thành phiên bản mới."
                    className="qc-badge danger"
                  >
                    CHỈ ĐỌC
                </span>
                ) : null}
              {this.state.user_id == -1 ? (
                <span
                  style={{ marginLeft: "6px" }}
                  className="qc-badge success"
                >
                  PHIÊN BẢN MỚI
                </span>
              ) : null}
            </span>
            <div className="qc-gr-btn">
              <button onClick={this.previewSection} class="bar-btn">
                <span className="icon">
                  <FontAwesomeIcon icon={faPlayCircle} />
                </span>
                Xem trước
              </button>
              <button
                // onClick={() => {
                //   this.setState({ menuTool: !this.state.menuTool });
                // }}
                onClick={this.toggleListDraft}
                style={{ width: "40px" }}
                class="bar-btn"
              >
                <FontAwesomeIcon icon={faClock} />
              </button>
            </div>

            <div
              style={{
                display: this.state.menuTool ? "block" : "none"
              }}
              className="menu-tool"
              onClick={() => { this.setState({ menuTool: false }) }}
            >
              hbkjnl
            </div>
          </div>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data={this.state.content}
            onInit={editor => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              this.setState({ content: data });
            }}
            onBlur={editor => {
              console.log("Blur.", editor);
            }}
            onFocus={editor => {
              console.log("Focus.", editor);
            }}
          />

          <div style={{
            borderTop: "1px solid #eee",
            background: "#fff",
            textAlign: "right"
          }} className="qc-header">
            <div style={{
              width: "100%"
            }} className=" qc-gr-btn">

              <button
                onClick={() => {
                  this.setState({ modalInfo: !this.state.modalInfo });
                }}
                class="bar-btn"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faEdit} />
                </span>
                Thông tin
              </button>

              <button onClick={() => this.setState({ modalSave: true })} class="bar-btn">
                <span className="icon">
                  <FontAwesomeIcon icon={faSave} />
                </span>
                Lưu nháp
                </button>

              {/* <button onClick={this.saveNewDraft} class="bar-btn">
                <span className="icon">
                  <FontAwesomeIcon icon={faBookMedical} />
                </span>
                Lưu bản nháp mới
              </button> */}
              <button onClick={() => this.setState({ modalPublish: true })} class="bar-btn">
                <span className="icon">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                Xuất bản
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EditSection;
