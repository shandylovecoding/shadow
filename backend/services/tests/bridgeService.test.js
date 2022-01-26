const BridgeService = require("../bridgeService");
const ClassroomService = require("../classroomService");
const SetService = require("../setService");
const CardService = require("../cardService");
const knexConfig = require("../../knexfile").development;
const knex = require("knex")(knexConfig);

describe("Bridge service tests", () => {
    
    xtest("Adding bridge between classroom and set", () => {
        const bridgeService = new BridgeService(knex);
        const classroomService = new ClassroomService(knex);
        const setService = new SetService(knex);
        const classroom = {
          email: "test@test.com",
          title: "Test Classroom",
          desc: "This is a test classroom",
        };
        const set = {
            email: "test@test.com",
            title: "Test Set",
            desc: "This is a test set",
          };
        const bridge = {
            type: "classroom_set",
            classroomId: 1,
            setId: 1
        }
        return classroomService
          .add(classroom)
          .then(() => {
            return setService
            .add(set);
          })
          .then(() => {
              return bridgeService
              .add(bridge)
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
                tags: [],
                shared: [],
                bridge: {set_id: 1}
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      xtest("Deleting bridge between classroom and set", () => {
        const bridgeService = new BridgeService(knex);
        const classroomService = new ClassroomService(knex);
        const bridge = {
            type: "classroom_set",
            classroomId: 1,
            setId: 1
        }
              return bridgeService
              .delete(bridge)
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
                shared: [],
                bridge: []
              }
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      xtest("Adding bridge between set and flashcard", () => {
        const bridgeService = new BridgeService(knex);
        const setService = new SetService(knex);
        const cardService = new CardService(knex);
        const card = {
            type: "flashcard",
            email: "test@test.com",
            flashcardTitle: "Test Flashcard",
            flashcardBody: "This is an example flashcard body",
            flashcardRecording: "https://www.test.com"
          };
        const bridge = {
            type: "set_flashcard",
            setId: 1,
            flashcardId: 1
        }
        
        return cardService
        .add(card)
        .then(() => {
            return bridgeService
            .add(bridge)
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
                tags: [],
                bridge: [{flashcard_id: 1}]
              }
            ]);
          })
          .catch((err) => {
            console.log(err);
          })
      });

      xtest("Deleting bridge between set and flashcard", () => {
        const bridgeService = new BridgeService(knex);
        const setService = new SetService(knex);
        const bridge = {
            type: "set_flashcard",
            setId: 1,
            flashcardId: 1
        }
              return bridgeService
              .delete(bridge)
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
                bridge:[]
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      xtest("Adding bridge between set and quizcard", () => {
        const bridgeService = new BridgeService(knex);
        const setService = new SetService(knex);
        const cardService = new CardService(knex);
        const card = {
            type: "quizcard",
            email: "test@test.com",
            quizcardTitle: "Test Quizcard",
            quizcardRecording: "https://www.test.com"
          };
        const bridge = {
            type: "set_quizcard",
            setId: 1,
            quizcardId: 1
        }
        
        return cardService
        .add(card)
        .then(() => {
            return bridgeService
            .add(bridge)
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
                tags: [],
                bridge:[{quizcard_id: 1}]
              }
            ]);
          })
          .catch((err) => {
            console.log(err);
          })
      });

      xtest("Deleting bridge between set and quizcard", () => {
        const bridgeService = new BridgeService(knex);
        const setService = new SetService(knex);
        const bridge = {
            type: "set_quizcard",
            setId: 1,
            quizcardId: 1
        }
              return bridgeService
              .delete(bridge)
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
                bridge:[]
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      xtest("Adding bridge between set and dictationcard", () => {
        const bridgeService = new BridgeService(knex);
        const setService = new SetService(knex);
        const cardService = new CardService(knex);
        const card = {
            type: "dictationcard",
            email: "test@test.com",
            dictationcardTitle: "Test Dictationcard",
            dictationcardRecording: "https://www.test.com"
          };
        const bridge = {
            type: "set_dictationcard",
            setId: 1,
            dictationcardId: 1
        }
        
        return cardService
        .add(card)
        .then(() => {
            return bridgeService
            .add(bridge)
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
                tags: [],
                bridge: [{dictationcard_id: 1}]
              }
            ]);
          })
          .catch((err) => {
            console.log(err);
          })
      });

      xtest("Deleting bridge between set and dictationcard", () => {
        const bridgeService = new BridgeService(knex);
        const setService = new SetService(knex);
        const bridge = {
            type: "set_dictationcard",
            setId: 1,
            dictationcardId: 1
        }
              return bridgeService
              .delete(bridge)
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
                bridge: []
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      });
});