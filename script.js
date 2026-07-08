document.addEventListener('touchstart', function() {}, {passive: true});
document.querySelectorAll('a, button').forEach(el => {
    const addPressed = () => el.classList.add('pressed');
    const removePressed = () => el.classList.remove('pressed');
    el.addEventListener('pointerdown', addPressed, {passive: true});
    el.addEventListener('pointerup', removePressed);
    el.addEventListener('pointercancel', removePressed);
    el.addEventListener('pointerleave', removePressed);
});
document.getElementById('current-year').textContent = new Date().getFullYear();
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            if (entry.boundingClientRect.top > 0) {
                entry.target.classList.remove('active');
            }
        }
    });
}, {
    root: null,
    threshold: 0.075,
    rootMargin: "0px"
});
revealElements.forEach(el => revealObserver.observe(el));
const commonRadarOptions = {
    layout: { padding: 0 },
    scales: {
        r: {
            type: 'radialLinear',
            beginAtZero: true,
            min: 0,
            max: 100,
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            pointLabels: {
                color: 'rgba(209, 217, 224, 0.9)',
                font: { size: 12, family: "'Outfit', sans-serif" },
                padding: 5
            },
            ticks: { display: false, stepSize: 20 }
        }
    },
    plugins: { legend: { display: false } },
    maintainAspectRatio: false
};
const createRadar = (id, labels, data, color) => {
    const ctx = document.getElementById(id);
    if (!ctx) return;
    new Chart(ctx.getContext('2d'), {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: color.replace('1)', '0.2)'),
                borderColor: color,
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: color,
                borderWidth: 2
            }]
        },
        options: commonRadarOptions
    });
};
createRadar('designRadar', [['System', 'Design'], ['Level', 'Design'], 'Balancing', ['QA &', 'Testing'], 'Narrative'], [90, 70, 85, 80, 35], 'rgba(88, 166, 255, 1)');
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-GPJS0GCNQX');
const layer1 = document.querySelector('.layer-1');
const layer2 = document.querySelector('.layer-2');
const layer3 = document.querySelector('.layer-3');
let ticking = false;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
window.addEventListener('scroll', () => {
    if (window.innerWidth < 768 || prefersReducedMotion.matches) return;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            if (layer1) layer1.style.backgroundPositionY = `${scrollY * 0.15}px`;
            if (layer2) layer2.style.backgroundPositionY = `${scrollY * 0.3}px`;
            if (layer3) layer3.style.backgroundPositionY = `${scrollY * 0.5}px`;
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });
function scaleWidgets() {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.scaled-object').forEach(el => el.style.transform = '');
        return;
    }
    document.querySelectorAll('.scale-wrapper').forEach(wrapper => {
        const width = wrapper.clientWidth;
        const object = wrapper.querySelector('.scaled-object');
        if (object && width > 0) {
            object.style.transform = `scale(${width / 650})`;
        }
    });
}
window.addEventListener('resize', scaleWidgets);
window.addEventListener('DOMContentLoaded', scaleWidgets);
scaleWidgets();
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const filterActiveBg = document.querySelector('.filter-active-bg');
function updateFilterBg(btn) {
    if (!filterActiveBg || !btn) return;
    filterActiveBg.style.width = `${btn.offsetWidth}px`;
    filterActiveBg.style.height = `${btn.offsetHeight}px`;
    filterActiveBg.style.left = `${btn.offsetLeft}px`;
    filterActiveBg.style.top = `${btn.offsetTop}px`;
}
const initialActiveBtn = document.querySelector('.filter-btn.active');
if (initialActiveBtn) {
    updateFilterBg(initialActiveBtn);
    window.addEventListener('load', () => updateFilterBg(initialActiveBtn));
    window.addEventListener('resize', () => updateFilterBg(document.querySelector('.filter-btn.active')));
}
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        updateFilterBg(btn);
        const filterValue = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'flex';
                card.classList.remove('active');
                setTimeout(() => card.classList.add('active'), 50);
            } else {
                const tags = Array.from(card.querySelectorAll('.genre-tag, .engine-tag, .role-tag')).map(t => t.textContent.trim());
                if (tags.some(tag => tag.includes(filterValue))) {
                    card.style.display = 'flex';
                    card.classList.remove('active');
                    setTimeout(() => card.classList.add('active'), 50);
                } else {
                    card.style.display = 'none';
                }
            }
        });
        if (window.innerWidth <= 950) {
            const header = document.querySelector('.projects-header');
            const toggleBtn = document.querySelector('.mobile-filter-toggle');
            if (header) header.classList.remove('show-filters');
            if (toggleBtn) toggleBtn.classList.remove('active');
        }
    });
});
const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
const projectsHeader = document.querySelector('.projects-header');
if (mobileFilterToggle && projectsHeader) {
    mobileFilterToggle.addEventListener('click', () => {
        projectsHeader.classList.toggle('show-filters');
        mobileFilterToggle.classList.toggle('active');
        mobileFilterToggle.setAttribute('aria-expanded', projectsHeader.classList.contains('show-filters'));

        if (projectsHeader.classList.contains('show-filters')) {
            const activeBtn = document.querySelector('.filter-btn.active');
            if (activeBtn && filterActiveBg) {
                filterActiveBg.style.transition = 'none';

                const updateInterval = setInterval(() => updateFilterBg(activeBtn), 20);

                setTimeout(() => {
                    clearInterval(updateInterval);
                    updateFilterBg(activeBtn);
                    filterActiveBg.style.transition = '';
                }, 400);
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 950 && projectsHeader.classList.contains('show-filters')) {
            if (!projectsHeader.contains(e.target)) {
                projectsHeader.classList.remove('show-filters');
                mobileFilterToggle.classList.remove('active');
                mobileFilterToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
}
const scrollBtn = document.getElementById('scrollToTopBtn');
if (scrollBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    }, { passive: true });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
const copyEmailBtn = document.getElementById('copyEmailBtn');
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('richi.segato@gmail.com').then(() => {
            const originalHTML = copyEmailBtn.innerHTML;
            copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => {
                copyEmailBtn.innerHTML = originalHTML;
            }, 2000);
        });
    });
}