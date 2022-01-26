import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

// Require Modal Component
import { AddExistPopUp } from '../Component/addexistmodal';
import { SelectCardPopUp } from '../Component/selectcardmodal';
import { CreatePopUp } from '../Component/createmodal';
// Require Css
import classes from './addnewmodal.module.css'

class PureModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectModal: false,
            setCreatePopUp: false,
            modal: false,
            type: ""
        };
    }
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    changeTypeClass() {
        this.setState({
            type: "class"
        })
    }
    changeTypeSet() {
        this.setState({
            type: "set"
        })
    }

    openSelect() {
        this.setState({
            selectModal: !this.state.selectModal,
        })
    }

    setCreatePopUp() {
        this.setState({
            setCreatePopUp: !this.state.setCreatePopUp,
            type: "set"
        })
    }


    render() {
        const isClass = this.props.create.type === "class";
        let button
        if (isClass) {
            button = <div onClick={() => { this.setCreatePopUp() }} className={classes.addbtn}>
                <i className="fas fa-plus" />
            </div>;
        } else {
            button = <div onClick={() => { this.openSelect() }} className={classes.addbtn}>
                <i className="fas fa-plus" />
            </div>;
        }
        
        return (
            <Modal isOpen={this.props.create.modal} toggle={this.props.toggle} className={classes.addnewmodal}>
                <ModalHeader >Add New {this.props.create.type === "class" ? "Set" : this.props.create.type === "set" ? "Card" : null}</ModalHeader>
                <ModalBody>
                    {this.props.create.type === "class" ?
                        <CreatePopUp create={this.state} toggle={() => { this.setCreatePopUp();this.props.toggle() }} match={this.props.match} navigate={(e) => this.navigateSet(e)} /> :
                        <SelectCardPopUp 
                        selectCard={this.state} 
                        navigate={(e) => { this.props.navigate(e) }} 
                        navigateNewFlashcard={(e) => { this.props.navigateNewFlashcard(e) }} 
                        navigateNewQuizcard={(e) => { this.props.navigateNewQuizcard(e) }} 
                        navigateNewDictationcard={(e) => { this.props.navigateNewDictationcard(e) }} 
                        toggle={() => {this.openSelect();this.props.toggle()}} />}
                    <AddExistPopUp create={this.state} 
                    allCard={this.props.allCard} 
                    correctClass={this.props.correctClass} 
                    correctSet={this.props.correctSet}
                    match={this.props.match} 
                    toggle={() => {this.toggle();this.props.toggle()}} />

                    <div className="d-inline-flex row">
                        <div className="col m-3 p-3 border border-4 rounded-lg d-inline-flex">
                            {button}
                            <div >
                                <div className="col" >
                                    <strong>
                                        Create {this.props.create.type === "class" ? "Set" : this.props.create.type === "set" ? "Card" : null}
                                    </strong>
                                </div>
                                <h6 className="col" >
                                    Click to add a new {this.props.create.type === "class" ? "Set" : this.props.create.type === "set" ? "Card" : null}
                                </h6>
                            </div>
                        </div>

                        <div className="col m-3 p-3 border border-4 rounded-lg d-inline-flex">
                            {this.props.create.type === "class" ?
                                <div onClick={() => { this.changeTypeClass(); this.toggle(); }} className={classes.addbtn}>
                                    <i className="fas fa-plus" />

                                </div> :
                                <div onClick={() => { this.changeTypeSet(); this.toggle(); }} className={classes.addbtn}>
                                    <i className="fas fa-plus" />
                                </div>

                            }

                            <div>
                                <div className="col">
                                    <strong >
                                        Existing {this.props.create.type === "class" ? "Set" : this.props.create.type === "set" ? "Card" : null}
                                    </strong>
                                </div>
                                <h6 className="col">
                                    Click to add a existing {this.props.create.type === "class" ? "Set" : this.props.create.type === "set" ? "Card" : null}
                                </h6>
                            </div>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        history: state.authStore.history,
        user: state.userStore.user,
    }
}
export const AddnewPopUp = connect(mapStateToProps, null)(PureModel)