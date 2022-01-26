import React from 'react';
import { connect } from 'react-redux'

import classes from './displayflashcardfeedback.module.css'

class PureDisplayFlashcardFeedbackModule extends React.Component {
    

    render() {
        return (
            <>
                {this.props.feedback[0].feedback &&
                    this.props.feedback[0].feedback.length > 0 ?
                    this.props.feedback[0].feedback.map((fb, j) => {
                            return (
                                <div key={j} data-key={fb.flashcardFeedback_id} className={classes.scrollfeedbackcard}>
                                    <div>
                                        <table>
                                            <tbody>
                                                <tr className={classes.scrollfeedbackrow}>
                                                    <td className={classes.commentinguser}><img src={fb.picture} alt="Avatar"></img></td>

                                                    <td className={classes.feedback}>{fb.flashcardFeedbackBody}</td>
                                                    
                                                    <th className={classes.feedbacktime}>{fb.flashcardFeedbackTime}</th>
                                                    
                                                    <td className={classes.removingfeedback}><span className={classes.removingfeedbackbtn}><i onClick={()=>{this.props.handleDelete(fb.flashcardFeedback_id)}} className="fa fa-trash" aria-hidden="true"></i></span></td>
                                                
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                    }
                    )
                    : null
                }
            </>
        );
    }
}
const mapStateToProps = (state) => {

    return {
        cards: state.cardStore.card,
    }
}

export const DisplayFlashcardFeedback = connect(mapStateToProps, null)(PureDisplayFlashcardFeedbackModule)
