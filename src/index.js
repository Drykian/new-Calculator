var calc = new Calculator();
var number = ""
var nextNumber = false
var nextOperator = false
var result = true

const operators = {
    "⌫": calc.delete, "±": calc.negatify, "+": calc.add,
    "-": calc.subtract, "/": calc.divide, "x": calc.multiply
}


// (functions
function getNumber() {
    if (nextNumber) {
        calc.number2 = parseFloat(number)
        nextOperator = true
    } else {
        calc.number1 = parseFloat(number)
    }
}

function reset() {
    number = ""
    nextNumber = false
    nextOperator = false
    result = false
    calc.reset()
}

function displayNumbers(char = "", next = false, result = false) {
    if (next) {
        $(".display2").html(calc.number1 + char)
        $(".display1").html(calc.number2);
    } else {
        if (result) {
            $(".display2").html(number + calc.currentOperator +calc.number2 + char)
        } else {
            $(".display2").html("")
        }
        $(".display1").html(calc.number1);
    }
}

function displayNewNumber(char) {
    number = operators[char]({ calc, nextNumber, });
    getNumber();
    $(".display1").html(number);
}

function dealWithDisplay(char, result) {
    if (number === "0") {
        number = "";
    } else if (number === "" && char === ".") {
        number = "0";
    }
    if (result) {
        reset();
        $(".display2").html("")
        number = number + char;
    } else {
        number = number + char;
    }
}
// functions)


// (numbers
$(".number").on("click", function () {
    var char = $(this).html();
    if (char == '.' && char.indexOf('.') !== -1) return;

    dealWithDisplay(char, result);

    getNumber();
   
    $(".display1").html(number)
})
// numbers)


// (symbols
$(".symbol").on("click", function () {
    var char = $(this).html();
    switch (char) {
        case "-": case "+": case "/": case "x":
            if (nextNumber && nextOperator) {
                operators[calc.currentOperator]({ calc, nextNumber, });
                calc.number2 = calc.number1
                displayNumbers(char, true);
                calc.currentOperator = char;
                number = ""
                nextOperator = false
                result = false
            } else {
                if (nextNumber) {
                    displayNumbers(char, true);
                } else {
                    calc.number1 = parseFloat(number)
                    calc.number2 = calc.number1
                    displayNumbers(char, true);
                }
                number = "";
                calc.currentOperator = char;
                nextNumber = true
                result = false
            }
            break;
        case "C":
            reset();
            displayNumbers()
            break;
        case "CE":
            if (result){
                reset()
            }
            number = "0"
            getNumber()
            displayNumbers(calc.currentOperator, nextNumber)
            number = ""
            break;
        case "=":
            nextOperator = false
            nextNumber = false
            result = true
            number = calc.number1.toString();
            operators[calc.currentOperator]({ calc, nextNumber, });
            displayNumbers(char, nextNumber, result);
            number = calc.number1.toString();
            break;
        case "⌫":
            if (result){
                $(".display2").html("")
            }else if(number === ""){ 
                 
            }else{
                displayNewNumber(char);
            }
            break;
        case "±":
            displayNewNumber(char);
            break;

        default: console.log("something is wrong")
    }
})
// symbols)