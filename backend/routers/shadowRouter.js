const express = require ('express')

class ShadowRouter {
    constructor(userService, tagService, classroomService, setService, cardService) {
        this.userService = userService
        this.tagService = tagService
        this.classroomService = classroomService
        this.setService = setService
        this.cardService = cardService
    }

    router () {
        let router = express.Router()
        router.post("/", this.post.bind(this))
        return router;
    }

    //Router to get all data for a user
    post (req, res) {
        if(req.body.email!==undefined){
            let data = {}
            return this.userService
            .user(req.body)
            .then((user) => {
                return data.user = user
            })
            .then(() => {
                return this.tagService
                .search(req.body)
            })
            .then((tags) => {
                return data.tags = tags
            })
            .then(() => {
                return this.classroomService
                .list(req.body)
            })
            .then((classrooms) => {
                return data.classrooms = classrooms
            })
            .then(() => {
                return this.setService
                .user(req.body)
            })
            .then((sets) => {
                return data.sets = sets
            })
            .then(() => {
                return this.cardService
                .user(req.body)
            })
            .then((cards) => {
                return data.cards = cards
            })
            .then(() => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
        } else {
            return 
        }
    }
}


module.exports = ShadowRouter;

