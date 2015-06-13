/* 
 * Functions to use for calculator
 * Author: RDSD
 */

$(document).ready(function(){
    console.log("radhaswami");
    initCalculator();
    $(".button1").click(function(){
        $("#display").text($(this).text());
        console.log("radhaswami");
       
    });
});

/*This function intializes the calculator and puts 0 in display
 */
function initCalculator(){
    $("#display").val("0");
    $("#display").data("firstOperand", '');
    $("#display").data("secondOperand", '');
    $("#display").data("clearedState", true);
    $("#display").data("firstOperandLocked",false);
    $("#display").data("secondOperandLocked", false);
    $("#display").data("functionClicked", false);
    $("#display").data("resultDisplayed", false);  
    
    //when number button is clicked
    $(".button1").click(function(){
        //console.log("number clicked" + $(this).text());
        processNumberButtonClick($(this).text());
    });   
    //when clear button is clicked
    $("#button-c").click(function(){
        clearCalculator();
    });   
    //when function button is clicked
    $(".function-button").click(function(){
        console.log("function clicked" + $(this).text());
        processFunctionButtonClick($(this).text());
    })
    //when equals to button is clicked
    $(".equals-button").click(function(){
        console.log("equals clicked" + $(this).text());
        processEqualsButtonClick($(this).text());
    })
}

/*This function updates display and display data when number button is clicked
 */
function processNumberButtonClick(number)
{
    var value = number;
    
    //If a number is clicked after C button is pressed or initially
    if($("#display").data("clearedState") == true)
    {
        //display the number
        console.log("radhaswami: " + number);
        $("#display").val(number);
        $("#display").data("firstOperand",number );
        $("#display").data("clearedState", false);    
    }
    //If a number is clicked after the result is already displayed
    else if($("#display").data("resultDisplayed") == true)
    {
        console.log("number clicked after resultDisplayed: " + number);
        $("#display").val(number);
        $("#display").data("firstOperand",number );
        $("#display").data("clearedState", false);
        $("#display").data("resultDisplayed", false);           
    }
    //If number clicked after another number or function
    else 
    {     //If number clicked after another number   
        if($("#display").data("functionClicked") == false)
        {
            console.log("first number clicked...second number being appended");
            value = $("#display").data("firstOperand") + number;
            //alert(value);
            $("#display").val(value);
            $("#display").data("firstOperand", value);
        }
        //if number clicked after a function
        else if($("#display").data("functionClicked") == true)
        {
            //if number clicked after number again
            if($("#display").data("secondOperandLocked") == false )
            {
                if($("#display").data("firstOperandLocked") == true)
                {
                    value2 = $("#display").data("secondOperand") + number;
                    $("#display").val(value2);
                    $("#display").data("secondOperand", value2);
                }
                else
                    {
                        console.log("second operand clicked without firstOperandLocked == true");
                    }
            }
            else
            {
                value2 = number;
                $("#display").val(value2);
                $("#display").data("secondOperand", value2);
                $("#display").data("secondOperandLocked", false);
            }
            console.log("second operand: " + value2);
        }
        else
        {
            console.log("uncaught number: " + number);
        }
    }
}

/*This function clears the display of the calculator and resets/initializes the display data */
function clearCalculator(){
    $("#display").val('0');
    $("#display").data("clearedState", true);
    $("#display").data("resultDisplayed", false);
    $("#display").data("firstOperand",'');
    $("#display").data("secondOperand", '');
    $("#display").data("firstOperandLocked", false);
    $("#display").data("secondOperandLocked", false);
}

/*This function processes each function (+, -, *, /) and updates display accordingly
 */
function processFunctionButtonClick(func)
{
    
    console.log("function pressed: " + func);
    $("#display").val(func);
    $("#display").data("functionClicked", true);
    $("#display").data("firstOperandLocked", true);
    $("#display").data("function", func);
    //process 1+2+3+4+....
    if($("#display").data("resultDisplayed") == false && $("#display").data("secondOperandLocked") == true)
    {
        result = operateNumbers($("#display").data("firstOperand"), $("#display").data("secondOperand"), $("#display").data("function"))
        $("#display").data("firstOperand", result);
    }
    $("#display").data("resultDisplayed", false);
}

function  operateNumbers(num1, num2, operation)
{
    var result = 0;
    console.log(num1 + operation + num2);
    
    switch(operation)
    {
        case '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            result = 'error';
    }
    return result;
}

function processEqualsButtonClick()
{
    console.log("inside processEqualButtonClick....");    
    $("#display").data("secondOperandLocked", true);
    
    var func = $("#display").data("function");
    
    var num1 = $("#display").data("firstOperand");
    var num2 = $("#display").data("secondOperand");
    var result = 0;
    console.log("num1: " + num1);
    console.log("num2: " + num2)
    console.log(num1 + func + num2);
    
    switch(func)
    {
        case '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            result = 'error';
    }
    
    console.log(result);
    $("#display").val(result);
    
    //make this result first operand just in case the result used further in calculation
    $("#display").data("firstOperand", result);
    
    /*make this operation a complete operation
      so that if new one starts (by clicking number instead of function,
      it will be new operation.*/
    $("#display").data("resultDisplayed", true);
    $("#display").data("functionClicked", false);
    
    
}


