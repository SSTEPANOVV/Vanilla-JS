"use strict";

const wrapper = document.querySelector('.wrapper');
const qrInput = document.querySelector('.form input')
const generateBtn = document.querySelector('.form button');
const qrImg = document.querySelector('.qr-code img');

generateBtn.addEventListener('click', function () {
    let qrValue = qrInput.value;
    if (!qrValue) return;
    generateBtn.innerHTML = 'Generating QR Code...';
    
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
    qrImg.addEventListener('load', function () {
        wrapper.classList.add('active');
        generateBtn.innerHTML = 'Generate QR Code';
    })

})

qrInput.addEventListener('keyup', function () {
    if (!qrInput.value) {
        wrapper.classList.remove('active');
    }
})