import { quizData } from '../data.js';
import { getDOMElement } from '../utils/DOMUtils.js';
import { nextQuestion } from '../listeners/questionListeners.js';
import { showFinalResult } from './resultViews.js';
import { TIMER_ID } from '../constants.js';

// Timer
let timerElement;
let activeTimer;
// turn on timer
export const timerOnFn = () => {
  timerElement = getDOMElement(TIMER_ID);
  timerElement.textContent =
    quizData.questions[quizData.currentQuestionIndex].timer;
  timerOffFn();
  activeTimer = window.setInterval(counter, 1000);
};
// timer off
export const timerOffFn = () => {
  clearInterval(activeTimer);
};
// counter
export const counter = () => {
  timerElement = getDOMElement(TIMER_ID);

  let timeValue = parseFloat(timerElement.textContent);
  if (
    quizData.currentQuestionIndex === quizData.questions.length - 1 &&
    timeValue <= 0
  ) {
    showFinalResult();
  }
  if (timeValue > 0) {
    timerElement.textContent = timeValue - 1;
  } else {
    timerOffFn();
    nextQuestion();
  }
};
