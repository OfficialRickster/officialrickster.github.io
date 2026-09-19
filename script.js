document.addEventListener('touchstart', function() {}, {passive: true});
document.querySelectorAll('a, button').forEach(el => {
    const addPressed = () => el.classList.add('pressed');
    const removePressed = () => el.classList.remove('pressed');
    el.addEventListener('pointerdown', addPressed, {passive: true});
    el.addEventListener('pointerup', removePressed);
    el.addEventListener('pointercancel', removePressed);
    el.addEventListener('pointerleave', removePressed);
});
document.querySelectorAll('.about-card, .project-card, .skill-group, .quest-desc').forEach(card => {
    card.addEventListener('click', () => {}, {passive: true});
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
let designRadarChart = null;
const createRadar = (id, labels, data, color) => {
    const ctx = document.getElementById(id);
    if (!ctx) return;
    designRadarChart = new Chart(ctx.getContext('2d'), {
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
const resizeRadarChart = () => {
    if (designRadarChart) {
        designRadarChart.resize();
    }
};
window.addEventListener('resize', resizeRadarChart);
window.addEventListener('orientationchange', () => {
    setTimeout(resizeRadarChart, 100);
    setTimeout(resizeRadarChart, 300);
});
if (window.ResizeObserver) {
    const radarContainer = document.querySelector('.radar-canvas-container');
    if (radarContainer) {
        new ResizeObserver(resizeRadarChart).observe(radarContainer);
    }
}
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
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        if (layer1) layer1.style.backgroundPositionY = '';
        if (layer2) layer2.style.backgroundPositionY = '';
        if (layer3) layer3.style.backgroundPositionY = '';
    }
});
function scaleWidgets() {
    document.querySelectorAll('.scale-wrapper').forEach(wrapper => {
        const width = wrapper.clientWidth;
        const frame = wrapper.querySelector('.scaled-frame');
        if (!frame) return;
        if (width > 0 && width < 650) {
            frame.style.transform = `scale(${width / 650})`;
        } else {
            frame.style.transform = '';
        }
    });
}
window.addEventListener('resize', scaleWidgets);
window.addEventListener('orientationchange', () => {
    setTimeout(scaleWidgets, 100);
    setTimeout(scaleWidgets, 300);
});
window.addEventListener('DOMContentLoaded', scaleWidgets);
scaleWidgets();
if (window.ResizeObserver) {
    document.querySelectorAll('.scale-wrapper').forEach(wrapper => {
        new ResizeObserver(scaleWidgets).observe(wrapper);
    });
}
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const filterActiveBg = document.querySelector('.filter-active-bg');
function updateFilterBg(btn, animate = true) {
    if (!filterActiveBg || !btn) return;
    if (btn.offsetWidth === 0 && btn.offsetHeight === 0) return;
    if (!animate) {
        filterActiveBg.style.transition = 'none';
    }
    filterActiveBg.style.width = `${btn.offsetWidth}px`;
    filterActiveBg.style.height = `${btn.offsetHeight}px`;
    filterActiveBg.style.transform = `translate3d(${btn.offsetLeft}px, ${btn.offsetTop}px, 0)`;
    if (!animate) {
        void filterActiveBg.offsetHeight;
        filterActiveBg.style.transition = '';
    }
}
function refreshFilterPill() {
    const activeBtn = document.querySelector('.filter-btn.active');
    if (!activeBtn) return;
    if (window.innerWidth > 950) {
        const header = document.querySelector('.projects-header');
        const toggleBtn = document.querySelector('.mobile-filter-toggle');
        if (header && header.classList.contains('show-filters')) {
            header.classList.remove('show-filters');
        }
        if (toggleBtn && toggleBtn.classList.contains('active')) {
            toggleBtn.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    }
    requestAnimationFrame(() => {
        updateFilterBg(activeBtn, false);
    });
}
const initialActiveBtn = document.querySelector('.filter-btn.active');
if (initialActiveBtn) {
    updateFilterBg(initialActiveBtn, false);
    window.addEventListener('load', () => updateFilterBg(initialActiveBtn, false));
    window.addEventListener('resize', refreshFilterPill);
    window.addEventListener('orientationchange', () => {
        setTimeout(refreshFilterPill, 100);
        setTimeout(refreshFilterPill, 300);
    });
}
if (window.ResizeObserver) {
    const filterContainer = document.querySelector('.project-filters');
    if (filterContainer) {
        new ResizeObserver(() => {
            requestAnimationFrame(() => {
                const activeBtn = document.querySelector('.filter-btn.active');
                if (activeBtn) updateFilterBg(activeBtn, false);
            });
        }).observe(filterContainer);
    }
}
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;

        filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        updateFilterBg(btn, true);

        const filterValue = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            const isMatch = (filterValue === 'all') || (() => {
                const tags = Array.from(card.querySelectorAll('.genre-tag, .engine-tag, .role-tag')).map(t => t.textContent.trim());
                return tags.some(tag => tag.includes(filterValue));
            })();

            const isCurrentlyVisible = card.style.display !== 'none';

            if (isMatch) {
                if (!isCurrentlyVisible) {
                    card.style.display = 'flex';
                    card.classList.remove('active');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.classList.add('active');
                        });
                    });
                }
            } else {
                card.style.display = 'none';
                card.classList.remove('active');
            }
        });
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
                requestAnimationFrame(() => updateFilterBg(activeBtn, false));
                setTimeout(() => updateFilterBg(activeBtn, false), 50);
                setTimeout(() => updateFilterBg(activeBtn, false), 200);
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
    const handleScroll = () => {
        const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
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