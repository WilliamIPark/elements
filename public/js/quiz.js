//Gets the name of the element through the URL, so the correct quiz can be selected.
// EG. letslearnelements.com/learn/helium returns "helium".
var url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
var submitState = 0; //0 = Nothing submitted, 1 = Submitted But Wrong, 2 = Submitted Correctly.
var score = 0;


///////////////////////////////////////////////////////////////////////
//////////////////////    QUESTIONS    ////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

//Helium///////////////////////////////////////////////////////////////
var helium_q1 = {question: "What is the atomic number of Helium?",
  answers: [
    "1",
    "2",
    "4"
  ],
  correct: "2"
};

var helium_q2 = {question: "What is helium useful for?",
  answers: [
    "Drawing",
    "Batteries",
    "Cooling Parts"
  ],
  correct: "Cooling Parts"
};

var helium_q3 = {question: "What does Helium smell like?",
  answers: [
    "Rotton Eggs",
    "Nothing",
    "Garlic"
  ],
  correct: "Nothing"
};

var helium_questions = [helium_q1, helium_q2, helium_q3];
var helium = new Quiz("elements", helium_questions);


//Lithium///////////////////////////////////////////////////////////////
var lithium_q1 = {question: "If burning well, what colour is Lithium's Flame?",
  answers: [
    "Red",
    "Orange",
    "White"
  ],
  correct: "White"
};

var lithium_q2 = {question: "What colour is Lithium?",
  answers: [
    "White",
    "Silvery",
    "Colourless"
  ],
  correct: "Silvery"
};

var lithium_q3 = {question: "What property does Lithium have the least of?",
  answers: [
    "Electrons",
    "Density",
    "Uses"
  ],
  correct: "Density"
};

var lithium_questions = [lithium_q1, lithium_q2, lithium_q3];
var lithium = new Quiz("elements", lithium_questions);

//Hydrogen///////////////////////////////////////////////////////////////
var hydrogen_q1 = {question: "What state is hydrogen?",
  answers: [
    "Gas",
    "Liquid",
    "Solid"
  ],
  correct: "Gas"
};

var hydrogen_q2 = {question: "How much hydrogen is there in the universe?",
  answers: [
    "Not very much.",
    "A lot, but there is more lithium.",
    "It is the most common element!"
  ],
  correct: "It is the most common element!"
};

var hydrogen_q3 = {question: "Which is true?",
  answers: [
    "Lithium is lighter than Hydrogen.",
    "Hydrogen is the lightest element of all.",
    "Hydrogen is a silvery colour."
  ],
  correct: "Hydrogen is the lightest element of all."
};

var hydrogen_questions = [hydrogen_q1, hydrogen_q2, hydrogen_q3];
var hydrogen = new Quiz("elements", hydrogen_questions);

//Sodium///////////////////////////////////////////////////////////////
var sodium_q1 = {question: "Which one of these is a use of sodium?",
  answers: [
    "Rocket fuel",
    "Fertilizers",
    "Making plastic"
  ],
  correct: "Fertilizers"
};

var sodium_q2 = {question: "What happens when sodium touches water?",
  answers: [
    "A few bubbles.",
    "Nothing.",
    "A violent reaction!"
  ],
  correct: "A violent reaction!"
};

var sodium_q3 = {question: "How many protons does sodium have?",
  answers: [
    "9",
    "10",
    "11"
  ],
  correct: "11"
};

var sodium_questions = [sodium_q1, sodium_q2, sodium_q3];
var sodium = new Quiz("elements", sodium_questions);


//Carbon///////////////////////////////////////////////////////////////
var carbon_q1 = {question: "How many protons is in Carbon?",
  answers: [
    "2",
    "6", // Correct
    "8"
  ],
  correct: "6"
};

var carbon_q2 = {question: "What state is Carbon?",
  answers: [
    "Gas",
    "Liquid",
    "Solid" // Correct
  ],
  correct: "Solid"
};

var carbon_q3 = {question: "What is Carbon used for?",
  answers: [
    "Both",
    "Pencil Tips",
    "Drilling" // Correct
  ],
  correct: "Both"
};

