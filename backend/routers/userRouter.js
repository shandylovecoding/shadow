const express = require("express");

class UserRouter {
    constructor(userService) {
        this.userService = userService
    }

    router() {
        let router = express.Router();

        router.post("/", this.post.bind(this))
        router.put("/displayname", this.putDisplayName.bind(this))
        router.put("/email", this.putEmail.bind(this))
        router.put("/password", this.putPassword.bind(this))
        router.delete("/", this.delete.bind(this))

        return router
    }

    //Router to upload user picture
    async post(req, res) {
        return this.userService.updatePicture(req.files.file, req.body)
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
            })
    }

    //Router to edit user displayname
    putDisplayName(req, res) {
        return this.userService
            .editDisplayName(req.body)
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
            })
    }

    //Router to edit user email
    putEmail(req, res) {
        return this.userService
            .editEmail(req.body)
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
            })
    }

    //Router to edit user password
    putPassword(req, res) {
        return this.userService
            .editPassword(req.body)
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
            })
    }

    //Router to delete a user
    delete(req, res) {
        return this.userService
            .delete(req.body)
            .then(() => {
                return this.userService
                    .user(req.body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
            })
    }
}


module.exports = UserRouter;