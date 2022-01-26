import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';
import { uploadPictureThunk } from '../Redux/actions/userAction'


// Require action here for uploading user picture

import classes from './iconupdatemodal.module.css'

class PureIconUpdateModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            iconModal: false,
            picture: {}
        }
    }
    
onFileChange = event => {
    this.setState({ picture: event.target.files[0] });
}

  upload = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", this.state.picture)
    formData.append("email", this.props.user.email)
    // this.props.uploadPicture(this.state.picture, this.props.user.id)
    this.props.uploadPicture(formData)
}

    render(){
        return(
            <Modal isOpen={this.props.upload.iconModal} toggle={()=>{this.props.toggle()}} className={classes.uploadicon}>
            <ModalHeader> Uploading New Icon </ModalHeader>
            <ModalBody>
                <Form>
                    <input type="file" onChange={this.onFileChange}/>
                </Form>
            </ModalBody>

            <ModalFooter>
                    <button onClick={(e)=>{this.upload(e); this.props.toggle()}} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Confirm</button>
                    <button onClick={()=>{this.props.toggle()}} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
            </ModalFooter>
          </Modal>
        )
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        uploadPicture: (formData) => {
            // let userPicture = {
            //     picture: pictureFile,
            //     id: userId
            // }
            dispatch(uploadPictureThunk(formData))
        }
    }
}

export const IconUpdateModal = connect(null, mapDispatchToProps)(PureIconUpdateModal)