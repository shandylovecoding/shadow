require("dotenv").config();
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const hashFunction = require("../auth/hashFunction")

class UserService {
  constructor(knex) {
    this.knex = knex;
  }

  //Method to update a users display name
  async editDisplayName(body) {
    ("updating displayName of a user");
    return this.knex("user")
      .where({
        id: body.id,
      })
      .update({
        displayName: body.displayName
      })
      .returning("displayName")
  }

  //Method to update a users email
  async editEmail(body) {
    ("updating email of a user");
    return this.knex("user")
      .where({
        id: body.id,
      })
      .update({
        email: body.email
      })
      .returning("email")
  }

  //Method to update a users password
  async editPassword(body) {
    ("updating password of a user");
    let passwordHash = await hashFunction.hashPassword(body.password)
    return this.knex("user")
      .where({
        id: body.id,
      })
      .update({
        passwordHash: passwordHash
      })
  }

  //Method to update user picture
  async updatePicture(picture, body) {
    console.log("Uploading user picture to AWS");
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: picture.name,
      ContentType: "image/jpeg",
      Body: picture.data,
    };
    let data = await s3.upload(params).promise();
    return this.knex("user")
      .where({
        email: body.email,
      })
      .update({
        picture: data.Location,
      })
      .returning("picture")
  }

  //Method to delete a user
  delete(body) {
    return this.knex("user")
      .where({
        email: body.email,
      })
      .update({
        userStatus: false,
      });
  }

  //Method to return a users details
  user(body) {
    console.log("returning data of a user.");
    return this.knex("user")
      .where({
        email: body.email,
      })
      .then((user) => { 
        return {
          id: user[0].id,
          displayName: user[0].displayName,
          email: user[0].email,
          picture: user[0].picture,
          role: user[0].role,
          tier: user[0].tier,
          userStatus: user[0].userStatus,
        };
      });
  }
}

module.exports = UserService;
