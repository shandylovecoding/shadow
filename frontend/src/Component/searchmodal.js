import React from 'react';
import { connect } from 'react-redux'

import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";

class PureSearchModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            criteria: "",
        }
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }

    clearInput = () => {
        this.setState({
            criteria: ""
        })
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.search.searchModal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}> Search </ModalHeader>
                    <ModalBody>
                        <Form>
                            <input onChange={this.onChangeField.bind(this, 'criteria')} value={this.state.criteria} type="text" className="form-control mb-4" placeholder="Search through your tags..."/>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                    <Link to={'/search/'+ this.state.criteria} className="w-100 mb-2"><button onClick={() => { this.clearInput();this.props.toggle()}} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Search</button></Link>

                        <button onClick={()=>{this.props.toggle()}} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


export const SearchPopUp = connect(null, null)(PureSearchModal)