import React from 'react';
import { connect } from 'react-redux'

// import { Link } from 'react-router-dom';
// import '../Component/main.css'
import classes from './createsetbtn.module.css'

import { CreateSetModal } from '../Component/createsetmodal'

class PureCreateSetBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            setModal: false
    }
}

setToggle() {
    this.setState({
        setModal: !this.state.setModal
    });
}

    render(){
        return(
            <div className={classes.createset}>
                <CreateSetModal set={this.state} toggle={() => this.setToggle()}/>
                <button onClick={() => { this.setToggle(); }}><i className="fas fa-plus"></i></button>
            </div>
        )
    }
}


export const CreateSetBtn = connect(null, null)(PureCreateSetBtn)