var carbon_questions = [carbon_q1, carbon_q2, carbon_q3];
var carbon = new Quiz("elements", carbon_questions);

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


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
      return true;
    } else {
      return false;
    }
  }

  this.prevQuestion = function() {
    if(this.quizPosition != 0) {
      this.quizPosition --;
    }
  }
};






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
  window[url].currentAnswers.forEach(function(answer) {
    $(sel_quizList).prepend("<li class='answer'> \
                        <input type='radio' id='" + answer + "' name=" + url + " value='" + answer + "'/> \
                        <label for='" + answer + "'>" + answer + "</label>\
                      </li>"
    );
  });
};


$(function() {
	//Check JQuery is Running
	console.log("Quiz Running.");
  f_reloadQuiz(window[url]);

  //Next 2 lines just move on to next question.
  //window[url].nextQuestion();
  //f_reloadQuiz(window[url]);

  //Hide the cover and answers when quiz is started;
  $('#cover-button').click(function() {
    //Hide answers.
    $('.answers').animate({opacity: 0}, 300);
    $('#quiz-cover').animate({
        opacity: 0
      }, 300, function(){ //animation complete
        $('#submit-button').attr('value', 'Submit');
        $('input[name='+ url +']').prop('disabled', false);
        $('input[name='+ url +']').removeClass("incorrect correct");
        submitState = 0;
        window[url].quizPosition = 0;
        f_reloadQuiz(window[url]);
        $('#quiz-cover').hide();
        $('#results').css("display", "none");
        $('#cover-button').html('Start Quiz!')
    });
  });

  //Return button functionality

  $('#return-button').click(function() {
    //Show answers again.
    $('.answers').animate({opacity: 1}, 300);
    //Cover quiz again.
    $('#quiz-cover').show(function() {
      $('#quiz-cover').animate({opacity: 1}, 300, function() {
        // Reset the quiz.
        $('input[name='+ url +']').removeClass("incorrect correct");
        $('#submit-button').attr('value', 'Submit');
        $('input[name='+ url +']').prop('disabled', false);
        submitState = 0;
        window[url].quizPosition = 0;
        f_reloadQuiz(window[url]);
      });
    });


  });

  //When the quiz is submitted
  $('#quiz-form').on('submit', function(e) {
    var currentQuiz = window[url];
    var selectedAnswer = $('input[name='+ url +']:checked').val();

    //If the quiz isn't submitted yet, aka, the submit button still says submit.
    if(submitState == 0 && selectedAnswer != null) {
      //Get the selected answer from the form.
      console.log("Answer submitted: " + selectedAnswer);

      //If the submitted answer was correct
      if(currentQuiz.currentCorrect == selectedAnswer) {
        console.log("Selected answer was correct.");
        $('input[name='+ url +']:checked').addClass("correct");
        submitState = 2;
        score++;
        if(currentQuiz.quizPosition != currentQuiz.quizLength-1){
          $('#submit-button').attr('value', 'Next Question');
        } else {
          $('#submit-button').attr('value', 'View Results');
        }
        $('input[name='+ url +']').prop('disabled', true);
      }
      else { //If the submitted answer wasn't correct.
        $('input[name='+ url +']:checked').addClass("incorrect");
        submitState = 1;
        $('#submit-button').attr('value', 'Next Question');
        $('input[name='+ url +']').prop('disabled', true);
      }
      //If the quiz has been submitted, continue to next question, correct or not.
    } else if(submitState == 1 || submitState ==2) {
      //Check if there's another question available.
      if(window[url].nextQuestion())  {
        submitState = 0;
        // There was another question, refresh the quiz to show it.
        f_reloadQuiz(window[url]);
        $('#submit-button').attr('value', 'Submit');
      } else {
        //Quiz is FINISHED. Display answers.
        $('#quiz-cover').show(function() {
          $('#result-number').text(score.toString() + "/" + currentQuiz.quizLength.toString());
          $('#cover-button').html('Restart Quiz')
          $('#quiz-cover').animate({opacity: 1}, 100);
          $('#results').css("display", "flex");
          Cookies.set('points', parseInt(Cookies.get('points')) + score*100);
          $('#points').text("Points: " + Cookies.get('points'));
        });

        //Quiz is FINISHED. Also display answers again.
        $('.answers').animate({opacity: 1}, 300);
      }
    }

    e.preventDefault();
  });
});
