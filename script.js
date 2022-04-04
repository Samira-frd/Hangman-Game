const secretPhrases =["never", "you", "that", "hello", "bullet", "breack", "welcome", "nice"];


let randomItem = "";
let clicked = [];
let result = "";
let mistakes = 0;

function selectRandomItem(){
    randomItem = secretPhrases[Math.floor(Math.random()*secretPhrases.length)];
    document.getElementById("letters").addEventListener("click", buttonHandler);
    window.addEventListener("keyup", keyHandler);
    console.log(randomItem);
}

function setUndrScores(){
    let splitedWord = randomItem.split("");
    let mappedWord = splitedWord.map(letter => (clicked.indexOf(letter)) >= 0 ? letter : "_");
    result = mappedWord.join("");
    document.getElementById("clue").innerHTML = `<p>${result}</p>`
}

function checkIfWon(){
    if(randomItem === result){
        document.getElementById("youWon").querySelector("p").style.display = "block";
        document.getElementById("image").querySelector("img").src = "./assets/winner.png"
    }
}

function checkIfLost(){
    if(mistakes === 6){
        document.getElementById("gameOver").querySelector("p").style.display = "block";
        document.getElementById("clue").innerHTML = `<p>Random word is: ${randomItem}</p>`;
    }
}

function updateHangmanPicture(){
    const image = document.getElementById("image").querySelector("img");
    image.src = `./assets/hangman${mistakes}.png`;
}

function keyHandler(event){
    letterHandler(event.key)
}

function letterHandler(letter){
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    document.getElementById(letter.toUpperCase()).className = "used";
    if(randomItem.indexOf(letter) >= 0){
        setUndrScores();
        checkIfWon();
    }else if(randomItem.indexOf(letter) === -1){
        mistakes++;
        checkIfLost();
        updateHangmanPicture();        
    }
}

function buttonHandler(event){
    letterHandler(event.target.id);
}


selectRandomItem();
setUndrScores();