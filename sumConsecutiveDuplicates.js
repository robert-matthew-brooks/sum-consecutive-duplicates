function sumConsecutiveDuplicates(inputArray) {
    if (error = getInputErrors(inputArray)) {
        return error;
    }

    const numbers = [...inputArray];

    for (let scanIndex=0; scanIndex<numbers.length; scanIndex++) {
        scannedNumber = numbers[scanIndex];

        let duplicateIndexes = [];

        for (let lookAheadIndex=scanIndex+1; numbers[lookAheadIndex]===scannedNumber; lookAheadIndex++) {
            duplicateIndexes.push(lookAheadIndex);
        }
        
        if (duplicateIndexes.length > 0) {
            const duplicates = numbers.splice(scanIndex, duplicateIndexes.length);
            const duplicatesTotal = duplicates.reduce((number, total) => total+number);

            numbers[scanIndex] += duplicatesTotal;
        }

    }

    return numbers;
}

function reduceConsecutives(inputArray, hasDoneFirstPass) {
    if (error = getInputErrors(inputArray)) {
        return error;
    }

    let numbers;
    if (!hasDoneFirstPass) {    // this makes sure the function is always called, so there is at least one animation, even when no duplicates are present
        numbers = sumConsecutiveDuplicates(inputArray);
    }
    else {
        numbers = [...inputArray];
    }
    let reducedArray;

    // function to check if recursion should occur or not
    const hasConsecutiveDuplicates = array => {
        for (let i=0; i<array.length-1; i++) {
            if (array[i] === array[i+1]) return true;
        }
        return false;
    };

    // recursive case (array has consecutive duplicates)
    if (hasConsecutiveDuplicates(numbers)) {
        // recursion
        reducedArray = reduceConsecutives(
            sumConsecutiveDuplicates(numbers), true
        );
    }
    // base case (no consecutive duplicates)
    else {
       return numbers;
    }

    return reducedArray;
}

function getInputErrors(array) {
    if (!Array.isArray(array)) return 'Error - only pass an array';
    for (const element of array) {
        if (!Number.isInteger(element)) return 'Error - only pass integers';
    }

    return null;
}

module.exports = { sumConsecutiveDuplicates, reduceConsecutives };