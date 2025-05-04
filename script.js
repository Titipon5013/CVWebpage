// Contact Button Interaction
function contactMe() {
    alert("Redirecting to email...");
    window.location.href = "mailto:titipon_tawong@cmu.ac.th";
}

// Smooth Scrolling
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// nav bar follow scrolling 
window.addEventListener('scroll', function () {
    let navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// hover on card
document.querySelectorAll('#hobby .card').forEach(card => {
    card.addEventListener('mouseover', function () {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// Animation for skills progress bar
document.addEventListener("DOMContentLoaded", function () {
    const skillsSection = document.getElementById("skills");
    const progressBars = document.querySelectorAll(".progress-bar");

    function showSkills() {
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2; 

        if (sectionPos < screenPos) {
            progressBars.forEach(bar => {
                const targetWidth = bar.getAttribute("data-width") + "%";
                bar.style.width = targetWidth;
            });
        }
    }

    window.addEventListener("scroll", showSkills);
});








