//doubles digits Luhn style
function getLuhnDig(digit) {
    let luhnDig = 2 * digit;
    if (luhnDig > 9) {
        luhnDig = luhnDig - 9;
    }
    return luhnDig;
}

//applies Luhn algorithm to credit card number and returns true if valid
function validateCred(cardNum) {
    //creates array based on Luhn transformation
    const luhnArr = [];
    for (let i = 0; i < cardNum.length; i++) {
        const index = cardNum.length -1 - i;
        if (i % 2 === 0) {
            luhnArr[index] = cardNum[index];
        } else {
            luhnArr[index] = getLuhnDig(cardNum[index]);
        }
    }

    //uses that array to assess validity
    const luhnSum = luhnArr.reduce((accumulator, digit) => accumulator + digit, 0);   
    luhnModulo = luhnSum % 10;
    if (luhnModulo) {
        return 'invalid';
    } else {
        return 'valid';
    }
}

/*returns an array with random length 14-16 of random digits 0-9*/
function generateCardNum () {
    numLength = 14 + Math.floor(Math.random() * 3);

    const cardArr = [];

    for (let i = 0; i < numLength; i++) {
        cardArr.push(Math.floor(Math.random() * 10));
    }
    
    return cardArr;
}

function runProgram() {
    const cardNum = generateCardNum();

    const cardString = cardNum.join('');

    let output = 'Card number: ' + cardString + '<br><br>'

    const result = validateCred(cardNum);

    output += result;
    document.querySelector("#card-output").innerHTML = output;
}