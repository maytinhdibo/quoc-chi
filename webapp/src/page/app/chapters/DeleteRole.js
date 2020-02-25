import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBug } from "@fortawesome/free-solid-svg-icons";
// import Select from "react-select";

// import inputStyle from '../../../../config/inputStyle';

// import formAPI from '../../../../services/form.services';
import { alertText } from "../../../components/Alert.js";
import chapterAPI from '../../../services/chapter.services';

class DeleteRole extends React.Component {
    constructor(props) {
        super(props);
    }
    delChapter = () => {
        chapterAPI.deleteChapter(this.props.chapterId).then(()=>{
            alertText("Xóa thành công");
            this.props.toggleModal();
        }
        ).catch(e => {
            alertText(e.message)
        })
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
                   Xóa chương
            </ModalHeader>
                <ModalBody>
                    <Label>Bạn có chắc chắn muốn xóa chương này không?</Label>
                </ModalBody>

                <ModalFooter>
                    <button onClick={this.delChapter} class="qc-btn">
                        <span className="icon"><FontAwesomeIcon icon={faCheck} /></span>
                        Xóa
                    </button>
                    <button class="qc-btn">
                        <span className="icon"><FontAwesomeIcon icon={faBug} /></span>
                        Hủy bỏ
                    </button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default DeleteRole;
