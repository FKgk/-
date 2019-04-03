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

function calculateResult(){
    try{
        console.log("input.innerHTML : " + input.innerHTML);
        let replaceInput = input.innerHTML.replace('𝜋', 'pi').replace('√', 'sqrt');
        let tmp = calFormula.eval(replaceInput).toString();
        result.innerHTML = tmp;
    }
    catch(e){
        console.log('계산할 수 없는 수식이므로 작동하지 않는다.');
    }
    finally{
        if(input.innerHTML == "")
            result.innerHTML = "";
    }

}
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function () {
        leftInput += numbers[i].value;
        input.innerHTML = leftInput + rightInput;
        calculateResult();
        console.log("numberButtons[" + i + "] (" + numbers[i].value + ") : input.innerHTML = " + input.innerHTML);
    });
}

for (let i = 0; i < normalOperations.length; i++) {
    normalOperations[i].addEventListener('click', function () {
        leftInput += normalOperations[i].value;
        input.innerHTML = leftInput + rightInput;
        calculateResult();
        console.log("normalOperations[" + i + "] '" + normalOperations[i].value + "' : input.value = " + input.innerHTML);
    });
}
for (let i = 0; i < specialOperations.length; i++) {
    specialOperations[i].addEventListener('click', function(){
        leftInput += specialOperations[i].value + "(";
        input.innerHTML = leftInput + rightInput;
        calculateResult();
        console.log("specialOperations[" + i + "] '" + specialOperations[i].value + "' : input.value = " + input.innerHTML);
    });
}

enter.addEventListener('click', function () {
    try{
        let replaceInput = input.innerHTML.replace('&#120587;', 'pi').replace('&radic;', 'sqrt');
        let answer = calFormula.eval(replaceInput).toString();
        
        if(answer.split(' ')[0] == 'function'){
            console.log(answer);
            answer = answer.split(' ')[0];
        }
        else{
            try {
                let value ="";
                if (input.innerHTML.match('=') && 
                    (!input.innerHTML.match('!=') && !input.innerHTML.match('>=') && !input.innerHTML.match('<=')))
                    {
                        value = input.innerHTML.replace('=', ' = ');
                    }
                    else{
                        value = input.innerHTML + " &#61; " + answer.toString();
                    }

                historyList.innerHTML += "<tr><button type='button' class='btn btn-outline-secondary history_list' data-dismiss='modal' onclick=\"input.innerHTML='" + input.innerHTML + "'; result.innerHTML = '" + answer + "'\">" + value + "</button></tr>";
            }
            catch (ex) {
                console.log("enter Error : " + ex.message);
                console.log(historyList.innerHTML);
                alert("history saved Error");
            }
        }
        result.innerHTML = answer;
        
        console.log("enter : result.value = " + result.innerHTML);
    }
    catch(ex){
        console.log("enter Error : " + ex.message);
        console.log("input.innerHTML = " + input.innerHTML);
        alert("Please check the formula \nThis formula can't be calculated.");
    }
});

clear.addEventListener('click', function () {
    input.innerHTML = "";
    result.innerHTML = "";
    leftInput = "";
    rightInput = "";
    console.log("clear : input.innerHTML = " + input.innerHTML);
});

copyApaste.addEventListener('click', function () {
    let txt = "";
    if (window.getSelection) {
        txt = window.getSelection();
        console.log("window.getSelection : txt = " + txt);

        if (txt.toString() == "" || txt.toString() == copyString) {
            input.innerHTML = input.innerHTML + "" + copyString;

            calculateResult();
            console.log("paste : input.innerHTML = " + input.innerHTML);
        }
        else {
            copyString = txt.toString();

            console.log("copy : copyString = " + copyString);
        }
    } 
    else {
    console.log("copyApaste Error wrong detection windo.getSelection == false");
    }    
});

backSpace.addEventListener('click', function () {
    leftInput = leftInput.substr(0, leftInput.length - 1);
    input.innerHTML = leftInput + rightInput;

    calculateResult();
    console.log("backSpace input.innerHTML : " + input.innerHTML);
});
cursorLeft.addEventListener('click', function () {
    rightInput = leftInput.substr(leftInput.length - 1, 1) + rightInput;
    leftInput = leftInput.substr(0, leftInput.length - 1);
    input.innerHTML = leftInput + rightInput;
});

cursorRight.addEventListener('click', function () {
    leftInput = leftInput + rightInput.substr(0, 1);
    rightInput = rightInput.substr(1, rightInput.length - 1);
    input.innerHTML = leftInput + rightInput;
});