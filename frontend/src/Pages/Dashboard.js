import React from 'react';
import { connect } from 'react-redux'
// Require Action
import { getdataThunk } from '../Redux/actions/action'

// Require Component
import { DisplayClassModule } from '../Component/displayclassmodule'
import { DisplaySetModule } from '../Component/displaysetmodule'
import { DisplayCardModule } from '../Component/displaycardmodule';

// Require Modal Component
import { CreatePopUp } from '../Component/createmodal'

// Require Css
import classes from './Dashboard.module.css'
// import '../Component/main.css'


class PureDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: "",
            classroomId: "",
            dashSet: "dashSet",
        };
    }

    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email') })
    }
    componentDidUpdate(prevProps){
        if(prevProps.location.pathname !== this.props.location.pathname){
            this.props.getdata({ email: localStorage.getItem("email") });
        }
    }
    // for create
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

    navigateClass(e){
        if (e.target.attributes["data-key"].value === "delete" || e.target.attributes["data-key"].value === "dropdown" || e.target.attributes["data-key"].value === "edit" ) {
            return
        } else {
        this.props.history.push({
            pathname:`/viewclassroom/${e.target.attributes["data-key"].value}`,
        })
    }}
    navigateSet(e){
        if (e.target.attributes["data-key"].value === "delete" || e.target.attributes["data-key"].value === "dropdown" || e.target.attributes["data-key"].value === "edit" ) {
            return
        } else {
        this.props.history.push({
            pathname:`/viewset/${e.target.attributes["data-key"].value}`,
        })
    }}
    navigateCard(e) {
        if (e.target.attributes["data-del"].value === "delete" || e.target.attributes["data-key"].value === "dropdown" || e.target.attributes["data-key"].value === "edit" ) {
            return
        } else if (e.target.attributes["data-type"].value === "flashcard") {
            this.props.history.push({
                pathname: `/viewflashcard/${e.target.attributes["data-key"].value}`
            })
        } else if (e.target.attributes["data-type"].value === "quizcard") {
            this.props.history.push({
                pathname: `/viewquizcard/${e.target.attributes["data-key"].value}`
            })
        } else if (e.target.attributes["data-type"].value === "dictationcard") {
            this.props.history.push({
                pathname: `/viewdictationcard/${e.target.attributes["data-key"].value}`
            })
        } else {
            return
        }
    }

    render() {
            return (
                <div className="page">
                    <div className={classes.dashboard}>
    
                        <div className="row d-flex p-2">
                            <CreatePopUp create={this.state} toggle={() => this.toggle()}/>
                            <h1>My Classroom</h1>
                            <span className={classes.createclassroombtn}>
                                {this.props.user.role === "teacher" ? <div onClick={() => { this.changeTypeClass(); this.toggle(); }} className={classes.addbtn}><i className="fa fa-plus"></i></div> : null}
                            </span>
                        </div>
    
                        <div className="row d-flex pl-2">
                            <DisplayClassModule 
                            user={this.props.user} 
                            classrooms={this.props.classrooms}  
                            navigate={(e, classId) => { this.navigateClass(e, classId) }} 
                            edit= {this.state} 
                            changeTypeClass={ () => {this.changeTypeClass()} } 
                            editToggle={() => {this.editToggle()}} />
                        </div>
    
                        <div className="row d-flex p-2">
                            <CreatePopUp create={this.state} dash={this.state.dashSet} toggle={() => this.toggle()} history={this.props.history} />
                            {this.props.user.role === "teacher" ? <h1>My Set</h1> : null}
                            <span className={classes.createsetbtn}>
                                {this.props.user.role === "teacher" ? <div onClick={() => { this.changeTypeSet(); this.toggle(); }} className={classes.addbtn}><i className="fa fa-plus"></i></div> : null}
                            </span>
                        </div>
    
                        <div className="row d-flex pl-2">
                        {this.props.user.role === "teacher" ?
                            <DisplaySetModule 
                            user={this.props.user} 
                            sets={this.props.sets} 
                            dash={this.state.dashSet} 
                            navigate={(e) => { this.navigateSet(e) }} 
                            edit= {this.state} 
                            changeTypeSet={ () => {this.changeTypeSet()} } 
                            editToggle={() => {this.editToggle()}} />
                        : null}
                        </div>
    
                        <div className="row d-flex p-2">
                                {this.props.user.role === "teacher" ? <h1>My Card</h1> : null}
                        </div>
    
                        <div className="row d-flex pl-2">
                            {this.props.user.role === "teacher" ? <DisplayCardModule user={this.props.user} dash={this.state.dashSet} match={this.props.match} cards={this.props.cards} navigate={(e)=>this.navigateCard(e)}/> : null}
                        </div>
    
                        {this.props.loading && <div> Loading...</div>}
                        {this.props.error && <div> Oops! Something Wrong with Our Server</div>}
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
    }
}


export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(PureDashboard)
