import React from 'react';
import { connect } from 'react-redux'
// Require Action
import { getdataThunk } from '../Redux/actions/action'

// Require Component
import { DisplayClassModule } from '../Component/displayclassmodule'
import { DisplaySetModule } from '../Component/displaysetmodule'

// Require Css
import classes from './Dashboard.module.css'
// import '../Component/main.css'


class ViewSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashSet: "dashSet",
            searchClassrooms: [],
            searchSets: []
        };
    }

    async componentDidMount() {
        await this.props.getdata({ email: localStorage.getItem('email') })
    }

    componentWillReceiveProps() {

        let classroomFiltered = this.props.classrooms.filter((classroom) => {
            return (classroom.tags.map((tag) => {
                if (tag.body === this.props.match.params.search) {
                    return tag.body
                } else {
                    return false
                }
            }).includes(this.props.match.params.search) === true)
        })


        let setFiltered = this.props.sets.filter((set) => {
            return (set.tags.map((tag) => {
                if (tag.body === this.props.match.params.search) {
                    return tag.body
                } else {
                    return false
                }
            }).includes(this.props.match.params.search) === true)
        })
        
        this.setState({
            searchClassrooms: classroomFiltered,
            searchSets: setFiltered
        })
    }

    navigateClass(e){
        if (e.target.attributes["data-key"].value === "delete") {
            return
        } else {
        this.props.history.push({
            pathname:`/viewclassroom/${e.target.attributes["data-key"].value}`,
        })
    }}
    navigateSet(e){
        if (e.target.attributes["data-key"].value === "delete") {
            return
        } else {
        this.props.history.push({
            pathname:`/viewset/${e.target.attributes["data-key"].value}`,
        })
    }}

    render() {
        return (
            <div className="page">
                
                <div className={classes.dashboard}>

                <div className="row d-flex p-2">
                        <h1>Search for tag: {this.props.match.params.search}</h1>
                    </div>
                    <div className="row d-flex p-2">
                        <h1>Classrooms:</h1>
                    </div>
                    <div className="row d-flex pl-2">
                        {this.state.searchClassrooms.length === 0 ? <div>No Classrooms Found</div> : <DisplayClassModule  user={this.props.user} classrooms={this.state.searchClassrooms} navigate={(e, classId) => { this.navigateClass(e, classId) }} />}
                    </div>
                    <div className="row d-flex p-2">
                        <h1>Sets:</h1>
                    </div>
                    <div className="row d-flex pl-2">
                        {this.state.searchSets.length === 0 ? <div>No Sets Found</div> : <DisplaySetModule  user={this.props.user} sets={this.state.searchSets} dash={this.state.dashSet} navigate={(e) => { this.navigateSet(e) }} />}
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

export const Search = connect(mapStateToProps,mapDispatchToProps)(ViewSearch)
