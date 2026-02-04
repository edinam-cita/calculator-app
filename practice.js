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

function handleOperator(operate) {
  if (operator !== null && !waitingForNextValue) {
    calculate();
  }
  previousValue = currentValue;
  operator = operate;
  waitingForNextValue = true;
}

function handleEquals() {
  calculate();
  previousValue = null;
  operator = null;
  waitingForNextValue = true;
}

function handleCalculate(prev, currently, operand) {
  const previous = Number(prev);
  const current = Number(currently);

  if (operand === "+") {
    return previous + current;
  } else if (operand === "-") {
    return previous - current;
  } else if (operand === "x") {
    return previous * current;
  } else if (operand === "/") {
    return previous / current;
  } else {
    return current;
  }
}

function calculate() {
  if (previousValue !== null && operator !== null) {
    currentValue = String(
      handleCalculate(previousValue, currentValue, operator),
    );
  }
}
