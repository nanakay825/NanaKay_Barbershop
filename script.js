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

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const service = document.getElementById('service').value;
    const barber = document.getElementById('barber').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    // Format date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Show confirmation message
    alert(`Thank you, ${name}! Your appointment for ${service} with ${barber} on ${formattedDate} at ${time} has been booked. We'll contact you shortly to confirm.`);
    
    // Reset form
    bookingForm.reset();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Set minimum date for booking to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('date').min = today;

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// --- PAGE TURN GALLERY SLIDESHOW ---
document.addEventListener("DOMContentLoaded", () => {
    const flipContainers = document.querySelectorAll('.flip-container');

    flipContainers.forEach(container => {
        const imagesString = container.getAttribute('data-images');
        if (!imagesString) return; 

        const images = imagesString.split(',').map(img => img.trim());
        let currentIndex = 0;
        const imgElement = container.querySelector('.flip-image');

        if (images.length > 1) {
            setInterval(() => {
                // 1. Turn the page (flip away to the left)
                imgElement.classList.add('is-turning');

                // 2. Wait for the page to "leave" (300ms = half of the 0.6s CSS transition)
                setTimeout(() => {
                    // Change the image while the page is technically invisible
                    currentIndex = (currentIndex + 1) % images.length;
                    imgElement.src = images[currentIndex];
                    
                    // 3. Instantly snap the page to the right side so it can turn back in
                    imgElement.style.transition = 'none'; 
                    imgElement.style.transform = 'rotateY(100deg)';
                    imgElement.style.opacity = '0';

                    // 4. Turn the page back to facing forward
                    setTimeout(() => {
                        imgElement.style.transition = 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out';
                        imgElement.classList.remove('is-turning');
                        imgElement.style.transform = 'rotateY(0deg)';
                        imgElement.style.opacity = '1';
                    }, 50); // Short pause to let the browser catch up
                    
                }, 300); 

            }, 4000); // Changes every 4 seconds
        }
    });
});