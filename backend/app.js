require("dotenv").config();

//Express
const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const http = require('http').createServer(app);


//Setup Database
require("dotenv").config();
const knexConfig = require("./knexfile").development
const knex = require("knex")(knexConfig)
const authClass = require("./auth/auth")(knex);

// Set up JWT
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Authenticate requests
app.use(cors());
app.use(authClass.initialize());
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());

// Services
const BridgeService = require("./services/bridgeService")
const bridgeService = new BridgeService(knex)
const CardService = require("./services/cardService")
const cardService = new CardService(knex)
const ClassroomService = require("./services/classroomService")
const classroomService = new ClassroomService(knex)
const FeedbackService = require("./services/feedbackService")
const feedbackService = new FeedbackService(knex)
const UploadService = require("./services/uploadService")
const uploadService = new UploadService(knex)
const SetService = require("./services/setService")
const setService = new SetService(knex)
const SharingService = require("./services/sharingService")
const sharingService = new SharingService(knex)
const SubmissionService = require("./services/submissionService")
const submissionService = new SubmissionService(knex)
const TagService = require("./services/tagService")
const tagService = new TagService(knex)
const UserService = require("./services/userService")
const userService = new UserService(knex)

//Routers
const AuthRouter = require("./routers/authRouter");
app.use("/api/auth", new AuthRouter(knex).router());
const BridgeRouter = require("./routers/bridgeRouter");
app.use("/api/bridge", new BridgeRouter(bridgeService).router());
const CardRouter = require("./routers/cardRouter");
app.use("/api/card", new CardRouter(cardService, submissionService, feedbackService).router());
const ClassroomRouter = require("./routers/classroomRouter");
app.use("/api/classroom", new ClassroomRouter(classroomService).router());
const UploadRouter = require("./routers/uploadRouter");
app.use("/api/upload", new UploadRouter(uploadService).router());
const SetRouter = require("./routers/setRouter");
app.use("/api/set", new SetRouter(setService).router());
const ShadowRouter = require("./routers/shadowRouter");
app.use("/api/shadow", new ShadowRouter(userService, tagService, classroomService, setService, cardService).router());
const SharingRouter = require("./routers/sharingRouter");
app.use("/api/sharing", new SharingRouter(sharingService, classroomService).router());
const tagRouter = require("./routers/tagRouter");
app.use("/api/tag", new tagRouter(tagService).router());
const UserRouter = require("./routers/userRouter");
app.use("/api/user", new UserRouter(userService).router());

const io = require('socket.io')(http,{
  cors: {
            origin:"*"
  }
});

io.on('connection', (socket)=> {
  socket.on('newUser', (room) => {
    socket.join(room)
  })
  socket.on('canvas-data', (room, data)=> {
        socket.to(room).emit('canvas-data', data);
        
  })
  socket.on('clear', (room, data)=> {
      socket.to(room).emit('clear', data);   
  })
  
  socket.on('disconnect', () => {
  })
})

//Setup Server
http.listen(8080, () => {
});