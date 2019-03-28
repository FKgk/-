var result = document.getElementById('result');
var input = document.getElementById('input');
var enter = document.getElementById('enter');
var clear = document.getElementById('clear');
var numberButtons = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var operations = ['+', '-', '*', '/', '%', '.'];
var operationButtons = [];
var copyString = "";
var copyApaste = document.getElementById('copyApaste');

var backSpace = document.getElementById('backSpace');
var bracket = document.getElementById('bracket');
var bracketCount = 0;



for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i] = document.getElementById("n" + i);

    numberButtons[i].addEventListener('click', function () {
        input.value += numberButtons[i].value;
        console.log("numberButtons[" + i + "] (" + numberButtons[i].value + ") : input.value = " + input.value);
    });
}

for (let i = 0; i < operations.length; i++) {
    operationButtons[i] = document.getElementById("o" + i);

    operationButtons[i].addEventListener('click', function () {
        input.value += operations[i];
        console.log("operationButtons[" + i + "] (" + operations[i] + ") : input.value = " + input.value);
    });
}

enter.addEventListener('click', function () {
    result.innerHTML = "&gt;" + eval(input.value);
    console.log("enter : result.value = " + result.innerHTML);
});

clear.addEventListener('click', function () {
    input.value = "";
    console.log("clear : input.value = " + input.value);
});
copyApaste.addEventListener('click', function () {
    let txt = "";
    if (window.getSelection) {
        txt = window.getSelection();
        console.log("window.getSelection : txt = " + txt);
    } else {
        /*else if (document.getSelection) {
        txt = document.getSelection();
    } else if (document.selection) {
        txt = document.selection.createRange().text;
    }*/
    console.log("copyApaste Error wrong detection windo.getSelection == false");
    }

    if (txt.toString() == "" || txt.toString() == copyString) {
        input.value = input.value + "" + copyString;

        console.log("paste : input.value = " + input.value);
    }
    else {
        copyString = txt.toString();
        
        console.log("copy : copyString = " + copyString);
    }
});

backSpace.addEventListener('click', function () {
    input.value = input.value.substr(0, input.value.length - 1);

    console.log("backSpace input.value : " + input.value);
});

bracket.addEventListener('click', function () {
    if (input.value[input.value.length - 1] in operations) {
        bracketCount++;
        input.value += "(";
    }
    else if (input.value[input.value.length - 1] == ')') {
        if (bracketCount == 0) {
            bracketCount++;
            input.value += "*(";
        }
        else {
            bracketCount--;
            input.value += ")";
        }
    }
    else {
        if (bracketCount > 0) {
            bracketCount--;
            input.value += ")";
        }
        else {
            bracketCount++;
            input.value += "(";
        }
    }
});