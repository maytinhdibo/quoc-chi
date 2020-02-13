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

import formAPI from '../../../services/form.services';
import { alertText } from '../../../components/Alert';
import volumeAPI from '../../../services/volume.services';
import analyticsAPI from '../../../services/analytics.services';


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

class EditVolume extends React.Component {
    state = {
        actorValue: null,
        users: [],
        adminValue: [],
        description: "",
        name: ""
    };
    handleSection = actorValue => {
        this.setState({ actorValue });
    };

    componentDidMount() {
        formAPI.getUsers().then(object => {
            if (object.success) {
                let data = object.data;
                data = data.map(ele => {
                    return {
                        value: ele.id,
                        label: ele.name + " - " + ele.email
                    }
                });
                this.setState({ users: data });
                analyticsAPI.getVolume(this.props.match.params.id).then(object => {
                    if (object.success) {
                        this.setState({
                            name: object.data.volume.name,
                            description: object.data.volume.description,
                            adminValue: object.data.volumeAdmin.map(object => {
                                return {
                                    value: object.user.id,
                                    label: this.state.users.find(o => o.value === object.user.id).label
                                }
                            })
                        });
                    } else {
                        alertText("Có lỗi khi lấy dữ liệu");
                    }
                })
            } else {
                alertText(object.reason);
            }
        }).catch(e => {
            alertText("Không thể lấy dữ liệu từ máy chủ");
        });
    }

    editBook = () => {
        let { description, name, adminValue } = this.state;
        adminValue = adminValue.map(object => {
            return object.value;
        });
        volumeAPI.editVolume({ description, name, adminValue }, this.props.match.params.id).then(object => {
            if (object.success) {
                alertText("Sửa đổi thành công.");
            } else {
                alertText(object.reason);
            }
        }).catch(e => {
            alertText(e.message);
        })
    }

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
                    Chỉnh sửa tập
                    </div>
                <div className="qc-content">
                    <FormGroup>
                        <Label for="exampleEmail">Tên tập</Label>
                        <Input value={this.state.name} onChange={(evt) => this.setState({ name: evt.target.value })} type="text" placeholder="Nhập tên tập mới" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Danh sách trưởng tập</Label>
                        <Select
                            isMulti
                            styles={inputStyle}
                            value={this.state.adminValue}
                            onChange={(value) => this.setState({ adminValue: value })}
                            options={this.state.users}
                        />
                    </FormGroup>
                    <Label>Giới thiệu</Label>

                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data={this.state.description || null}
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.setState({ description: data })
                        }}
                        onBlur={editor => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={editor => {
                            console.log('Focus.', editor);
                        }}
                    />
                </div>
                <div className="qc-align-right qc-content">
                    <button onClick={this.editBook} class="qc-btn">
                        <span className="icon"><FontAwesomeIcon icon={faCheck} /></span>
                        {language.edit}
                    </button>
                </div>
            </div>
        )
    }
}
export default EditVolume;