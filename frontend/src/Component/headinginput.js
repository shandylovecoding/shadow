import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'

import classes from './headinginput.module.css'

class PureHeadingInput extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      type: "",
      read: "readonly"
    }
  }
  render() {
    return (
      <>
        <form className={classes.headingframe}>
          <input onChange={(e) => this.props.handleHeading(e.currentTarget.value)}
            type="text"
            placeholder={this.props.card.type === "flashcard" 
            ? "Untitled Flashcard" 
            :
              this.props.card.type === "quizcard" 
              ? "Untitled Quizcard" 
              : this.props.card.type === "dictationcard"
                ? "Untitled Dictation Card" 
                : "Untitled Card"} 
            className={classes.title}
          />
          {this.props.card.type && this.props.card.type ? null : <input
            type="text"
            placeholder="Insert a description"
            className={classes.description}
          />}
        </form>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getdata: (email) => {
      dispatch(getdataThunk(email))
    }
  }
}

export const HeadingInput = connect(null, mapDispatchToProps)(PureHeadingInput)

