const all_numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', '='];
const all_operators = ['/', '*', '-', '+'];

const numbers = document.getElementById('numbers');
all_numbers.forEach((item) => {
    let number = document.createElement('button');
    number.textContent = item;
    number.addEventListener('click', buttonListener);
    numbers.appendChild(number);
});

const operators = document.getElementById('operators');
all_operators.forEach((item) => {
    let operator = document.createElement('button');
    operator.textContent = item;
    operator.addEventListener('click', buttonListener);
    operators.appendChild(operator);
});

let firstNumber = 0.0;
let secondNumber = 0.0;
let operation = '';
let new_number = true;

const calc = document.getElementById('calc');
calc.addEventListener('keypress', calcListener);

/**
 * 
 * @param {object} e Object of keypress event
 * @returns {void} Call functions to try keypress event
 */
function calcListener(e){
    if(!all_numbers.includes(e.key)){
        e.preventDefault();
    }
    else{
        if(e.key != '=' && calc.value != null && new_number){
            calc.value = '';
            new_number = false;
        }
    }
    if(all_operators.includes(e.key)){
        new_number = true;
        e.preventDefault();
        operator(e.key);
    }
    if(e.key == '='){
        e.preventDefault();
        new_number = true;
        operatorEqual();
    }
}

/**
 * 
 * @param {object} e Object of click event
 * @returns {void} Call functions to try click event
 */
function buttonListener(e) {
    if(all_numbers.includes(e.target.innerHTML) && e.target.innerHTML != '='){
        if (!new_number) {
            calc.value += e.target.innerHTML;
        }
        else{
            calc.value = e.target.innerHTML;
        }
    }
    else if(all_operators.includes(e.target.innerHTML)){
        new_number = true;
        operator(e.target.innerHTML);
    }
    else if(all_numbers.includes(e.target.innerHTML) && e.target.innerHTML == '='){
        new_number = true;
        operatorEqual();
    }
}

function operator(key){
    if(firstNumber == 0.0 && calc.value != null){
        firstNumber = parseFloat(calc.value);
        operation = key;
        calc.value = '';
    }
    else if(secondNumber == 0.0 && calc.value != null){
        secondNumber = parseFloat(calc.value);
        let tmp = operate(operation);
        calc.value = tmp;
        firstNumber = tmp;
        secondNumber = 0.0;
        operation = key;
    }
}

function operate(oper){
    switch (oper) {
        case '/':
            return divide(firstNumber, secondNumber);
            break;
        
        case '*':
            return multiply(firstNumber, secondNumber);
            break;

        case '-':
            return subtract(firstNumber, secondNumber);
            break;

        case '+':
            return add(firstNumber, secondNumber);
            break;
    
        default:
            break;
    }
}

function operatorEqual(){
    if(firstNumber != '' && calc.value != '' && operation != ''){
        secondNumber = parseFloat(calc.value);
        calc.value = operate(operation);
        firstNumber = 0.0;
        secondNumber = 0.0;
        operation = '';
    }
}

function add(fnumb, lnumb){
    return parseFloat(fnumb) + parseFloat(lnumb);
}

function subtract(fnumb, lnumb){
    return parseFloat(fnumb) - parseFloat(lnumb);
}

function multiply(fnumb, lnumb){
    return parseFloat(fnumb) * parseFloat(lnumb);
}

function divide(fnumb, lnumb){
    return parseFloat(fnumb) / parseFloat(lnumb);
}