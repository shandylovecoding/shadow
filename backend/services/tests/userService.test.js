const { TestWatcher } = require("jest")
const UserService = require("../userService")
const knexConfig = require("../../knexfile").development
const knex = require("knex")(knexConfig)

describe("User service tests", () => {

    test("Listing details of user that does not exist", () => {
        const userService = new UserService(knex)
        return userService
          .user("error@error.com")
          .then((data) => {expect(data).toEqual({})})
          .catch((err) => {
            console.log(err)
          })
      })

      test("Listing details of user that does exist", () => {
        const userService = new UserService(knex)
        return userService
          .user("test@test.com")
          .then((data) => {expect(data).toEqual({
              id: 1,
              displayName: "Test Wong",
              email: "test@test.com",
              picture: ""
          })})
          .catch((err) => {
            console.log(err)
          })
      })

    test("Editing a user", () => {
        const userService = new UserService(knex)
        return userService
        .edit({id: 1, displayName: "Edit Wong", email: "edit@test.com"})
        .then(() => {
            return userService
            .user({email: "edit@test.com"})
        })
        .then((data) => {
            expect(data).toEqual(
                {
                    id: 1,
                    displayName: "Edit Wong",
                    email: "edit@test.com",
                    picture: ""
                }
            )}
        )
    })

    test("Deleting a user", () => {
        const userService = new UserService(knex)
        return userService
        .delete({email: "edit@test.com"})
        .then(() => {
            return userService
            .list("edit@test.com")
        })
        .then((data) => {
            expect(data).toEqual({})
        })
    })

})