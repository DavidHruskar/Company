// Load existing data from local storage
let informacije = !!localStorage.getItem('podaci') ? JSON.parse(localStorage.getItem('podaci')) : [];

const dodajPodatak = (ev) => {
    ev.preventDefault();
    const korisnikPodaci = {
        id: Date.now(), // generate a unique ID
        ime: document.getElementById('inputIme').value,
        prezime: document.getElementById('inputPrezime').value,
        email: document.getElementById('inputEmail').value,
        adresa: document.getElementById('inputAdresa').value,
        broj: document.getElementById('inputTelefon').value
    };
    informacije.push(korisnikPodaci);

    localStorage.setItem('podaci', JSON.stringify(informacije));
    document.forms[0].reset();
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('spremi').addEventListener('click', dodajPodatak);
    console.log(JSON.parse(window.localStorage.getItem('podaci')));
});