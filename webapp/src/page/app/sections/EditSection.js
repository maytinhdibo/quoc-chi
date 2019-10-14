import React from "react";
import {
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlayCircle } from "@fortawesome/free-solid-svg-icons";

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
    modalPreview: false
  };
  handleSection = actorValue => {
    this.setState({ actorValue });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    analyticsAPI.getSection(id).then(object => {
      if (object.success) {
        let { name, description, content } = object.data.section;
        this.setState({
          name,
          description,
          content: content ? content : ""
        });
      } else {
        alertText(object.reason);
      }
    });
  }

  editSection = () => {
    let { description, name, content } = this.state;
    sectionAPI
      .editSection({ description, name, content }, this.props.match.params.id)
      .then(object => {
        if (object.success) {
          alertText("Sửa đổi thành công.");
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
      <div>
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
        <div className="qc-card-header">Chỉnh sửa mục</div>
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

          <Label>Biên soạn</Label>

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
        </div>
        <div className="qc-align-right qc-content">
          <button
            style={{
              marginRight: "3px",
              background: "#005cb2"
            }}
            onClick={this.previewSection}
            class="qc-btn"
          >
            <span className="icon">
              <FontAwesomeIcon icon={faPlayCircle} />
            </span>
            Xem trước
          </button>
          <button onClick={this.editSection} class="qc-btn">
            <span className="icon">
              <FontAwesomeIcon icon={faCheck} />
            </span>
            {language.edit}
          </button>
        </div>
      </div>
    );
  }
}
export default EditSection;
