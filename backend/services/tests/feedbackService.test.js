const FeedbackService = require("../feedbackService")
const knexConfig = require("../../knexfile").development
const knex = require("knex")(knexConfig)

describe("Feedback service tests", () => {

    test("Listing for flashcard with no feedback", () => {
        const feedbackService = new FeedbackService(knex)
        const body = {
            type: "flashcard",
            cardId: 1
        }
        return feedbackService
          .list(body)
          .then((data) => {expect(data).toEqual([])})
          .catch((err) => {
            console.log(err)
          })
      })

      test("Listing for dictationcard with no feedback", () => {
        const feedbackService = new FeedbackService(knex)
        const body = {
            type: "dictationcard",
            cardId: 1
        }
        return feedbackService
          .list(body)
          .then((data) => {expect(data).toEqual([])})
          .catch((err) => {
            console.log(err)
          })
      })

      test("Listing for unknown type", () => {
        const feedbackService = new FeedbackService(knex)
        const body = {
            type: "unknowncard",
            cardId: 1
        }
        return feedbackService
          .list(body)
          .then((data) => {expect(data).toEqual("card type not recognised")})
          .catch((err) => {
            console.log(err)
          })
      })

      test("Adding feedback for flashcard", () => {
        const feedbackService = new FeedbackService(knex)
        const body = {
            type: "flashcard",
            email: "test@test.com",
            submissionId: 1,
            body: "This is testing the flashcard feedback",
            timestamp: "01:10"
        }

        const card = {
            type: "flashcard",
            cardId: 1
        }
        
        return feedbackService
          .add(body)
          .then(() => {
              return feedbackService
              .list(card)
          })
          .then((data) => {expect(data).toEqual([{
            displayName: "Test Wong",
            flashcardSubmissionId: 1,
            flashcardFeedbackId: 1,
            flashcardFeedbackBody: "This is testing the flashcard feedback",
            flashcardFeedbackTime: "01:10"
          }])})
          .catch((err) => {
            console.log(err)
          })
      })

      test("Adding feedback for dictationcard", () => {
        const feedbackService = new FeedbackService(knex)
        const body = {
            type: "dictationcard",
            email: "test@test.com",
            submissionId: 1,
            body: "This is testing the dictationcard feedback",
        }

        const card = {
            type: "dictationcard",
            cardId: 1
        }
        
        return feedbackService
          .add(body)
          .then(() => {
              return feedbackService
              .list(card)
          })
          .then((data) => {expect(data).toEqual([{
            displayName: "Test Wong",
            dictationSubmissionId: 1,
            dictationFeedbackId: 1,
            dictationFeedbackBody: "This is testing the dictationcard feedback",
          }])})
          .catch((err) => {
            console.log(err)
          })
      })

      test("Adding feedback for unknown type", () => {
        const feedbackService = new FeedbackService(knex)
        const body = {
            type: "unknowncard"
        }
        return feedbackService
          .add(body)
          .then((data) => {expect(data).toEqual("card type not recognised")})
          .catch((err) => {
            console.log(err)
          })
      })

      test("Deleting feedback for flashcard", () => {
        const feedbackService = new FeedbackService(knex)
        const body = {
            type: "flashcard",
            feedbackId: 1
        }

        const card = {
            type: "flashcard",
            cardId: 1
        }
        
        return feedbackService
          .delete(body)
          .then(() => {
              return feedbackService
              .list(card)
          })
          .then((data) => {expect(data).toEqual([])})
          .catch((err) => {
            console.log(err)
          })
      })

      test("Deleting feedback for dictationcard", () => {
        const feedbackService = new FeedbackService(knex)
        const body = {
            type: "dictationcard",
            feedbackId: 1
        }

        const card = {
            type: "dictationcard",
            cardId: 1
        }
        
        return feedbackService
          .delete(body)
          .then(() => {
              return feedbackService
              .list(card)
          })
          .then((data) => {expect(data).toEqual([])})
          .catch((err) => {
            console.log(err)
          })
      })

      test("Deleting feedback for unknown card type", () => {
        const feedbackService = new FeedbackService(knex)
        const body = {
            type: "unknowncard"
        }
        
        return feedbackService
          .delete(body)
          .then((data) => {expect(data).toEqual("card type not recognised")})
          .catch((err) => {
            console.log(err)
          })
      })

})