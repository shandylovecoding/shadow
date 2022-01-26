const TagService = require("../tagService");
const ClassroomService = require("../classroomService");
const SetService = require("../setService");
const knexConfig = require("../../knexfile").development;
const knex = require("knex")(knexConfig);

describe("Tag service tests", () => {
    
    xtest("Adding a tag to a classroom", () => {
        const tagService = new TagService(knex);
        const classroomService = new ClassroomService(knex);
        const classroom = {
          email: "test@test.com",
          title: "Test Classroom",
          desc: "This is a test classroom",
        };
        const tag = {
          type: "classroom",
          tagBody: "easy",
          classroomId: 1,
        };
        return classroomService
          .add(classroom)
          .then(() => {
            return tagService.add(tag);
          })
          .then(() => {
            return classroomService.classroom({ classroomId: 1 });
          })
          .then((data) => {
            expect(data).toEqual([
              {
                id: 1,
                title: "Test Classroom",
                description: "This is a test classroom",
                owner: "Test Wong",
                tags: [{ id: 1, body: "easy" }],
                shared: []
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      xtest("Deleting tag from a classroom", () => {
        const tagService = new TagService(knex);
        const classroomService = new ClassroomService(knex);
        const classroom = {
          email: "test@test.com",
          title: "Test Classroom",
          desc: "This is a test classroom",
        };
        const tag = {
          type: "classroom",
          tagId: 1,
          classroomId: 1,
        };
        return tagService.delete(tag)
          .then(() => {
            return classroomService.classroom({ classroomId: 1 });
          })
          .then((data) => {
            expect(data).toEqual([
              {
                id: 1,
                title: "Test Classroom",
                description: "This is a test classroom",
                owner: "Test Wong",
                tags: [],
                shared: []
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      });

    xtest("Adding a tag to a set", () => {
    const tagService = new TagService(knex);
    const setService = new SetService(knex);
    const set = {
      email: "test@test.com",
      title: "Test Set",
      desc: "This is a test set",
    };
    const tag = {
      type: "set",
      tagBody: "difficult",
      setId: 1,
    };
    return setService
      .add(set)
      .then(() => {
        return tagService.add(tag);
      })
      .then(() => {
        return setService.set({ setId: 1 });
      })
      .then((data) => {
        expect(data).toEqual([
          {
            id: 1,
            title: "Test Set",
            description: "This is a test set",
            owner: "Test Wong",
            tags: [{ id: 1, body: "difficult" }],
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  xtest("Deleting a tag from a set", () => {
    const tagService = new TagService(knex);
    const setService = new SetService(knex);
    const tag = {
      tagId: 2,
      setId: 1,
    };
    return tagService.delete(tag)
      .then(() => {
        return setService.set({ setId: 1 });
      })
      .then((data) => {
        expect(data).toEqual([
          {
            id: 1,
            title: "Test Set",
            description: "This is a test set",
            owner: "Test Wong",
            tags: [],
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});