import React from 'react';
import { connect } from 'react-redux'

import { addTag } from '../Redux/actions/tagAction'

import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';

class PureTagModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tagBody: "",
            type: "",
            classroomId: "",
            setId: "",
        }
    }

    onChangeField = (field, e) => {
        const state = {};
        state.field = e.currentTarget.value;
        this.setState({
            tagBody: state.field
        });
    }

    submit = (e) => {
        e.preventDefault();
        if (this.props.addTag.type === "class") {
            this.props.createClassTagMDP(this.props.addTag.type,  this.state.tagBody, this.props.location.id)
        } else {
            this.props.createSetTagMDP(this.props.addTag.type, this.state.tagBody, this.props.location.id)
        }
        this.setState({
            tagBody:""
        })
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.addTag.tagModal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}> New Tag </ModalHeader>
                    <ModalBody>
                        <Form>
                            <input onChange={this.onChangeField.bind(this, 'tagBody')} value={this.state.tagBody} type="text" className="form-control mb-4" placeholder="#newtag"/>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={(e)=>{this.submit(e); this.props.toggle()}} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Create</button>
                        <button onClick={()=>{this.props.toggle()}} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createClassTagMDP: (type, tagBody, classroomId) => {
            let tag = {
                type: type,
                tagBody: tagBody,
                classroomId: classroomId
            } 
            dispatch(addTag(tag))
        },
        createSetTagMDP: (type, tagBody, setId) => {
            let tag = {
                type: type,
                tagBody: tagBody,
                setId: setId
            } 
            dispatch(addTag(tag))
        }
    }
}


export const NewTagPopUp = connect(null, mapDispatchToProps)(PureTagModal)