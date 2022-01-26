import React from 'react';
import { connect } from 'react-redux'

import classes from './displayclassroomtag.module.css'

class PureDisplayClassroomTag extends React.Component {


    
    render() {
        return (
            <>
                {this.props.tags && this.props.tags.length > 0 ?this.props.tags.map((tag, i) => {
                        return (
                            <span key={i} onClick={()=>{this.props.deleteTag(tag.id)}} data-key="delete" className={classes.tagbutton}>
                                #{tag.body}
                            </span>
                        )
                }): null}
            </>
        )

    }
}



export const DisplayClassroomTag = connect(null, null)(PureDisplayClassroomTag)