export function getNewWord(arr, key){
    const n = getRandomInt(0, arr[key].length);
    const word = arr[key][n];
    return word;
}


export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}