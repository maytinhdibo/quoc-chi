import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBug, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
// import Select from "react-select";

// import inputStyle from '../../../../config/inputStyle';

// import formAPI from '../../../../services/form.services';
import { alertText } from "../../components/Alert.js";
import volumeAPI from '../../services/volume.services';
import chapterAPI from '../../services/chapter.services';
import sectionAPI from '../../services/section.services';

class DeleteRoleItem extends React.Component {
    constructor(props) {
        super(props);
    }
    deleteItem = () => {
        //Console.log(this.props.item);
        switch (this.props.Api) {
            case "volume": {
                volumeAPI.deleteVolume(this.props.volumeId).then(() => {
                    alertText("Xóa thành công");
                    this.props.toggleModal();
                    this.props.Back();
                }
                ).catch(e => {
                    alertText(e.message)
                })
                break;
            }
            case "chapter": {
                chapterAPI.deleteChapter(this.props.chapterId).then(() => {
                    alertText("Xóa thành công");
                    this.props.toggleModal();
                    this.props.Back();
                }
                ).catch(e => {
                    alertText(e.message)
                })
            }
            case "section":{
                sectionAPI.deleteSection(this.props.sectionId).then(()=>{
                    alertText("Xóa thành công");
                    this.props.toggleModal();
                    this.props.Back();
                }
                ).catch(e => {
                    alertText(e.message)
                })
            }
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
                    Xóa {this.props.item}
                </ModalHeader>
                <ModalBody>
                    <Label>Bạn có chắc chắn muốn xóa {this.props.item} này không?</Label>
                </ModalBody>

                <ModalFooter>
                    <button onClick={this.deleteItem} class="qc-btn">
                        <span className="icon"><FontAwesomeIcon icon={faCheck} /></span>
                        Xóa
                    </button>
                   
                    <button onClick={this.props.toggleModal} class="qc-btn">
                        <span className="icon"><FontAwesomeIcon icon={faTimesCircle} /></span>
                        Hủy bỏ
                    </button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default DeleteRoleItem;
