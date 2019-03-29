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
var historyCount = 0;
var copyString = "";


for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function () {
        input.value += numbers[i].value;
        console.log("numberButtons[" + i + "] (" + numbers[i].value + ") : input.value = " + input.value);
    });
}

for (let i = 0; i < normalOperations.length; i++) {
    normalOperations[i].addEventListener('click', function () {
        input.value += normalOperations[i].value;
        console.log("normalOperations[" + i + "] '" + normalOperations[i].value + "' : input.value = " + input.value);
    });
}
for (let i = 0; i < specialOperations.length; i++)
{
    specialOperations[i].addEventListener('click', function(){
        input.value += specialOperations[i].value + "(";
        console.log("specialOperations[" + i + "] '" + specialOperations[i].value + "' : input.value = " + input.value);
    })
}

enter.addEventListener('click', function () {
    try{
        let answer = math.eval(input.value);
        result.innerHTML = "&#61;" + answer;
        try{
            let value = input.value + " &#61; " + answer.toString();
            let onclickStr = "input.value = \"" + input.value  + "\"; result.innerHTML = \"" + answer + "\";";

            historyList.innerHTML += "<tr><input type='button' class='btn btn-default' id='history" + historyCount + "' data-dismiss='modal' style='background-color: white;' onclick=\"input.value='" + input.value + "'; result.innerHTML = '" + answer + "'\" value='" + value + "'></tr>";
        }
        catch(ex){
            console.log("enter Error : " + ex.message);
            console.log(historyList.innerHTML);
            alert("history saved Error");
        }

        console.log("enter : result.value = " + result.innerHTML.substr(1, result.innerHTML.length - 1));
    }
    catch(ex){
        console.log("enter Error : " + ex.message);
        console.log("input.value = " + input.value);
        alert("Please check the formula \nThis formula can't be calculated.");
    }
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

        if (txt.toString() == "" || txt.toString() == copyString) {
            input.value = input.value + "" + copyString;

            console.log("paste : input.value = " + input.value);
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
    input.value = input.value.substr(0, input.value.length - 1);

    console.log("backSpace input.value : " + input.value);
});


