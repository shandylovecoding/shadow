import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'

import classes from './transcript.module.css'

class PureTranscript extends React.Component {
    render(){
        return (
        <div className="col">
        <div className={classes.transcriptframe}>
            <h5> Transcript </h5>
        <form>

        <textarea onChange={(e)=>this.props.handleTranscript(e.currentTarget.value)}
          value={this.props.flashcardBody}
          className={classes.transcript}
          name={this.props.title.title}
          disabled= {this.props.title.read ? true : false}
        />
      </form>
      </div>
      </div>
        )
    }
}


const mapDispatchToProps  = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}

export const Transcript = connect (null, mapDispatchToProps)(PureTranscript)