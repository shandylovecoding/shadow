class SharingService {
    constructor(knex) {
        this.knex = knex
    }

    //Add users to set
    async add(body) {

        console.log("sharing classroom with a user")
        let user_id = await this.knex("user").where({
            email: body.email
        }).select("id");
        let share = await this.knex("classroom_user").where({
            classroom_id: body.classroomId,
            sharedUser_id: user_id[0].id
        })
        let owner = await this.knex("classroom").where({
            user_id: user_id[0].id,
            id: body.classroomId
        })
        if (share.length > 0) {
            return "already shared"
        } else if (owner.length > 0) {
            return "owner"
        } else {
            return this.knex
                .insert({
                    classroom_id: body.classroomId,
                    sharedUser_id: user_id[0].id
                })
                .into("classroom_user")
                .then(() => {
                    return this.knex("user")
                    .where("email", body.email)
                })
                .then((data) => {
                    return ({
                        user_id: data[0].id,
                        email: data[0].email,
                        displayName: data[0].displayName,
                        picture: data[0].picture
                    })
                })
        }
    }

    //Delete user permission to set
     delete(body) {
        console.log("removing classroom sharing with user")

        return this.knex("classroom_user")
            .where("classroom_user.classroom_id", body.classroomId)
            .where("classroom_user.sharedUser_id", body.sharedId)
            .del()
            .catch((err)=>{
                console.log(err);
            })
    }
}

module.exports = SharingService;