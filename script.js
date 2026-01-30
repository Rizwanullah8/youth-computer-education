// ============================================
// Dark/Light Mode Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
});

// ============================================
// Fade-in Animation on Scroll
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Intersection Observer for fade-in animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once element is visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// ============================================
// Animate Progress Bars on Scroll
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-bar');
    let animated = false;
    
    const animateProgressBars = () => {
        if (animated) return;
        
        progressBars.forEach(bar => {
            const width = bar.getAttribute('aria-valuenow');
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
        
        animated = true;
    };
    
    // Check if skills section is in view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillsObserver.observe(skillsSection);
    }
});

// ============================================
// Contact Form Validation
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Real-time validation
    nameInput.addEventListener('blur', function() {
        validateName();
    });
    
    emailInput.addEventListener('blur', function() {
        validateEmail();
    });
    
    messageInput.addEventListener('blur', function() {
        validateMessage();
    });
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            nameInput.classList.add('is-invalid');
            nameError.textContent = 'Name is required';
            return false;
        } else if (name.length < 2) {
            nameInput.classList.add('is-invalid');
            nameError.textContent = 'Name must be at least 2 characters';
            return false;
        } else {
            nameInput.classList.remove('is-invalid');
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        
        if (email === '') {
            emailInput.classList.add('is-invalid');
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(email)) {
            emailInput.classList.add('is-invalid');
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailInput.classList.remove('is-invalid');
            emailError.textContent = '';
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') {
            messageInput.classList.add('is-invalid');
            messageError.textContent = 'Message is required';
            return false;
        } else if (message.length < 10) {
            messageInput.classList.add('is-invalid');
            messageError.textContent = 'Message must be at least 10 characters';
            return false;
        } else {
            messageInput.classList.remove('is-invalid');
            messageError.textContent = '';
            return true;
        }
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Show success message
            formSuccess.classList.remove('d-none');
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.add('d-none');
            }, 5000);
            
            // In a real application, you would send the form data to a server here
            console.log('Form submitted successfully!');
            console.log('Name:', nameInput.value);
            console.log('Email:', emailInput.value);
            console.log('Message:', messageInput.value);
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
});

// ============================================
// Navbar Background on Scroll
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});

// ============================================
// Resume Download Button (Placeholder)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const downloadResume = document.getElementById('downloadResume');
    
    downloadResume.addEventListener('click', function(e) {
        e.preventDefault();
        
        // In a real application, this would download the actual resume file
        // For now, it's a placeholder that shows an alert
        alert('Resume download functionality - Replace this with your actual resume file link!');
        
        // Example: window.location.href = 'path/to/resume.pdf';
    });
});

// ============================================
// Active Navigation Link Highlighting
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Call once on load
});
