import React from "react";
import { connect } from "react-redux";
// Require Action
import { getdataThunk } from '../Redux/actions/action'
import { deleteTag } from '../Redux/actions/tagAction';
import { deleteSharingThunk } from '../Redux/actions/sharingAction';
import { editClassroom } from '../Redux/actions/classroomAction';



// Require Component
import { DisplayShareUser } from '../Component/displayshareduser'
import { DisplaySetModule } from '../Component/displaysetmodule'
import { DisplayClassroomTag } from '../Component/displayclassroomtag';

// Require Modal Component
import { NewSharePopUp } from "../Component/sharemodal";
import { NewTagPopUp } from "../Component/newtagmodal";
import { AddnewPopUp } from '../Component/addnewmodal'

// Require Css
import classes from './ViewClassroom.module.css'

class ViewClassroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            modal: false,
            type: "",
            tagModal: false,
            shareModal: false,
            classroomTitle: "",
            classroomDesc: "",
            correctSet: [],
            correctTag: [],
            correctShare: [],
            correctClass: [],
            trigger: false,
        };
    }

    async componentDidMount() {
        await this.props.getdata({ email: localStorage.getItem("email") });

    }

    async componentWillReceiveProps(nextProps) {

        await this.setState({
            correctClass: nextProps.classrooms.filter(classroom => classroom.id === parseInt(this.props.match.params.id)),
        })
        if (this.state.correctClass[0] !== undefined) {
            const correctProps = nextProps.classrooms.filter(filter => filter.id === parseInt(this.state.correctClass[0].id))
            if (correctProps[0].bridge !== undefined) {
                if (correctProps[0].bridge.length >= 0) {
                    let correctSets = correctProps[0].bridge.map((changed) => {
                        const newestState = nextProps.sets.filter(changedSet => changedSet.id === changed.set_id)
                        return newestState[0]
                    });
                    this.setState({
                        title: this.state.correctClass[0].title,
                        description: this.state.correctClass[0].description,
                        correctSet: correctSets,
                        correctTag: correctProps[0].tags,
                        correctShare: correctProps[0].shared
                    });
                }
            }
        }
    }

    async componentDidUpdate(prevProps){
        if(prevProps.location.pathname !== this.props.location.pathname){
            await this.props.getdata({ email: localStorage.getItem("email") });
        }
    }

    getclassroom() {
        if (this.state.correctClass[0].bridge != null) {
            const lmao = this.state.correctClass[0].bridge.map((setId) => {
                const newestState = this.props.sets.filter(set => set.id === setId.set_id)
                return newestState[0]
            });
            this.setState({
                correctSet: lmao,
                correctTag: this.state.correctClass[0].tags,
                correctShare: this.state.correctClass[0].shared
            })
        } else {
            return null
        }
    }

    handleHeading(title) {
        this.setState({
            classroomTitle: title
        })
    }

    handleTranscript(desc) {
        this.setState({
            classroomDesc: desc
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            trigger: !this.state.trigger
        });
    }
    changeTypeClass() {
        this.setState({
            type: "class"
        })
    }

    tagToggle() {
        this.setState({
            tagModal: !this.state.tagModal
        })
    }

    shareToggle() {
        this.setState({
            shareModal: !this.state.shareModal
        })
    }


    navigateSet(e) {
        if (e.target.attributes["data-key"].value === "delete") {
            return
        } else {
            this.props.history.push({
                pathname: `/viewset/${e.target.attributes["data-key"].value}`,
            })
        }
    }
    deleteTag(tagId) {
        this.props.deleteTag({
            type: "class",
            tagId: tagId,
            classroomId: this.state.correctClass[0].id
        })
    }
    deleteShare(sharedId) {
        this.props.deleteShare({
            sharedId: sharedId,
            classroomId: this.state.correctClass[0].id
        })
    }
    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    editHeading() {
        this.props.editClassroom({
            email: this.props.user.email,
            title: this.state.title,
            description: this.state.description,
            classroomId: this.state.correctClass[0].id
        })
    }

    render() {
        return (
            <div className="page">
                <div className={classes.viewclassroom}>
                    <div className="row d-flex p-4">
                        {/* <div className="col-8"> */}
                        {this.props.user.role === "teacher" ?
                            
                            <div className="col-8">
                                <input type="text" name="title" value={this.state.title|| ''} onChange={(e) => { this.handleChange(e) }} onBlur={() => { this.editHeading() }} className={classes.editTitle} />
                                <input type="text" name="description" value={this.state.description|| ''} onChange={(e) => { this.handleChange(e) }} onBlur={() => { this.editHeading() }} className={classes.editDescription} />
                            </div>
                            :
                            <div className="col-8">
                                <h1>{this.state.title}</h1>
                                <h6>{this.state.description}</h6>
                            </div>
                        }
                        {/* </div> */}
                    </div>

                    {/* diaplay Tags */}
                    <div className="row d-flex pl-4 pr-4 ml-3">
                        <DisplayClassroomTag tags={this.state.correctTag} deleteTag={(tagId) => { this.deleteTag(tagId) }} />
                        <NewTagPopUp addTag={this.state} location={this.state.correctClass[0]} toggle={() => this.tagToggle()} />
                        <span className="d-inline-flex ">
                            {this.props.user.role === "teacher" ? <button onClick={() => { this.tagToggle(); this.changeTypeClass(); }} className={classes.addtagbutton}><i className="fas fa-plus"></i></button> : null}
                        </span>
                    </div>


                    <div className="row d-flex pl-4 pr-4 mt-3 ml-3">
                        {/* Share User */}
                        <DisplayShareUser shared={this.state.correctShare} deleteShare={(sharedId) => { this.deleteShare(sharedId) }} />
                        {/* share user add button */}
                        <NewSharePopUp match={this.props.match} share={this.state} location={this.state.correctClass[0]} toggle={() => this.shareToggle()} />
                        <span className={classes.sharingusericon}>
                            {this.props.user.role === "teacher" ? <button onClick={() => this.shareToggle()} className={classes.addusericon}><i className="fas fa-plus"></i></button> : null}
                        </span>
                    </div>





                    {/* Add button */}
                    <div className="row d-flex mt-4 m-3">
                        <AddnewPopUp match={this.props.match} correctClass={this.state.correctClass} create={this.state} toggle={() => { this.changeTypeClass(); this.toggle() }} navigate={(e) => this.navigateSet(e)} />
                        {this.props.user.role === "teacher" ? <div onClick={() => { this.changeTypeClass(); this.toggle(); }} className={classes.set}>
                            <div className={classes.addbtn}>
                                <i className="fas fa-plus" />
                            </div>
                            <div className="col-6 m-1 p-1 rounded-lg d-flex align-items-center">
                                <span>Add new or exist set</span>
                            </div>
                        </div> : null}

                        <DisplaySetModule  user={this.props.user} match={this.props.match} sets={this.props.sets} classroom={this.props.classrooms} correctClass={this.state.correctClass} correctSets={this.state.correctSet} navigate={(e) => this.navigateSet(e)} />

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        email: state.authStore.email,
        user: state.userStore.user,
        classrooms: state.classroomStore.classrooms,
        sets: state.setStore.sets,
        cards: state.cardStore.card,
        tags: state.tagStore.tags,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
        deleteTag: (tag) => {
            dispatch(deleteTag(tag))
        },
        deleteShare: (shared) => {
            dispatch(deleteSharingThunk(shared))
        },
        editClassroom: (editHeading) => {
            dispatch(editClassroom(editHeading))
        }
    }
}

const connectedViewClassroom = connect(mapStateToProps, mapDispatchToProps)(ViewClassroom)
export { connectedViewClassroom as ViewClassroom };

