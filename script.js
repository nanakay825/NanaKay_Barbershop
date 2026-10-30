// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = bookingForm.querySelector('.submit-btn');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  
  const formData = new FormData(bookingForm);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: json
    });
    const result = await response.json();
    if (result.success) {
      alert('Thank you! Your appointment has been booked. We hope to welcome you soon!');
      bookingForm.reset();
    } else {
      alert('Failed to send. Please WhatsApp us.');
    }
  } catch (error) {
    alert('Error sending. Check internet.');
  } finally {
    btn.textContent = 'BOOK APPOINTMENT';
    btn.disabled = false;
  }
});