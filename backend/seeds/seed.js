const hashFunction = require("../auth/hashFunction")

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('user').del()
      .then(async () => {
        // Inserts seed entries
        return knex('user').insert([{
          displayName: 'Test Wong',
          email: "test@test.com",
          passwordHash: await hashFunction.hashPassword("thisisatest"),
          picture: "https://static-s.aa-cdn.net/img/gp/20600014424487/UTpd6qixaabJJIKkkMixyqTq26NMnWoFJvgXXXEMf7aJGsR0lyYFYaLU9_TTP7kLGqI=s300?v=1",
          role: "teacher",
          tier: "basic",
          userStatus: true
        }, {
          displayName: 'User Philip',
          email: "user@user.com",
          passwordHash: await hashFunction.hashPassword("thisisauser"),
          picture: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress%2Cformat&ixlib=php-3.3.0",
          role: "teacher",
          tier: "basic",
          userStatus: true
        }, {
          displayName: 'John Cheng',
          email: "john@john.com",
          passwordHash: await hashFunction.hashPassword("thisisajohn"),
          picture: "https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg",
          role: "teacher",
          tier: "basic",
          userStatus: true
        }, {
          displayName: 'Jack Wynn',
          email: "jack@jack.com",
          passwordHash: await hashFunction.hashPassword("thisisajack"),
          picture: "https://s3.getstickerpack.com/storage/uploads/sticker-pack/cat-memes/sticker_3.png?c6e3e2eb120b5c81fe616d90bfbea285&d=200x200",
          role: "teacher",
          tier: "basic",
          userStatus: true
      }, {
        displayName: 'James Lee',
        email: "james@james.com",
        passwordHash: await hashFunction.hashPassword("thisisajames"),
        picture: "https://cdn.shopify.com/s/files/1/0416/8083/0620/products/FiGPiN_483AggretsukoAGGRETSUKOPIN_1600x.jpg?v=1628191853",
        role: "student",
        tier: "basic",
        userStatus: true
      }, {
        displayName: 'Mark Chan',
        email: "mark@mark.com",
        passwordHash: await hashFunction.hashPassword("thisisamark"),
        picture: "https://gamingtrend.com/wp-content/uploads/2021/02/https___hypebeast.com_wp-content_blogs.dir_6_files_2017_01_sanrio-new-character-aggretsuko-angry-red-panda-1.jpg",
        role: "student",
        tier: "basic",
        userStatus: true
      }, {
        displayName: 'Mike Lau',
        email: "mike@mike.com",
        passwordHash: await hashFunction.hashPassword("thisisamike"),
        picture: "http://www.pajiba.com/assets_c/2018/03/Aggretsuko-Netflix-PV-1000x600-thumb-700xauto-194804.png",
        role: "student",
        tier: "basic",
        userStatus: true
      }])
    })
      .then(() => {
        return knex('tag').del();
      })
      .then(() => {
        return knex('tag').insert([{
          tagBody: "beginner",
        }, {
          tagBody: "intermediate"
        }, {
          tagBody: "advanced"
        }, {
          tagBody: "hardcore"
        }])
      })
      .then(() => {
        return knex('classroom').del();
      })
      .then(() => {
        return knex('classroom').insert([{
          user_id: 1,
          classroomTitle: "James' English Class",
          classroomDesc: "English lesson materials for James' classes",
          classroomStatus: true
        }, {
          user_id: 1,
          classroomTitle: "Mike's English Class",
          classroomDesc: "English lesson materials for Mike's classes",
          classroomStatus: true
        }, {
          user_id: 2,
          classroomTitle: "Mark's French Classes",
          classroomDesc: "French lesson materials for Mark's classes",
          classroomStatus: true
        }, {
          user_id: 3,
          classroomTitle: "Mike's Chinese Class",
          classroomDesc: "Chinese lesson materials for Mark's classes",
          classroomStatus: true
        }])
      })
      .then(() => {
        return knex('classroom_user').del();
      })
      .then(() => {
        return knex('classroom_user').insert([{
          classroom_id: 1,
          sharedUser_id: 5
        }, {
          classroom_id: 2,
          sharedUser_id: 7
        }, {
          classroom_id: 3,
          sharedUser_id: 6
        }, {
          classroom_id: 4,
          sharedUser_id: 7
        }])
      })
      .then(() => {
        return knex('set').del();
      })
      .then(() => {
        return knex('set').insert([{
          user_id: 1,
          setTitle: "Beginner's English",
          setDesc: "Sets introducing the basics of English",
          setStatus: true
        }, {
          user_id: 1,
          setTitle: "English Greetings",
          setDesc: "Basic greeting phrases in english",
          setStatus: true
        }, {
          user_id: 1,
          setTitle: "Conversational English",
          setDesc: "Practice and learn everyday english phrases",
          setStatus: true
        }, {
          user_id: 2,
          setTitle: "Beginner's French",
          setDesc: "Sets introducing the basics of French",
          setStatus: true
        }, {
          user_id: 2,
          setTitle: "Daily Routines",
          setDesc: "Sets introducing the basics of French",
          setStatus: true
        }, {
          user_id: 2,
          setTitle: "Beginner's French Vocabulary",
          setDesc: "Simple negation and male and female nouns.",
          setStatus: true
        }, {
          user_id: 3,
          setTitle: "Beginner's Mandarin",
          setDesc: "Basic Mandarin",
          setStatus: true
        }])
      })
      .then(() => {
        return knex('flashcard').del();
      })
      .then(() => {
        return knex('flashcard').insert([{
          user_id: 1,
          flashcardTitle: "Greeting #1",
          flashcardBody: "Hi there, my name is _________. Nice to meet you.",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/14bb4e8f-4af2-4c2e-9243-402460c17887",
          flashcardStatus: true,
        }, {
          user_id: 1,
          flashcardTitle: "Food #2",
          flashcardBody: "I'm vegetarian but occasionally I eat steak. I love steak.",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          flashcardStatus: true,
        }, {
          user_id: 1,
          flashcardTitle: "Food #3",
          flashcardBody: "May I please have a an iced, Ristretto, 10 shot, venti, with breve, 5 pump vanilla, 7 pump caramel, 4 Splenda. Poured, not shaken. Thanks.",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          flashcardStatus: true,
        }, {
          user_id: 1,
          flashcardTitle: "Beginner's #1",
          flashcardBody: "Jesus christ.",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          flashcardStatus: true,
        }, {
          user_id: 2,
          flashcardTitle: "Basic French",
          flashcardBody: "Bonjour, comment tu t'appelles?",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          flashcardStatus: true,
        }, {
          user_id: 2,
          flashcardTitle: "Basic French",
          flashcardBody: "Merde.",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardStatus: true,
        }, {
          user_id: 2,
          flashcardTitle: "Routines",
          flashcardBody: "Voulez vous couchez avec moi ce soir?",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardStatus: true,
        }, {
          user_id: 3,
          flashcardTitle: "Basic Mandarin",
          flashcardBody: "床 前 看 月 光， 疑 是 地 上 霜， 举 头 望 山 月， 低 头 思 故 乡",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardStatus: true,
        }])
      })
      .then(() => {
        return knex('flashcardSubmission').del();
      })
      .then(() => {
        return knex('flashcardSubmission').insert([{
          user_id: 5,
          flashcard_id: 1,
          flashcardSubmissionRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/14bb4e8f-4af2-4c2e-9243-402460c17887",
          flashcardSubmissionStatus: true
        }, {
          user_id: 5,
          flashcard_id: 2,
          flashcardSubmissionRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          flashcardSubmissionStatus: true
        }, {
          user_id: 5,
          flashcard_id: 3,
          flashcardSubmissionRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardSubmissionStatus: true
        }, {
          user_id: 7,
          flashcard_id: 1,
          flashcardSubmissionRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardSubmissionStatus: true
        }, {
          user_id: 7,
          flashcard_id: 2,
          flashcardSubmissionRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardSubmissionStatus: true
        }, {
          user_id: 6,
          flashcard_id: 5,
          flashcardSubmissionRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardSubmissionStatus: true
        }, {
          user_id: 6,
          flashcard_id: 6,
          flashcardSubmissionRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardSubmissionStatus: true
        }, {
          user_id: 6,
          flashcard_id: 7,
          flashcardSubmissionRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardSubmissionStatus: true
        }, {
          user_id: 7,
          flashcard_id: 8,
          flashcardSubmissionRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardSubmissionStatus: true
        }])
      })
      .then(() => {
        return knex('flashcardFeedback').del();
      })
      .then(() => {
        return knex('flashcardFeedback').insert([{
          user_id: 1,
          flashcardSubmission_id: 1,
          flashcardFeedbackBody: "Input your actual name here",
          flashcardFeedbackTime: "00:05",
          flashcardFeedbackStatus: true
        }, {
          user_id: 1,
          flashcardSubmission_id: 2,
          flashcardFeedbackBody: "Remember to pause when there is a full stop.",
          flashcardFeedbackTime: "00:10",
          flashcardFeedbackStatus: true
        }, {
          user_id: 3,
          flashcardSubmission_id: 3,
          flashcardFeedbackBody: "Ristretto pronounced as Ree-streh-toh",
          flashcardFeedbackTime: "01:00",
          flashcardFeedbackStatus: true
        }])
      })
      .then(() => {
        return knex('quizcard').del();
      })
      .then(() => {
        return knex('quizcard').insert([{
          user_id: 1,
          quizcardTitle: "Greetings Quiz #1",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          quizcardStatus: true,
        }, {
          user_id: 1,
          quizcardTitle: "Conversational English Quiz #1",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          quizcardStatus: true,
        }, {
          user_id: 3,
          quizcardTitle: "Basic Chinese Quiz #1",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          quizcardStatus: true,
        }])
      })
      .then(()=>{
        return knex('quizcardQuestion').del();
      })
      .then(()=>{
        return knex('quizcardQuestion').insert([{
          quizcard_id: 1,
          questionType: "multipleChoice",
          questionTime: "00:15",
          questionBody: "What was the weather like?",
          multipleChoiceA: "Sunny",
          multipleChoiceB: "Humid",
          multipleChoiceC: "Cold",
          multipleChoiceD: "Not sure, the entire video was filmed indoors and there was no conversational content about the weather.",
          multipleChoiceAnswer: "c",
        },{
          quizcard_id: 1,
          questionType: "trueFalse",
          questionTime: "00:25",
          questionBody: "Mike is older than 40 years old",
          trueFalseAnswer: "true",
        },{
          quizcard_id: 1,
          questionType: "trueFalse",
          questionTime: "00:30",
          questionBody: "Mike is working as a web developer",
          trueFalseAnswer: "false",
        },{
          quizcard_id: 2,
          questionType: "multipleChoice",
          questionTime: "00:10",
          questionBody: "What did Adam order at the restaurant?",
          multipleChoiceA: "Burger with chips",
          multipleChoiceB: "Burger with cajun chips",
          multipleChoiceC: "Burger with more chips",
          multipleChoiceD: "Burger with less chips",
          multipleChoiceAnswer: "b",
        },{
          quizcard_id: 2,
          questionType: "trueFalse",
          questionTime: "00:15",
          questionBody: "Lucy ordered a burgerless salad.",
          trueFalseAnswer: "true",
        },{
          quizcard_id: 2,
          questionType: "trueFalse",
          questionTime: "01:00",
          questionBody: "The food was incredible.",
          trueFalseAnswer: "false",
        },{
          quizcard_id: 2,
          questionType: "multipleChoice",
          questionTime: "01:24",
          questionBody: "What did Adam ask for from the waiter after he finished his meal?",
          multipleChoiceA: "The bill",
          multipleChoiceB: "Some napkins",
          multipleChoiceC: "A glass of water",
          multipleChoiceD: "A refund",
          multipleChoiceAnswer: "d",
        },{
          quizcard_id: 2,
          questionType: "multipleChoice",
          questionBody: "Why was Adam arrested?",
          multipleChoiceA: "For trying to leave without paying",
          multipleChoiceB: "For trying to steal a fork",
          multipleChoiceC: "For eating food on someone else's table",
          multipleChoiceD: "For jumping into the fishpond",
          multipleChoiceAnswer: "d",
        }, {
          quizcard_id: 3,
          questionType: "multipleChoice",
          questionBody: "等不到天黑...",
          multipleChoiceA: "煙火不會太完美",
          multipleChoiceB: "煙火實在太完美",
          multipleChoiceC: "還是等不到結尾",
          multipleChoiceD: "(聽不清楚)",
          multipleChoiceAnswer: "d",
        }, {
          quizcard_id: 3,
          questionType: "trueFalse",
          questionBody: "小明在唱歌比賽中拿到冠軍",
          trueFalseAnswer: "false",
        }])
      })
      .then(()=>{
        return knex('quizcardQuestionSubmission').del();
      })
      .then(()=>{
        return knex('quizcardQuestionSubmission').insert([{
          user_id: 5,
          quizcardQuestion_id: 1,
          quizcardQuestionSubmission: "a",
          quizcardQuestionMarking: false,
        },{
          user_id: 5,
          quizcardQuestion_id: 2,
          quizcardQuestionSubmission: "true",
          quizcardQuestionMarking: true,
        },{
          user_id: 5,
          quizcardQuestion_id: 3,
          quizcardQuestionSubmission: "true",
          quizcardQuestionMarking: false,
        }, {
          user_id: 7,
          quizcardQuestion_id: 1,
          quizcardQuestionSubmission: "c",
          quizcardQuestionMarking: true,
        },{
          user_id: 7,
          quizcardQuestion_id: 2,
          quizcardQuestionSubmission: "true",
          quizcardQuestionMarking: true,
        },{
          user_id: 7,
          quizcardQuestion_id: 3,
          quizcardQuestionSubmission: "false",
          quizcardQuestionMarking: true,
        },{
          user_id: 5,
          quizcardQuestion_id: 4,
          quizcardQuestionSubmission: "b",
          quizcardQuestionMarking: true,
        },{
          user_id: 5,
          quizcardQuestion_id: 5,
          quizcardQuestionSubmission: "true",
          quizcardQuestionMarking: true,
        },{
          user_id: 5,
          quizcardQuestion_id: 6,
          quizcardQuestionSubmission: "true",
          quizcardQuestionMarking: false,
        },{
          user_id: 5,
          quizcardQuestion_id: 7,
          quizcardQuestionSubmission: "a",
          quizcardQuestionMarking: false,
        },{
          user_id: 5,
          quizcardQuestion_id: 8,
          quizcardQuestionSubmission: "d",
          quizcardQuestionMarking: true,
        },{
          user_id: 7,
          quizcardQuestion_id: 4,
          quizcardQuestionSubmission: "a",
          quizcardQuestionMarking: false,
        },{
          user_id: 7,
          quizcardQuestion_id: 5,
          quizcardQuestionSubmission: "true",
          quizcardQuestionMarking: true,
        },{
          user_id: 7,
          quizcardQuestion_id: 6,
          quizcardQuestionSubmission: "false",
          quizcardQuestionMarking: true,
        },{
          user_id: 7,
          quizcardQuestion_id: 7,
          quizcardQuestionSubmission: "d",
          quizcardQuestionMarking: true,
        },{
          user_id: 7,
          quizcardQuestion_id: 8,
          quizcardQuestionSubmission: "c",
          quizcardQuestionMarking: false,
        },{
          user_id: 6,
          quizcardQuestion_id: 9,
          quizcardQuestionSubmission: "a",
          quizcardQuestionMarking: true,
        },{
          user_id: 6,
          quizcardQuestion_id: 9,
          quizcardQuestionSubmission: "false",
          quizcardQuestionMarking: true,
        }])
      })
      .then(() => {
        return knex('dictationcard').del();
      })
      .then(() => {
        return knex('dictationcard').insert([{
          user_id: 1,
          dictationcardTitle: "Beginner's English Dictation #1",
          dictationcardStatus: true,
        }, {
          user_id: 1,
          dictationcardTitle: "Everyday English Vocabulary Dication #1",
          dictationcardStatus: true,
        }, {
          user_id: 2,
          dictationcardTitle: "French Vocabulary Dictation #1",
          dictationcardStatus: true,
        }, {
          user_id: 3,
          dictationcardTitle: "Chinese Dictation #1",
          dictationcardStatus: true,
        }])
      })
      .then(() => {
        return knex('dictation').del();
      })
      .then(() => {
        return knex('dictation').insert([{
          user_id: 1,
          dictationcard_id: 1,
          dictationBody: "Congratulations",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 1,
          dictationcard_id: 1,
          dictationBody: "Thank you",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 1,
          dictationcard_id: 1,
          dictationBody: "Sincerely",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 1,
          dictationcard_id: 1,
          dictationBody: "Reminder",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 1,
          dictationcard_id: 1,
          dictationBody: "Booking",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 1,
          dictationcard_id: 2,
          dictationBody: "Please",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 1,
          dictationcard_id: 2,
          dictationBody: "Market",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 1,
          dictationcard_id: 2,
          dictationBody: "Seafood",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 1,
          dictationcard_id: 2,
          dictationBody: "Apple",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 1,
          dictationcard_id: 2,
          dictationBody: "Pineapple",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 1,
          dictationcard_id: 2,
          dictationBody: "Organic",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 2,
          dictationcard_id: 3,
          dictationBody: "Comment tu t'appelles",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 2,
          dictationcard_id: 3,
          dictationBody: "Ça va?",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 2,
          dictationcard_id: 3,
          dictationBody: "Qu'est-ce que c'est?",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 3,
          dictationcard_id: 4,
          dictationBody: "鐵路",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 3,
          dictationcard_id: 4,
          dictationBody: "身分",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 3,
          dictationcard_id: 4,
          dictationBody: "保存",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 3,
          dictationcard_id: 4,
          dictationBody: "商量",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 3,
          dictationcard_id: 4,
          dictationBody: "模仿",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 3,
          dictationcard_id: 4,
          dictationBody: "能力",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }])
      })
      .then(() => {
        return knex('dictationSubmission').del();
      })
      .then(() => {
        return knex('dictationSubmission').insert([{
          user_id: 5,
          dictation_id: 1,
          dictationSubmissionPath: "https://thumbs.dreamstime.com/z/calligraphic-handwriting-text-word-english-stroke-vector-executed-pen-137007202.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 5,
          dictation_id: 2,
          dictationSubmissionPath: "https://cdn4.vectorstock.com/i/1000x1000/46/68/english-calligraphy-template-text-for-your-design-vector-24604668.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 5,
          dictation_id: 3,
          dictationSubmissionPath: "https://thumbs.dreamstime.com/b/giraffe-calligraphy-template-text-your-design-illustration-concept-handwritten-lettering-title-vector-words-white-isolated-143433981.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 5,
          dictation_id: 4,
          dictationSubmissionPath: "https://cdn4.vectorstock.com/i/1000x1000/46/68/english-calligraphy-template-text-for-your-design-vector-24604668.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 5,
          dictation_id: 5,
          dictationSubmissionPath: "https://thumbs.dreamstime.com/b/giraffe-calligraphy-template-text-your-design-illustration-concept-handwritten-lettering-title-vector-words-white-isolated-143433981.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 2,
          dictation_id: 1,
          dictationSubmissionPath: "https://thumbs.dreamstime.com/z/calligraphic-handwriting-text-word-english-stroke-vector-executed-pen-137007202.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 2,
          dictation_id: 2,
          dictationSubmissionPath: "https://cdn4.vectorstock.com/i/1000x1000/46/68/english-calligraphy-template-text-for-your-design-vector-24604668.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 2,
          dictation_id: 3,
          dictationSubmissionPath: "https://thumbs.dreamstime.com/b/giraffe-calligraphy-template-text-your-design-illustration-concept-handwritten-lettering-title-vector-words-white-isolated-143433981.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 2,
          dictation_id: 4,
          dictationSubmissionPath: "https://cdn4.vectorstock.com/i/1000x1000/46/68/english-calligraphy-template-text-for-your-design-vector-24604668.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 2,
          dictation_id: 5,
          dictationSubmissionPath: "https://thumbs.dreamstime.com/b/giraffe-calligraphy-template-text-your-design-illustration-concept-handwritten-lettering-title-vector-words-white-isolated-143433981.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 3,
          dictation_id: 1,
          dictationSubmissionPath: "https://images-na.ssl-images-amazon.com/images/I/71noTyP7GXS.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 3,
          dictation_id: 2,
          dictationSubmissionPath: "https://cdn4.vectorstock.com/i/1000x1000/46/68/english-calligraphy-template-text-for-your-design-vector-24604668.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 3,
          dictation_id: 3,
          dictationSubmissionPath: "https://thumbs.dreamstime.com/b/giraffe-calligraphy-template-text-your-design-illustration-concept-handwritten-lettering-title-vector-words-white-isolated-143433981.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 3,
          dictation_id: 4,
          dictationSubmissionPath: "https://cdn4.vectorstock.com/i/1000x1000/46/68/english-calligraphy-template-text-for-your-design-vector-24604668.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 3,
          dictation_id: 5,
          dictationSubmissionPath: "https://thumbs.dreamstime.com/b/giraffe-calligraphy-template-text-your-design-illustration-concept-handwritten-lettering-title-vector-words-white-isolated-143433981.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 4,
          dictation_id: 1,
          dictationSubmissionPath: "https://static.displate.com/857x1200/displate/2018-09-20/7fa888da5010dc52d9037346153ea65c_deb4a5446796e551521560f36111ae20.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 4,
          dictation_id: 2,
          dictationSubmissionPath: "https://cdn4.vectorstock.com/i/1000x1000/46/68/english-calligraphy-template-text-for-your-design-vector-24604668.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 4,
          dictation_id: 3,
          dictationSubmissionPath: "https://thumbs.dreamstime.com/b/giraffe-calligraphy-template-text-your-design-illustration-concept-handwritten-lettering-title-vector-words-white-isolated-143433981.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 4,
          dictation_id: 4,
          dictationSubmissionPath: "https://cdn4.vectorstock.com/i/1000x1000/46/68/english-calligraphy-template-text-for-your-design-vector-24604668.jpg",
          dictationSubmissionStatus: true
        }, {
          user_id: 4,
          dictation_id: 5,
          dictationSubmissionPath: "https://thumbs.dreamstime.com/b/giraffe-calligraphy-template-text-your-design-illustration-concept-handwritten-lettering-title-vector-words-white-isolated-143433981.jpg",
          dictationSubmissionStatus: true
        }])
      })
      .then(() => {
        return knex('dictationFeedback').del();
      })
      .then(() => {
        return knex('dictationFeedback').insert([{
          user_id: 1,
          dictationSubmission_id: 1,
          dictationFeedbackBody: "Stroke wrong",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 2,
          dictationFeedbackBody: "Stroke wrong",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 3,
          dictationFeedbackBody: "Stroke wrong",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 4,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 5,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 6,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 7,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 8,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 9,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 10,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 11,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 12,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 13,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 14,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 15,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 16,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 17,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 18,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 19,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 20,
          dictationFeedbackBody: "",
          dictationFeedbackStatus: true
        }])
      })
      .then(() => {
        return knex('classroom_set').del();
      })
      .then(() => {
        return knex('classroom_set').insert([{
          classroom_id: 1,
          set_id: 1
        }, {
          classroom_id: 1,
          set_id: 2
        }, {
          classroom_id: 1,
          set_id: 3
        }, {
          classroom_id: 2,
          set_id: 1
        }, {
          classroom_id: 2,
          set_id: 2
        }, {
          classroom_id: 3,
          set_id: 4
        }, {
          classroom_id: 3,
          set_id: 5
        }, {
          classroom_id: 3,
          set_id: 6
        }, {
          classroom_id: 4,
          set_id: 7
        }])
      })
      .then(() => {
        return knex('set_flashcard').del();
      })
      .then(() => {
        return knex('set_flashcard').insert([{
          set_id: 1,
          flashcard_id: 1
        }, {
          set_id: 1,
          flashcard_id: 4
        }, {
          set_id: 3,
          flashcard_id: 2
        }, {
          set_id: 3,
          flashcard_id: 3
        }, {
          set_id: 4,
          flashcard_id: 5
        }, {
          set_id: 4,
          flashcard_id: 6
        }, {
          set_id: 5,
          flashcard_id: 7
        }])
      })
      .then(() => {
        return knex('set_quizcard').del();
      })
      .then(() => {
        return knex('set_quizcard').insert([{
          set_id: 1,
          quizcard_id: 1
        }, {
          set_id: 3,
          quizcard_id: 2
        }, {
          set_id: 5,
          quizcard_id: 3
        }])
      })
      .then(() => {
        return knex('set_dictationcard').del();
      })
      .then(() => {
        return knex('set_dictationcard').insert([{
          set_id: 1,
          dictationcard_id: 1
        }, {
          set_id: 2,
          dictationcard_id: 2
        }, {
          set_id: 2,
          dictationcard_id: 1
        }, {
          set_id: 5,
          dictationcard_id: 3
        }, {
          set_id: 6,
          dictationcard_id: 3
        }])
      })
      .then(() => {
        return knex('tag_classroom').del();
      })
      .then(() => {
        return knex('tag_classroom').insert([{
          tag_id: 1,
          classroom_id: 1
        }, {
          tag_id: 1,
          classroom_id: 2
        }, {
          tag_id: 2,
          classroom_id: 1
        }, {
          tag_id: 2,
          classroom_id: 2
        }, {
          tag_id: 3,
          classroom_id: 1
        }])
      })
      .then(() => {
        return knex('tag_set').del();
      })
      .then(() => {
        return knex('tag_set').insert([{
          tag_id: 1,
          set_id: 1,
        }, {
          tag_id: 2,
          set_id: 1,
        }, {
          tag_id: 1,
          set_id: 2,
        }, {
          tag_id: 2,
          set_id: 2,
        }, {
          tag_id: 1,
          set_id: 3,
        }])
      })
  };