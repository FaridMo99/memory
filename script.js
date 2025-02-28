let modal = document.querySelector("header")
let modalButton = document.querySelector(".enterGridSizeBtn")

let rows30 = document.querySelectorAll(".rows30")
let rows40 = document.querySelectorAll(".rows40")

let allCells = document.querySelectorAll(".cells")
let svgs = document.querySelectorAll("img")

let scoreboard = document.querySelector(".containerScore")

//modal closing and gridSize 

modalButton.addEventListener("click", (e) => {
    let gridSize = document.querySelector("input[type='radio']:checked");
   
    e.preventDefault();
    modal.classList.toggle("hidden");

    if (gridSize.value === "20") {
        nodeListToArrayAndLoop(allCells, "addEventListener")
        placeSvg(10);
        updateScore(0, 10);
    }

    else if (gridSize.value === "30"){
        nodeListToArrayAndLoop(allCells, "addEventListener")
        nodeListToArrayAndLoop(rows30, "remove");
        placeSvg(5);
        updateScore(0, 15);

    }

    else if (gridSize.value === "40") {
        nodeListToArrayAndLoop(allCells, "addEventListener")
        nodeListToArrayAndLoop(rows30, "remove");
        nodeListToArrayAndLoop(rows40, "remove");
        placeSvg(0);
        updateScore(0, 20);
    }
})

function nodeListToArrayAndLoop(list, loopAction){
    let arr = Array.from(list)

    arr.forEach(element => {
        if(loopAction === "remove") {
        element.classList[loopAction]('hidden');
        }

        else if (loopAction === "addEventListener") {
            element.addEventListener("click", (e) => {

            e.target.style.visibility = "hidden"
            e.target.style.pointerEvents = "none"   
            })
        }

    })
}

function updateScore(score, combinations) {
    scoreboard.innerHTML = `${score}/${combinations}`

    if(score === combinations) {
        scoreboard.innerHTML += " You Won!"
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
        dupedArray.push(item, item);
    });

    return shuffleArray(dupedArray);
}

function placeSvg(lengthToCut) {
    let shuffledDupedArray = cutAndDupedArray(lengthToCut);
    let index = 0

    allCells.forEach((cell) => {
        let svg = shuffledDupedArray[index];
        cell.innerHTML = svg.outerHTML
        console.log(svg)
        index++
    });

}


//features 
    //if all cards right  add to score you won and firework animation
    //restart and change grid button
        //restart keeps grid but deletes everything else
        //change grid deletes everything


    //flipping cards
        // first card stays flipped 
        // if second card matches then both cards stay invisible
        // removed and add one to points

function flipCards() {
    let firstCard;
    let secondCard;

    let hiddenOne = firstCard.style.visibility = "hidden"
    let hiddenTwo = secondCard.style.visibility = "hidden"

    let firstSymbol;
    let secondSymbol;

    let score = 0

    if (firstCard === secondCard) {
        score++
        updateScore(score)
    }

    else if (firstSymbol !== secondSymbol && hiddenOne === hiddenTwo) {
        firstCard.style.visibility = "visible"
        secondCard.style.visibility = "visible"
        firstCard.style.pointerEvents = "auto" 
        secondCard.style.pointerEvents = "auto" 
    }
}