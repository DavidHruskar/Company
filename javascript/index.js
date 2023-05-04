/* Otvaranje forme za dodavanje novih djelatnika preko tipke Dodaj novog djelatnika */
function unosKorisnika() {
  window.location.href = "unos.html";
}

function editKorisnika() {
  window.location.href = "edit.html"
}

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

const tableBody = document.getElementById("popisZaposlenika");

// Dohvaćanje podataka iz Local Storage-a
const data = JSON.parse(localStorage.getItem("podaci"));

// Prikaz podataka u tablici
if (data && data.length > 0) {
  data.forEach((korisnikPodaci, index) => {
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${korisnikPodaci.id}</td>
      <td>${korisnikPodaci.ime}</td>
      <td>${korisnikPodaci.prezime}</td>
      <td>${korisnikPodaci.email}</td>
      <td>${korisnikPodaci.adresa}</td>
      <td>${korisnikPodaci.broj}</td>
      <td>
        <button type="button" class="btn" id="btn-edit" data-id="${index}">
          <i class="bx bx-edit-alt"></i>
        </button>
      </td>
      <td>
        <button type="button" class="btn" id="btn-del" data-id="${index}">
          <i class="bx bx-trash"></i>
        </button>
      </td>
    `;
    const deleteButton = newRow.querySelector("#btn-del");
    deleteButton.addEventListener("click", deleteRowFromLocalStorage);

    const editButton = newRow.querySelector("#btn-edit");
    editButton.addEventListener("click", () => {
      const ime = korisnikPodaci.ime;
      const prezime = korisnikPodaci.prezime;
      const email = korisnikPodaci.email;
      const adresa = korisnikPodaci.adresa;
      const broj = korisnikPodaci.broj;
      window.location.href = `edit.html?ime=${ime}&prezime=${prezime}&email=${email}&adresa=${adresa}&broj=${broj}`;
    });
  });
}

// Funkcija za brisanje podataka iz local storage-a i refresh stranice
function deleteRowFromLocalStorage(event) {
  const rowToDelete = event.target.closest("tr"); // get the closest table row element
  const userIdToDelete = rowToDelete.querySelector("td:first-child").textContent; // get the user ID from the first cell of the row

  // check if the localStorage item exists
  if (localStorage.getItem("podaci")) {
    // remove the corresponding data from local storage
    let users = JSON.parse(localStorage.getItem("podaci"));
    users = users.filter((user) => user.id.toString() !== userIdToDelete.toString());
    localStorage.setItem("podaci", JSON.stringify(users));

    // show a confirmation message
    alert(`Korisnik sa ID-em ${userIdToDelete} je uspješno obrisan.`);

    // refresh the page with the updated data
    location.reload();
  }

  // remove the table row from the table
  rowToDelete.remove();
}

// Dodaj event listener na "Obriši sve djelatnike" tipku
document.getElementById("btn-del-all").addEventListener("click", deleteAllFromLocalStorage);

// Definiranje funkcije za brisanje svih podataka iz local storage-a i refresh stranice
function deleteAllFromLocalStorage() {
  localStorage.clear();
  location.reload();
}

