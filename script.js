const emailAddress = 'timenaprab@gmail.com';

// Contact Button Interaction
function contactMe() {
    window.location.href = `mailto:${emailAddress}`;
}

const navbar = document.querySelector('.navbar');
const navigationLinks = [...document.querySelectorAll('.nav-link')];
const sections = navigationLinks
    .map(link => {
        const target = link.getAttribute('href');
        return target?.startsWith('#') ? document.querySelector(target) : null;
    })
    .filter(Boolean);

// Smooth scrolling also keeps the mobile navigation from staying open.
navigationLinks.forEach(anchor => {
    anchor.addEventListener('click', event => {
        event.preventDefault();
        const target = anchor.getAttribute('href');
        const targetElement = target?.startsWith('#')
            ? document.querySelector(target)
            : null;

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        const openMenu = document.querySelector('.navbar-collapse.show');
        if (openMenu && window.bootstrap) {
            window.bootstrap.Collapse.getOrCreateInstance(openMenu).hide();
        }
    });
});

// Give visitors a quiet sense of location while they explore the CV.
if (sections.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        const visibleSection = entries
            .filter(entry => entry.isIntersecting)
            .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleSection) {
            navigationLinks.forEach(link => {
                const isCurrent = link.getAttribute('href') === `#${visibleSection.target.id}`;
                link.classList.toggle('is-current', isCurrent);
                link.toggleAttribute('aria-current', isCurrent);
            });
        }
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.25, 0.5] });

    sections.forEach(section => sectionObserver.observe(section));
}

// Add a small reading-progress cue without interrupting the content.
const progressBar = document.createElement('div');
progressBar.id = 'reading-progress';
progressBar.setAttribute('aria-hidden', 'true');
document.body.append(progressBar);

function updateScrollState() {
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollRange > 0 ? (window.scrollY / scrollRange) * 100 : 0;
    progressBar.style.width = `${progress}%`;
    navbar?.classList.toggle('scrolled', window.scrollY > 10);
}

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

// Make each project feel responsive to focus and pointer exploration.
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('is-focused'));
    card.addEventListener('mouseleave', () => card.classList.remove('is-focused'));
    card.addEventListener('focusin', () => card.classList.add('is-focused'));
    card.addEventListener('focusout', event => {
        if (!card.contains(event.relatedTarget)) {
            card.classList.remove('is-focused');
        }
    });
});

// Copying the email gives visitors a useful confirmation before the mail app opens.
document.querySelector('a[href^="mailto:"]')?.addEventListener('click', () => {
    if (!navigator.clipboard) {
        return;
    }

    navigator.clipboard.writeText(emailAddress).then(() => {
        const notice = document.createElement('div');
        notice.className = 'interaction-notice';
        notice.textContent = 'Email copied. Opening your mail app...';
        document.body.append(notice);
        window.setTimeout(() => notice.remove(), 2600);
    }).catch(() => {
        // Clipboard access can be unavailable on file:// pages.
    });
});