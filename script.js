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

function handleDecimal() {
  if (waitingForNextValue) {
    currentValue = "0.";
    waitingForNextValue = false;
  } else if (currentValue.includes(".")) {
    return;
  } else {
    currentValue += ".";
  }
}

function handleClearEntry() {
  if (waitingForNextValue) {
    return;
  } else {
    currentValue = "0";
    waitingForNextValue = true;
  }
}

function handleBackSpace(){
  if(waitingForNextValue){
    return
  }else if(currentValue.length === 1){
    currentValue = "0"
    waitingForNextValue = true
  } else {
    currentValue = currentValue.slice(0, -1)
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
  calculate();
  previousValue = null;
  operator = null;
  waitingForNextValue = true;
}

function calculate() {
  if (previousValue !== null && operator !== null) {
    currentValue = String(
      handleCalculate(previousValue, currentValue, operator),
    );
  }
}
