import axios from "axios";

export const ADD_SUBMISSION_DICTATIONCARD = "ADD_SUBMISSION_DICTATIONCARD";
export const ADD_SUBMISSION_FLASHCARD = "ADD_SUBMISSION_FLASHCARD";
export const ADD_SUBMISSION_QUIZCARD = "ADD_SUBMISSION_QUIZCARD";
export const ADD_SUBMISSION_TRUEFALSE = "ADD_SUBMISSION_TRUEFALSE";

export const ADD_FEEDBACK_DICTATIONCARD = "ADD_FEEDBACK_DICTATIONCARD";

export const DELETE_SUBMISSION_DICTATIONCARD = "DELETE_SUBMISSION_DICTATIONCARD";
export const DELETE_SUBMISSION_FLASHCARD = "DELETE_SUBMISSION_FLASHCARD";
export const DELETE_SUBMISSION_MULTIPLECHOICE = "DELETE_SUBMISSION_MULTIPLECHOICE";
export const DELETE_SUBMISSION_TRUEFALSE = "DELETE_SUBMISSION_TRUEFALSE";

export const addSubmissionThunk = (submission) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/card/submission", submission)
        .then((data) => {
            if (submission.type === "dictation") {
                dispatch({
                    type: ADD_SUBMISSION_DICTATIONCARD,
                    payload: { user_id: data.data.userId, displayName: data.data.displayName, picture: data.data.picture,dictationcard_id: submission.dictationcardId,  dictation_id: submission.dictationId, id: data.data.dictationSubmissionId, dictationcardSubmissionPath: submission.dictationcardSubmissionPath, dictationcardSubmissionStatus: true }
                })
                submission.feedback.dictationSubmissionId = data.data.dictationSubmissionId;
            } else if (submission.type === "flashcard") {
                dispatch({
                    type: ADD_SUBMISSION_FLASHCARD,
                    payload: { id: data.data.flashcardSubmissionId, user_id: data.data.userId, displayName: data.data.displayName, picture: data.data.picture, flashcard_id: submission.flashcardId, flashcardSubmissionRecording: submission.flashcardSubmissionRecording, flashcardSubmissionStatus: true }
                })
            } else if (submission.type === "quizcard") {
                dispatch({
                    type: ADD_SUBMISSION_QUIZCARD,
                    payload: { 
                        user_id: data.data.user_id, 
                        displayName: data.data.displayName, 
                        picture: data.data.picture, 
                        quizcardQuestionSubmission: submission.quizcardQuestionSubmission, 
                        quizcard_id: submission.quizcardId, 
                        question_id: submission.quizcardQuestionSubmission.questionId, 
                        quizcardQuestionMarking: data.data.quizcardQuestionMarking 
                    }
                })
            }
        })
        .then(() => {
            
            return axios.post("http://localhost:8080/api/card/submission/feedback", submission.feedback)
        })
        .then((data) => {
            if (submission.type === "dictation") {
            dispatch({
                type: ADD_FEEDBACK_DICTATIONCARD,
                payload: {user_id: data.data.user_id, displayName: data.data.displayName, picture: data.data.picture, dictation_id: submission.dictationId, dictationcard_id: submission.dictationcardId, dictationcardSubmission_id: data.data.dictationSubmissionId, dictationcardFeedback_id: data.data.dictationFeedbackId, dictationcardFeedbackBody: data.data.dictationFeedbackBody}
            })
        }
        })
}

export const deleteSubmissionThunk = (submission) => async (dispatch) => {
    return axios.delete("http://localhost:8080/api/card/submission", submission)
        .then((response) => {
            if (submission.type === "dictation") {
                dispatch({
                    type: DELETE_SUBMISSION_DICTATIONCARD,
                    payload: { dictationcard_id: submission.dictationcardId, dictationcardSubmission_id: submission.dictationcardSubmissionId }
                })
            } else if (submission.type === "flashcard") {
                dispatch({
                    type: DELETE_SUBMISSION_FLASHCARD,
                    payload: { flashcard_id: submission.flashcardId, flashcardSubmission_id: submission.flashcardSubmissionId }
                })
            } else if (submission.type === "multipleChoice") {
                dispatch({
                    type: DELETE_SUBMISSION_MULTIPLECHOICE,
                    payload: { multipleChoice_id: submission.multipleChoiceId, multiplechoiceSubmission_id: submission.multiplechoiceSubmissionId }
                })
            } else if (submission.type === "trueFalse") {
                dispatch({
                    type: DELETE_SUBMISSION_TRUEFALSE,
                    payload: { trueFalse_id: submission.trueFalseId, truefalseSubmission_id: submission.truefalseSubmissionId }
                })
            }
        })
}