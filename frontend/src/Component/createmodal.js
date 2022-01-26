import React from 'react'
import { connect } from 'react-redux'

import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';
// Require Action
import { addClassroom } from '../Redux/actions/classroomAction'
import { addSet } from '../Redux/actions/setAction'
class PureCreateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            classroomTitle: "",
            classroomDesc: "",
            setTitle: "",
            setDesc: "",
        };
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }

    submit = async (e) => {
        e.preventDefault();
        if (this.props.create.type === "class") {
            this.props.createClassMDP({
                email: this.props.user.email,
                title: this.state.classroomTitle,
                description: this.state.classroomDesc,
            })
        } else {
            if (this.props.dash === "dashSet"){
                await this.props.createSetMDP({
                    type: this.props.create.type,
                    email: this.props.user.email,
                    title: this.state.setTitle,
                    desc: this.state.setDesc,
                })
            } else {
                await this.props.createSetMDP({
                    type: "classroom_set",
                    email: this.props.user.email,
                    title: this.state.setTitle,
                    desc: this.state.setDesc,
                    classroomId: parseInt(this.props.match.params.id)
                })
            }
        }
        this.setState({
            classroomTitle: "",
            classroomDesc: "",
            setTitle: "",
            setDesc: "",
        })
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.create.modal || this.props.create.setCreatePopUp} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}>Create {this.props.create.type === "class" ? "Classroom" : this.props.create.type === "set" ? "Set" : "Classroom"}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <input onChange={this.onChangeField.bind(this, 'email')} value={this.props.user.email} type="text" className="form-control mb-4" hidden={true} />
                            <input onChange={this.onChangeField.bind(this, this.props.create.type === "class" ? "classroomTitle" : "setTitle")} value={this.props.create.type === "class" ? this.state.classroomTitle : this.state.setTitle} type="text" className="form-control mb-4" placeholder={this.props.create.type === "class" ? "Classroom Title" : "Set Title"} />
                            <textarea onChange={this.onChangeField.bind(this, this.props.create.type === "class" ? "classroomDesc" : "setDesc")} value={this.props.create.type === "class" ? this.state.classroomDesc : this.state.setDesc} type="text" style={{ resize: "none" }} className="form-control" placeholder={this.props.create.type === "class" ? "Classroom Description" : "Set Description"} />
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.props.create.type === "class" ?
                            <button onClick={(e) => { this.submit(e); this.props.toggle() }} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2"><div>Create</div></button> :
                            <button onClick={(e) => { this.submit(e); this.props.toggle() }} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2"><div>Create</div></button>
                        }
                        <button onClick={(e) => { this.props.toggle() }} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>

                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userStore.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createClassMDP: (classroom) => {
            dispatch(addClassroom(classroom))
        },
        createSetMDP: (set) => {
            dispatch(addSet(set))
        }
    }
}


export const CreatePopUp = connect(mapStateToProps, mapDispatchToProps)(PureCreateModal)
