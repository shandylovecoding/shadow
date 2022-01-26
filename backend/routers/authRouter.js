const express = require("express");
require('dotenv').config();

//Bcrypt Hashing
const hashFunction = require("../auth/hashFunction")

//JWT
const jwt = require("jsonwebtoken");

class AuthRouter {

    constructor(knex) {
        this.knex = knex;
    }

    router() {
        let router = express.Router();
        router.post("/login", this.postLocal.bind(this))
        router.post("/signup", this.postSignup.bind(this))
        return router
    }

    async postLocal(req, res) {
        if (req.body.email && req.body.password) {
            let user = await this.knex("user").where({
                email: req.body.email
            }) 
            if (user) {
                let result = await hashFunction.checkPassword(req.body.password, user[0].passwordHash)
                if (result) {
                    let payload = {
                        email: user[0].email
                    }
                    let token = jwt.sign(payload, process.env.JWT_SECRET)
                    return res.json(token);
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.send("User does not exist")
            }
        } else {
            res.sendStatus(401)
        }
    }

    async postSignup(req, res) {
        if (req.body.email && req.body.password) {
            let hashedPassword = await hashFunction.hashPassword(req.body.password)
            return this.knex("user").where({
                    email: req.body.email,
                    // passwordHash: hashedPassword
                })
                .then((data) => {
                    if (data[0]) {
                    } else {
                        return this.knex("user").insert({
                                email: req.body.email,
                                displayName: req.body.displayName,
                                passwordHash: hashedPassword,
                                role: req.body.role,
                                userStatus: true
                            })
                            .then(() => {
                                return res.json(req.body.email)
                            })
                    }
                })
        } else {
            res.sendStatus(401)
        }
    }
}

module.exports = AuthRouter;