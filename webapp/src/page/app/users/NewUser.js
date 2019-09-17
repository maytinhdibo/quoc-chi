import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import inputStyle from '../../../config/inputStyle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import language from '../../../config/language';
import formAPI from '../../../services/form.services';
import { alertText } from '../../../components/Alert';
import userAPI from '../../../services/user.services';

const defaultValue = null;

class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            defaultValue: defaultValue,
            actorValue: null,
            valueOrganization: null,
            optionOrganization: [],
            optionTitle: [],
            valueTitle: null,
            valueUserRole: defaultValue,
            valueEditorRole: defaultValue,
            valueBook: defaultValue,
            optionBook: [],
            valueVolume: defaultValue,
            optionVolume: [],
            valueChapter: defaultValue,
            optionChapter: []
        };
    }

    handleSection = actorValue => {
        this.setState({ actorValue });
    };

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleUserRole = (value) => {
        console.log(this.state.valueEditorRole);
        if (this.state.valueEditorRole == null) {
            formAPI.getBooks().then(object => {
                if (object.success) {
                    this.setState({
                        optionBook: object.data.map(ele => {
                            return {
                                value: ele.id,
                                label: ele.name
                            }
                        })
                    });
                }
            })
        }
        this.setState({ valueEditorRole: value });
    }

    handleBook = (value) => {
        if (this.state.valueEditorRole.value > 1) {
            formAPI.getVolumes(value.value).then(object => {
                console.log(object);
                if (object.success) {
                    this.setState({
                        optionVolume: object.data.map(ele => {
                            return {
                                value: ele.id,
                                label: ele.name
                            }
                        })
                    });
                }
            })
            this.setState({ valueVolume: null, valueChapter: null });
        }
        this.setState({
            optionVolume: [],
            optionChapter: []
        })
        this.setState({ valueBook: value });
    }

    handleVolume = (value) => {
        if (this.state.valueEditorRole.value > 2) {
            formAPI.getChapters(value.value).then(object => {
                console.log(object);
                if (object.success) {
                    this.setState({
                        optionChapter: object.data.map(ele => {
                            return {
                                value: ele.id,
                                label: ele.name
                            }
                        })
                    });
                }
            })
            this.setState({ valueChapter: null });
        }

        this.setState({
            optionChapter: []
        })
        this.setState({ valueVolume: value });
    }

    createUser = () => {
        let { name, email, valueOrganization, valueEditorRole, valueUserRole, valueTitle, valueBook, valueVolume } = this.state;
        try {
            if (name && email && valueOrganization && valueTitle && valueUserRole) {
                let request = {
                    name, email,
                    password: email.split("@")[0],
                    organizationId: valueOrganization.value,
                    academicTitleId: valueTitle.value,
                    optionEditorRole: {
                        value: valueEditorRole.value
                    }
                }
                if (valueUserRole.value == 2) {
                    request.optionEditorRole.value = 2;
                    if (!valueEditorRole) throw new Error("Vui lòng chọn loại phụ trách.");
                    if (valueEditorRole.value == 1) {
                        if (!valueBook) throw new Error("Vui lòng chọn tập.")
                        else {
                            request.optionEditorRole.bookId = valueBook.value;
                        }
                    }
                    else if (valueEditorRole.value == 2) {
                        if (!valueVolume) throw new Error("Vui lòng chọn quyển.")
                        else {
                            request.optionEditorRole.volumeId = valueVolume.value;
                        }
                    } else request.optionEditorRole.value = 3;
                }
                console.log(request);
                userAPI.createUser(request).then(object => {
                    if (object.success) alertText("Tạo tài khoản thành công! Mật khẩu mặc định là phần trước @ của email.")
                    else throw new Error(object.reason);
                }).catch(e => {
                    alertText(e.message);
                });
            } else {
                throw new Error("Vui lòng nhập đầy đủ thông tin");
            }

        } catch (e) {
            alertText(e.message);
        }
    }

    componentDidMount() {
        formAPI.get("organization,academic_title").then(object => {
            console.log(object);
            if (object.success) {
                this.setState({
                    optionOrganization: object.data.organization.map(ele => {
                        return {
                            value: ele.id,
                            label: ele.name
                        }
                    }),
                    optionTitle: object.data.academic_title.map(ele => {
                        return {
                            value: ele.id,
                            label: ele.name + " - " + ele.fullname
                        }
                    })
                });
            } else {
                throw new Error(object.reason);
            }
        }).catch(e => {
            alertText(e.message);
        })
    }
    render() {
        const optionUserRole = [
            { value: 1, label: "Quản trị viên" },
            { value: 2, label: "Nhà biên soạn" }
        ]
        const optionEditorRole = [
            { value: 1, label: "Phụ trách tập" },
            { value: 2, label: "Trưởng quyển" },
            { value: 3, label: "Phụ trách mục" }
        ]
        return (
            <div className="qc-content qc-card">
                <div className="qc-card-header">
                    Thêm người dùng mới
                    </div>
                <div className="qc-content">
                    <FormGroup>
                        <Label for="exampleEmail">Họ và tên</Label>
                        <Input value={this.state.name} onChange={this.handleChange} name="name" type="text" placeholder="Họ và tên" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Địa chỉ email</Label>
                        <Input value={this.state.email} onChange={this.handleChange} name="email" type="text" placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Cơ quan</Label>
                        <Select
                            placeholder="Chọn cơ quan"
                            onChange={(value) => this.setState({ valueOrganization: value })}
                            styles={inputStyle}
                            options={this.state.optionOrganization}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Học vị</Label>
                        <Select
                            placeholder="Chọn học vị"
                            onChange={(value) => this.setState({ valueTitle: value })}
                            styles={inputStyle}
                            options={this.state.optionTitle}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Loại người dùng</Label>
                        <Select
                            placeholder="Chọn người dùng"
                            onChange={(value) => this.setState({ valueUserRole: value })}
                            styles={inputStyle}
                            options={optionUserRole}
                        />
                    </FormGroup>
                    {this.state.valueUserRole && this.state.valueUserRole.value == 2 ?
                        <div>
                            <FormGroup>
                                <Label>Phụ trách</Label>
                                <Select

                                    placeholder="Chọn loại phụ trách"
                                    onChange={this.handleUserRole}
                                    styles={inputStyle}
                                    options={optionEditorRole}
                                />
                            </FormGroup>
                            {this.state.valueEditorRole && this.state.valueEditorRole.value > 0 ?
                                <div> <FormGroup>
                                    <Label>Tập</Label>
                                    <Select
                                        placeholder="Chọn tập"
                                        onChange={this.handleBook}
                                        styles={inputStyle}
                                        options={this.state.optionBook}
                                    />
                                </FormGroup>
                                    {this.state.valueEditorRole && this.state.valueEditorRole.value > 1 ?
                                        <div> <FormGroup>
                                            <Label>Quyển</Label>
                                            <Select
                                                placeholder="Chọn quyển"
                                                onChange={this.handleVolume}
                                                styles={inputStyle}
                                                options={this.state.optionVolume}
                                                value={this.state.valueVolume}
                                            />
                                        </FormGroup>
                                            {this.state.valueEditorRole && this.state.valueEditorRole.value > 2 ?
                                                <div> <FormGroup>
                                                    <Label>Mục</Label>
                                                    <Select
                                                        placeholder="Chọn mục"
                                                        onChange={(value) => this.setState({ valueChapter: value })}
                                                        styles={inputStyle}
                                                        options={this.state.optionChapter}
                                                        value={this.state.valueChapter}
                                                    />
                                                </FormGroup></div> : ""
                                            }
                                        </div> : ""
                                    }
                                </div> : ""
                            }
                        </div>
                        : ""}
                </div>
                <div className="qc-align-right qc-content">
                    <button onClick={this.createUser} class="qc-btn">
                        <span className="icon"><FontAwesomeIcon icon={faCheck} /></span>
                        {language.create}
                    </button>
                </div>
            </div>
        )
    }
}
export default NewUser;