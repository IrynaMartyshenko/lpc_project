const modal = document.getElementById('modal-container');
const open = document.getElementById('open');
const close = document.getElementById('close');

open.onclick = function() {
  modal.style.display = 'block';
}

close.onclick = function() {
  modal.style.display = 'none';
}

function calculatePortions() {
  const guests = parseInt(document.getElementById('guests').value);
  const portionsPerPerson = parseInt(document.getElementById('portions').value);

  if (!isNaN(guests) && !isNaN(portionsPerPerson) && guests > 0 && portionsPerPerson > 0) {
    const totalPortions = guests * portionsPerPerson;
    document.getElementById('total-portions').textContent = totalPortions;
  } else {
    document.getElementById('total-portions').textContent = '0';
  }
}

document.getElementById('guests').addEventListener('blur', function () {
  const guests = document.getElementById('guests').value;
  if (guests === '' || parseInt(guests) <= 0) {
    alert('Please enter a valid positive number for guests.');
  }
});

document.getElementById('portions').addEventListener('blur', function () {
  const portions = document.getElementById('portions').value;
  if (portions === '' || parseInt(portions) <= 0) {
    alert('Please enter a valid positive number for portions.');
  }
});

document.getElementById('guests').addEventListener('input', calculatePortions);
document.getElementById('portions').addEventListener('input', calculatePortions);


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
} 

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

window.onload = function() {
  setTimeout(() => {
      const loader = document.querySelector('.loader');
      loader.style.display = 'none'; 
  }, 1000); 
};
