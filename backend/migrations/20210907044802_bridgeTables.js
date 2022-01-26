exports.up = function(knex) {
    return knex.schema
    .createTable("classroom_user", (classroom_user) => {
        classroom_user.increments().primary();
        classroom_user.integer("classroom_id").references("id").inTable("classroom");
        classroom_user.integer("sharedUser_id").references("id").inTable("user");
    })
    .createTable("classroom_set", (classroom_set) => {
        classroom_set.increments().primary();
        classroom_set.integer("classroom_id").references("id").inTable("classroom");
        classroom_set.integer("set_id").references("id").inTable("set");
    })
    .createTable("set_flashcard", (set_flashcard) => {
        set_flashcard.increments().primary();
        set_flashcard.integer("set_id").references("id").inTable("set");
        set_flashcard.integer("flashcard_id").references("id").inTable("flashcard");
    })
    .createTable("set_quizcard", (set_quizcard) => {
        set_quizcard.increments().primary();
        set_quizcard.integer("set_id").references("id").inTable("set");
        set_quizcard.integer("quizcard_id").references("id").inTable("quizcard");
    })
    .createTable("set_dictationcard", (set_dictationcard) => {
        set_dictationcard.increments().primary();
        set_dictationcard.integer("set_id").references("id").inTable("set");
        set_dictationcard.integer("dictationcard_id").references("id").inTable("dictationcard");
    })
    .createTable("tag_classroom", (tag_classroom) => {
        tag_classroom.increments().primary();
        tag_classroom.integer("tag_id").references("id").inTable("tag");
        tag_classroom.integer("classroom_id").references("id").inTable("classroom");
    })
    .createTable("tag_set", (tag_set) => {
        tag_set.increments().primary();
        tag_set.integer("tag_id").references("id").inTable("tag");
        tag_set.integer("set_id").references("id").inTable("set");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable("tag_set")
    .dropTable("tag_classroom")
    .dropTable("set_dictationcard")
    .dropTable("set_quizcard")
    .dropTable("set_flashcard")
    .dropTable("classroom_set")
    .dropTable("classroom_user")
  };