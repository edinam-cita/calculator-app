let previousValue = null;
let currentValue = "0";
let operator = null;
let waitingForNextValue = false;

let lastOperator = null;
let secondOperand = null;

function exitRepeatEquals() {
  lastOperator = null;
  secondOperand = null;
}

function handleDigits(digit) {
  if (operator === null && lastOperator !== null) {
    exitRepeatEquals();
    currentValue = digit;
  } else if (waitingForNextValue) {
    currentValue = digit;
    waitingForNextValue = false;
  } else {
    currentValue = currentValue === "0" ? digit : currentValue + digit;
  }
}

function handleDecimal() {
  if (operator === null && lastOperator !== null) {
    exitRepeatEquals();
    currentValue = "0.";
  } else if (waitingForNextValue) {
    currentValue = "0.";
    waitingForNextValue = false;
  } else if (currentValue.includes(".")) {
    return;
  } else {
    currentValue += ".";
  }
}

function handleClearEntry() {
  if (operator === null && lastOperator !== null) {
    exitRepeatEquals();
  } else if (waitingForNextValue) {
    return;
  } else {
    currentValue = "0";
    waitingForNextValue = true;
  }
}

function handleBackSpace() {
  if (operator === null && lastOperator !== null) {
    exitRepeatEquals();
  } else if (waitingForNextValue) {
    return;
  } else if (currentValue.length === 1) {
    currentValue = "0";
    waitingForNextValue = true;
  } else {
    currentValue = currentValue.slice(0, -1);
  }
}

function handleOperator(operation) {
  if (operator !== null && !waitingForNextValue) {
    calculate();
  } 

  previousValue = currentValue;
  operator = operation;
  waitingForNextValue = true;
}

function handleCalculate(firstValue, secondValue, theOperator) {
  const valueOne = Number(firstValue);
  const valueTwo = Number(secondValue);
  if (theOperator === "+") {
    return valueOne + valueTwo;
  } else if (theOperator === "-") {
    return valueOne - valueTwo;
  } else if (theOperator === "×") {
    return valueOne * valueTwo;
  } else if (theOperator === "/") {
    return valueOne / valueTwo;
  } else {
    return valueTwo;
  }
}

function handleEquals() {
  if (operator === null && lastOperator !== null) {
    currentValue = String(
      handleCalculate(currentValue, secondOperand, lastOperator),
    );
  } else {
    secondOperand = currentValue;
    calculate();
    lastOperator = operator;
    previousValue = null;
    operator = null;
    waitingForNextValue = true;
  }
}

function calculate() {
  if (previousValue !== null && operator !== null) {
    currentValue = String(
      handleCalculate(previousValue, currentValue, operator),
    );
  }
}
