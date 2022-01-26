exports.up = function (knex) {
    return knex.schema.createTable("user", (user) => {
            user.increments().primary();
            user.string("displayName");
            user.string("email").unique();
            user.string("gmail_id");
            user.string("facebook_id");
            user.string("passwordHash");
            user.string("picture");
            user.string("role");
            user.string("tier");
            user.boolean("userStatus");
            user.timestamps(false, true);
        })
        .createTable("tag", (tag) => {
            tag.increments().primary();
            tag.string("tagBody").unique();
            tag.timestamps(false, true);
        })
        .createTable("classroom", (classroom) => {
            classroom.increments().primary();
            classroom.integer("user_id").references("id").inTable("user");
            classroom.string("classroomTitle");
            classroom.string("classroomDesc");
            classroom.boolean("classroomStatus");
            classroom.timestamps(false, true);
        })
        .createTable("set", (set) => {
            set.increments().primary();
            set.integer("user_id").references("id").inTable("user");
            set.string("setTitle");
            set.string("setDesc");
            set.boolean("setStatus");
            set.timestamps(false, true);
        })
        .createTable("flashcard", (flashcard) => {
            flashcard.increments().primary();
            flashcard.integer("user_id").references("id").inTable("user");
            flashcard.string("flashcardTitle");
            flashcard.string("flashcardBody");
            flashcard.string("flashcardRecording");
            flashcard.boolean("flashcardStatus");
            flashcard.timestamps(false, true)
        })
        .createTable("flashcardSubmission", (flashcardSubmission) => {
            flashcardSubmission.increments().primary();
            flashcardSubmission.integer("user_id").references("id").inTable("user");
            flashcardSubmission.integer("flashcard_id").references("id").inTable("flashcard")
            flashcardSubmission.string("flashcardSubmissionRecording");
            flashcardSubmission.boolean("flashcardSubmissionStatus");
            flashcardSubmission.timestamps(false, true);
        })
        .createTable("flashcardFeedback", (flashcardFeedback) => {
            flashcardFeedback.increments().primary();
            flashcardFeedback.integer("user_id").references("id").inTable("user");
            flashcardFeedback.integer("flashcardSubmission_id").references("id").inTable("flashcardSubmission");
            flashcardFeedback.string("flashcardFeedbackBody");
            flashcardFeedback.string("flashcardFeedbackTime");
            flashcardFeedback.boolean("flashcardFeedbackStatus");
            flashcardFeedback.timestamps(false, true);
        })
        .createTable("quizcard", (quizcard) => {
            quizcard.increments().primary();
            quizcard.integer("user_id").references("id").inTable("user");
            quizcard.string("quizcardTitle");
            quizcard.string("quizcardRecording");
            quizcard.boolean("quizcardStatus");
            quizcard.timestamps(false, true);
        })
        .createTable("quizcardQuestion", (quizcardQuestion) => {
            quizcardQuestion.increments().primary();
            quizcardQuestion.integer("quizcard_id").references("id").inTable("quizcard");
            quizcardQuestion.string("questionType");
            quizcardQuestion.string("questionTime");
            quizcardQuestion.string("questionBody");
            quizcardQuestion.string("multipleChoiceA");
            quizcardQuestion.string("multipleChoiceB");
            quizcardQuestion.string("multipleChoiceC");
            quizcardQuestion.string("multipleChoiceD");
            quizcardQuestion.string("multipleChoiceAnswer");
            quizcardQuestion.string("trueFalseAnswer");
            quizcardQuestion.timestamps(false, true);
        })
        .createTable("quizcardQuestionSubmission", (quizcardQuestionSubmission) => {
            quizcardQuestionSubmission.increments().primary();
            quizcardQuestionSubmission.integer("user_id").references("id").inTable("user");
            quizcardQuestionSubmission.integer("quizcardQuestion_id").references("id").inTable("quizcardQuestion");
            quizcardQuestionSubmission.string("quizcardQuestionSubmission");
            quizcardQuestionSubmission.boolean("quizcardQuestionMarking");
            quizcardQuestionSubmission.timestamps(false, true)
        })
        .createTable("dictationcard", (dictationcard) => {
            dictationcard.increments().primary();
            dictationcard.integer("user_id").references("id").inTable("user");
            dictationcard.string("dictationcardTitle");
            dictationcard.boolean("dictationcardStatus");
            dictationcard.timestamps(false, true);
        })
        .createTable("dictation", (dictation) => {
            dictation.increments().primary();
            dictation.integer("user_id").references("id").inTable("user");
            dictation.integer("dictationcard_id").references("id").inTable("dictationcard");
            dictation.string("dictationBody");
            dictation.string("dictationRecording");
            dictation.boolean("dictationStatus");
            dictation.timestamps(false, true);
        })
        .createTable("dictationSubmission", (dictationSubmission) => {
            dictationSubmission.increments().primary();
            dictationSubmission.integer("user_id").references("id").inTable("user");
            dictationSubmission.integer("dictation_id").references("id").inTable("dictation");
            dictationSubmission.string("dictationSubmissionPath");
            dictationSubmission.boolean("dictationSubmissionStatus");
            dictationSubmission.timestamps(false, true);
        })
        .createTable("dictationFeedback", (dictationFeedback) => {
            dictationFeedback.increments().primary();
            dictationFeedback.integer("user_id").references("id").inTable("user");
            dictationFeedback.integer("dictationSubmission_id").references("id").inTable("dictationSubmission");
            dictationFeedback.string("dictationFeedbackBody");
            dictationFeedback.boolean("dictationFeedbackStatus");
            dictationFeedback.timestamps(false, true);
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable("dictationFeedback")
        .dropTable("dictationSubmission")
        .dropTable("dictation")
        .dropTable("dictationcard")
        .dropTable("quizcardQuestionSubmission")
        .dropTable("quizcardQuestion")
        .dropTable("quizcard")
        .dropTable("flashcardFeedback")
        .dropTable("flashcardSubmission")
        .dropTable("flashcard")
        .dropTable("set")
        .dropTable("classroom")
        .dropTable("tag")
        .dropTable("user")
};