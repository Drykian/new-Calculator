var calc = new Calculator();
var number = ""
var nextNumber = false
var nextOperator = false

operators = { "⌫": calc.delete, "±": calc.negatify, "C": calc.reset,
              "+": calc.add, "-": calc.subtract, "/": calc.divide, 
              "x": calc.multiply}
// functions
function getNumber() {
    if (nextNumber) {
        calc.number2 = parseFloat(number)
        nextOperator = true
    } else {
        calc.number1 = parseFloat(number)
    }
}

function reset() {
    nextNumber = false
    number = ""
    $(".display2").html("")
    $(".display1").html(0);
}

function displayNumbers(char, next = false){
    if(next){
        $(".display2").html(calc.number1 + char)
        $(".display1").html(calc.number1);
    }else{
        $(".display2").html(number + calc.currentOperator + calc.number2 + char)
        $(".display1").html(calc.number1);
    }
}
// functions

$(".number").on("click", function () {
    var char = $(this).html();
    if(number === "0"){
        number = ""
    }
    if(number == "" && char == "."){
        number = "0"
    }
    number = number + char;

    getNumber();

    $(".display1").html(number);
    console.log(char);
})

$(".symbol").on("click", function () {
    var char = $(this).html();
    switch (char) {
        case "-": case "+": case "/": case "x":
            if(nextNumber && nextOperator){
                operators[calc.currentOperator]({ calc, nextNumber, });
                displayNumbers(char, true);
                nextOperator = false
            }else{
                if(nextNumber){
                    displayNumbers(char, true);
                }else{
                    calc.number1 = parseFloat(number)
                    calc.number2 = calc.number1
                    displayNumbers(char, true);
                }
                number = "";
                calc.currentOperator = char;
                nextNumber = true
            }
            break;
        case "C":
            reset();
            operators[char]({ calc, nextNumber, });
            break;
        case "CE":
            number = "0"
            getNumber()
            $(".display1").html(number);
            number = ""
            break;
        case "=":
            nextOperator = false
            number = calc.number1.toString();
            operators[calc.currentOperator]({ calc, nextNumber, });
            displayNumbers(char);
            break;
            
        default: 
            number = operators[char]({ calc, nextNumber, });
            console.log(number)
            getNumber();
            $(".display1").html(number);
            
    }

    console.log(calc.number1)
    console.log(calc.number2)


})