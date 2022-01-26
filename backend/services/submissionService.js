class SubmissionService {
    constructor(knex) {
        this.knex = knex;
    }

    //Method to add submission
    async add(body) {
        if (body.type === "flashcard") {
            console.log("Adding submission to flashcard");
            let user_id = await this.knex("user").where({
                email: body.email
            }).select("id");
            return this.knex
                .insert({
                    user_id: user_id[0].id,
                    flashcard_id: body.flashcardId,
                    flashcardSubmissionRecording: body.flashcardSubmissionRecording,
                    flashcardSubmissionStatus: true
                })
                .into("flashcardSubmission")
                .returning("id");
        }
        else if (body.type === "dictation") {
            console.log("Adding submission to dictation");
            let user_id = await this.knex("user").where({
                email: body.email
            }).select("id");
            return this.knex
                .insert({
                    user_id: user_id[0].id,
                    dictation_id: body.dictationId,
                    dictationSubmissionPath: body.dictationcardSubmissionPath,
                    dictationSubmissionStatus: true
                })
                .into("dictationSubmission")
                .returning("id");
        }
        else if (body.type === "quizcard") {
            console.log("Adding submission to quizcard");
            let user_id = await this.knex("user").where({
                email: body.email
            }).select("id");
                return this.knex
                    .insert({
                        user_id: user_id[0].id,
                        quizcardQuestion_id: body.quizcardQuestionSubmission.questionId,
                        quizcardQuestionSubmission: body.quizcardQuestionSubmission.submission,
                        quizcardQuestionMarking: body.quizcardQuestionMarking
                    })
                    .into("quizcardQuestionSubmission")
                    .returning("id")
                    .catch((err)=>{
                        console.log(err)
                    })
        }
        else {
            return "card type not recognized";
        }
    }

        //Method to delete submission
        async delete (body) {
            if (body.type === "flashcard") {
                console.log("Deleting submission from flashcard");
                return this.knex("flashcardSubmission")
                    .where("flashcardSubmission.id", body.flashcardSubmissionId)
                    .update({
                        flashcardSubmissionStatus: false
                    });

            }
            else if (body.type === "dictation") {
                console.log("Deleting submission from dictation");
                return this.knex("dictationSubmission")
                    .where("dictationSubmission.id", body.dictationSubmissionId)
                    .update({
                        dictationcardSubmissionStatus: false
                    });
            }
            else if (body.type === "quizcard") {
                console.log("Deleting submission from quizcard");
                return this.knex("quizcardQuestionSubmission")
                    .where("quizcardQuestionSubmission.id", body.quizcardQuestionSubmissionId)
                    .update({
                        quizcardQuestionSubmissionStatus: false
                    });
            }
            else {
                return "card type not recognized";
            }
        }

        //Method to list details of a submission
        async submission(body) {
            if (body.type === "flashcard") {
                console.log("Listing details of flashcardSubmission");
                return this.knex("flashcardSubmission")
                    .join("user", "flashcardSubmission.user_id", "=", "user.id")
                    .where("flashcardSubmission.id", body.flashcardSubmissionId)
                    .select("user.displayName", "user.id as user_id", "user.picture", "flashcardSubmission.flashcard_id", "flashcardSubmission.id", "flashcardSubmission.flashcardSubmissionRecording")
                    .then((submission) => {
                        return ({
                            userId: submission[0].user_id,
                            displayName: submission[0].displayName,
                            picture: submission[0].picture,
                            flashcardId: submission[0].flashcard_id,
                            flashcardSubmissionId: submission[0].id,
                            flashcardSubmissionRecording: submission[0].flashcardSubmissionRecording
                        });
                    })

            }
            else if (body.type === "dictation") {
                console.log("Listing details of dictationSubmission");
                return this.knex("dictationSubmission")
                    .join("user", "dictationSubmission.user_id", "=", "user.id")
                    .where("dictationSubmission.id", body.dictationSubmissionId)
                    .select("user.displayName", "user.id as user_id", "user.picture", "dictationSubmission.dictation_id", "dictationSubmission.id", "dictationSubmission.dictationSubmissionPath")
                    .then((submission) => {
                        return ({
                            userId: submission[0].user_id,
                            displayName: submission[0].displayName,
                            picture: submission[0].picture,
                            dictationId: submission[0].dictation_id,
                            dictationSubmissionId: submission[0].id,
                            dictationSubmissionPath: submission[0].dictationSubmissionPath
                        });
                        
                    })

            }

            else if (body.type === "quizcard") {
                console.log("Listing details of quizcardSubmission");
                return this.knex("quizcardQuestionSubmission")
                .join("user", "quizcardQuestionSubmission.user_id", "=", "user.id")
                .where("quizcardQuestionSubmission.id", body.quizcardSubmissionId)
                .select("user.id as user_id", "user.displayName", "user.picture", "quizcardQuestionSubmission.quizcardQuestion_id", "quizcardQuestionSubmission.id", "quizcardQuestionSubmission.quizcardQuestionSubmission", "quizcardQuestionSubmission.quizcardQuestionMarking")
                .then((submission) => {
                        return ({
                        user_id:submission[0].user_id,
                        displayName:submission[0].displayName,
                        picture:submission[0].picture,
                        quizcardId:submission[0].quizcardQuestion_id,
                        quizcardSubmissionId:submission[0].id,
                        quizcardSubmission:submission[0].quizcardQuestionSubmission,
                        quizcardQuestionMarking: submission[0].quizcardQuestionMarking
                    })
                })
            }
            else {
                return "card type not recognized";
            }


        }

        //Method to list all submissions of a card
        async list(body) {
            if (body.type === "flashcard") {
                console.log("Listing all submissions of flashcard");
                return this.knex("flashcardSubmission")
                    .join("user", "flashcardSubmission.user_id", "=", "user.id")
                    .join("flashcard", "flashcard.id", "=", "flashcardSubmission.flashcard_id")
                    .where("flashcard.id", body.flashcardId)
                    .andWhere("flashcardSubmission.flashcardSubmissionStatus", true)
                    .select("user.displayName", "user.picture", "flashcardSubmission.flashcard_id", "flashcardSubmission.id", "flashcardSubmission.flashcardSubmissionRecording")
                    .then((submissions) => {
                        return submissions.map((submission) => {
                            return ({
                                picture: submission.picture,
                                displayName: submission.displayName,
                                flashcardId: submission.flashcard_id,
                                flashcardSubmissionId: submission.id,
                                flashcardSubmissionRecording: submission.flashcardSubmissionRecording
                            });
                        })
                    })

            }
            else if (body.type === "dictation") {
                console.log("Listing all submissions of dictation");
                return this.knex("dictationSubmission")
                    .join("user", "dictationSubmission.user_id", "=", "user.id")
                    .join("dictation", "dictation.id", "=", "dictationSubmission.dictation_id")
                    .where("dictation.id", body.dictationId)
                    .andWhere("dictationSubmission.dictationSubmissionStatus", true)
                    .select("user.displayName", "user.picture", "dictationSubmission.dictation_id", "dictationSubmission.id", "dictationSubmission.dictationSubmissionPath")
                    .then((submissions) => {
                        return submissions.map((submission) => {
                            return ({
                                picture: submission.picture,
                                displayName: submission.displayName,
                                dictationId: submission.dictation_id,
                                dictationSubmissionId: submission.id,
                                dictationSubmissionPath: submission.dictationSubmissionPath
                            });
                        })
                    })

            }

            else if (body.type === "quizcard") {
                console.log("Listing all submissions of quizcard");
                return this.knex("quizcardQuestionSubmission")
                    .join("user", "quizcardQuestionSubmission.user_id", "=", "user.id")
                    .join("quizcardQuestion", "quizcardQuestion.id", "=", "quizcardQuestionSubmission.quizcardQuestion_id")
                    .where("quizcardQuestion.id", body.quizcardQuestionId)
                    .andWhere("quizcardQuestionSubmission.quizcardQuestionSubmissionStatus", true)
                    .select("user.displayName", "user.picture", "quizcardQuestionSubmission.quizcardQuestion_id", "quizcardQuestionSubmission.id", "quizcardQuestionSubmission.quizcardQuestionSubmission", "quizcardQuestionSubmission.quizcardQuestionMarking")
                    .then((submissions) => {
                        return submissions.map((submission) => {
                            return ({
                                picture: submission.picture,
                                displayName: submission.displayName,
                                quizcardQuestionId: submission.quizcardQuestion_id,
                                quizcardQuestionSubmissionId: submission.id,
                                quizcardQuestionSubmission: submission.quizcardQuestionSubmission,
                                quizcardQuestionSubmissionMarking: submission.quizcardQuestionMarking
                            });
                        })
                    })
            }
            else {
                return "card type not recognized";
            }
        }
    }




module.exports = SubmissionService;