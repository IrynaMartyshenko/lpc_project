function validateForm(event) {
  const nameInput = document.getElementById("name");
  const nameValue = nameInput.value.trim();

  // Регулярний вираз для перевірки наявності цифр та спеціальних символів
  const regex = /^[A-Za-zА-Яа-яЁё\s]+$/;

  if (nameValue === "" || !regex.test(nameValue)) {
    event.preventDefault(); // Запобігти відправці форми
    alert("Please enter a valid name (letters only, no digits or symbols).");
    nameInput.focus(); // Встановити фокус назад на поле вводу імені
  } else {
    // Тут можна додати код для відправки форми, якщо валідація пройдена
    alert("Form submitted successfully!"); // Для демонстрації
  }
}
