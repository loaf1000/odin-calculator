const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButtons = document.querySelectorAll(".clear-button");
const display = document.querySelector("#display");

let operator;
let number1;
let number2;
let operatorUsed = false;
let decimalUsed = false;


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
            return "error can't divide by 0 - click CE to continue";
        }

    return num1/num2;
}

function operate (num1, num2, operator)
{
    switch(operator) {
        case "+":
            return add(num1, num2).toPrecision(9)/1;
        case "-":
            return subtract(num1, num2).toPrecision(9)/1;
        case "x":
            return multiply(num1, num2).toPrecision(9)/1;
        case "÷":
            const total = divide(num1, num2);
            if (isNaN(total))
            {
                return divide(num1, num2);
            }
            else
            {
                return total.toPrecision(9)/1;
            }
    }

}

function setupNumberButtons ()
{
    numberButtons.forEach((button) => {
        if (button.innerText == ".")
            {
                    button.addEventListener("click", () => {
                        if (!decimalUsed)
                            {
                                decimalUsed = true;
                                display.innerText += button.innerText;
                            }
                        
                    });
            }
        else
        {
            button.addEventListener("click", () => {
                display.innerText += button.innerText;
            });
        }
    });
}


function setupOperatorButtons () 

{
    operatorButtons.forEach((button) => {
        if (button.innerText == "=" )
        {
            button.addEventListener("click", () => {
                

                if (!isNaN(number1) && operator !== '')
                    {
                        const index = display.innerText.indexOf(operator);
                        number2 = Number(display.innerText.slice(index + 1));
                        if (!isNaN(number2))
                        {
                        const total = operate(number1, number2, operator);
                        number1 = total;
                        number2 = " ";
                        operator = "";
                        display.innerText = total;
                        operatorUsed = false;
                        if(!isNaN(total))
                        {
                            Number.isInteger(total) ? decimalUsed = false: decimalUsed = true;
                        }
                        else
                        {
                            decimalUsed = false;
                        }

                        }
                        
                        
                    }
            });
        }
        else
        {
            button.addEventListener("click", () => {

                if (!operatorUsed && display.innerText !="")
                    {
                        operator = button.innerText;
                        number1 = Number(display.innerText);
                        display.innerText += button.innerText;
                        decimalUsed = false;
                    }
                else if (display.innerText !="")
                    {
                        let index = display.innerText.indexOf(operator);
                        number2 = Number(display.innerText.slice(index + 1))
                        number1 = operate(number1, number2, operator);
                        operator = button.innerText;

                        display.innerText = number1.toString() + operator;
                        if(!isNaN(number1))
                            {
                                Number.isInteger(number1) ? decimalUsed = false: decimalUsed = true;
                            }
                            else
                            {
                                decimalUsed = false;
                            }
                    }
                operatorUsed = true;
            });
        }
    });

}

function setupClearButtons()
{
    clearButtons.forEach((button) => {
        if (button.innerText == "C")
            {
                //clear
                button.addEventListener("click", () => {
                    const symbolToClear = display.innerText.at(-1);
                    if (symbolToClear == "+" || symbolToClear == "-" || symbolToClear == "x" || symbolToClear == "÷")
                        {
                            operatorUsed = false;
                        }
                    else if (symbolToClear = ".")
                        {
                            decimalUsed = false;
                        }
                    display.innerText = display.innerText.slice(0, display.innerText.length-1);

                })
            }
        else
        {
            {
                //clear all
                button.addEventListener("click", () => {
                    display.innerText = "";
                    number1 = "";
                    number2 = "";
                    operator = "";
                    operatorUsed = false;
                    decimalUsed = false;

                })

            }

        }
    });
}

function setup()
{
    setupNumberButtons();
    setupOperatorButtons();
    setupClearButtons();
}

setup();