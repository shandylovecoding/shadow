const express = require("express");


class BridgeRouter {
    constructor(bridgeService) {
        this.bridgeService = bridgeService
    }

    router() {
        let router = express.Router();
        router.post("/", this.post.bind(this))
        router.post("/delete", this.delete.bind(this))
        return router
    }

    post(req, res) {
        return this.bridgeService
        .add(req.body)
        .then((data) => {
            return res.json(data)
        })
        .catch((err) => {
        })
    }

    delete(req, res) {
        return this.bridgeService
        .delete(req.body)
        .then((data) => {
            return res.json(data)
        })
        .catch((err) => {
        })
    }
}

module.exports = BridgeRouter;