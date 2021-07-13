const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');
const msg3 = document.querySelector('#msg3');
const msg4 = document.querySelector('#msg4');

const err = document.querySelector('#err');

weatherForm.addEventListener('click', (e) => {
    e.preventDefault();

    const location = searchInput.value;

    msg1.textContent = '';
    msg2.textContent = '';
    msg3.textContent = '';
    msg4.textContent = '';

    err.textContent = '';

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location))
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            err.textContent = data.error;
        } else {
            msg1.textContent = data.location; 
            msg2.textContent = data.weather;
            msg3.textContent = data.temperature;
            msg4.textContent = data.precip;
        }
    });
});