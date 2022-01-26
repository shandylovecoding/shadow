class TagService{
    constructor(knex){
        this.knex = knex;
    }
    
    //Add tag
    async add(body){
        console.log("Checking if tag exists")
        const tag = await this.knex("tag").where({
            tagBody: body.tagBody
        })
        if (tag.length > 0) {
            let tag_id = await this.knex("tag").where({
                tagBody: body.tagBody
            }).select("id")
            if(body.type == "set"){
                console.log("Tag exists, adding to set")
                const query = await this.knex
                    .insert({
                        set_id: body.setId,
                        tag_id: tag_id[0].id
                    })
                    .into("tag_set")
                return tag_id[0].id
            }
            else {
                console.log("Tag exists, adding to classroom")           
                const query = await this.knex
                    .insert({
                        classroom_id: body.classroomId,
                        tag_id: tag_id[0].id
                    })
                    .into("tag_classroom")
                return tag_id[0].id
            }
            // else if(body.type == "flashcard"){
            //     console.log("Tag exists, adding to flashcard")
            //     let tag_id = await this.knex("tag").where({
            //         body: body.tagId
            //     }).select("id");
            //     const query = await this.knex
            //         .insert({
            //             flashcard_id: body.location,
            //             tag_id: tag_id[0].id
            //         })
            //         .into("tag_flashcard")
            //     return query
            // }
            // else if(body.type == "quizcard"){
            //     console.log("Tag exists, adding to quizcard")
            //     let tag_id = await this.knex("tag").where({
            //         body: body.tagId
            //     }).select("id");
            //     const query = await this.knex
            //         .insert({
            //             quizcard_id: body.location,
            //             tag_id: tag_id[0].id
            //         })
            //         .into("tag_quizcard")
            //     return query
            // }
        }
        else {
            console.log("Tag does not exist, adding to set")
            return this.knex
                .insert({
                    tagBody: body.tagBody
                })
                .into("tag")
                .then(async () => {
                    let tag_id = await this.knex("tag").where({
                        tagBody: body.tagBody
                    }).select("id");
                    if(body.type == "set"){
                        console.log("Tag exists, adding to set")
                        
                        const query = await this.knex
                            .insert({
                                set_id: body.setId,
                                tag_id: tag_id[0].id
                            })
                            .into("tag_set")
                        return tag_id[0].id
                    }
                    else {
                        console.log("Tag exists, adding to classroom")
                        
                        const query = await this.knex
                            .insert({
                                classroom_id: body.classroomId,
                                tag_id: tag_id[0].id
                            })
                            .into("tag_classroom")
                        return tag_id[0].id
                    }
                    // else if(body.type == "flashcard"){
                    //     console.log("Tag exists, adding to flashcard")
                    //     let tag_id = await this.knex("tag").where({
                    //         body: body.tagId
                    //     }).select("id");
                    //     const query = await this.knex
                    //         .insert({
                    //             flashcard_id: body.location,
                    //             tag_id: tag_id[0].id
                    //         })
                    //         .into("tag_flashcard")
                    //     return query
                    // }
                    // else if(body.type == "quizcard"){
                    //     console.log("Tag exists, adding to quizcard")
                    //     let tag_id = await this.knex("tag").where({
                    //         body: body.tagId
                    //     }).select("id");
                    //     const query = await this.knex
                    //         .insert({
                    //             quizcard_id: body.location,
                    //             tag_id: tag_id[0].id
                    //         })
                    //         .into("tag_quizcard")
                    //     return query
                    // }
            })

        }
    }

    //Delete tag
    delete(body){
        console.log("Removing tag", body)
        if(body.type == "set"){
            return this.knex("tag_set")
                .where("tag_set.tag_id", body.tagId)
                .where("tag_set.set_id", body.setId)
                .del()
                .catch((err)=>{
                    console.log(err);
                })
        }
        else if(body.type == "class"){
            return this.knex("tag_classroom")
                .where("tag_classroom.tag_id", body.tagId)
                .where("tag_classroom.classroom_id", body.classroomId)
                .del()
                .catch((err)=>{
                    console.log(err);
                })
        }
       
    }

    //List out all the tags a user has
    async search(body){
        console.log("Listing tags")
        let user_id = await this.knex("user").where({
            email: body.email
        }).select("id")
        //This query returns all the tags (in the form of an array) the user has in his/her classrooms
        var queryClassroom = await this.knex("classroom_user")
        .join("tag_classroom", "classroom_user.classroom_id", "=", "tag_classroom.classroom_id")
        .join("tag", "tag_classroom.tag_id", "=", "tag.id")
        .where("classroom_user.sharedUser_id", user_id[0].id)
        .select("tag.id", "tag.tagBody")
        .then((tags) => {
            return tags.map((tag) => {
                return({
                    tagId: tag.id,
                    tagBody: tag.tagBody
                })
            })

        })

        //This query returns all the tags (in form of an array) the user has in his/her sets
        var querySet = await this.knex("classroom_user")
        .join("classroom_set", "classroom_user.classroom_id", "=", "classroom_set.classroom_id")
        .join("tag_set", "classroom_set.set_id", "=", "tag_set.set_id")
        .join("tag", "tag_set.tag_id", "=", "tag.id")
        .where("classroom_user.sharedUser_id", user_id[0].id)
        .select("tag.id", "tag.tagBody")
        .then((tags) => {
            return tags.map((tag) => {
                return(
                    {
                    tagId: tag.id,
                    tagBody: tag.tagBody
                }
                )
            })
        })

        //concatenate the two arrays above to return all the tags of the user
        var tags = await queryClassroom.concat(querySet);
        let unique = [...new Set(tags.map(tag => tag.tagId))]
        return unique.map((tag)=>{
            let tagBody;
            for(let i = 0; i < tags.length; i++){
                if(tags[i].tagId === tag){
                    tagBody = tags[i].tagBody
                    break;
                }
            }
            return ({
                tagId: tag,
                tagBody: tagBody
            })
        })
    }

}

module.exports = TagService;