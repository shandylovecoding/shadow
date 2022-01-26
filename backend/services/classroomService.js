class ClassroomService {
  constructor(knex) {
    this.knex = knex;
  }

  //Method to add classroom
  add(body) {
    console.log("Adding Classroom");
    return this.knex("user")
      .where({
        email: body.email,
        
      })
      .then((email) => {
        return this.knex
          .insert({
            user_id: email[0].id,
            classroomTitle: body.title,
            classroomDesc: body.description,
            classroomStatus: true
          })
          .into("classroom")
          .returning("id")
          .then((classroom_id)=>{
            return this.knex
            .insert({
              sharedUser_id: email[0].id,
              classroom_id: classroom_id[0]
            })
            .into("classroom_user")
            .returning("classroom_id")
            .then((data)=>{
              return data
            })
            .catch((err)=>{
              console.log(err)
            })
          })
          .catch((err)=>{
            console.log(err)
          })
      });
  }

  //Method to edit classroom
  edit(body) {
    console.log("Editing a classroom");
    return this.knex("classroom").where("id", body.classroomId).update({
      classroomTitle: body.title,
      classroomDesc: body.description,
    })
    .returning(body.classroomId)
    .catch((err)=>{
      console.log(err)
    })
  }

  //Method to delete classroom
  delete(body) {
    console.log("Deleting a classroom");
    return this.knex("classroom").where("id", body.id).update({
      classroomStatus: "false",
    })
    .returning(body.id)
    .catch((err)=>{
      console.log(err)
    })
  }

  //Method to list all data of a specific classroom
  classroom(body) {
    console.log("Listing data of a specific classroom");
    let data = {};
    return this.knex("classroom")
      .select(
        "classroom.id",
        "classroom.classroomTitle",
        "classroom.classroomDesc"
      )
      .where("id", body.classroomId)
      .then((classroom) => {
          data.id = classroom[0].id
          data.title = classroom[0].classroomTitle
          data.description = classroom[0].classroomDesc
      })
      .then(() => {
        return this.knex("tag_classroom")
          .where("classroom_id", body.classroomId)
          .join("tag", "tag_classroom.tag_id", "tag.id")
          .select("tag.tagBody", "tag.id")
      })
      .then((tags) => {
        data.tags = tags.map((tag) => {
          return {
            id: tag.id,
            body: tag.body,
          };
        });
      })
      .then(() => {
        return this.knex("classroom_user")
          .where("classroom_user.classroom_id", body.classroomId)
          .join("user", "classroom_user.sharedUser_id", "user.id")
          .select("user.id", "user.email", "user.displayName", "user.picture")
      })
      .then((shared) => {
        return (data.shared = shared.map((user) => {
          return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            picture: user.picture
          };
        }));
      })
      .then(() => {
        return this.knex("classroom_set")
        .where("classroom_set.classroom_id", body.classroomId)
        .select("classroom_set.set_id")
      }).then((sets) => {
        data.bridge = sets.map((set) => {
          return{
            set_id: set.set_id
          }
        })
      })
      .then(() => {
        return data
      })
  }

  async list (body) {
    console.log("Listing all classrooms of a user");
    let user_id = await this.knex("user").where({
      email: body.email
    }).select("id");
    
    const data = {};

    return this.knex("classroom")
    .join("classroom_user", 'classroom.id', 'classroom_user.classroom_id')
    .where("classroom.user_id", user_id[0].id)
    .orWhere('classroom_user.sharedUser_id', user_id[0].id)
    .where("classroom.classroomStatus", true)
    .select("classroom.id", "classroom.classroomStatus")
    .groupBy('classroom.id')
    .then(async (classrooms) => {
      let filterClass = classrooms.filter(fil => fil.classroomStatus !== false)
      let allClass = await Promise.all(filterClass.map((classroom) => {
        let data = {}
          return this.knex("classroom")
            .join("classroom_user", 'classroom.id', 'classroom_user.classroom_id')
            .select(
              "classroom.id",
              "classroom.classroomTitle",
              "classroom.classroomDesc",
              "classroom.classroomStatus"
            )
            .where("classroom.classroomStatus", true)
            .where("classroom.id", classroom.id)
            .then((classroomDets) => {
                  data.id = classroomDets[0].id
                  data.title = classroomDets[0].classroomTitle
                  data.description = classroomDets[0].classroomDesc
            })
            .then(() => {
                return this.knex("tag_classroom")
                  .where("classroom_id", data.id)
                  .join("tag", "tag_classroom.tag_id", "tag.id")
                  .select("tag.tagBody", "tag.id")
            })
            .then((tags) => {
                data.tags = tags.map((tag) => {
                  return {
                    id: tag.id,
                    body: tag.tagBody,
                  };
                });
            })
            .then(() => {
                return this.knex("classroom_user")
                .join("user", "classroom_user.sharedUser_id", "user.id")
                .where("classroom_user.classroom_id", data.id)
                .select("user.id", "user.email", "user.displayName", "user.picture")
            })
            .then((shared) => {
                return (data.shared = shared.map((user) => {
                return {
                  id: user.id,
                  email: user.email,
                  displayName: user.displayName,
                  picture: user.picture
                };
              }));
            })
            .then(() => {
                return this.knex("classroom_set")
              .where("classroom_set.classroom_id", data.id)
              .select("classroom_set.set_id")
            }).then((sets) => {
                data.bridge = sets.map((set) => {
                return{
                  set_id: set.set_id
                }
              })
            })
            .then(()=>{
              if (data !== undefined){
                return data
              }
            })
          }))
          console.log('allcalss',allClass)
          return allClass
        })
        .catch((err)=>{
          console.log(err)
          return
        })
  }
}



module.exports = ClassroomService;
