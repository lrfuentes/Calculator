const all_numbers = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '.', '0', '=', '+'];
const all_operators = ['/', '*', '-', '+'];
const all_clears = ['AC', 'DEL'];

const numbers = document.getElementById('numbers');
all_numbers.forEach((item) => {
    (all_operators.includes(item)) ? createButton(item, buttonListener, numbers, 'operator') : createButton(item, buttonListener, numbers);
});

const clears = document.getElementById('clears');
all_clears.forEach((item) => {
    createButton(item, buttonListener, clears, 'clear');
});

function createButton(buttonText, functionName, parentObject, listClass = null){
    let tmpButton = document.createElement('button');
    tmpButton.textContent = buttonText;
    (listClass != null) ? tmpButton.classList = listClass : '';
    tmpButton.addEventListener('click', functionName);
    tmpButton.addEventListener('click', changeListener);
    parentObject.appendChild(tmpButton);
}

const calc = document.getElementById('calc');
calc.addEventListener('keypress', calcListener);
calc.addEventListener('input', changeListener);

let firstNumber = 0.0;
let secondNumber = 0.0;
let operation = null;
let new_number = true;

/**
 * 
 * @param {object} e Object of keypress event
 * @returns {void} Call functions to try keypress event
 */
function calcListener(e){
    if(!all_numbers.includes(e.key)){
        e.preventDefault();
    }
    else if(e.key != '=' && calc.value != null && new_number && !all_operators.includes(e.key)){
        calc.value = null;
        new_number = false;
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
    if(all_numbers.includes(e.target.innerHTML) && e.target.innerHTML != '=' && !all_operators.includes(e.target.innerHTML)){
        if (!new_number) {
            calc.value += e.target.innerHTML;
        }
        else{
            calc.value = e.target.innerHTML;
            new_number = false;
        }
    }
    else if(all_operators.includes(e.target.innerHTML)){
        new_number = true;
        operator(e.target.innerHTML);
    }
    else if(all_numbers.includes(e.target.innerHTML) && e.target.innerHTML == '=' && !all_operators.includes(e.target.innerHTML)){
        new_number = true;
        operatorEqual();
    }
    else if(all_clears.includes(e.target.innerHTML)){
        operate(e.target.innerHTML);
    }
}

function changeListener(e){
    if (calc.value.length >= 22) {
        let temp = calc.value.slice(0,22);
        calc.value = temp;
    }
}

function operator(key){
    if(firstNumber == 0.0 && calc.value.length != 0){
        firstNumber = parseFloat(calc.value);
        operation = key;
        calc.value = null;
    }
    else if(secondNumber == 0.0 && calc.value.length != 0){
        secondNumber = parseFloat(calc.value);
        calc.value = operate(operation);
        firstNumber = parseFloat(calc.value);
        secondNumber = 0.0;
        operation = key;
    }
    else{
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
    if(firstNumber != null && calc.value != null && operation != null){
        secondNumber = parseFloat(calc.value);
        calc.value = operate(operation);
        firstNumber = 0.0;
        secondNumber = 0.0;
        operation = null;
        new_number = false;
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
    if (lnumb == 0) {
        window.alert('Division by zero is not possible');
        lnumb = 1;
    }
    if(fnumb == 0){
        return 1;
    }
    return parseFloat(fnumb) / parseFloat(lnumb);
}

function clearInput(type){
    if(type == 'DEL'){
        if(calc.value != null){
            let temp = calc.value.slice(0, calc.value.length - 1);
            calc.value = temp;
        }
        if(calc.value == null){
            firstNumber = 0.0;
            secondNumber = 0.0;
            operation = null; 
        }
    }
    else if (type == 'AC') {
        let confirm = window.confirm("Are you sure you want to clear this item?");
        if (confirm) {
            calc.value = null;
            firstNumber = 0.0;
            secondNumber = 0.0;
            operation = null;
        } 
    }
}