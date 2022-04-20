"use strict";

const inputText = document.querySelector('#text');
const statElem = document.querySelector('#stat');

inputText.addEventListener('input', function () {
    let text = this.value;
    let textStat = getWordStat(text.trim());

    console.log(textStat.characters);
    statElem.innerHTML = `You've written <span class="highlight">${textStat.words} words and ${textStat.characters} characters</span>.`;
})



const getWordStat = (str) => {
    let matches = str.match(/\S+/g);
    return {
        characters: str.length,
        words: matches ? matches.length : 0
    }
}