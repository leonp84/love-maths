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

    runGame("addition");
})

/**
 * The main game "loop" whose descr. will popup when you now hover over where the function is called - since you used Docstrings!
 */
function runGame(gameType) {
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
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

function displaySubtractQuestion() {
    
}

function displayMultiplyQuestion() {
    
}
