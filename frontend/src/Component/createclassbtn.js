import React from 'react';
import { connect } from 'react-redux'

// import { Link } from 'react-router-dom';
// import '../Component/main.css'
import classes from './createclassbtn.module.css'

import { CreatePopUp } from '../Component/createmodal'

class PureCreateClassBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            classModal: false
    }
}

    classToggle() {
        this.setState({
            classModal: !this.state.classModal
        });
    }

    render(){
        return(
            <div className={classes.createclass}>
                <CreatePopUp classroom={this.state} toggle={() => this.classToggle()}/>
                <button onClick={() => { this.classToggle(); }}><i className="fas fa-plus"></i></button>
            </div>
        )
    }
}


export const CreateClassBtn = connect(null, null)(PureCreateClassBtn)