const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-action]');
const previousOperandText = document.querySelector('.previous-operand');
const currentOperandText = document.querySelector('.current-operand');

let expression = '';

function updateDisplay() {
  currentOperandText.textContent = expression || '0';
  previousOperandText.textContent = '';
}

function clear() {
  expression = '';
  updateDisplay();
}

function del() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function appendNumber(num) {
  expression += num;
  updateDisplay();
}

function appendOperator(op) {
  if (expression === '') return;
  const lastChar = expression.slice(-1);
  if ("+-*/".includes(lastChar)) {
    expression = expression.slice(0, -1); // Replace last operator
  }
  expression += op;
  updateDisplay();
}

function calculate() {
  try {
    // Replace × with * for eval
    const safeExpr = expression.replace(/×/g, '*');
    const result = Function(`"use strict"; return (${safeExpr})`)();
    expression = result.toString();
    updateDisplay();
  } catch (e) {
    alert("Invalid expression");
    expression = '';
    updateDisplay();
  }
}

// Event Listeners
numberButtons.forEach(button => {
  button.addEventListener('click', () => appendNumber(button.dataset.number));
});

operationButtons.forEach(button => {
  const action = button.dataset.action;

  if (action === 'clear') {
    button.addEventListener('click', clear);
  } else if (action === 'delete') {
    button.addEventListener('click', del);
  } else if (action === 'calculate') {
    button.addEventListener('click', calculate);
  } else {
    // Operators
    let symbol = '';
    switch (action) {
      case 'add': symbol = '+'; break;
      case 'subtract': symbol = '-'; break;
      case 'multiply': symbol = '*'; break;  // internal use
      case 'divide': symbol = '/'; break;
    }
    button.addEventListener('click', () => appendOperator(symbol));
  }
});

// Initial display
updateDisplay();
