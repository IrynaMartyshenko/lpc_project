document.getElementById('registrationForm').addEventListener('submit', validateForm);

const nameInput = document.getElementById('nameInput');
const surnameInput = document.getElementById('surnameInput');
const birthdayInput = document.getElementById('birthdayInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const phoneInput = document.getElementById('phoneInput');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const groupInput = document.getElementById('groupInput');

nameInput.addEventListener('input', validateName);
surnameInput.addEventListener('input', validateSurname);
birthdayInput.addEventListener('input', validateBirthday);
emailInput.addEventListener('input', validateEmailField);
passwordInput.addEventListener('input', validatePassword);
phoneInput.addEventListener('input', validatePhone);
groupInput.addEventListener('input', validateGroup);
genderInputs.forEach(input => input.addEventListener('change', validateGender));

function validateForm(event) {
  event.preventDefault();
  let isValid = true;

  if (!validateName()) isValid = false;
  if (!validateSurname()) isValid = false;
  if (!validateBirthday()) isValid = false;
  if (!validateEmailField()) isValid = false;
  if (!validatePassword()) isValid = false;
  if (!validatePhone()) isValid = false;
  if (!validateGender()) isValid = false;
  if (!validateGroup()) isValid = false;

  if (isValid) {
    addRowToTable(
      nameInput.value, 
      surnameInput.value, 
      birthdayInput.value, 
      emailInput.value, 
      passwordInput.value,
      phoneInput.value,
      document.querySelector('input[name="gender"]:checked').value, 
      groupInput.value
    );
    document.getElementById('registrationForm').reset();
  }
}

function validateName() {
  const namePattern = /^[A-Za-zА-Яа-яЁё\s]+$/;
  if (!nameInput.value) {
    showError('nameError', 'Name is required');
    return false;
  } else if (!namePattern.test(nameInput.value)) {
    showError('nameError', 'Name cannot contain numbers or special characters');
    return false;
  } else {
    hideError('nameError');
    return true;
  }
}

function validateSurname() {
  const namePattern = /^[A-Za-zА-Яа-яЁё\s]+$/;
  if (!surnameInput.value) {
    showError('surnameError', 'Surname is required');
    return false;
  } else if (!namePattern.test(surnameInput.value)) {
    showError('surnameError', 'Surname cannot contain numbers or special characters');
    return false;
  } else {
    hideError('surnameError');
    return true;
  }
}

function validateBirthday() {
  if (!birthdayInput.value) {
    showError('birthdayError', 'Birthday is required');
    return false;
  } else {
    const selectedDate = new Date(birthdayInput.value);
    const minDate = new Date('1900-01-01');
    if (selectedDate > new Date()) {
      showError('birthdayError', 'Birthday cannot be in the future');
      return false;
    } else if (selectedDate < minDate) {
      showError('birthdayError', 'Birthday cannot be earlier than January 1, 1900');
      return false;
    } else {
      hideError('birthdayError');
      return true;
    }
  }
}

function validateEmailField() {
  if (!emailInput.value || !validateEmail(emailInput.value)) {
    showError('emailError', 'Valid email is required');
    return false;
  } else {
    hideError('emailError');
    return true;
  }
}

function validatePassword() {
  if (!passwordInput.value) {
    showError('passwordError', 'Password is required');
    return false;
  } else if (passwordInput.value.length < 8) {
    showError('passwordError', 'Password must be at least 8 characters long');
    return false;
  } else if (!/[a-z]/.test(passwordInput.value)) {
    showError('passwordError', 'Password must contain at least one lowercase letter');
    return false;
  } else if (!/[A-Z]/.test(passwordInput.value)) {
    showError('passwordError', 'Password must contain at least one uppercase letter');
    return false;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput.value)) {
    showError('passwordError', 'Password must contain at least one special symbol');
    return false;
  } else {
    hideError('passwordError');
    return true;
  }
}

function validatePhone() {
  if (!phoneInput.value) {
    showError('phoneError', 'Phone number is required');
    return false;
  } else {
    hideError('phoneError');
    return true;
  }
}

function validateGender() {
  const genderInput = document.querySelector('input[name="gender"]:checked');
  if (!genderInput) {
    showError('genderError', 'Please select your gender');
    return false;
  } else {
    hideError('genderError');
    return true;
  }
}

function validateGroup() {
  if (!groupInput.value) {
    showError('groupError', 'Please select a group');
    return false;
  } else {
    hideError('groupError');
    return true;
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
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
