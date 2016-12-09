function Quiz(name, questions){
  this.quizLength = questions.length;
  this.quizPosition = 0;
  this.currentQuestion = questions[this.quizPosition].question;
  this.currentAnswers = questions[this.quizPosition].answers;
  this.currentCorrect = questions[this.quizPosition].correct;

  this.refreshQuiz = function() {
    this.currentQuestion = questions[this.quizPosition].question;
    this.currentAnswers = questions[this.quizPosition].answers;
    this.currentCorrect = questions[this.quizPosition].correct;
  }

  this.nextQuestion = function(){
    if(this.quizPosition != this.quizLength-1) {
      this.quizPosition++;
    }
  }

  this.prevQuestion = function() {
    if(this.quizPosition != 0) {
      this.quizPosition --;
    }
  }
};

//Quiz 1:
var q1_q1 = {question: "What element is part of H2O?",
  answers: [
    "Calcium",
    "Oxygen", // Correct
    "Lithium"
  ],
  correct: "Oxygen"
};

var q1_q2 = {question: "How many different elements are there?",
  answers: [
    "50",
    "77",
    "100" // Correct
  ],
  correct: "100"
};

var q1_questions = [q1_q1, q1_q2];
var quiz1 = new Quiz("elements", q1_questions);




//QUIZ FRONT END.. JQuery stuff.

var f_reloadQuiz = function(quiz) {
  quiz.refreshQuiz();
  var sel_title = "#question";
  var sel_quizList = "#quiz-form ul";

  //Remove old answers
  $(".answer").remove();

  //Change the question.
  $(sel_title).text(quiz.currentQuestion);

  //Add new answers.
  quiz1.currentAnswers.forEach(function(answer) {
    $(sel_quizList).prepend("<li class='answer'> \
                        <input type='radio' id='" + answer + "' name ='quiz' value='" + answer + "'/> \
                        <label for='" + answer + "'>" + answer + "</label>\
                      </li>"
    );
  });
};


$(function() {
	//Check JQuery is Running
	console.log("Quiz Running.");
  f_reloadQuiz(quiz1);

  //Next 2 lines just move on to next line.
  quiz1.nextQuestion();
  f_reloadQuiz(quiz1);

  //Hide the cover when quiz is started;
  $('#cover-button').click(function() {
    $('#answers').animate({
        opacity: 0
      }, 600, function() {
        $('#answers').hide();
      });
    $('#quiz-cover').animate({
        opacity: 0
      }, 600, function(){ //animation complete
        $('#quiz-cover').hide();
        $('#quiz-wrap').css("top",  0);
    });
  });

  //Return button functionality

  $('#return-button').click(function() {

    //Show answers again.
    $('#answers').show(function() {
      $('#answers').animate({opacity: 1}, 600);
    });

    //Cover quiz again.
    $('#quiz-cover').show(function() {
      $('#quiz-cover').animate({opacity: 1}, 600);
      $('#quiz-wrap').css("top",  "-400px");
    });

  });


  $('#quiz-form').on('submit', function(e) {

    console.log("Quiz Submitted");
    e.preventDefault();
  });
});
