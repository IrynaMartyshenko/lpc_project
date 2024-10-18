document.getElementById('registrationForm').addEventListener('submit', validateForm);

function validateForm(event) {
  event.preventDefault();

  const nameInput = document.getElementById('nameInput');
  const surnameInput = document.getElementById('surnameInput');
  const birthdayInput = document.getElementById('birthdayInput');
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const phoneInput = document.getElementById('phoneInput');
  const genderInput = document.querySelector('input[name="gender"]:checked');
  const groupInput = document.getElementById('groupInput');

  let isValid = true;

  const namePattern = /^[A-Za-zА-Яа-яЁё\s]+$/;

  if (!nameInput.value) {
    showError('nameError', 'Name is required');
    isValid = false;
  } else if (!namePattern.test(nameInput.value)) {
    showError('nameError', 'Name cannot contain numbers or special characters');
    isValid = false;
  } else {
    hideError('nameError');
  }

  if (!surnameInput.value) {
    showError('surnameError', 'Surname is required');
    isValid = false;
  } else if (!namePattern.test(surnameInput.value)) {
    showError('surnameError', 'Surname cannot contain numbers or special characters');
    isValid = false;
  } else {
    hideError('surnameError');
  }

  if (!birthdayInput.value) {
    showError('birthdayError', 'Birthday is required');
    isValid = false;
  } else if (new Date(birthdayInput.value) > new Date()) {
    showError('birthdayError', 'Birthday cannot be in the future');
    isValid = false;
  } else {
    hideError('birthdayError');
  }
  
  if (!emailInput.value || !validateEmail(emailInput.value)) {
    showError('emailError', 'Valid email is required (e.g., gmail.com or ukr.net)');
    isValid = false;
  } else {
    hideError('emailError');
  }

  if (!passwordInput.value) {
    showError('passwordError', 'Password is required');
    isValid = false;
  } else if (passwordInput.value.length < 8) {
    showError('passwordError', 'Password must be at least 8 characters long');
    isValid = false;
  } else if (!/[a-z]/.test(passwordInput.value)) {
    showError('passwordError', 'Password must contain at least one lowercase letter');
    isValid = false;
  } else if (!/[A-Z]/.test(passwordInput.value)) {
    showError('passwordError', 'Password must contain at least one uppercase letter');
    isValid = false;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput.value)) {
    showError('passwordError', 'Password must contain at least one special symbol');
    isValid = false;
  } else {
    hideError('passwordError');
  }
  

  if (!phoneInput.value) {
    showError('phoneError', 'Phone number is required');
    isValid = false;
  } else {
    hideError('phoneError');
  }

  if (!genderInput) {
    showError('genderError', 'Please select your gender');
    isValid = false;
  } else {
    hideError('genderError');
  }

  if (!groupInput.value) {
    showError('groupError', 'Please select a group');
    isValid = false;
  } else {
    hideError('groupError');
  }

  if (isValid) {
    addRowToTable(
      nameInput.value, 
      surnameInput.value, 
      birthdayInput.value, 
      emailInput.value, 
      passwordInput.value,
      phoneInput.value,
      genderInput.value, 
      groupInput.value
    );
    document.getElementById('registrationForm').reset();
  }
}

function showError(id, message) {
  const errorElement = document.getElementById(id);
  errorElement.textContent = message;
  errorElement.style.color = 'red';
}

function hideError(id) {
  const errorElement = document.getElementById(id);
  errorElement.textContent = '';
}

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|ukr\.net)$/;
  return emailPattern.test(email);
}

function addRowToTable(name, surname, birthday, email, password, phone, gender, group) {
  const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();

  const checkboxCell = newRow.insertCell(0);
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkboxCell.appendChild(checkbox);

  newRow.insertCell(1).innerText = name;
  newRow.insertCell(2).innerText = surname;
  newRow.insertCell(3).innerText = birthday;
  newRow.insertCell(4).innerText = email;
  newRow.insertCell(5).innerText = password;
  newRow.insertCell(6).innerText = phone;
  newRow.insertCell(7).innerText = gender;
  newRow.insertCell(8).innerText = group;
}

function deleteSelectedRows() {
  const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
  const rows = table.rows;
  
  for (let i = rows.length - 1; i >= 0; i--) {
    const checkbox = rows[i].cells[0].getElementsByTagName('input')[0];
    if (checkbox && checkbox.checked) {
      table.deleteRow(i);
    }
  }
}

function duplicateSelectedRows() {
  const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
  const rows = table.rows;

  for (let i = 0; i < rows.length; i++) {
    const checkbox = rows[i].cells[0].getElementsByTagName('input')[0];
    if (checkbox && checkbox.checked) {
      const newRow = table.insertRow(i + 1);

      for (let j = 0; j < rows[i].cells.length; j++) {
        const newCell = newRow.insertCell(j);
        newCell.innerHTML = rows[i].cells[j].innerHTML;
      }
      newRow.cells[0].getElementsByTagName('input')[0].checked = false;

      i++;
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const phoneInput = document.querySelector('input[type="tel"]');

  Inputmask({
    mask: "+38(099) 999-99-99",
    showMaskOnHover: false
  }).mask(phoneInput);
});
