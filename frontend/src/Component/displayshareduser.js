import React from 'react';
import { connect } from 'react-redux'
import classes from './displayshareuser.module.css'


class PureDisplayShareUser extends React.Component {

    render() {
        return (
            <>
                   {this.props.shared &&
                            this.props.shared.length > 0
                            ? this.props.shared.map(
                                (shared, j) => {
                                    return (
                                        <div key={j} data-key={shared.id} onClick={()=>{this.props.deleteShare(shared.id)}} className={classes.sharingusericon}>
                                            <img src={shared.picture} alt="Avatar"></img>
                                        </div>
                                    )
                                }
                            ) : null
                        }
            </>
        )

    }
}


export const DisplayShareUser = connect(null, null)(PureDisplayShareUser)