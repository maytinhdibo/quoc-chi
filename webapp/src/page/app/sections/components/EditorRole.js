import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

import inputStyle from '../../../../config/inputStyle';

import formAPI from '../../../../services/form.services';
import sectionAPI from '../../../../services/section.services';

import { alertText } from "../../../../components/Alert";


class EditorRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            editorsValue: []
        }
    }
    editEditors = () => {
        sectionAPI.editEditors(this.props.sectionId, {
            users: this.state.editorsValue.map(ele => { return ele.value })
        }).then(()=>{
            alertText("Chỉnh sửa thành công");
            this.props.toggleModal();
        }
        ).catch(e => {
            alertText(e.message)
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isOpen != this.props.isOpen && this.props.isOpen) {
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
                }
            });
            sectionAPI.getEditors(this.props.sectionId).then(object => {
                if (object.success) {
                    let data = object.data;
                    data = data.map(ele => {
                        return {
                            value: ele.id,
                            label: ele.name + " - " + ele.email
                        }
                    });
                    this.setState({ editorsValue: data });
                }
            })
        }
    }
    toggleModal = () => {

    }
    render() {

        return (
            <Modal
                toggle={this.props.toggleModal}
                size="md"
                centered={true}
                isOpen={this.props.isOpen}
            >
                <ModalHeader
                    toggle={this.props.toggleModal}
                >
                    Phân quyền biên tập viên
            </ModalHeader>
                <ModalBody>
                    <Label>Lựa chọn các biên tập viên...</Label>
                    <Select
                        isMulti
                        styles={inputStyle}
                        placeholder={"Nhập tên hoặc email..."}
                        value={this.state.editorsValue}
                        onChange={(value) => this.setState({ editorsValue: value })}
                        options={this.state.users}
                    />
                </ModalBody>

                <ModalFooter>
                    <button onClick={this.editEditors} class="qc-btn">
                        <span className="icon"><FontAwesomeIcon icon={faCheck} /></span>
                        Hoàn tất
                    </button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default EditorRole;
