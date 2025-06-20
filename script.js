function getEntries() {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
}

function displayEntries() {
  const entries = getEntries();
  const tableBody = document.querySelector("#user-table tbody");
  tableBody.innerHTML = "";

  entries.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTerms}</td>
    `;
    tableBody.appendChild(row);
  });
}

function validateDOB(dob) {
  const dobDate = new Date(dob);
  const today = new Date();

  const age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  const dayDiff = today.getDate() - dobDate.getDate();

  let actualAge = age;
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    actualAge--;
  }

  return actualAge >= 18 && actualAge <= 55;
}

function saveFormData(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  if (!validateDOB(dob)) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const newEntry = { name, email, password, dob, acceptedTerms };
  const entries = getEntries();
  entries.push(newEntry);
  localStorage.setItem("user-entries", JSON.stringify(entries));

  displayEntries();
}

document.getElementById("registration-form").addEventListener("submit", saveFormData);
window.addEventListener("DOMContentLoaded", displayEntries);
