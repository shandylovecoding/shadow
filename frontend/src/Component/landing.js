import React from 'react'
import { connect } from 'react-redux'

import { Login } from '../Pages/Login';
import { Canvas } from './canvas';
import { NavBar } from '../Component/navbar';
import { Dashboard } from '../Pages/Dashboard';
import { Account } from '../Pages/Account';
import { Search } from '../Pages/ViewSearch';
import { ViewClassroom } from '../Pages/ViewClassroom';
import { ViewSet } from '../Pages/ViewSet';
import { CreateFlashcard } from '../Pages/CreateFlashcard';
import { ViewFlashCard } from '../Pages/ViewFlashCard';
import { CreateQuizcard } from '../Pages/CreateQuizcard';
import { ViewQuizcard } from '../Pages/ViewQuizcard';
import { ViewQuizcardSubmission } from '../Pages/ViewQuizcardSubmission';
import { CreateDictationcard } from '../Pages/CreateDictationcard';
import { ViewDictationcard } from '../Pages/ViewDictationcard';
import { ViewDictationcardSubmission } from '../Pages/ViewDictationCardSubmission';


import { BrowserRouter, Route, Switch } from "react-router-dom";

// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PrivateRoute from './PrivateRoute'
import './landing.module.css'
class PureLanding extends React.Component {
    render() {
        return (

            <BrowserRouter>
                {/* Empty Route for getting the location key */}
                <Route render={({ location }) => (
                    <>
                        <div className="nav">
                            {location.pathname !== '/canvas/:userId/:canvasId' && location.pathname !== '/login' && location.pathname !== '/signup'  && <NavBar/>}
                        </div>
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/canvas/:userId/:canvasId" component={Canvas} />

                                <PrivateRoute exact path="/" component={Dashboard} />
                                <PrivateRoute path="/account" component={Account} />
                                <PrivateRoute path="/search/:search" component={Search} />
                                <PrivateRoute path="/viewclassroom/:id" component={ViewClassroom} />
                                <PrivateRoute path="/viewset/:id" component={ViewSet} />
                                <PrivateRoute path="/createFlashcard/:setId" component={CreateFlashcard} />
                                <PrivateRoute path="/viewflashcard/:id" component={ViewFlashCard} />
                                <PrivateRoute path="/createquizcard/:setId" component={CreateQuizcard} />
                                <PrivateRoute path="/viewquizcard/:id" component={ViewQuizcard} />
                                <PrivateRoute path="/viewquizcardSubmission/:id" component={ViewQuizcardSubmission} />
                                <PrivateRoute path="/createdictationcard/:setId" component={CreateDictationcard} />
                                <PrivateRoute path="/viewdictationcard/:id" component={ViewDictationcard} />
                                <PrivateRoute path="/viewdictationCardSubmission/:id" component={ViewDictationcardSubmission} />
                            </Switch>
                    </>
                )}/>

            </BrowserRouter >
        )
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

export const Landing = connect(mapStateToProps, null)(PureLanding)

export default Landing