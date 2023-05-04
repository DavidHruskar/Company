document.addEventListener("DOMContentLoaded", () => {
  // Retrieve query parameters
  const params = new URLSearchParams(window.location.search);
  const ime = params.get("ime");
  const prezime = params.get("prezime");
  const email = params.get("email");
  const adresa = params.get("adresa");
  const broj = params.get("broj");

  // Set form field values
  const imeField = document.getElementById("inputIme");
  const prezimeField = document.getElementById("inputPrezime");
  const emailField = document.getElementById("inputEmail");
  const adresaField = document.getElementById("inputAdresa");
  const brojField = document.getElementById("inputTelefon");

  imeField.value = ime;
  prezimeField.value = prezime;
  emailField.value = email;
  adresaField.value = adresa;
  brojField.value = broj;
});

// Add EventListener to Ažuriraj djelatnika button
document.getElementById("update").addEventListener("click", updateDjelatnik);

function updateDjelatnik() {
  // Retrieve the updated user data from the form fields
  const ime = document.getElementById("inputIme").value;
  const prezime = document.getElementById("inputPrezime").value;
  const email = document.getElementById("inputEmail").value;
  const adresa = document.getElementById("inputAdresa").value;
  const broj = document.getElementById("inputTelefon").value;

  // Retrieve the existing user data from the local storage
  const users = JSON.parse(localStorage.getItem("podaci"));

  // Find the index of the updated user in the users array
  const index = users.findIndex((user) => user.email === email);

  // Preserve the ID of the user being updated
  const id = users[index].id;

  // Update the corresponding user data in the local storage
  users[index] = {
    id,
    ime,
    prezime,
    email,
    adresa,
    broj,
  };

  // Store the updated user data in the local storage
  localStorage.setItem("podaci", JSON.stringify(users));

  // Display an alert message after a successful update
  alert(`Korisnik sa ID-em ${id} je uspješno ažuriran.`);
}