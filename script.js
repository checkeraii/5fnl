// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.feature-card, .solution-card, .pricing-card').forEach(card => {
    observer.observe(card);
});

// Add loading animation to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});

// Dynamic pricing toggle (if needed)
const pricingToggle = document.createElement('div');
pricingToggle.className = 'pricing-toggle';
pricingToggle.innerHTML = `
    <span>Monthly</span>
    <label class="switch">
        <input type="checkbox" id="pricingToggle">
        <span class="slider round"></span>
    </label>
    <span>Yearly</span>
`;

const pricingSection = document.querySelector('.pricing h2');
if (pricingSection) {
    pricingSection.after(pricingToggle);
}

// Handle pricing toggle
const toggle = document.getElementById('pricingToggle');
if (toggle) {
    toggle.addEventListener('change', function() {
        const prices = document.querySelectorAll('.price');
        prices.forEach(price => {
            const currentPrice = price.textContent;
            if (this.checked) {
                // Convert to yearly (multiply by 10 for 2 months free)
                const yearlyPrice = parseInt(currentPrice.replace(/[^0-9]/g, '')) * 10;
                price.innerHTML = `$${yearlyPrice}<span>/year</span>`;
            } else {
                // Convert back to monthly
                const monthlyPrice = parseInt(currentPrice.replace(/[^0-9]/g, '')) / 10;
                price.innerHTML = `$${monthlyPrice}<span>/month</span>`;
            }
        });
    });
} 