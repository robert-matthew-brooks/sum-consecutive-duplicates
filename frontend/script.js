let actionTimer;
const cardSlideInInterval = 150;

// the following times should match the css animation times
const cardSlideTime = 1000;
const cardSlideOutTime = 1000;
const cardHighlightTime = 1000;
const cardHighlightNoDuplicatesTime = 1000;
const cardHighlightDuplicatesTime = 1200;
const cardRemoveDuplicatesTime = 1000;
const actionInterval = 500;

let recursive = false;
let demoArray = [];
const exampleArrays = [
    [8, 4, 1, 1, 2, 8, 2, 2, 4],
    [1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1],
    [1, 1, 1, 3, 8, 2, 2, 1, 1, 1, 1]
];

const cardWrapper = document.getElementById('app__inner-wrapper');
const arraySelect = document.getElementById('array-select');

const userControls = [
    arraySelect,
    document.getElementById('run-once-radio'),
    document.getElementById('run-recursively-radio'),
    document.getElementById('run-btn'),
];



/*****************/
/* Main Function */
/*****************/



function runSolution(recursive) {
    if (recursive) {
        demoArray = reduceConsecutives(demoArray);
    }
    else {
        demoArray = sumConsecutiveDuplicates(demoArray);
    }
}



/*******************/
/* Control user UI */
/*******************/



function handleRadio(selected) {
    if(selected.value === 'true') recursive = true;
    else recursive = false;
}

function handleSelect(index) {
    if (index === 999) randomiseCards();
    else setupCardsAnimated(exampleArrays[index]);
}

function disableControls(isDisabled) {
    for (const control of userControls) {
        control.disabled = isDisabled;
    }
}

function resetSelect() {
    arraySelect.options[0].selected = true;
}



/**************************************/
/* Setup initial onscreen cards state */
/*    (before user presses 'RUN')     */
/**************************************/



function setupCardsNoAnimation(inputArray) {
    demoArray = [...inputArray];

    while(cardWrapper.firstChild) {
        cardWrapper.firstChild.remove();
    }

    // create and insert new cards
    for (const number of inputArray) {
        const span = document.createElement('span');
        span.innerHTML = number;
        cardWrapper.appendChild(span);
    }
}

function setupCardsAnimated(inputArray) {
    disableControls(true);
    actionTimer = 0;
    demoArray = [...inputArray];

    // remove all cards
    for (const child of cardWrapper.children) {
        child.classList.add('slide-out');
        setTimeout(() => {
            cardWrapper.removeChild(child);
        }, cardSlideOutTime);
    }
    actionTimer += cardSlideOutTime;

    // create new cards
    for (const number of inputArray) {
        const span = document.createElement('span');
        span.innerHTML = number;

        // add them (invisible) to wrapper after old cards gone (stop wrapper height jumping about too much)
        setTimeout(() => {
            span.classList.add('hidden');
            cardWrapper.appendChild(span);
        }, cardSlideOutTime);

        // animate cards sliding in and make visible
        setTimeout(() => {
            span.classList.remove('hidden');
            span.classList.add('slide-in');
        }, actionTimer);
        actionTimer += cardSlideInInterval;
    }

    actionTimer += cardSlideTime; // wait until last card slides in
    setTimeout(() => {
        disableControls(false);
    }, actionTimer);
}

function randomiseCards() {
    resetSelect();

    const arraySize = 5 + Math.ceil(Math.random() * 6);
    let randomArray = new Array(arraySize).fill(0).map(num => {
        return Math.ceil(Math.random()*5);
    });

    // ensure at least 1 random number
    const middleIndex = Math.floor(randomArray.length/2);
    randomArray = [
        ...randomArray.slice(0, middleIndex),
        randomArray[middleIndex],
        ...randomArray.slice(middleIndex)
    ];

    setupCardsAnimated(randomArray);

    return randomArray;
}



/***********************/
/* Frontend animations */
/***********************/



async function highlightCard(cardIndex) {
    const card = cardWrapper.children[cardIndex];

    card.classList.remove(...card.classList);
    card.classList.add('highlight');

    await sleep(cardHighlightTime);
    await sleep(actionInterval);
}

async function highlightCardNoDuplicates(cardIndex) {
    const card = cardWrapper.children[cardIndex];

    card.classList.remove(...card.classList);
    card.classList.add('highlightNoDuplicates');

    await sleep(cardHighlightNoDuplicatesTime + actionInterval);
}

async function highlightCardDuplicates(duplicateIndexes) {
    for (const index of duplicateIndexes) {
        const card = cardWrapper.children[index];
        card.classList.remove(...card.classList);
        card.classList.add('highlightDuplicates');
    }
    await sleep(cardHighlightDuplicatesTime + actionInterval);
}

async function removeCardDuplicates(duplicateIndexes, remainingIndex, newTotal) {
    for (const index of duplicateIndexes) {
        const card = cardWrapper.children[index];

        card.classList.remove(...card.classList);
        card.classList.add('slide-out');
    }
    const card = cardWrapper.children[remainingIndex];
    card.innerHTML = newTotal;
    card.classList.add('expand');

    await sleep(cardRemoveDuplicatesTime);

    const indexToRemove = duplicateIndexes[0];
    duplicateIndexes.forEach(() => {
        const card = cardWrapper.children[indexToRemove];
        card.remove();
    });

    await sleep(actionInterval);
}

async function updateNumber(cardIndex, number) {
    card = cardWrapper.children[cardIndex];
    card.innerHTML = number;
    card.classList.add('expandText');

    await sleep(cardRemoveDuplicatesTime + actionInterval);
}



/********/
/* Util */
/********/



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}