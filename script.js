let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Welches der folgenden Schlüsselwörter wird verwendet, um eine Variable in JavaScript zu deklarieren?",
        "answer_1": "var",
        "answer_2": "let",
        "answer_3": "const",
        "answer_4": "Alle oben genannten Antworten",
        "right_answer": 4
    },
    {
        "question": "Welches dieser Symbole wird verwendet, um in JavaScript ein Kommentarfeld einzuleiten?",
        "answer_1": "#",
        "answer_2": "//",
        "answer_3": "/*",
        "answer_4": "Beide B und C",
        "right_answer": 4
    },
    {
        "question": "Was gibt Array.isArray([]) zurück?",
        "answer_1": "true",
        "answer_2": "false",
        "answer_3": "undefined",
        "answer_4": "null",
        "right_answer": 1
    },
    {
        "question": "Welches der folgenden Schlüsselwörter beendet eine Schleife?",
        "answer_1": "end",
        "answer_2": "break",
        "answer_3": "stop",
        "answer_4": "exit",
        "right_answer": 2
    },
    {
        "question": "Welche der folgenden Methoden wird verwendet, um eine JSON-Zeichenkette in ein JavaScript-Objekt umzuwandeln?",
        "answer_1": "JSON.parse()",
        "answer_2": "JSON.stringify()",
        "answer_3": "JSON.convert()",
        "answer_4": "JSON.objectify()",
        "right_answer": 1
    },
    {
        "question": "Was bewirkt das Schlüsselwort this in JavaScript?",
        "answer_1": "Es bezieht sich auf das aktuelle Element im DOM.",
        "answer_2": "Es bezieht sich auf das aktuelle Objekt.",
        "answer_3": "Es bezieht sich auf die globale Variable.",
        "answer_4": "Es bezieht sich auf die nächste Zeile im Code.",
        "right_answer": 2
    },
];

let currentQuestionNumber = 1;
let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('audio/success.wav');
let AUDIO_FAIL = new Audio('audio/wrong.wav');


function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}


function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}


function gameIsOver() {
    return currentQuestion >= questions.length
}


function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}


function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none'
    document.getElementById('amount-Of-Questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = './img/brain result.png';
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    if (rightAnswerSelected(selectedQuestionNumber)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        console.log('Falsche Anwort!');
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}


function rightAnswerSelected() {
    return selectedQuestionNumber == question['right_answer'];
}


function nextQuestion() {
    currentQuestion++;
    currentQuestionNumber++;
    document.getElementById('next-button').disabled = true;
    document.getElementById('current-question-number').innerHTML = currentQuestionNumber;
    resetAnswerButtons();
    showQuestion();
}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartGame() {
    document.getElementById('header-image').src = './img/pencil.jpg';
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display: none';

    rightQuestions = 0;
    currentQuestion = 0;
    init();
}