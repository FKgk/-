var result = document.getElementById('result');
var input = document.getElementById('input');
var enter = document.getElementById('enter');
var clear = document.getElementById('clear');
var copyApaste = document.getElementById('copyApaste');
var backSpace = document.getElementById('backSpace');
var historyList = document.getElementById('history-tablelist');

var numbers = document.getElementsByClassName('number');
var normalOperations = document.getElementsByClassName('normalOperation');
var specialOperations = document.getElementsByClassName('specialOperation');
var copyString = "";
var leftInput = "", rightInput = "";
var cursorLeft = document.getElementById('cursorLeft');
var cursorRight = document.getElementById('cursorRight');
var calFormula = math.parser();
var backSpaceList = ['sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh', 'ln', 'log', 'lg', 'exp', '√', 'det', 'cross', 'dot', 'inv'];
var shapes = document.getElementsByClassName('shape');
var createMatrix = document.getElementById('createMatrix');


function getReplaceInput() {
    let t = input.value
    return t.replace('𝜋', 'pi').replace('√', 'sqrt').replace('÷', '/').replace('×', '*').replace('ln', 'log').replace('lg', 'log2').replace('log', 'log10').replace('<sup>2</sup>','^2');
}

function inputFocus() {
    input.focus();
    input.setSelectionRange(leftInput.length, leftInput.length);
}
function calculateResult() {
    try {
        console.log("input.value: " + input.value);
        let replaceInput = getReplaceInput();
        let tmp = calFormula.eval(replaceInput).toString();
        if (tmp.split(" ")[0] != "function")
            result.value = tmp;
    }
    catch (e) {
        console.log('계산할 수 없는 수식이므로 작동하지 않는다.');
    }
    finally {
        if (input.value == "")
            result.value = "";
    }

}
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function () {
        leftInput += numbers[i].value;
        input.value = leftInput + rightInput;
        calculateResult();
        inputFocus();
        console.log("numberButtons[" + i + "] (" + numbers[i].value + ") : input.value = " + input.value);
    });
}

for (let i = 0; i < normalOperations.length; i++) {
    normalOperations[i].addEventListener('click', function () {
        leftInput += normalOperations[i].value;
        input.value = leftInput + rightInput;
        calculateResult();
        inputFocus();
        console.log("normalOperations[" + i + "] '" + normalOperations[i].value + "' : input.value = " + input.value);
    });
}
for (let i = 0; i < specialOperations.length; i++) {
    specialOperations[i].addEventListener('click', function () {
        leftInput += specialOperations[i].value + "(";
        input.value = leftInput + rightInput;
        calculateResult();
        inputFocus();
        console.log("specialOperations[" + i + "] '" + specialOperations[i].value + "' : input.value = " + input.value);
    });
}

enter.addEventListener('click', function () {
    try {
        let replaceInput = getReplaceInput();
        let answer = calFormula.eval(replaceInput).toString();
        let check = true;

        if (answer.split(' ')[0] == 'function') {
            console.log(answer);
            answer = answer.split(' ')[0];
            historyList.innerHTML += "<tr><button type='button' class='btn btn-outline-secondary history_list' data-dismiss='modal' onclick=\"leftInput='" + input.value + "'; rightInput=''; input.value='" + leftInput + rightInput + "'; result.value = '" + answer + "'\">" + input.value + "</button></tr>";
            result.value = rightInput = leftInput = "";

        }
        else {
            try {
                let value = "";
                if (input.value.match('=') &&
                    (!input.value.match('!=') && !input.value.match('>=') && !input.value.match('<='))) {
                    value = input.value.replace('=', ' = ');
                }
                else {
                    value = input.value + " &#61; " + answer.toString();
                }

                historyList.innerHTML += "<tr><button type='button' class='btn btn-outline-secondary history_list' data-dismiss='modal' onclick=\"leftInput='" + input.value + "'; rightInput=''; input.value='" + leftInput + rightInput + "'; result.value = '" + answer + "'\">" + value + "</button></tr>";
            }
            catch (ex) {
                console.log("enter Error : " + ex.message);
                console.log(historyList.innerHTML);
                result.value = "history saved Error";
                check = false;
            }
        }
        if(check)
            result.value = answer;

        inputFocus();
        console.log("enter : result.value = " + result.value);
    }
    catch (ex) {
        console.log("enter Error : " + ex.message);
        console.log("input.value = " + input.value);
        result.value="This formula can't be calculated.";
    }
});

clear.addEventListener('click', function () {
    input.value = "";
    result.value = "";
    leftInput = "";
    rightInput = "";
    inputFocus();
    console.log("clear : input.value = " + input.value);
});

copyApaste.addEventListener('click', function () {
    let txt = "";
    if (window.getSelection) {
        txt = window.getSelection();
        console.log("window.getSelection : txt = " + txt);

        if (txt.toString() == "" || txt.toString() == copyString) {
            leftInput += copyString;
            input.value = leftInput + rightInput;

            calculateResult();
            inputFocus();
            console.log("paste : input.value = " + input.value);
        }
        else {
            copyString = txt.toString();

            inputFocus();
            console.log("copy : copyString = " + copyString);
        }
    }
    else {
        console.log("copyApaste Error wrong detection windo.getSelection == false");
    }
});

backSpace.addEventListener('click', function () {
    let check = true;
    for (let i = 0; i < backSpaceList.length; i++) {
        let checkMatch = leftInput.match(backSpaceList[i]);
        if (checkMatch != null && checkMatch.index == (leftInput.length - backSpaceList[i].length - 1).toString()) {
            console.log('match : ' + backSpaceList[i]);
            leftInput = leftInput.substr(0, leftInput.length - backSpaceList[i].length - 1);
            check = false;
            break;
        }
    }
    if (check) {
        let piCheck = leftInput.match('𝜋'), supCheck = leftInput.match('<sup>2</sup>');
        if (piCheck != null && piCheck.index == (leftInput.length - 2).toString())
            leftInput = leftInput.substr(0, leftInput.length - 2);
        else
            leftInput = leftInput.substr(0, leftInput.length - 1);
    }
    input.value = leftInput + rightInput;

    calculateResult();
    inputFocus();
    console.log("backSpace input.value : " + input.value);
});
cursorLeft.addEventListener('click', function () {
    rightInput = leftInput.substr(leftInput.length - 1, 1) + rightInput;
    leftInput = leftInput.substr(0, leftInput.length - 1);
    input.value = leftInput + rightInput;
    inputFocus();
});

cursorRight.addEventListener('click', function () {
    leftInput = leftInput + rightInput.substr(0, 1);
    rightInput = rightInput.substr(1, rightInput.length - 1);
    input.value = leftInput + rightInput;
    inputFocus();
});

createMatrix.addEventListener('click', function () {
    let n = [];
    let matrix = "";
    for (let i = 0; i < 2; i++) {
        n[i] = shapes[i].options[shapes[i].selectedIndex].value;
    }

    let mat = "[";
    for (let i = 0; i < n[1] - 1; i++)
        mat += ",";
    mat += "]";

    if (n[0] == 1) {
        leftInput += mat.substr(0, 1);
        rightInput = mat.substr(1, mat.length - 1) + rightInput;
        input.value = leftInput + rightInput;
        inputFocus();
    }
    else {
        matrix += "[";
        for (let i = 0; i < n[0]; i++) {
            if (i > 0)
                matrix += ",";
            matrix += mat;
        }
        matrix += "]";

        leftInput += matrix.substr(0, 2);
        rightInput = matrix.substr(2, matrix.length - 2) + rightInput;
        input.value = leftInput + rightInput;
        inputFocus();
    }
});

