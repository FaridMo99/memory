let modal = document.querySelector("header")
let modalButton = document.querySelector(".enterGridSizeBtn")
let body = document.querySelector("body")

let rows30 = document.querySelectorAll(".rows30")
let rows40 = document.querySelectorAll(".rows40")

let allCells = document.querySelectorAll(".cells")
let svgs = document.querySelectorAll("img")

let scoreboard = document.querySelector(".containerScore")
let score = 0;
let combinations;

let flipPairsMessageContainer = document.querySelector(".correctFalseWinnerMessage")
let flipPairsMessage = document.querySelector(".message")

let restartBtn = document.querySelector(".restartBtn")
//modal closing and gridSize 

modalButton.addEventListener("click", (e) => {
    let gridSize = document.querySelector("input[type='radio']:checked");
   
    e.preventDefault();
    modal.classList.add("hidden");

    if (gridSize.value === "20") {
        nodeListToArrayAndLoop(allCells, "addEventListener")
        combinations = 10;
        updateScore()
        placeSvg(10);
    }

    else if (gridSize.value === "30"){
        nodeListToArrayAndLoop(allCells, "addEventListener")
        nodeListToArrayAndLoop(rows30, "remove");
        combinations = 15;
        updateScore()
        placeSvg(5);
    }

    else if (gridSize.value === "40") {
        nodeListToArrayAndLoop(allCells, "addEventListener")
        nodeListToArrayAndLoop(rows30, "remove");
        nodeListToArrayAndLoop(rows40, "remove");
        placeSvg(0);
        combinations = 20;
        updateScore()
    }
})

//array functions
function nodeListToArrayAndLoop(list, loopAction){
    let arr = Array.from(list)

    arr.forEach(element => {
        if(loopAction === "remove" || loopAction === "add") {
        element.classList[loopAction]('hidden');
        }

        else if (loopAction === "addEventListener") {
            element.addEventListener("click", namedEventListener)

    }
})
}

function namedEventListener(e) {
    pairCounter++    

    e.target.classList.add("invisible")
    e.target.style.pointerEvents = "none"

    
    chosenMemorysArray.push(e.target)

    if (pairCounter % 2 === 0) {
        flipCards(chosenMemorysArray[chosenMemorysArray.length - 2],chosenMemorysArray[chosenMemorysArray.length - 1])
    }

}

function shuffleArray(arrayy) {
    let array = Array.from(arrayy)

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));        
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function cutAndDupedArray(lengthToCut) {
    let randomizedArray = shuffleArray(svgs);
    let dupedArray = []

    randomizedArray.splice(0, lengthToCut);
    randomizedArray.forEach(item => {
        let itemAsString = item.outerHTML
        dupedArray.push(itemAsString, itemAsString);
    });
    return shuffleArray(dupedArray);
}

function placeSvg(lengthToCut) {
    let shuffledDupedArray = cutAndDupedArray(lengthToCut);
    let index = 0;

    allCells.forEach((cell) => {
        let svg = shuffledDupedArray[index];
        cell.innerHTML = svg
        index++
    });

}


function updateScore() {
    scoreboard.innerHTML = `${score}/${combinations}`

    if(score === combinations) {

        scoreboard.innerHTML += " You Won!"
        flipPairsMessage.innerHTML = "You Won!!"

        setTimeout(() => {
            flipPairsMessageContainer.classList.remove("hidden")
        }, 500)

        setTimeout(() => {
            flipPairsMessageContainer.classList.add("hidden")
        }, 2000)

    }
}

//button restart

restartBtn.addEventListener("click", () => {
    pairCounter = 0;
    nodeListToArrayAndLoop(allCells, "addEventListener");
    nodeListToArrayAndLoop(rows30, "add");
    nodeListToArrayAndLoop(rows40, "add");
    placeSvg("");
    score = 0;
    updateScore("");
    chosenMemorysArray = []
    modal.classList.remove("hidden");
    Array.from(allCells).forEach(cell => {
        cell.classList.remove("invisible")
        cell.style.pointerEvents = "auto";
        cell.removeEventListener("click", namedEventListener);
    })
})

let chosenMemorysArray = [];
let pairCounter = 0

function flipCards(firstCard, secondCard) {
    console.log(firstCard)
    console.log(secondCard)
    body.style.pointerEvents = "none"

    if (firstCard.innerHTML === secondCard.innerHTML) {
        setTimeout(() => {
            flipPairsMessageContainer.classList.remove("hidden")
            body.style.pointerEvents = "auto"
        }, 500)
    
        setTimeout(() => {
            flipPairsMessageContainer.classList.add("hidden")
        }, 2000)
        flipPairsMessage.innerHTML = "Correct <img src='svgDirectory/right.svg'>"
        
        score++
        updateScore();
    }

    else if (firstCard.innerHTML !== secondCard.innerHTML) {
        setTimeout(() => {
            flipPairsMessageContainer.classList.remove("hidden")
            body.style.pointerEvents = "auto"
        }, 500)
        
        setTimeout(() => {
            flipPairsMessageContainer.classList.add("hidden")
            firstCard.classList.remove("invisible")
            firstCard.style.pointerEvents = "auto"
            secondCard.classList.remove("invisible")
            secondCard.style.pointerEvents = "auto"

            chosenMemorysArray.splice(-2);
        }, 2000)
        flipPairsMessage.innerHTML = "Wrong <img src='svgDirectory/wrong.svg'>"
    }
}
