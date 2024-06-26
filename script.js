const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButtons = document.querySelectorAll(".clear-button");
const display = document.querySelector("#display");

let operator;
let number1;
let number2;
let operatorUsed = false;


function add(num1, num2)
{
    return num1 + num2;
}

function subtract(num1, num2)
{
    return num1 - num2;
}

function multiply (num1, num2)
{
    return num1 * num2;
}

function divide (num1, num2)
{
    if (num2 == 0)
        {
            return "error can't divide by 0";
        }

    return num1/num2;
}

function operate (num1, num2, operator)
{
    switch(operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "÷":
            return divide(num1, num2);
            break;
    }

}

function setup()
{
    numberButtons.forEach((button) => {
        button.addEventListener("click", () => {
            display.innerText += button.innerText;
        });
    });
    operatorButtons.forEach((button) => {
        if (button.innerText == "=" )
            {
                button.addEventListener("click", () => {
                    if (number1 > 0 || !isNaN(number1))
                        {
                            let index = display.innerText.indexOf(operator);
                            number2 = Number(display.innerText.slice(index + 1));
                            display.innerText = operate(number1, number2, operator);
                            operatorUsed = false;
                        }
                });
            }
        else
        {
            button.addEventListener("click", () => {
                if (!operatorUsed && display.innerText !="")
                    {
                        number1 = Number(display.innerText);
                        display.innerText += button.innerText;
                        operator = button.innerText;
                        operatorUsed = true;
                    }
            });
        }


    });
    
}

setup();