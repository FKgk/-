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

var triFunction = document.getElementById('triFunction');
var sin = document.getElementById('sin');


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
    alert(copyString);
    let txt = "";
    if (window.getSelection) {
        txt = window.getSelection();
        console.log("window.getSelection : txt = " + txt);
        if (txt == "") {
            console.log("txt wrong : " + txt);
        }
        else {
            console.log("txt right : " + txt);

        }
    } else if (document.getSelection) {
        txt = document.getSelection();
        console.log("document.getSelection : txt = " + txt);
    } else if (document.selection) {
        txt = document.selection.createRange().text;
        console.log("document.selection : txt = " + txt);
    } else {
        console.log("Erorr copytApaste");
    }
    if (txt == "" || txt == undefined) {
        input.value += copyString;
        console.log("copyApaste : paste " + " copyString = " + copyString + " : txt = " + txt );
    }
    else {
        copyString = txt;
        console.log("copyApaste : copy " + "copyString = " + copyString + " : txt = " + txt);
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