class Calculator{
    constructor(){
        this.number1 = 0
        this.number2 = 0
        this.currentOperator = ""
    }

    add({calc, nextNumber}){
        calc.number1 += calc.number2
    }
    subtract({calc, nextNumber}){
        calc.number1 -= calc.number2
    }
    divide({calc, nextNumber}){
        calc.number1 /= calc.number2
    }
    multiply({calc, nextNumber}){
        calc.number1 *= calc.number2
    }

    reset(){
        calc.number1 = 0
        calc.number2 = 0
        calc.currentOperator = ""
    }
    delete({calc, nextNumber}){
        if(nextNumber){
            var number = calc.number2.toString().slice(0, -1)
        }else{
            var number = calc.number1.toString().slice(0, -1)
        }
        if (number.charAt(number.length -1) == '.') {
            number = number.slice(0, -1);
        } else if (number == "") {
            number = "0"
        }
        return (number)
    }
    negatify({calc, nextNumber}){
        if(nextNumber){
            calc.number2 *= -1;
            var number = calc.number2.toString()
        }else{
            calc.number1 *= -1;
            var number = calc.number1.toString()
        }
        return (number)
    }
}