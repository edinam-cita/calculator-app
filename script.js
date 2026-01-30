let previousValue = null;
let currentValue = "0";
let operator = null;
let waitingForNextValue = false;

function handleDigits(digit) {
  if (waitingForNextValue) {
    currentValue = digit;
    waitingForNextValue = false;
  } else {
    currentValue = currentValue === "0" ? digit : currentValue + digit;
  }
}

function handleOperator(operation) {
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
  } else if (theOperator === "*") {
    return valueOne * valueTwo;
  } else if (theOperator === "/") {
    return valueOne / valueTwo;
  } else {
    return valueTwo;
  }
}
