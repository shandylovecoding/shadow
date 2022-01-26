const express = require("express");


class UploadRouter {
  constructor(uploadService) {
    this.uploadService = uploadService;
  }

  router() {
    let router = express.Router();
    router.post("/video", this.postVideo.bind(this));
    router.post("/audio", this.postAudio.bind(this));
    router.post("/canvas", this.postCanvas.bind(this));
    return router;
  }

  postVideo(req, res) {
    return this.uploadService
      .addVideo(req.files.file.name, req.files.file.data)
      .then(() => {
        return res.send("post request is done");
      })
      .catch((err) => {
      });
  }

  postAudio(req, res) {
    let recording = req.files.file;
    let fileName = recording.name;
    let fileData = recording.data;
    return this.uploadService
      .addAudio(fileName, fileData)
      .then(() => {
        return res.send("post request is done");
      })
      .catch((err) => {
      });
  }

  postCanvas(req, res){
    return this.uploadService
        .addCanvas(req.files.file.name, req.files.file.data)
        .then(() => {
            return res.send("Canvas data posted");
        })
        .catch((err) => {
        });
}
}

module.exports = UploadRouter;
