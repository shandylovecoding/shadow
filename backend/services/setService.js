class Set {
    constructor(knex) {
        this.knex = knex
    };

    //Add a set title, desc according to user
    async add(body) {
        const email = await this.knex("user")
            .where("email", body.email)
            .select("id");

        return this.knex("set")
            .insert({
                setTitle: body.title,
                setDesc: body.desc,
                user_id: email[0].id,
                setStatus: true
            })
            .returning("id")
            .catch((err) => {
                console.log(err)
            })
    };

    //Edit a specific set title, desc, accord to index
    edit(body) {
        return this.knex("set")
            .where("id", body.setId)
            .update({
                setTitle: body.title,
                setDesc: body.description,
            })
            .returning(body.setId)
            .catch((err) => {
                console.log(err)
            });
    };

    //Make a specific set inactive
    delete(body) {
        return this.knex("set")
            .where("id", body.id)
            .update({
                setStatus: false,
            })
            .returning(body.id)
            .catch((err) => {
                console.log(err)
            });
    };

    //list all details of a specific set
    set(body) {
        let setData = {}
        return this.knex("set")
            .join("user", "set.user_id", "user.id")
            .where("set.id", body.setId)
            .where("set.setStatus", true)
            .select("set.id", "set.setTitle", "set.setDesc", "user.displayName")
            .then(async (set) => {
                setData.id = set[0].id,
                    setData.title = set[0].setTitle,
                    setData.description = set[0].setDesc,
                    setData.owner = set[0].displayName
                var queryFlashcard = await this.knex("set_flashcard").where("set_flashcard.set_id", set[0].id).select("set_flashcard.flashcard_id");
                setData.bridge_flashcard = queryFlashcard.map((flashcard) => {
                    return {
                        flashcard_id: flashcard.flashcard_id
                    }
                })
                var queryQuizcard = await this.knex("set_quizcard").where("set_quizcard.set_id", set[0].id).select("set_quizcard.quizcard_id");
                setData.bridge_quizcard = queryQuizcard.map((quizcard) => {
                    return {
                        quizcard_id: quizcard.quizcard_id
                    }
                })
                var queryDictationcard = await this.knex("set_dictationcard").where("set_dictationcard.set_id", set[0].id).select("set_dictationcard.dictationcard_id");
                setData.bridge_dictationcard = queryDictationcard.map((dictationcard) => {
                    return {
                        dictationcard_id: dictationcard_dictationcard.id
                    }
                })
            })
            .then(() => {
                return this.knex("tag_set")
                    .where("set_id", body.setId)
                    .join("tag", "tag_set.tag_id", "tag.id")
                    .select("tag.tagBody", "tag.id")
                    .then((tags) => {
                        setData.tags = tags.map((tag) => {
                            return {
                                id: tag.id,
                                body: tag.body
                            };
                        });
                    })
                    .then(() => {
                        return setData
                    })
            })
            .catch((err) => {
                console.log(err)
            });
    };

    //list all sets of a classroom

    list(body) {
        return this.knex("set")
            .join("classroom_set", "set.id", "classroom_set.set_id")
            .join("classroom", "classroom_set.classroom_id", "classroom.id")
            .where("classroom_set.classroom_id", body.classroomId)
            .andWhere("classroom.classroomStatus", true)
            .select("set.id", "set.setTitle", "set.setDesc")
            .then((sets) => {
                return sets.map((set) => {
                    return ({
                        id: set.id,
                        title: set.setTitle,
                        description: set.setDesc,
                    });
                });
            })
            .catch((err) => {
                console.log(err)
            });
    };

    //list all sets a user has access to
    async user(body) {
        const email = await this.knex("user")
            .where({
                email: body.email,
            })
            .select("id");
        var setArray = []
        var bridgeArray = []
        await this.knex("set")
            .where('set.user_id', email[0].id)
            .select('set.id', 'set.setTitle', 'set.setDesc')
            .where('set.setStatus', true)
            .then(async (sets) => {
                sets.map((set) => {
                    setArray.push(set)
                })
            })

        await this.knex("set")
            .join('classroom_set', 'set.id', 'classroom_set.set_id')
            .join('classroom', 'classroom.id', 'classroom_set.classroom_id')
            .join("classroom_user", "classroom_user.classroom_id", 'classroom.id')
            .where('set.user_id', email[0].id)
            .where('set.setStatus', true)
            .orWhere('classroom.user_id', email[0].id)
            .orWhere('classroom_user.sharedUser_id', email[0].id)
            .select('set.id', 'set.setTitle', 'set.setDesc')
            .groupBy('set.id')
            .then(async (sets) => {
                sets.map((set) => {
                    bridgeArray.push(set)
                })
            })


        function compare(nextArr) {
            return function (current) {
                return nextArr.filter((next) => {
                    return next.set_id === current.id
                }).length === 0
            }
        }
        var combineSet =[]
        if(setArray.length > bridgeArray.length){
            combineSet = setArray.filter(compare(bridgeArray))
        } else{
            combineSet = bridgeArray.filter(compare(setArray))
        }
        console.log("combineSet", combineSet);
        let big = await Promise.all(combineSet.map((set) => {

            let setData = {};
            return this.knex("tag_set")
                .where("set_id", set.id)
                .join("tag", "tag_id", "tag.id")
                .select("tag.id", "tag.tagBody")
                .then((tags) => {
                    return tags.map((tag) => {
                        return {
                            id: tag.id,
                            body: tag.tagBody
                        };
                    });
                })
                .then((tags) => {
                    setData.tags = tags
                })
                .then(() => {
                    setData.id = set.id
                    setData.title = set.setTitle
                    setData.description = set.setDesc
                })
                .then(() => {
                    return this.knex("set_flashcard").where("set_flashcard.set_id", set.id).select("set_flashcard.flashcard_id")
                })
                .then((flashcards) => {
                    setData.bridge_flashcard = flashcards.map((flashcard) => {
                        return {
                            flashcard_id: flashcard.flashcard_id
                        }
                    })

                })
                .then(() => {
                    return this.knex("set_quizcard").where("set_quizcard.set_id", set.id).select("set_quizcard.quizcard_id");
                })
                .then((quizcards) => {
                    setData.bridge_quizcard = quizcards.map((quizcard) => {
                        return {
                            quizcard_id: quizcard.quizcard_id
                        }
                    })
                })
                .then(() => {
                    return this.knex("set_dictationcard").where("set_dictationcard.set_id", set.id).select("set_dictationcard.dictationcard_id");
                })
                .then((dictationcards) => {
                    setData.bridge_dictationcard = dictationcards.map((dictationcard) => {
                        return {
                            dictationcard_id: dictationcard.dictationcard_id
                        }
                    })
                })
                .then(() => {
                    return setData
                })
        }))
            .catch((err) => {
                console.log(err)
            })

        return big


    };
}

module.exports = Set