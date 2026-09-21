(() => {
document.addEventListener('touchstart', () => {}, { passive: true });
document.addEventListener('pointerdown', (e) => {
    const el = e.target?.closest?.('a, button');
    if (el) el.classList.add('pressed');
}, { passive: true });
const removePressed = (e) => {
    const el = e.target?.closest?.('a, button');
    if (el) el.classList.remove('pressed');
};
document.addEventListener('pointerup', removePressed, { passive: true });
document.addEventListener('pointercancel', removePressed, { passive: true });
document.addEventListener('pointerleave', removePressed, { passive: true });
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('active');
        }
    });
}, { root: null, threshold: 0.075, rootMargin: '0px' });
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
    const initChart = () => {
        if (typeof Chart === 'undefined') return;
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
    if (typeof Chart !== 'undefined') {
        initChart();
    } else {
        window.addEventListener('load', initChart, { once: true });
    }
};
createRadar('designRadar', [['System', 'Design'], ['Level', 'Design'], 'Balancing', ['QA &', 'Testing'], 'Narrative'], [90, 70, 85, 80, 35], 'rgba(88, 166, 255, 1)');
const resizeRadarChart = () => {
    if (designRadarChart) designRadarChart.resize();
};
if (window.ResizeObserver) {
    const radarContainer = document.querySelector('.radar-canvas-container');
    if (radarContainer) new ResizeObserver(resizeRadarChart).observe(radarContainer);
} else {
    window.addEventListener('resize', resizeRadarChart, { passive: true });
}
window.dataLayer = window.dataLayer || [];
window.gtag = function(){ window.dataLayer.push(arguments); };
window.gtag('js', new Date());
window.gtag('config', 'G-GPJS0GCNQX');
const layer1 = document.querySelector('.layer-1');
const layer2 = document.querySelector('.layer-2');
const layer3 = document.querySelector('.layer-3');
if (layer1 || layer2 || layer3) {
    let parallaxTicking = false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    window.addEventListener('scroll', () => {
        if (window.innerWidth < 768 || prefersReducedMotion.matches) return;
        if (!parallaxTicking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                if (layer1) layer1.style.backgroundPositionY = `${scrollY * 0.15}px`;
                if (layer2) layer2.style.backgroundPositionY = `${scrollY * 0.3}px`;
                if (layer3) layer3.style.backgroundPositionY = `${scrollY * 0.5}px`;
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    }, { passive: true });
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            if (layer1) layer1.style.backgroundPositionY = '';
            if (layer2) layer2.style.backgroundPositionY = '';
            if (layer3) layer3.style.backgroundPositionY = '';
        }
    }, { passive: true });
}
const scaleItems = Array.from(document.querySelectorAll('.scale-wrapper')).map(wrapper => ({
    wrapper,
    frame: wrapper.querySelector('.scaled-frame, .scaled-object')
})).filter(item => item.frame);
const scaleWidgets = () => {
    scaleItems.forEach(({ wrapper, frame }) => {
        const width = wrapper.clientWidth;
        frame.style.transform = (width > 0 && width < 650) ? `scale(${width / 650})` : '';
    });
};
scaleWidgets();
if (window.ResizeObserver) {
    const ro = new ResizeObserver(scaleWidgets);
    scaleItems.forEach(({ wrapper }) => ro.observe(wrapper));
} else {
    window.addEventListener('resize', scaleWidgets, { passive: true });
}
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = Array.from(document.querySelectorAll('.project-card')).map(card => ({
    el: card,
    tags: Array.from(card.querySelectorAll('.genre-tag, .engine-tag, .role-tag')).map(t => t.textContent.trim())
}));
const filterActiveBg = document.querySelector('.filter-active-bg');
const updateFilterBg = (btn, animate = true) => {
    if (!filterActiveBg || !btn) return;
    if (btn.offsetWidth === 0 && btn.offsetHeight === 0) return;
    if (!animate) filterActiveBg.style.transition = 'none';
    filterActiveBg.style.width = `${btn.offsetWidth}px`;
    filterActiveBg.style.height = `${btn.offsetHeight}px`;
    filterActiveBg.style.transform = `translate3d(${btn.offsetLeft}px, ${btn.offsetTop}px, 0)`;
    if (!animate) {
        requestAnimationFrame(() => {
            filterActiveBg.style.transition = '';
        });
    }
};
const refreshFilterPill = () => {
    const activeBtn = document.querySelector('.filter-btn.active');
    if (!activeBtn) return;
    if (window.innerWidth > 950) {
        const header = document.querySelector('.projects-header');
        const toggleBtn = document.querySelector('.mobile-filter-toggle');
        if (header && header.classList.contains('show-filters')) header.classList.remove('show-filters');
        if (toggleBtn && toggleBtn.classList.contains('active')) {
            toggleBtn.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    }
    requestAnimationFrame(() => updateFilterBg(activeBtn, false));
};
const initialActiveBtn = document.querySelector('.filter-btn.active');
if (initialActiveBtn) {
    updateFilterBg(initialActiveBtn, false);
    window.addEventListener('load', () => updateFilterBg(initialActiveBtn, false));
}
if (window.ResizeObserver) {
    const filterContainer = document.querySelector('.project-filters');
    if (filterContainer) {
        new ResizeObserver(() => {
            const activeBtn = document.querySelector('.filter-btn.active');
            if (activeBtn) requestAnimationFrame(() => updateFilterBg(activeBtn, false));
        }).observe(filterContainer);
    }
} else {
    window.addEventListener('resize', refreshFilterPill, { passive: true });
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
        projectCards.forEach(({ el, tags }) => {
            const isMatch = (filterValue === 'all') || tags.some(tag => tag.includes(filterValue));
            const isCurrentlyVisible = el.style.display !== 'none';
            if (isMatch) {
                if (!isCurrentlyVisible) {
                    el.style.display = 'flex';
                    el.classList.remove('active');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            el.classList.add('active');
                        });
                    });
                }
            } else {
                el.style.display = 'none';
                el.classList.remove('active');
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
    let scrollTicking = false;
    const handleScroll = () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
                scrollBtn.classList.toggle('show', scrollY > 300);
                scrollTicking = false;
            });
            scrollTicking = true;
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
        }).catch(() => {});
    });
}
})();