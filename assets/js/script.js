// Vanilla JS

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Tooltip Logic (navbar only now)
    // ==========================================
    setTimeout(() => {
        const tNavbar = document.getElementById('tooltip-navbar');
        if (tNavbar) { tNavbar.classList.add('is-visible'); }
    }, 1000);

    // ==========================================
    // Draggable Navbar Logic
    // ==========================================
    const navbar = document.getElementById('draggable-navbar');
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    function initPos() {
        if (!navbar) return;
        const rect = navbar.getBoundingClientRect();
        navbar.style.left = rect.left + 'px';
        navbar.style.top = rect.top + 'px';
        navbar.style.bottom = 'auto';
        navbar.style.transform = 'none';
    }

    if (navbar) {
        navbar.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.tour-tooltip')) return;
            isDragging = true;
            initPos();
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseFloat(navbar.style.left);
            startTop = parseFloat(navbar.style.top);
            navbar.style.cursor = 'grabbing';
            navbar.style.transition = 'none';
            e.preventDefault();
        });

        navbar.addEventListener('touchstart', (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.tour-tooltip')) return;
            initPos();
            const t = e.touches[0];
            startX = t.clientX;
            startY = t.clientY;
            startLeft = parseFloat(navbar.style.left);
            startTop = parseFloat(navbar.style.top);
            isDragging = true;
        }, { passive: true });
    }

    document.addEventListener('mousemove', (e) => {
        if (!isDragging || !navbar) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        let newLeft = startLeft + dx;
        let newTop = startTop + dy;
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - navbar.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - navbar.offsetHeight));
        navbar.style.left = newLeft + 'px';
        navbar.style.top = newTop + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        if (navbar) navbar.style.cursor = 'grab';
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging || !navbar) return;
        const t = e.touches[0];
        let newLeft = startLeft + (t.clientX - startX);
        let newTop = startTop + (t.clientY - startY);
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - navbar.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - navbar.offsetHeight));
        navbar.style.left = newLeft + 'px';
        navbar.style.top = newTop + 'px';
    }, { passive: true });

    document.addEventListener('touchend', () => { isDragging = false; });

    // ==========================================
    // Contact Modal Logic
    // ==========================================
    const closeBtn = document.getElementById('close-contact-btn');
    const modal = document.getElementById('contact-modal');

    function openModal() {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Bottom navbar contact button
    const openBtn = document.getElementById('open-contact-btn');
    if (openBtn) openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Header contact buttons
    const headerContactBtn = document.getElementById('open-contact-btn-header');
    const headerContactCta = document.getElementById('open-contact-btn-header-cta');
    if (headerContactBtn) headerContactBtn.addEventListener('click', openModal);
    if (headerContactCta) headerContactCta.addEventListener('click', openModal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // ==========================================
    // Project Details Popup Logic
    // ==========================================
    const projectPopup = document.getElementById('project-popup');
    const projectPopupContent = document.getElementById('project-popup-content');
    const closeProjectPopupBtn = document.getElementById('close-project-popup');

    const popupTitle = document.getElementById('popup-title');
    const popupDesc = document.getElementById('popup-desc');
    const popupTag = document.getElementById('popup-tag');
    const popupLive = document.getElementById('popup-link-live');
    const popupGithub = document.getElementById('popup-link-github');

    // Carousel Elements
    const popupImage = document.getElementById('popup-image');
    const prevImgBtn = document.getElementById('prev-project-img');
    const nextImgBtn = document.getElementById('next-project-img');
    const carouselIndicators = document.getElementById('carousel-indicators');

    let currentImages = [];
    let currentImgIndex = 0;

    const projectData = {
        1: {
            title: "Portfolio Website",
            tag: "HTML / CSS / JS",
            desc: "A modern, animated personal portfolio featuring a glassmorphic hero section, draggable navigation bar, full-page animated modals, and CSS marquee banners. Built entirely with Vanilla JS, HTML, and custom CSS without relying on heavy frameworks.",
            live: "#",
            github: "https://github.com/",
            images: ["assets/images/project1-1.png", "assets/images/project1-2.png"]
        },
        2: {
            title: "E-Commerce Dashboard",
            tag: "React JS",
            desc: "A fully responsive admin dashboard designed for managing products, tracking orders, and viewing analytics. Features real-time data visualization through interactive charts, intuitive UI components, and state management using React Context API.",
            live: "#",
            github: "https://github.com/",
            images: ["assets/images/project2-1.png"]
        },
        3: {
            title: "UI Component Library",
            tag: "Tailwind CSS",
            desc: "A reusable, open-source collection of highly accessible and responsive UI components. Includes advanced form elements, dynamic tables, interactive modals, and animated buttons, all meticulously styled with Tailwind CSS utility classes.",
            live: "#",
            github: "https://github.com/",
            images: ["assets/images/project3-1.png"]
        }
    };

    function updateCarousel() {
        if (!currentImages.length) return;

        popupImage.style.opacity = '0';
        setTimeout(() => {
            popupImage.src = currentImages[currentImgIndex];
            popupImage.style.opacity = '1';
        }, 300);

        const dots = carouselIndicators.querySelectorAll('span');
        dots.forEach((dot, idx) => {
            if (idx === currentImgIndex) {
                dot.classList.add('bg-white', 'w-4');
                dot.classList.remove('bg-white/50', 'w-1.5');
            } else {
                dot.classList.remove('bg-white', 'w-4');
                dot.classList.add('bg-white/50', 'w-1.5');
            }
        });

        if (currentImages.length <= 1) {
            prevImgBtn.classList.add('hidden');
            nextImgBtn.classList.add('hidden');
            carouselIndicators.classList.add('hidden');
        } else {
            prevImgBtn.classList.remove('hidden');
            nextImgBtn.classList.remove('hidden');
            carouselIndicators.classList.remove('hidden');
        }
    }

    function nextImage() {
        currentImgIndex = (currentImgIndex + 1) % currentImages.length;
        updateCarousel();
    }

    function prevImage() {
        currentImgIndex = (currentImgIndex - 1 + currentImages.length) % currentImages.length;
        updateCarousel();
    }

    nextImgBtn.addEventListener('click', nextImage);
    prevImgBtn.addEventListener('click', prevImage);

    window.openProjectPopup = function (id) {
        const data = projectData[id];
        if (!data) return;

        popupTitle.textContent = data.title;
        popupTag.textContent = data.tag;
        popupDesc.textContent = data.desc;
        popupLive.href = data.live;
        popupGithub.href = data.github;

        currentImages = data.images || [];
        currentImgIndex = 0;

        carouselIndicators.innerHTML = '';
        currentImages.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.className = 'h-1.5 rounded-full transition-all duration-300 pointer-events-none ' +
                (idx === 0 ? 'bg-white w-4' : 'bg-white/50 w-1.5');
            carouselIndicators.appendChild(dot);
        });

        updateCarousel();

        projectPopup.classList.remove('opacity-0', 'pointer-events-none');
        projectPopupContent.classList.remove('scale-95');
        projectPopupContent.classList.add('scale-100');

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };

    function closeProjectPopup() {
        projectPopup.classList.add('opacity-0', 'pointer-events-none');
        projectPopupContent.classList.remove('scale-100');
        projectPopupContent.classList.add('scale-95');
    }

    closeProjectPopupBtn.addEventListener('click', closeProjectPopup);

    projectPopup.addEventListener('click', (e) => {
        if (e.target === projectPopup) closeProjectPopup();
    });

    // ==========================================
    // About Modal Logic
    // ==========================================
    const openAboutBtn = document.getElementById('open-about-btn');
    const closeAboutBtn = document.getElementById('close-about-btn');
    const aboutModal = document.getElementById('about-modal');

    function openAboutModal() {
        aboutModal.classList.add('is-open');
        aboutModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeAboutModal() {
        aboutModal.classList.remove('is-open');
        aboutModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (openAboutBtn) openAboutBtn.addEventListener('click', openAboutModal);
    closeAboutBtn.addEventListener('click', closeAboutModal);

    // Header about button
    const headerAboutBtn = document.getElementById('open-about-btn-header');
    if (headerAboutBtn) headerAboutBtn.addEventListener('click', openAboutModal);

    aboutModal.addEventListener('click', (e) => {
        if (e.target === aboutModal) closeAboutModal();
    });

    // ==========================================
    // Work Modal Logic
    // ==========================================
    const openWorkBtn = document.getElementById('open-work-btn');
    const closeWorkBtn = document.getElementById('close-work-btn');
    const workModal = document.getElementById('work-modal');

    function openWorkModal() {
        workModal.classList.add('is-open');
        workModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeWorkModal() {
        workModal.classList.remove('is-open');
        workModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (openWorkBtn) openWorkBtn.addEventListener('click', openWorkModal);
    closeWorkBtn.addEventListener('click', closeWorkModal);

    // Header work button
    const headerWorkBtn = document.getElementById('open-work-btn-header');
    if (headerWorkBtn) headerWorkBtn.addEventListener('click', openWorkModal);

    // Hero discover button opens work modal
    const heroDiscoverBtn = document.getElementById('hero-discover-btn');
    const heroArrowBtn = document.getElementById('hero-arrow-btn');
    if (heroDiscoverBtn) heroDiscoverBtn.addEventListener('click', (e) => { e.preventDefault(); openWorkModal(); });
    if (heroArrowBtn) heroArrowBtn.addEventListener('click', openWorkModal);

    workModal.addEventListener('click', (e) => {
        if (e.target === workModal) closeWorkModal();
    });

    // Escape closes all modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeModal(); closeAboutModal(); closeWorkModal(); closeProjectPopup(); }
    });

    // Initialize Lucide Icons on page load
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});