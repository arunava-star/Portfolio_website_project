// script.js
document.addEventListener('DOMContentLoaded', function () {
    const typewriterText = document.getElementById('typewriter-text');
    const text = typewriterText.innerText;
    typewriterText.innerText = ' '; // Clear the text initially

    let i = 0;
    const speed = 100; // Typing speed in milliseconds
    const delayBetweenLoops = 1000; // Delay before restarting (1 second)

    function typeWriter() {
        if (i < text.length) {
            typewriterText.innerText += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Reset and restart after a delay
            setTimeout(() => {
                typewriterText.innerText = '';
                i = 0;
                typeWriter();
            }, delayBetweenLoops);
        }
    }
    const textLength = text.length; // Calculate the number of characters

    // Apply the steps value dynamically
    typewriterText.style.animation = `typing 4s steps(${textLength}, end) infinite, blink-caret 0.75s step-end infinite`;


    typeWriter();
    
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    const readMoreContents = document.querySelectorAll('.read-more-content');
    // Toggle slide-up on button click
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            const card = this.closest('.card');
            card.classList.toggle('active');
        });
    });

    // Slide down on content click
    readMoreContents.forEach(content => {
        content.addEventListener('click', function () {
            const card = this.closest('.card');
            card.classList.remove('active');
        });
    });

    // Loading Animation
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);
    setTimeout(() => {
        loading.remove();
    }, 2000); // Adjust time as needed

    // Scroll-to-Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav ul li a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Form Validation
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        const name = form.querySelector('input[type="text"]');
        const email = form.querySelector('input[type="email"]');
        const phone = form.querySelector('input[type="tel"]');
        const message = form.querySelector('textarea');
        if (!name.value || !email.value || !phone.value || !message.value) {
            e.preventDefault();
            alert('Please fill out all fields.');
        }
    });
});