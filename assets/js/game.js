//GLOBAL VARIABLES
//===========================================================================================================================

var timer;
var t = 31;
var correct = 0;
var incorrect = 0;
var number = t;
var wrongAnswerMsg = ['Not quite!','Nope!','Wrong!','Sorry!'];
var rightAnswerMsg = ["Homerun!", "Good job!", "Nice!"];
var questions = [
    'The Kansas City Royals were founded in what year?', //1
    'Since April 10th, 1973, the Royals have played at what stadium?', //2
    'The Kansas City Royals have played in 4 World Series. Which team have the Royals NOT played in one of those series?', //3
    'Which Kansas City Royals player was ejected from a game after umpires discovered illegal placement of pine tar on his bat after he had hit a two-run HR?', //4
    "Which Kansas City Royals player broke the franchise single season homerun record with 37 homeruns in 2017?", //5
    'As a pitcher, Paul Splittorff leads the Kansas City Royals in wins with how many?', //6
    'In their 49 year history, 4 Kansas City Royals have won the Cy Young award with the most recent being in 2007 awarded to who?', //7
    "The Kansas City Royals play in what division?"]; //8
var answers = [
    ['1967', '1968', '1969', '1970'], //1
    ['Kauffman Stadium', 'Royals Stadium', 'Busch Field', 'Fenway Park'], //2
    ['New York Mets', 'St. Louis Cardinals', 'Phliadelphia Phillies', 'Atlanta Braves'], //3
    ['Mike Sweeney','George Brett','Frank White','Willie Wilson'], //4 
    ['Mike Moustakas',"Eric Hosmer",'Kendrys Morales',"Alex Gordon"], //5 
    ['150','173','154',"166"], //6
    ['Danny Duffy','Zack Greinke','Yordono Ventura','Gil Meche'], //7
    ['NL Central','AL West','AL Central','NL West']]; //8
    var correctAnswer = [
        '1969', //1
        'Kauffman Stadium', //2
        'Atlanta Braves', //3
        'George Brett', //4
        'Mike Moustakas', //5
        "166",  //6
        'Zack Greinke', //7
        'AL Central']; //8
    var gifArrary = [
        '<img src ="assets/img/q1.gif"</img>', //1
        '<img src ="assets/img/kauffman.gif"</img>', //2
        '<img src ="assets/img/atlanta.gif"</img>', //3 
        '<img src ="assets/img/pineTar.gif"</img>', //4
        '<img src ="assets/img/moose.gif"</img>',  //5
        '<img src ="assets/img/win.gif"</img>', //6
        '<img src ="assets/img/zack.gif"</img>', //7
        '<img src ="assets/img/american.png" width = "275"</img>' //8
    ];

var questionCount = 0;
var unanswered = 0;
var startpage;
var openingText;

function randomMsg(arr) {
    var num = Math.floor(Math.random()*arr.length);
    return num;
}

