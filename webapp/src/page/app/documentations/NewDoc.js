import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import inputStyle from '../../../config/inputStyle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/base64uploadadapter';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import language from '../../../config/language';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard';

import '@ckeditor/ckeditor5-build-classic/build/translations/vi';


const editorConfiguration = {
    plugins: [Essentials, Bold, Clipboard, Table, Alignment, FontSize, FontColor, FontFamily, Heading, Table, TableToolbar, Italic, Paragraph, Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, Base64UploadAdapter],
    toolbar: ['Heading', '|', 'Bold', 'Italic', , 'link', 'imageUpload', 'Alignment', 'FontColor', 'fontsize', 'fontfamily', '|', 'insertTable', 'list', 'ListUI', 'BlockQuote', 'Undo', 'Redo', 'Paragraph', 'Copy'],
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
        ]
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    }, fontSize: {
        options: [
            9,
            11,
            13,
            'default',
            17,
            19,
            21
        ]
    },
    image: {
        toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:side', 'imageStyle:alignRight'],
        styles: [
            'full',
            'alignLeft',
            'alignRight'
        ]
    }
};

class NewDoc extends React.Component {
    state = {
        actorValue: null
    };
    handleSection = actorValue => {
        this.setState({ actorValue });
    };

    render() {
        const optionActor = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
        ];
        const { actorValue } = this.state;

        return (
            <div className="qc-content qc-card">
                <div className="qc-card-header">
                    Thêm tập mới
                    </div>
                <div className="qc-content">
                    <FormGroup>
                        <Label for="exampleEmail">Tên tư liệu</Label>
                        <Input type="text" placeholder="Nhập tên tập mới" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Phạm vi sử dụng</Label>
                        <Select
                            styles={inputStyle}
                            options={optionActor}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Loại hình tư liệu</Label>
                        <Select
                            styles={inputStyle}
                            options={optionActor}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Mức độ phổ biển</Label>
                        <br />
                        <Label><input type="radio" value={0} name="rate" />Phổ biến</Label>
                        <Label><input type="radio" value={1} name="rate" />Khá phổ biến</Label>
                        <Label><input type="radio" value={2} name="rate" />Hiếm</Label>
                        <Label><input type="radio" value={3} name="rate" />Rất hiếm</Label>
                    </FormGroup>

                    <FormGroup>
                        <Label>Người thu thập</Label>
                        <Select
                            styles={inputStyle}
                            options={optionActor}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Nguồn gốc tư liệu</Label>
                        <Select
                            styles={inputStyle}
                            options={optionActor}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Cách thức thu thập</Label>
                        <br />
                        <Label><input type="radio" value={0} name="type" />Cá nhân, sẵn có</Label>
                        <Label><input type="radio" value={1} name="type" />Khảo sát, thực địa</Label>
                        <Label><input type="radio" value={2} name="type" />Sao chụp</Label>
                        <Label><input type="radio" value={3} name="type" />Khác</Label>
                    </FormGroup>

                    <FormGroup>
                        <Label>Nguồn chi phí thu thập tư liệu</Label>
                        <br />
                        <Label><input type="radio" value={0} name="cost" />Miễn phí</Label>
                        <Label><input type="radio" value={1} name="cost" />Kinh phí, số tiền&nbsp;
                        <input type="number" /> đồng
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Label>Giá trị sử dụng</Label>
                        <Select
                            styles={inputStyle}
                            options={optionActor}
                        />
                    </FormGroup>

                    <Label>Giới thiệu</Label>

                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data="<p>Hello from CKEditor 5!</p>"
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                        }}
                        onBlur={editor => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={editor => {
                            console.log('Focus.', editor);
                        }}
                    />

                    <br />
                    <FormGroup>
                        <Label>Thêm từ khóa</Label>
                        <Select
                            isMulti
                            styles={inputStyle}
                            options={optionActor}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Đều xuất nơi bảo quản</Label>
                        <br />
                        <Label><input type="checkbox" /> Bảo quản tại Nhiệm vụ thành phần</Label>
                        <br />
                        <Label><input type="checkbox" /> Bảo quản tại Văn phòng Quốc chí</Label>
                    </FormGroup>

                </div>
                <div className="qc-align-right qc-content">
                    <button class="qc-btn">
                        <span className="icon"><FontAwesomeIcon icon={faCheck} /></span>
                        {language.create}
                    </button>
                </div>
            </div>
        )
    }
}
export default NewDoc;