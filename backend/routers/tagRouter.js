const express = require("express");

class TagRouter {
    constructor(tagService) {
        this.tagService = tagService
    }

    router() {
        let router = express.Router();
        router.post("/", this.post.bind(this))
        router.post("/deltag", this.delete.bind(this))

        return router
    }

    post(req, res) {
        return this.tagService
            .add(req.body)
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    delete(req, res) {
        return this.tagService
            .delete(req.body)
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }
}

module.exports = TagRouter;