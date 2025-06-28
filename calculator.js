const all_numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', '='];
const all_operators = ['/', '*', '-', '+'];
const all_clears = ['AC', 'DEL'];

const numbers = document.getElementById('numbers');
all_numbers.forEach((item) => {
    createButton(item, buttonListener, numbers);
});

const operators = document.getElementById('operators');
all_operators.forEach((item) => {
    createButton(item, buttonListener, operators);
});

const clears = document.getElementById('clears');
all_clears.forEach((item) => {
    createButton(item, buttonListener, clears);
});

function createButton(buttonText, functionName, parentObject){
    let tmpButton = document.createElement('button');
    tmpButton.textContent = buttonText;
    tmpButton.addEventListener('click', functionName);
    parentObject.appendChild(tmpButton);
}

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
    else if(all_clears.includes(e.target.innerHTML)){
        operate(e.target.innerHTML);
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
        
        case '*':
            return multiply(firstNumber, secondNumber);

        case '-':
            return subtract(firstNumber, secondNumber);

        case '+':
            return add(firstNumber, secondNumber);

        case 'DEL':
            return clearInput('DEL');

        case 'AC':
            return clearInput('AC');
    
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

function clearInput(type){
    if(type == 'DEL'){
        if(calc.value != ''){
            let temp = calc.value.slice(0, calc.value.length - 1);
            calc.value = temp;
        }
        if(calc.value == ''){
            firstNumber = 0.0;
            secondNumber = 0.0;
            operation = ''; 
        }
    }
    else if (type == 'AC') {
        calc.value = '';
        firstNumber = 0.0;
        secondNumber = 0.0;
        operation = ''; 
    }
}