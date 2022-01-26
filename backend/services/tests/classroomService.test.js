const ClassroomService = require("../classroomService")
const knexConfig = require("../../knexfile").staging
const knex = require("knex")(knexConfig)

describe("Classroom service tests", () => {
    // beforeAll(() => {
    //     return knex('user').insert([{
    //         displayName: 'Test Wong',
    //         email: "test@test.com",
    //         passwordHash: "thisisatest",
    //         picture: "https://static-s.aa-cdn.net/img/gp/20600014424487/UTpd6qixaabJJIKkkMixyqTq26NMnWoFJvgXXXEMf7aJGsR0lyYFYaLU9_TTP7kLGqI=s300?v=1"
    //       }, {
    //         displayName: 'User Philip',
    //         email: "user@user.com",
    //         passwordHash: "thisisauser",
    //         picture: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress%2Cformat&ixlib=php-3.3.0"
    //       }])
    // })
    test("Listing for user with no classrooms", () => {
        const classroomService = new ClassroomService(knex)
        return classroomService
          .list({email:"test@test.com"})
          .then((data) => {
              return console.log(data)
          })
          .catch((err) => {
            console.log(err)
          })
      })

    xtest("Listing details of a classroom that has not been made", () => {
          const classroomService = new ClassroomService(knex)
          return classroomService
          .classroom(1)
          .then((data) => {expect(data).toEqual([])})
          .catch((err) => {
              console.log(err)
          })
      })
    
    xtest("Adding classroom for user", () => {
        const classroomService = new ClassroomService(knex)
        return classroomService
        .add({title: "Test Classroom", desc: "This classroom has been added during the test", email: "test@test.com"})
        .then(() => {
            return classroomService
            .list({email:"test@test.com"})
        })
        .then((data) => {
            expect(data).toEqual([
                {
                    id: 1,
                    title: "Test Classroom",
                    description: "This classroom has been added during the test",
                    tags: [],
                    shared: []
                }
            ])}
        )
    })

    xtest("Editing a classroom for a user", () => {
        const classroomService = new ClassroomService(knex)
        return classroomService
        .edit({title:"Edited Classroom", desc:"This description has been edited", classroomId: 1})
        .then(() => {
            return classroomService.list({email:"test@test.com"});
        })
        
        .then((data) => {
            expect(data).toEqual([
                {
                    id: 1,
                    title: "Edited Classroom",
                    description: "This description has been edited",
                    tags: [],
                    shared: []
                }
            ])}
        )
    })

    xtest("Listing details of a specific classroom", () => {
        const classroomService = new ClassroomService(knex)
        return classroomService
        .classroom({classroomId: 1})
        .then((data) => {
            expect(data).toEqual({
                id: 1,
                title: "Edited Classroom",
                description: "This description has been edited",
                tags: [],
                shared: []
            })
        })
    })

    xtest ("Deleting a classroom", () => {
        const classroomService = new ClassroomService(knex)
        return classroomService
        .delete({classroomId:1})
        .then(() => {
            return classroomService.list({email: "test@test.com"});
        })
        .then((data) => {
            expect(data).toEqual([])
        })
    })

})