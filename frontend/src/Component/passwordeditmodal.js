import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';

import { editUserPasswordThunk } from '../Redux/actions/userAction';


import classes from './passwordeditmodal.module.css'

class PurePasswordEditModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            passwordModal: false,
            mockPassword: "",
            password: ""
        }
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }

    update = (e) => {
        e.preventDefault();
        this.props.editPassword(this.props.user.id, this.state.password)
    }

render(){
    return(
        <Modal isOpen={this.props.update.passwordModal} toggle={()=>{this.props.toggle()}} className={classes.uploadicon}>
        <ModalHeader> Edit Password </ModalHeader>
        <ModalBody>
            <Form>
                <input type="password" placeholder="New Password" value={this.state.mockPassword} onChange={this.onChangeField.bind(this, 'mockPassword')} className="form-control mb-4"/>
                <input type="password" placeholder="Confirm New Password" value={this.state.password} onChange={this.onChangeField.bind(this, 'password')} className="form-control mb-4"/>
                </Form>
                <ModalFooter>
                        {this.state.password === this.state.mockPassword && this.state.password !== "" ? <button onClick={(e)=>{this.update(e); this.props.toggle()}} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Update</button> : <button type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2" disabled>Update</button>}
                        <button onClick={()=>{this.props.toggle()}} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
                    </ModalFooter>
      
        </ModalBody>
      </Modal>
    )
}
} 

const mapDispatchToProps = dispatch => {
    return {
        editPassword: (userId, password) => {
            let userPassword = {
                id: userId,
                password: password
            }
            dispatch(editUserPasswordThunk(userPassword))
        }
    }
}

export const PasswordEditModal = connect(null, mapDispatchToProps)(PurePasswordEditModal)