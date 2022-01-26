class FeedbackService {
    constructor(knex) {
        this.knex = knex
    }

    //Method to add feedback
    async add(body) {
        if (body.type === "flashcard") {
            console.log("Adding feedback to flashcard")
            let user_id = await this.knex("user").where({
                email: body.email
            }).select("id");

            return this.knex
            .insert({
                user_id: user_id[0].id,
                flashcardSubmission_id: body.submissionId,
                flashcardFeedbackBody: body.body,
                flashcardFeedbackTime: body.timestamp,
                flashcardFeedbackStatus: true
            })
            .into("flashcardFeedback")
            .returning("id");
        }
        else if (body.type === "dictationcard") {
            console.log("Adding feedback to dictationcard")
            let user_id = await this.knex("user").where({
                email: body.email
            }).select("id");
            return this.knex
            .insert({
                user_id: user_id[0].id,
                dictationSubmission_id: body.dictationSubmissionId,
                dictationFeedbackBody: body.body,
                dictationFeedbackStatus: true
            })
            .into("dictationFeedback")
            .returning("id");
        }
        else {
            return "card type not recognised"
        }
    }

    //Method to edit feedback
    async edit(body) {
        if (body.type === "dictationcard") {
            console.log("Editing feedback to dictationcard")
            return this.knex("dictationFeedback")
            .where("id", body.dictationFeedbackId)
            .update({
                dictationFeedbackBody: body.dictationFeedbackBody,
            })
            .returning("id");
        }
    }

    //Method to delete feedback
    async delete(body) {
        if (body.type === "flashcard") {
            console.log("Deleting feedback to flashcard")
            return this.knex("flashcardFeedback")
            .where("flashcardFeedback.id", body.feedbackId)
            .update({
                flashcardFeedbackStatus: false
            })
        }
        else if (body.type === "dictationcard") {
            console.log("Deleting feedback to dictationcard")
            return this.knex("dictationFeedback")
            .where("dictationFeedback.id", body.feedbackId)
            .update({
                dictationFeedbackStatus: false
            })
        }
        else {
            return "card type not recognised"
        }
    }
    async feedback(body){
        if (body.type === "flashcard"){
            console.log("Listing details of flashcardFeedback");
            return this.knex("flashcardFeedback")
            .join("user", "flashcardFeedback.user_id", "=", "user.id")
            .join("flashcardSubmission", "flashcardFeedback.flashcardSubmission_id", "flashcardSubmission.id")
            .where("flashcardFeedback.id", body.flashcardFeedbackId)
            .select("user.id as user_id","user.displayName","user.picture",  "flashcardFeedback.id", "flashcardFeedback.flashcardSubmission_id", "flashcardFeedback.flashcardFeedbackBody", "flashcardFeedback.flashcardFeedbackTime", "flashcardSubmission.flashcard_id as fcid")
            .then( (feedback) => {   
                return ({
                        user_id: feedback[0].user_id,
                        displayName: feedback[0].displayName,
                        picture: feedback[0].picture,
                        flashcardSubmissionId: feedback[0].flashcardSubmission_id,
                        flashcardFeedbackId: feedback[0].id,
                        flashcardFeedbackBody: feedback[0].flashcardFeedbackBody,
                        flashcardFeedbackTime: feedback[0].flashcardFeedbackTime,
                        flashcard_id: feedback[0].fcid
                    });
            })
            .catch((e)=>{
                console.log(e);
            })
        } 
        else if (body.type === "dictationcard"){
            return this.knex("dictationFeedback")
            .join("user", "dictationFeedback.user_id", "=", "user.id")
            .join("dictationSubmission", "dictationFeedback.dictationSubmission_id", "=", "dictationSubmission.id")
            .where("dictationFeedback.id", body.dictationFeedbackId)
            .select("user.id as user_id", "user.displayName","user.picture", "dictationSubmission.dictation_id", "dictationFeedback.id", "dictationFeedback.dictationSubmission_id", "dictationFeedback.dictationFeedbackBody")
            .then((feedback) => {
                console.log("FEEDNACL", feedback)
                    return ({
                        user_id: feedback[0].user_id,
                        displayName: feedback[0].displayName,
                        picture: feedback[0].picture,
                        dictation_id: feedback[0].dictation_id,
                        dictationSubmissionId: feedback[0].dictationSubmission_id,
                        dictationFeedbackId: body.dictationFeedbackId,
                        dictationFeedbackBody: feedback[0].dictationFeedbackBody,
                    });
            })
            .catch((err) => console.log(err))
        
        } 


    }

    async list(body) {
        if (body.type === "flashcard") {
            console.log("Listing feedback to flashcard")
            return this.knex("flashcardFeedback")
            .join("user", "flashcardFeedback.user_id", "=", "user.id")
            .join("flashcardSubmission", "flashcardFeedback.flashcardSubmission_id", "=", "flashcardSubmission.id")
            .join("flashcard", "flashcardSubmission.flashcard_id", "=", "flashcard.id")
            .where("flashcard.id", body.cardId)
            .select("user.displayName", "flashcardFeedback.flashcardFeedbackBody", "flashcardFeedback.flashcardFeedbackTime", "flashcardFeedback.flashcardSubmission_id", "flashcardFeedback.id")
            .then((feedbacks) => {
                return feedbacks.map((feedback) => {
                    return ({
                        displayName: feedback.displayName,
                        flashcardSubmissionId: feedback.flashcardSubmission_id,
                        flashcardFeedbackId: feedback.id,
                        flashcardFeedbackBody: feedback.flashcardFeedbackBody,
                        flashcardFeedbackTime: feedback.flashcardFeedbackTime,
                    })
                })
            })
        }
        else if (body.type === "dictationcard") {
            console.log("Listing feedback to dictationcard")
            return this.knex("dictationFeedback")
            .join("user", "dictationFeedback.user_id", "=", "user.id")
            .join("dictationSubmission", "dictationFeedback.dictationSubmission_id", "=", "dictationSubmission.id")
            .join("dictation", "dictationSubmission.dictation_id", "=", "dictation.id")
            .where("dictation.id", body.cardId)
            .select("user.displayName", "user.picture", "dictationFeedback.dictationFeedbackBody",  "dictationFeedback.dictationSubmission_id", "dictationFeedback.id")
            .then((feedbacks) => {
                return feedbacks.map((feedback) => {
                    return ({
                        picture: feedback.picture,
                        displayName: feedback.displayName,
                        dictationSubmissionId: feedback.dictationSubmission_id,
                        dictationFeedbackId: feedback.id,
                        dictationFeedbackBody: feedback.dictationFeedbackBody
                    })
                })
            })
        }
        else {
            return "card type not recognised"
        }
    }
}

module.exports = FeedbackService;