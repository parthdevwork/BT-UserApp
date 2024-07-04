export function getRandomLetter(uppercase = false, size = 3) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let word = ''
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * 26);
        const letter = alphabet[randomIndex];
        word = word + (uppercase ? letter.toUpperCase() : letter);
    }
    return word
}

// generate orderId for the order mixin letters and number and length 6
export function generateOrderId() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderId = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        orderId += characters[randomIndex];
    }
    return orderId;
}

export const capitalizeFirst = (str = '') => str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
export const replaceUAE = (str = '') => str.toLowerCase().replace('united arab emirates', 'UAE')


export const aditionalCitys = [
    "SHARJAH",
    "AJMAN",
    "UMM AL QUWAIN",
    "RAK",
    "RAS AL KHAIMAH",
    "(AUH)",
    "ABU DHABI",
    "FUJAIRAH",
];


export function calculateVAT(totalAmount, vatRate, includesVAT = true) {

    console.log(totalAmount, vatRate)

    if (includesVAT) {
        // Total amount includes VAT
        const vatAmount = (totalAmount * vatRate) / (1 + vatRate);
        const netAmount = totalAmount / (1 + vatRate);
        return {
            netAmount: netAmount.toFixed(2),
            vatAmount: vatAmount.toFixed(2),
            totalAmount: totalAmount.toFixed(2)
        };
    } else {
        // Total amount is net (before VAT)
        const vatAmount = totalAmount * vatRate;
        const totalWithVAT = totalAmount * (1 + vatRate);
        return {
            netAmount: totalAmount.toFixed(2),
            vatAmount: vatAmount.toFixed(2),
            totalAmount: totalWithVAT.toFixed(2)
        };
    }
}