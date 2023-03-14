function addition(a, b) {
    return a + b;
}

function subtraction(a, b){
    return a - b;
}

function division(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function operate(operator, a, b) {
    if (operator && operator == '+') {
        addition(a, b);
    }
    if (operator && operator == '-') {
        subtraction(a, b);
    }
    if (operator && operator == '/') {
        division(a, b);
    }
    if (operator && operator == '*') {
        multiply(a, b);
    }
}