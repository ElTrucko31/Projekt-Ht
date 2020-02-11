//Set of questions and answers -DONE
//Give each answer an identifier -DONE
//Each identifier will increment through each question
//St the end the identifier with the highest number is the winner
//Display the answer and rest the quiz

//pass results frm previous question to the next page usig localcache

//Randomise the background of the quiz for each questiion

//Possible - Personality Traits
// 15 -21- You Need Help
// 10 - 15 - Good Soul
// 5- 10 - Meh
// 5 - Are You Even Real


let currentQuestion = 0;
let score = 0;
let selectedAnswersData = [];
const totalQuestions = questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.getElementsByClassName('result')[0];

//Function to generate question
function generateQuestions(index) {
  //Select each question by passing it a particular index
  const question = questions[index];
  const option1Total = questions[index].answer1Total;
  const option2Total = questions[index].answer2Total;
  const option3Total = questions[index].answer3Total;
  //Populate html elements
  questionEl.innerHTML = `${index + 1}. ${question.question}`
  option1.setAttribute('data-total', `${option1Total}`);
  option2.setAttribute('data-total', `${option2Total}`);
  option3.setAttribute('data-total', `${option3Total}`);
  option1.innerHTML = `${question.answer1}`
  option2.innerHTML = `${question.answer2}`
  option3.innerHTML = `${question.answer3}`
}

function loadNextQuestion() {
  const selectedOption = document.querySelector('input[type="radio"]:checked');
  //Check if there is a radio input checked
  if (!selectedOption) {
    alert('Please select your answer!');
    return;
  }
  //Get value of selected radio
  const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

  ////Add the answer score to the score array
  if (answerScore == correct[currentQuestion]) {
    score += 1;
  }
  console.log(answerScore);
  //Finally we incement the current question number ( to be used as the index for each array)
  currentQuestion++;

  //once finished clear checked
  selectedOption.checked = false;
  //If quiz is on the final question
  if (currentQuestion == totalQuestions - 1) {
    nextButton.textContent = 'klar';
  }
  //If the quiz is finished then we hide the questions container and show the results
  if (currentQuestion == totalQuestions) {
    container.style.display = 'none';
    result.style.display = "flex";
    result.innerHTML = `<h1 class="final-score">Du hade ${score} rätt ut av ${totalQuestions}!</h1>
        <button class="restart">Starta om Quiz</button>
         `;
    return;
  }
  generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
  if (e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
  }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
result.addEventListener('click', restartQuiz);