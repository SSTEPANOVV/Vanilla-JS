"use strict";

const selectTag = document.querySelectorAll('select');
const fromText = document.querySelector('.from-text');
const toText = document.querySelector('.to-text');
const exchange = document.querySelector('.exchange');
const translateBtn = document.querySelector('button');
const icons = document.querySelectorAll('.row i');


selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        // Selecting English by default as FROM language and Hindi as TO language
        let selected;
        if (id == 0 && country_code == 'en-GB') {
            selected = 'selected';
        } else if (id == 1 && country_code == 'hi-IN') {
            selected = 'selected';
        }

        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', option); // adding option tag inside select tag
    }
})

translateBtn.addEventListener('click', () => {
    let text = fromText.value;
    let translateFrom = selectTag[0].value; // getting fromSelect tag value
    let translateTo = selectTag[1].value; // getting toSelect tag value
    if (!text) return;
    toText.setAttribute('placeholder', 'Translating...');
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
            toText.setAttribute('placeholder', 'Translation');
        });
})

exchange.addEventListener('click', () => {
    let tempText = fromText.value;
    let tempLang = selectTag[0].value;

    fromText.value = toText.value;
    toText.value = tempText;

    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

icons.forEach(icon => {
    icon.addEventListener('click', ({ target }) => {
        if (target.classList.contains('fa-copy')) {
            // if clicked icon has from id, copy the fromTextarea value else copy the toTextarea value
            if (target.id === "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            // if clicked icon has from id, speak the fromTextarea value else speak the toTextarea value
            if (target.id === "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value; // setting utterance language to fromSelect tag value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value; // setting utterance language to toSelect tag value
            }
            speechSynthesis.speak(utterance); // speak the passed utterance
        }
    });
});