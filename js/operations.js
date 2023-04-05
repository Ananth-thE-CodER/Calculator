let EXP_INPUT = document.getElementById("exp-input");

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

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


function processSpecials (elem) {
    if (elem.classList.contains("brackets")) {
        processBrackets(EXP_INPUT);
    }
    if (elem.classList.contains("decimal")) {
        processDecimal(EXP_INPUT);
    }
    // if (elem.classList.contains("backspace")) {
    //     processBackSpace();
    // }
    // if (elem.classList.contains("percent")) {
    //     processPercent();
    // }
    // if (elem.classList.contains("clearall")) {
    //     processClearAll();
    // }
}

function processBrackets (input) {
    let exp = input.value;
    let output = '';
    let counter = 0;
    for (var i = 0; i < exp.length; i++) {
        if (i == input.selectionStart) {
            break;
        }
        if (exp[i] == '(') {
            counter += 1;
        }
        if (exp[i] == ')') {
            counter -= 1;
        }
    }
    // Checking if the character to the left of cursor is a number or ')' and whether total number of opening 
    // brackets is greater than 0.
    if ((!isNaN(exp[input.selectionStart - 1]) || exp[input.selectionStart - 1] == ')' || exp[input.selectionStart - 1] == '.') && counter > 0) {
        output += ')';
    }
    if (counter == 0 && exp.length > 0) {
        output += '*('
    }
    if (exp.length == 0 || (counter % 2 != 0 && exp[input.selectionStart - 1] == '(')) {
        output += '('
    }
    input.value = input.value.splice(input.selectionStart, 0, output)
}

function processDecimal (input) {
    let exp = input.value;
    let output = '';
    let exp_decimals = [];
    let not_okay_for_decimal = false;
    for (var i = 0; i < exp.length; i++) {
        if (exp[i] == '.') {
            exp_decimals.push(i)
        }
    }
    decimal_places = findDecimalplaces(exp_decimals);
    decimal_places.forEach(function(pairs) {
        if (input.selectionStart - 1 >= pairs[0] && input.selectionStart - 1 <= pairs[1]) {
            not_okay_for_decimal = true;
        }
    })
    if (!isNaN(exp[input.selectionStart - 1]) && !not_okay_for_decimal) {
        output += '.';
    }
    if (exp[input.selectionStart - 1] == ')' && !not_okay_for_decimal) {
        output += '*0.';
    }
    if ((exp[input.selectionStart - 1] == '(' || 
        !exp[input.selectionStart - 1] || 
        ['+', '-', '*', '/'].indexOf(exp[input.selectionStart - 1]) > -1) && 
        !not_okay_for_decimal) {

        output += '0.';
    }
    input.value = input.value.splice(input.selectionStart, 0, output)
}

function findDecimalplaces(decimal_indexes) {
    let lower_limit = 0;
    let upper_limit = 0;
    let limits = []
    decimal_indexes.forEach(function(item) {
        for (let i = item; i >= 0; i--) {
            if (['+', '-', '*', '/', '(', ')'].indexOf(EXP_INPUT.value[i]) > -1) {  //TODO: later change the * to x
                lower_limit = i + 1;
                break;
            }
            
        }
        for (let i = item; i <= EXP_INPUT.value.length - 1; i++) {
            if (['+', '-', '*', '/', '(', ')'].indexOf(EXP_INPUT.value[i]) > -1) {  //TODO: later change the * to x
                upper_limit = i - 1;
                break;
            }
            
        }
        if (upper_limit <= lower_limit && decimal_indexes.length > 0) {
            upper_limit = EXP_INPUT.value.length;
        }
        limits.push([lower_limit, upper_limit])
    })
    return limits
}

EXP_INPUT.addEventListener("keydown", function(e) {
    if (e.keyCode >= 8 && e.keyCode <= 222) {
        e.preventDefault();
    }
})

let number_keys = Array.prototype.slice.call(document.getElementsByClassName("num-key"));
let special_keys = Array.prototype.slice.call(document.getElementsByClassName("specials"));
for (index in number_keys) {
    // number_keys[index].addEventListener("click", updateExpression(number_keys[index]))
    number_keys[index].addEventListener("click", function(e) {
        // EXP_INPUT.value = EXP_INPUT.value + this.innerText;
        EXP_INPUT.value = EXP_INPUT.value.splice(EXP_INPUT.selectionStart, 0, this.innerText);
    })
}
special_keys.forEach(function (item) {
    item.addEventListener("click", function(e) {
        processSpecials(item)
    });
})