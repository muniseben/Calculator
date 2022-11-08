const display = document.querySelector('.calculator-input'); // degismez olduklari icin const diye tanimliyoruz.

const keys = document.querySelector('.calculator-keys');

let displayValue = '0'; // kullanici butona tikladikca degisecek. Her yeni bilgiyle set edicez.
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;


updateDisplay(); // buraya yazdik ki uygulama basladiginda cagirmis olalim.

function updateDisplay(){
    display.value = displayValue;
}

keys.addEventListener('click', function(e) {
    const element = e.target;

    if(!element.matches('button')) return; // return demek buradan sonraki kodlarin isletilmemesi demek.bosluklarda artik tepki vermiyor 

    if(element.classList.contains('operator')){
        // console.log("operator", element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('decimal')){
        // console.log("decimal", element.value);
        inputDecimal();
        updateDisplay();
        return;
    }

    if(element.classList.contains('clear')){
        // console.log("clear", element.value);
        clear();
        updateDisplay();
        return;
    }

   //  console.log("number", element.value );

   inputNumber(element.value); //elementin value degerini inputNumbera gondermek icin.yani tikladigimiz numu
   updateDisplay();
});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue); //hesap makinasinda gorunen deger nedir

    if(operator && waitingForSecondValue){

    operator = nextOperator;
    return;
    }

    if(firstValue === null){
        firstValue = value;
    }else if (operator){
            const result = calculate(firstValue, value, operator); 

            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstValue = result;
        }

    waitingForSecondValue = true;
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator){
    if (operator === "+"){
        return first + second;
    } else if(operator === "-"){
        return first - second;
    }else if (operator === "*"){
        return first * second;
    }else if (operator === "/"){
        return first / second;
    }

    return second;
}
    
function inputNumber(num) {
    if(waitingForSecondValue){
        displayValue = num;
        waitingForSecondValue = false;
    } else{
        displayValue = displayValue === "0"? num: displayValue + num;
}
console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal(){
    if(!displayValue.includes(".")){
    displayValue += ".";
    }
}

function clear(){
    displayValue ="0";
}