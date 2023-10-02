module.exports = function toReadable(number) {
    const units = [
        "",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];
    const teens = [
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
    ];
    const tens = [
        "",
        "",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
    ];

    if (number === 0) {
        return "zero";
    }
    const thousandSuffixes = ["", "thousand", "million", "billion"];

    function convertToWords(num) {
        if (num === 0) {
            return "zero";
        }
        if (num === "") {
            return "zero";
        }

        if (num < 10) {
            return units[num];
        }

        if (num < 20) {
            return teens[num - 10];
        }

        if (num < 100) {
            const ten = Math.floor(num / 10);
            const remainder = num % 10;
            return (
                tens[ten] + (remainder ? " " + convertToWords(remainder) : "")
            );
        }

        const hundred = Math.floor(num / 100);
        const remainder = num % 100;
        return (
            units[hundred] +
            " hundred" +
            (remainder ? " " + convertToWords(remainder) : "")
        );
    }

    const numberString = number.toString();
    const parts = [];
    let partCount = 0;

    for (let i = numberString.length; i > 0; i -= 3) {
        const start = Math.max(0, i - 3);
        const end = i;
        const part = parseInt(numberString.slice(start, end), 10);
        if (part > 0) {
            parts.push(
                convertToWords(part) + " " + thousandSuffixes[partCount]
            );
        }
        partCount++;
    }

    return parts.reverse().join(" ").trim();
};
