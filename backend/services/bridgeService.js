class BridgeService {
    constructor(knex) {
        this.knex = knex
    }

    //Add bridge
    async add(body) {
        if (body.type === "classroom_set") {
            const share = await this.knex("classroom_set").where({
                classroom_id: body.classroomId,
                set_id: body.setId
            })
            if (share.length > 0) {
                return "already shared"
            } else {
                return this.knex
                    .insert({
                        classroom_id: body.classroomId,
                        set_id: body.setId
                    })
                    .into("classroom_set")
                    .returning('set_id')
            }
        }
        if (body.type === "set_flashcard") {
            const share = await this.knex("set_flashcard").where({
                set_id: body.setId,
                flashcard_id: body.flashcardId
            })
            if (share.length > 0) {
                return "already shared"
            } else {
                return this.knex
                    .insert({
                        set_id: body.setId,
                        flashcard_id: body.flashcardId
                    })
                    .into("set_flashcard")
            }
        }
        if (body.type === "set_quizcard") {
            const share = await this.knex("set_quizcard").where({
                set_id: body.setId,
                quizcard_id: body.quizcardId
            })
            if (share.length > 0) {
                return "already shared"
            } else {
                return this.knex
                    .insert({
                        set_id: body.setId,
                        quizcard_id: body.quizcardId
                    })
                    .into("set_quizcard")
                    .returning("quizcard_id")
            }
        }
        if (body.type === "set_dictationcard") {
            const share = await this.knex("set_dictationcard").where({
                set_id: body.setId,
                dictationcard_id: body.dictationcardId
            })
            if (share.length > 0) {
                return "already shared"
            } else {
                return this.knex
                    .insert({
                        set_id: body.setId,
                        dictationcard_id: body.dictationcardId
                    })
                    .into("set_dictationcard")
            }
        }
        else {
            return "bridge type not recognised"
        }


    }

    //Delete user permission to set
    delete(body) {
        if (body.type === "classroom_set") {
            if (body.classroomId === undefined) {
                return this.knex("classroom_set")
                    .where("classroom_set.set_id", body.setId)
                    .del()
            } else {
                return this.knex("classroom_set")
                    .where("classroom_set.classroom_id", body.classroomId)
                    .where("classroom_set.set_id", body.setId)
                    .del()
            }
        }
        if (body.type === "set_flashcard") {
            if (body.setId === undefined) {
                return this.knex("set_flashcard")
                    .where("set_flashcard.flashcard_id", body.cardId)
                    .del()
            }
            else {
                return this.knex("set_flashcard")
                    .where("set_flashcard.set_id", body.setId)
                    .where("set_flashcard.flashcard_id", body.cardId)
                    .del()
            }
        }
        if (body.type === "set_quizcard") {
            if (body.setId === undefined) {
                return this.knex("set_quizcard")
                    .where("set_quizcard.quizcard_id", body.cardId)
                    .del()
            }
            else {
                return this.knex("set_quizcard")
                    .where("set_quizcard.set_id", body.setId)
                    .where("set_quizcard.quizcard_id", body.cardId)
                    .del()
            }
        }
        if (body.type === "set_dictationcard") {
            if (body.setId === undefined) {
                return this.knex("set_dictationcard")
                    .where("set_dictationcard.dictationcard_id", body.cardId)
                    .del()
            }
            else {
                return this.knex("set_dictationcard")
                    .where("set_dictationcard.set_id", body.setId)
                    .where("set_dictationcard.dictationcard_id", body.cardId)
                    .del()
            }
        }
        else {
            return "bridge relationship not found"
        }
    }
}

module.exports = BridgeService;