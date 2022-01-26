const express = require("express");

class ClassroomRouter {
    constructor(classroomService){
        this.classroomService = classroomService;
    }
    router(){
        let router = express.Router();

        router.post("/", this.post.bind(this));
        router.put("/", this.put.bind(this));
        router.post("/delete", this.delete.bind(this));

        return router
    }

    post(req, res){
        return this.classroomService.add(req.body)
        .then((data) => {
            res.json(data)} )
        .catch((err) => {
            return res.status(500).json(err);
        });
    }

    put(req, res){
        return this.classroomService
        .edit(req.body)
        .then(() => {
            return this.classroomService
            .list(req.body)
         })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
    }
    
    delete(req, res){
        return this.classroomService.delete(req.body)
        .then((data)=>{
            res.json(data)
        })
        .catch((err) => {
            return res.status(500).json(err);
        })


    }

}

module.exports = ClassroomRouter;