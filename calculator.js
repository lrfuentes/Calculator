const all_numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', '='];
const all_operators = ['/', '*', '-', '+'];

const numbers = document.getElementById('numbers');
all_numbers.forEach((item) => {
    let number = document.createElement('button');
    number.textContent = item;
    numbers.appendChild(number);
});

const operators = document.getElementById('operators');
all_operators.forEach((item) => {
    let operator = document.createElement('button');
    operator.textContent = item;
    operators.appendChild(operator);
});