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
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px"
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
createRadar('designRadar', [['System', 'Design'], ['Level', 'Design'], 'Balancing', ['QA &', 'Testing'], 'Narrative'], [90, 70, 85, 80, 35], 'rgba(163, 113, 247, 1)');window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-GPJS0GCNQX');
const layer1 = document.querySelector('.layer-1');
const layer2 = document.querySelector('.layer-2');
const layer3 = document.querySelector('.layer-3');

let ticking = false;
window.addEventListener('scroll', () => {
    if (window.innerWidth < 768) return; // Disable on mobile for performance

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
