const express = require("express");

class CardRouter {
    constructor(cardService, submissionService, feedbackService) {
        this.cardService = cardService
        this.submissionService = submissionService
        this.feedbackService = feedbackService
    }

    router() {
        let router = express.Router();

        router.post("/", this.post.bind(this))
        router.put("/", this.put.bind(this))
        router.post("/delete", this.delete.bind(this))
        router.post("/submission", this.postSubmission.bind(this))
        router.delete("/submission", this.deleteSubmission.bind(this))
        router.post("/submission/feedback", this.postFeedback.bind(this))
        router.put("/submission/feedback", this.editFeedback.bind(this))
        router.post("/submission/delfeedback", this.deleteFeedback.bind(this))

        return router
    }

    post(req, res) {
        return this.cardService
            .add(req.body)
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    put(req, res) {
        return this.cardService
            .edit(req.body)
            .then(() => {
                return this.cardService
                .card(req.body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    delete(req, res) {
        return this.cardService
            .delete(req.body)
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    postSubmission(req, res) {
        let body = req.body;
        return this.submissionService
            .add(body)
            .then((data) => {
                if(body.type === "flashcard"){body.flashcardSubmissionId = data[0]} ;
                if(body.type === "dictation"){body.dictationSubmissionId = data[0]};
                if(body.type === "quizcard"){body.quizcardSubmissionId = data[0]};
            })
            .then(() => {
                return this.submissionService
                .submission(body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    deleteSubmission(req, res) {
        return this.submissionService
            .delete(req.body)
            .then(() => {
                return this.submissionService
                .submission(req.body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    postFeedback(req, res) {
        let body = req.body;
        
        return this.feedbackService
            .add(body)
            .then((data) => {
                if(body.type === "flashcard"){body.flashcardFeedbackId = data[0]};
                if(body.type === "dictationcard"){body.dictationFeedbackId = data[0]};
            })
            .then(() =>{

                return this.feedbackService
                .feedback(body)
            })
            .then((data) => {
                
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    editFeedback(req, res) {
        let body = req.body
        return this.feedbackService
        .edit(body)
        .then((data) => {
            if(body.type === "flashcard"){body.flashcardFeedbackId = data[0]};
            if(body.type === "dictation"){body.dictationFeedbackId = data[0]};
        })
        .then(() =>{
            return this.feedbackService
            .feedback(body)
        })
        .then((data) => {
            return res.json(data)
        })
        .catch((err) => {
            return res.status(500).json(err)
        })
    }

    deleteFeedback(req, res) {
        return this.feedbackService
            .delete(req.body)
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }
}

module.exports = CardRouter;