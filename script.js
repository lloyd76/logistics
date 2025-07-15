document.addEventListener('DOMContentLoaded', function() {
    // Loading Animation
    const loader = document.querySelector('.loader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            loader.addEventListener('transitionend', function() {
                document.body.removeChild(loader);
            });
        }, 1500); // Longer loading for demo
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Testimonial Slider
    const slider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        updateSlider();
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        updateSlider();
    });

    // Auto-rotate testimonials
    let sliderInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        updateSlider();
    }, 5000);
    
    // Pause auto-rotation on hover
    slider.addEventListener('mouseenter', function() {
        clearInterval(sliderInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        sliderInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            updateSlider();
        }, 5000);
    });

    // Initialize ScrollReveal with modern config
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '40px',
        duration: 1000,
        delay: 200,
        reset: true,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        opacity: 0,
        scale: 0.9
    });
    
    // Custom reveal animations
    scrollReveal.reveal('.service-card, .info-card, .testimonial-card', { 
        interval: 200,
        origin: 'bottom',
        scale: 0.95
    });
    
    scrollReveal.reveal('.about-image, .tracking-image', {
        origin: 'left',
        distance: '60px'
    });
    
    scrollReveal.reveal('.about-content, .tracking-content', {
        origin: 'right',
        distance: '60px'
    });

    scrollReveal.reveal('.section-header', {
        origin: 'top',
        distance: '60px'
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create a cool submission effect
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || 'Submit';
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }
            
            this.reset();
        });
    });

    // Save original button text
    document.querySelectorAll('form button[type="submit"]').forEach(btn => {
        btn.setAttribute('data-original-text', btn.textContent);
    });

    // Animate tracking steps (demo only)
    const steps = document.querySelectorAll('.step');
    let activeStep = 0;
    
    function animateTracking() {
        steps.forEach(step => step.classList.remove('active'));
        
        if (activeStep < steps.length) {
            steps[activeStep].classList.add('active');
            activeStep++;
        } else {
            activeStep = 0;
        }
        
        setTimeout(animateTracking, 1500);
    }
    
    // Start the animation after a delay
    setTimeout(animateTracking, 1000);

    // Dynamic lighting effect interaction
    document.addEventListener('mousemove', function(e) {
        const lightCircles = document.querySelectorAll('.light-circle');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        lightCircles.forEach((circle, index) => {
            // Calculate new position based on mouse position with different intensities
            const moveX = (mouseX - 0.5) * 100 * (index + 1) * 0.3;
            const moveY = (mouseY - 0.5) * 100 * (index + 1) * 0.3;
            
            circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Floating elements animation enhancement
    const floatingElements = document.querySelectorAll('.floating, .floating-slow');
    
    floatingElements.forEach(el => {
        // Add slight rotation to floating elements
        const duration = el.classList.contains('floating-slow') ? 15 : 10;
        el.style.setProperty('--float-duration', `${duration}s`);
        
        // Add mouse parallax effect
        el.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            this.style.transform = `translateY(var(--float-y)) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(var(--float-y))';
        });
    });
});
