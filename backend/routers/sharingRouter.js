const express = require("express");

class SharingRouter {
    constructor(sharingService, classroomService){
        this.sharingService = sharingService;
        this.classroomService = classroomService;
    }

    router(){
        let router = express.Router();

        router.post("/", this.post.bind(this));
        router.post("/del", this.delete.bind(this));

        return router
    }

    post(req, res){

        return this.sharingService.add(req.body)
        .then(() => {
           return this.classroomService
           .list(req.body)
        })
        .then((data) => {
            return res.json(data)
        })
        .catch((err) => {
            return res.status(500).json(err);
        }); 
    }
    
    delete(req, res){
        return this.sharingService.delete(req.body)
        .then((data) => {
            return res.json(data)
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
    }

}


module.exports = SharingRouter;