$(document).ready(function(){


// FUNCTIONS
//===========================================================================================================================

    //START GAME
    function startGame () {
        startpage = '<button class="btn startBtn btn-primary btn-lg m-auto" id="start">START</button>';
        $('.start-div').html(startpage);
        openingText = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="row text-center"><div class="col-sm"><h3 id="questionText"></div>'
        $('.question-div').html(openingText);
        $("#title").text('Test your knowledge of Royals Trivia!');
        $("#questionText").text('Hit the start button to begin!');
        $("#timer").hide();
    }

    startGame();

    //CREATE QUESTION
    function createQuestionHTML () {
        questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="row text-center"><div class="col-sm"><h3 id="questionText">' + questions[questionCount] + '</h3></div></div></div>';
        $(".question-div").html(questionArea);
        $("#title").text("Question " + (questionCount+1) + ":");
    }

    //CREATE ANSWER
    function createAnswerHTML () {
        answerArea = '<div class="panel-default" id="answerArea"><div class="row"><div class="col-sm"><button class="btn btn-primary ans btn-lg" id="ans1">' + answers[questionCount][0] + '</button><button class="btn btn-primary ans btn-lg" id="ans2">' + answers[questionCount][1] + '</button><button class="btn btn-primary ans btn-lg" id="ans3">' + answers[questionCount][2] + '</button><button class="btn btn-primary ans btn-lg" id="ans4">' + answers[questionCount][3] + '</button></div></div></div>';
        $(".answer-div").html(answerArea);
    }

    //CREATE TIME'S UP RESULT
    function createTimeUp () {
        unanswered++;
        questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="col-sm"><h3 class="text-center" id="questionText">' + correctAnswer[questionCount] + ' was the correct answer.</h3></div></div></div>';
        $(".question-div").html(questionCount);
        $("#title").text("Time's Up!");
        $(".answer-div").html(gifArrary[questionCount]);
        $("#timer").hide();
        nextPage();
    }

    //GO TO NEXT QUESTION || GO TO FINAL SCREEN
    function nextPage() {
        setTimeout(function () {
            if (questionCount < (questions.length-1)) {
                number = t;
                questionCount++;
                createQuestionHTML();
                createAnswerHTML();
                startTimer();
                $("#timer").show();
                console.log(questionCount);
                console.log(questions.length);
            } else {
                createFinalScreen();
            }
        },1000*3);
    }

    //CREATE FINAL SCREEN
    function createFinalScreen(){
        questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title">How did you do?:</h2><div class="row text-center"><div class="col-sm col-xs-10"><h3 id="questiontext"><p id="correctTotal">Correct Answers: ' + correct + '</p><p id="incorrectTotal">Incorrect Answers: ' + incorrect + '</p><p id="unansTotal">Unanswered: ' + unanswered + '</p><br><p id="finalMessage"></p></h3></div></div></div>';
        $('.question-div').html(questionArea);
        $('.answer-div').empty();
        resetBtn = '<button class="btn resetBtn btn-primary btn-lg"id="reset">RESET GAME</button>';
        setTimeout(function(){
        $('.start-div').html(resetBtn);
            if (correct/questions.length >= 0.8) {
                $('#finalMessage').text('Wow! You really know your stuff!')
            } else if (correct/questions.length > 0.5) {
                $('#finalMessage').text('Ooo! You were close. Want to try again?')
            } else if (incorrect/questions.length > 0.75 || unanswered/questions.length > 0.5) {
                $('#finalMessage').text('Yikes! Do you even care?')
            } else if (incorrect/questions.length >= 0.5) {
                $('#finalMessage').text("Pretty good, but I think you should brush up on your history!")
            }
        },1000*0.5);
    }

    //RIGHT ANSWER PATH
    function createRightPick() {
        correct++;
        questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="row text-center"><div class="col-sm col-xs-10"><h3  id="questiontext">' + correctAnswer[questionCount] + ' was the correct answer.</h3></div></div></div>';
        $(".question-div").html(questionArea);
        $("#title").text(rightAnswerMsg[randomMsg(rightAnswerMsg)]);
        $(".answer-div").html(gifArrary[questionCount]);
        $("#timer").hide();
        nextPage();
    }

    //WRONG ANSWER PATH
    function createWrongPick(){
        incorrect++;
        questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="row text-center"><div class="col-sm col-xs-10"><h3 id="questiontext">' + correctAnswer[questionCount] + ' was the correct answer.</h3></div></div></div>';
        $(".question-div").html(questionArea);
        $("#title").text(wrongAnswerMsg[randomMsg(wrongAnswerMsg)]);
        $(".answer-div").html(gifArrary[questionCount]);
        $("#timer").hide();
        nextPage();
        
     };


     //TIMER CONFIGURATION
        //START TIMER
        function startTimer () {
            timer = setInterval(countdown, 1000);
        }
        //TIMER HTML
        function countdown () {
            number -= 1;
            $("#timer").text("Time Remaining: " + number);
            if (number == 0) {
                clearInterval(timer);
                createTimeUp();
            }
        }

//ON CLICK EVENTS & GAME FUNCTIONALITY
//===========================================================================================================================

    //START BUTTON
    $('body').on('click', '.startBtn', function() {
        $('.startBtn').remove();
        startTimer();
        createQuestionHTML();
        createAnswerHTML();
        $('#timer').show();
    });

    //ANSWER BUTTON
    $('body').on('click', '.ans', function() {
        answerPicked = $(this).text();
        // console.log(answerPicked);
        if (answerPicked === correctAnswer[questionCount]){
            createRightPick();
            clearInterval(timer);
        } else {
            createWrongPick();
            clearInterval(timer);
    
        }
     });

     //RESET BUTTON
    $('body').on('click','.resetBtn',function(){
        questionCount = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        number = t;
        startGame();

    });
});