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

var calFormula = math.parser();


for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function () {
        input.innerHTML += numbers[i].value;
        console.log("numberButtons[" + i + "] (" + numbers[i].value + ") : input.innerHTML = " + input.innerHTML);
    });
}

for (let i = 0; i < normalOperations.length; i++) {
    normalOperations[i].addEventListener('click', function () {
        input.innerHTML += normalOperations[i].value;
        console.log("normalOperations[" + i + "] '" + normalOperations[i].value + "' : input.value = " + input.innerHTML);
    });
}
for (let i = 0; i < specialOperations.length; i++)
{
    specialOperations[i].addEventListener('click', function(){
        input.innerHTML += specialOperations[i].value + "(";
        console.log("specialOperations[" + i + "] '" + specialOperations[i].value + "' : input.value = " + input.innerHTML);
    });
}

enter.addEventListener('click', function () {
    try{
        let answer = calFormula.eval(input.innerHTML).toString();
        
        if(answer.split(' ')[0] == 'function'){
            answer = answer.split(' ');
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
    console.log("clear : input.innerHTML = " + input.innerHTML);
});

copyApaste.addEventListener('click', function () {
    let txt = "";
    if (window.getSelection) {
        txt = window.getSelection();
        console.log("window.getSelection : txt = " + txt);

        if (txt.toString() == "" || txt.toString() == copyString) {
            input.innerHTML = input.innerHTML + "" + copyString;

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
    input.innerHTML = input.innerHTML.substr(0, input.innerHTML.length - 1);

    console.log("backSpace input.innerHTML : " + input.innerHTML);
});

/* 
모달 안 꺼지게
$('#keyboard').modal({ backdrop: 'static', keyboard: false });
*/