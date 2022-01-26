const express = require("express");

class SetRouter {
    constructor(setService) {
        this.setService = setService
    }

    router() {
        let router = express.Router();
        router.post("/", this.post.bind(this))
        router.put("/", this.put.bind(this))
        router.post("/delete", this.delete.bind(this))

        return router
    }

    post(req, res) {
        return this.setService
            .add(req.body)
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    put(req, res) {
        return this.setService
            .edit(req.body)
            .then(()=>{
                return this.setService
                .user(req.body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    delete(req, res) {
        return this.setService
            .delete(req.body)
            .then((data) => {
                 res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }
}

module.exports = SetRouter;
