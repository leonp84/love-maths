document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        })
    }

    document.getElementById('answer-box').addEventListener('keydown', function(event) {
        if (event.key === "Enter") { checkAnswer() }
    })

    runGame("addition");
})

/**
 * The main game "loop" whose descr. will popup when you now hover over where the function is called - since you used Docstrings!
 */
function runGame(gameType) {

    document.getElementById('answer-box').value = "";
    document.getElementById('answer-box').focus();

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        console.log("You've clicked addition");
        displayAdditionQuestion(num1, num2); }
    else if (gameType === "subtract") {
        (num1 < num2) ? displaySubtractQuestion(num2, num1) : displaySubtractQuestion(num1, num2)}
    else if (gameType === "multiply") {
        if (num1 > 10) { num1 = Math.floor(num1 / 2); }
        if (num2 > 10) { num2 = Math.floor(num2 / 2); }
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "division") {
        while (num1/num2 % 1 != 0) {
            num2 = Math.floor(Math.random() * 500) + 1;
            num1 = Math.floor(Math.random() * 499) + 1;
          }
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Uknown game type: ${gameType}. Aborting;`
    }
}

/**
 * Checks answer and returns answer + game type
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Nice :)");
        incrementScore();
    } else {
        alert(`Nope, correct answer is not ${userAnswer}, but actually ${calculatedAnswer[0]}.`)
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets values from DOM and returns correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"]
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"]
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"]
    } else if (operator === "÷") {
        return [operand1 / operand2, "division"]
    } else {
        alert(`No go... not with ${operator}. Fix it!`);
        throw `No go... not with ${operator}. Aborting`;
    }
}

/**
 * Get current score from DOM and write new score into DOM
 */
function incrementScore() {
    let scoreText = document.getElementById('score');
    let currentScore = parseInt(scoreText.innerText);
    scoreText.innerText = ++currentScore;
}

/**
 * Get current incorrect score from DOM and write new score into DOM
 */
function incrementWrongAnswer() {
    let scoreText = document.getElementById('incorrect');
    let currentScore = parseInt(scoreText.innerText);
    scoreText.innerText = ++currentScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "÷";
}
