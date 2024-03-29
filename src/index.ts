/**
 * Format a number to make it more readable.
 * @param {number | string} amount - The amount that will be formatted, must be convertible by `Number()`.
 * @param {number} decimalAmount - The amount of decimal places will be in the formatted number.
 * @param {string} decimalMark - The character that marks the start the fractional part of the formatted number.
 * @param {string} delimiter - The character that separates the thousands in a number.
 * @returns {string}
 */
export const formatNumber = (amount: number | string, decimalAmount = 2, decimalMark = '.', delimiter = ','): string => {

    if (decimalAmount === Infinity) {
        // Set a dynamic number of decimal places, depending on the input.
        decimalAmount = 0;
        const numberParts = amount.toString().split('.');
        if (numberParts[1]) {
            decimalAmount = numberParts[1].length;
        }
    }

    const amountNumber = Number(amount);

    if (isNaN(amountNumber) || Math.abs(Number(amount)) === Infinity) {
        throw new Error('formatNumber only accepts actual numbers.');
    }

    let negativeMarker = '';
    if (amountNumber < 0) {
        negativeMarker = '-';
    }

    const absoluteAmountString = Math.abs(amountNumber).toFixed(decimalAmount);

    const integerString = parseInt(absoluteAmountString, 10).toString();

    const digits = integerString.length;

    let characterAmountAtFront = 0;
    if (digits > 3) {
        characterAmountAtFront = digits % 3; // Determine amount of left-over characters at the front.
    }

    let firstDigits = '';
    if (characterAmountAtFront) {
        firstDigits = integerString.substr(0, characterAmountAtFront);
        firstDigits += delimiter;
    }

    let middleText = '';
    let charCounter = 0;
    const middleCharacters = integerString.substr(characterAmountAtFront);
    for (const char of middleCharacters) {
        // Skip the first delimiter because it's either added with the firstDigits or not needed.
        if (charCounter && charCounter % 3 === 0) {
            middleText += delimiter;
        }
        middleText += char;
        charCounter++;
    }

    let decimalText = '';
    if (decimalAmount) {
        const decimalNumbers = Number(absoluteAmountString) - parseInt(absoluteAmountString, 10);
        decimalText = decimalMark + decimalNumbers.toFixed(decimalAmount).slice(2); // slice first 2 characters from 0.XXX
    }

    return negativeMarker + firstDigits + middleText + decimalText;
};
