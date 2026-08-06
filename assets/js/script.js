// Vanilla JS + GSAP

document.addEventListener('DOMContentLoaded', () => {

    const hasGsap = typeof gsap !== 'undefined';

    // ==========================================
    // Preloader Logic with GSAP
    // ==========================================
    const preloader = document.getElementById('preloader');
    const preloaderCounter = document.getElementById('preloader-counter');
    const preloaderBar = document.getElementById('preloader-bar');
    const preloaderLogoFill = document.getElementById('preloader-logo-fill-wrap');

    if (preloader) {
        document.body.style.overflow = 'hidden';

        let countObj = { val: 0 };
        const duration = 1.8;

        if (hasGsap) {
            // Animate initial entrance of preloader content
            gsap.fromTo('.preloader-content',
                { opacity: 0, scale: 0.9, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            );

            // Counter animation
            gsap.to(countObj, {
                val: 100,
                duration: duration,
                ease: 'power2.inOut',
                onUpdate: () => {
                    const currentVal = Math.round(countObj.val);
                    if (preloaderCounter) preloaderCounter.textContent = currentVal < 10 ? `0${currentVal}` : `${currentVal}`;
                    if (preloaderBar) preloaderBar.style.width = `${currentVal}%`;
                    if (preloaderLogoFill) preloaderLogoFill.style.width = `${currentVal}%`;
                },
                onComplete: () => {
                    // Master timeline for preloader exit & hero section reveal
                    const tl = gsap.timeline({
                        onComplete: () => {
                            if (preloader) preloader.style.display = 'none';
                            document.body.style.overflow = '';
                        }
                    });

                    tl.to('.preloader-content', {
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.35,
                        ease: 'power2.in'
                    })
                        .to(preloader, {
                            opacity: 0,
                            duration: 0.6,
                            ease: 'power2.out'
                        }, '-=0.15')
                        .fromTo(['.brand', '.navbar'],
                            { opacity: 0, y: -15 },
                            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', clearProps: 'transform' },
                            '-=0.5'
                        )
                        .fromTo('.hero-title',
                            { opacity: 0, y: 30, scale: 0.98 },
                            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power4.out' },
                            '-=0.45'
                        )
                        .fromTo('.hero-subtitle',
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                            '-=0.4'
                        )
                        .fromTo('.hero-bottom-left, .hero-btn-container',
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
                            '-=0.4'
                        );
                }
            });
        } else {
            let val = 0;
            const interval = setInterval(() => {
                val += 5;
                if (preloaderCounter) preloaderCounter.textContent = `${val}%`;
                if (preloaderBar) preloaderBar.style.width = `${val}%`;
                if (preloaderLogoFill) preloaderLogoFill.style.width = `${val}%`;
                if (val >= 100) {
                    clearInterval(interval);
                    preloader.style.display = 'none';
                    document.body.style.overflow = '';
                }
            }, 50);
        }
    }

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
    let contactTimeline = null;

    function openModal() {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (hasGsap) {
            if (contactTimeline) contactTimeline.kill();
            contactTimeline = gsap.timeline();
            contactTimeline
                .fromTo(modal,
                    { opacity: 0, y: '100%', scale: 0.96 },
                    { opacity: 1, y: '0%', scale: 1, duration: 0.55, ease: 'power4.out' }
                )
                .fromTo(modal.querySelectorAll('.contact-title, .contact-email, .contact-subtext, .contact-links .navbar-btn-wrap'),
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out' },
                    '-=0.3'
                );
        }
    }

    function closeModal() {
        if (hasGsap) {
            if (contactTimeline) contactTimeline.kill();
            contactTimeline = gsap.timeline({
                onComplete: () => {
                    modal.classList.remove('is-open');
                    modal.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                }
            });
            contactTimeline
                .to(modal.querySelectorAll('.contact-title, .contact-email, .contact-subtext, .contact-links .navbar-btn-wrap'),
                    { opacity: 0, y: 20, duration: 0.2, stagger: 0.03, ease: 'power2.in' }
                )
                .to(modal,
                    { opacity: 0, y: '100%', scale: 0.96, duration: 0.45, ease: 'power3.in' },
                    '-=0.1'
                );
        } else {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
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
    let popupTimeline = null;

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

        if (hasGsap) {
            if (popupTimeline) popupTimeline.kill();
            projectPopup.classList.remove('opacity-0', 'pointer-events-none');
            popupTimeline = gsap.timeline();
            popupTimeline
                .fromTo(projectPopup,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, ease: 'power2.out' }
                )
                .fromTo(projectPopupContent,
                    { scale: 0.8, opacity: 0, y: 25 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' },
                    '-=0.15'
                );
        } else {
            projectPopup.classList.remove('opacity-0', 'pointer-events-none');
            projectPopupContent.classList.remove('scale-95');
            projectPopupContent.classList.add('scale-100');
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };

    function closeProjectPopup() {
        if (hasGsap) {
            if (popupTimeline) popupTimeline.kill();
            popupTimeline = gsap.timeline({
                onComplete: () => {
                    projectPopup.classList.add('opacity-0', 'pointer-events-none');
                }
            });
            popupTimeline
                .to(projectPopupContent,
                    { scale: 0.85, opacity: 0, y: 15, duration: 0.25, ease: 'power2.in' }
                )
                .to(projectPopup,
                    { opacity: 0, duration: 0.2, ease: 'power2.in' },
                    '-=0.1'
                );
        } else {
            projectPopup.classList.add('opacity-0', 'pointer-events-none');
            projectPopupContent.classList.remove('scale-100');
            projectPopupContent.classList.add('scale-95');
        }
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
    let aboutTimeline = null;

    function openAboutModal() {
        if (hasGsap) {
            if (aboutTimeline) aboutTimeline.kill();
            const aboutElements = aboutModal.querySelectorAll('.about-title, .about-para, .about-section-heading, .about-services, .about-tags span');
            gsap.set(aboutModal, { opacity: 0, y: '100%', scale: 0.96 });
            gsap.set(aboutElements, { opacity: 0, y: 25 });

            aboutModal.classList.add('is-open');
            aboutModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            aboutTimeline = gsap.timeline();
            aboutTimeline
                .to(aboutModal,
                    { opacity: 1, y: '0%', scale: 1, duration: 0.5, ease: 'power4.out' }
                )
                .to(aboutElements,
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power3.out', clearProps: 'transform' },
                    '-=0.3'
                );
        } else {
            aboutModal.classList.add('is-open');
            aboutModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeAboutModal() {
        if (hasGsap) {
            if (aboutTimeline) aboutTimeline.kill();
            aboutTimeline = gsap.timeline({
                onComplete: () => {
                    aboutModal.classList.remove('is-open');
                    aboutModal.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                }
            });
            aboutTimeline
                .to(aboutModal.querySelectorAll('.about-title, .about-para, .about-section-heading, .about-services, .about-tags span'),
                    { opacity: 0, y: 20, duration: 0.2, stagger: 0.02, ease: 'power2.in' }
                )
                .to(aboutModal,
                    { opacity: 0, y: '100%', scale: 0.96, duration: 0.45, ease: 'power3.in' },
                    '-=0.1'
                );
        } else {
            aboutModal.classList.remove('is-open');
            aboutModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
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
    let workTimeline = null;

    function openWorkModal() {
        if (hasGsap) {
            if (workTimeline) workTimeline.kill();
            const workElements = workModal.querySelectorAll('.work-title, .work-item, .work-more');
            gsap.set(workModal, { opacity: 0, y: '100%', scale: 0.96 });
            gsap.set(workElements, { opacity: 0, y: 25 });

            workModal.classList.add('is-open');
            workModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            workTimeline = gsap.timeline();
            workTimeline
                .to(workModal,
                    { opacity: 1, y: '0%', scale: 1, duration: 0.5, ease: 'power4.out' }
                )
                .to(workElements,
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out', clearProps: 'transform' },
                    '-=0.3'
                );
        } else {
            workModal.classList.add('is-open');
            workModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeWorkModal() {
        if (hasGsap) {
            if (workTimeline) workTimeline.kill();
            workTimeline = gsap.timeline({
                onComplete: () => {
                    workModal.classList.remove('is-open');
                    workModal.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                }
            });
            workTimeline
                .to(workModal.querySelectorAll('.work-title, .work-item, .work-more'),
                    { opacity: 0, y: 20, duration: 0.2, stagger: 0.04, ease: 'power2.in' }
                )
                .to(workModal,
                    { opacity: 0, y: '100%', scale: 0.96, duration: 0.45, ease: 'power3.in' },
                    '-=0.1'
                );
        } else {
            workModal.classList.remove('is-open');
            workModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
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

    // ==========================================
    // Ultra-Sleek Modern GSAP Hover System
    // ==========================================
    if (hasGsap) {
        // 1. Navbar Buttons (Letter-spacing & spring lift)
        document.querySelectorAll('.navbar ul li button:not(.work-with-us)').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    y: -3,
                    scale: 1.04,
                    letterSpacing: '0.12em',
                    color: '#ffffff',
                    duration: 0.35,
                    ease: 'power3.out',
                    overwrite: 'auto'
                });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    y: 0,
                    scale: 1,
                    letterSpacing: '0.05em',
                    color: '#111111',
                    duration: 0.35,
                    ease: 'power3.out',
                    overwrite: 'auto'
                });
            });
        });

        // 2. Work With Us CTA Button (Elastic spring & glow shadow)
        const ctaBtn = document.querySelector('.navbar ul li .work-with-us');
        if (ctaBtn) {
            ctaBtn.addEventListener('mouseenter', () => {
                gsap.to(ctaBtn, {
                    y: -3,
                    scale: 1.05,
                    letterSpacing: '0.1em',
                    boxShadow: '0 12px 30px rgba(255, 69, 0, 0.5)',
                    duration: 0.4,
                    ease: 'back.out(1.7)',
                    overwrite: 'auto'
                });
            });
            ctaBtn.addEventListener('mouseleave', () => {
                gsap.to(ctaBtn, {
                    y: 0,
                    scale: 1,
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 15px rgba(255, 69, 0, 0.3)',
                    duration: 0.35,
                    ease: 'power3.out',
                    overwrite: 'auto'
                });
            });
        }

        // 3. Brand Logo Pill (Frosted spring pop)
        const brandBadge = document.querySelector('.brand');
        if (brandBadge) {
            brandBadge.addEventListener('mouseenter', () => {
                gsap.to(brandBadge, {
                    y: -3,
                    scale: 1.06,
                    boxShadow: '0 12px 35px rgba(255, 69, 0, 0.25)',
                    duration: 0.4,
                    ease: 'back.out(1.5)',
                    overwrite: 'auto'
                });
            });
            brandBadge.addEventListener('mouseleave', () => {
                gsap.to(brandBadge, {
                    y: 0,
                    scale: 1,
                    boxShadow: '0 4px 25px rgba(0, 0, 0, 0.4)',
                    duration: 0.35,
                    ease: 'power3.out',
                    overwrite: 'auto'
                });
            });
        }

        // 4. Hero Discover CTA Button (Magnetic backward skew flip)
        const heroBtn = document.getElementById('hero-discover-btn');
        if (heroBtn) {
            const mainBtn = heroBtn.querySelector('.hero-diagonal-main');
            const mainSpan = heroBtn.querySelector('.hero-diagonal-main span');
            const arrowBtn = heroBtn.querySelector('.hero-diagonal-arrow');
            const arrowSpan = heroBtn.querySelector('.hero-diagonal-arrow span');

            heroBtn.addEventListener('mouseenter', () => {
                if (mainBtn) gsap.to(mainBtn, { skewX: 15, x: -8, y: -3, scale: 1.03, duration: 0.45, ease: 'back.out(1.7)', overwrite: 'auto' });
                if (mainSpan) gsap.to(mainSpan, { skewX: -15, duration: 0.45, ease: 'back.out(1.7)', overwrite: 'auto' });
                if (arrowBtn) gsap.to(arrowBtn, { skewX: 15, x: -4, y: -3, scale: 1.05, duration: 0.45, ease: 'back.out(1.7)', overwrite: 'auto' });
                if (arrowSpan) gsap.to(arrowSpan, { skewX: -15, duration: 0.45, ease: 'back.out(1.7)', overwrite: 'auto' });
            });
            heroBtn.addEventListener('mouseleave', () => {
                if (mainBtn) gsap.to(mainBtn, { skewX: -15, x: 0, y: 0, scale: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
                if (mainSpan) gsap.to(mainSpan, { skewX: 15, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
                if (arrowBtn) gsap.to(arrowBtn, { skewX: -15, x: 0, y: 0, scale: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
                if (arrowSpan) gsap.to(arrowSpan, { skewX: 15, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
            });
        }

        // 5. Work Items (Multi-element synchronized magnetic shift)
        document.querySelectorAll('.work-item').forEach(item => {
            const num = item.querySelector('.work-num');
            const title = item.querySelector('.work-name');
            const tag = item.querySelector('.work-tag');

            item.addEventListener('mouseenter', () => {
                gsap.to(item, { x: 12, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', paddingLeft: '1rem', paddingRight: '1rem', duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
                if (num) gsap.to(num, { scale: 1.25, color: '#FF4500', duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
                if (title) gsap.to(title, { letterSpacing: '0.04em', color: '#FF4500', duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
                if (tag) gsap.to(tag, { y: -3, scale: 1.06, borderColor: '#FF4500', backgroundColor: 'rgba(255, 69, 0, 0.15)', duration: 0.3, ease: 'back.out(1.5)', overwrite: 'auto' });
            });
            item.addEventListener('mouseleave', () => {
                gsap.to(item, { x: 0, backgroundColor: 'transparent', paddingLeft: '0rem', paddingRight: '0rem', duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
                if (num) gsap.to(num, { scale: 1, color: '#FF4500', duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
                if (title) gsap.to(title, { letterSpacing: '0em', color: '#FFFFFF', duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
                if (tag) gsap.to(tag, { y: 0, scale: 1, borderColor: 'rgba(255, 255, 255, 0.15)', backgroundColor: 'rgba(255, 255, 255, 0.06)', duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
            });
        });

        // 6. Close Buttons (180° Elastic Spin)
        document.querySelectorAll('.contact-close, #close-project-popup, #close-about-btn, #close-work-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, { rotation: 180, scale: 1.25, color: '#FF4500', duration: 0.5, ease: 'back.out(2)', overwrite: 'auto' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { rotation: 0, scale: 1, color: '#FFFFFF', duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
            });
        });

        // 7. Skill Tags & Action Buttons (Elastic Magnetic Bounce)
        document.querySelectorAll('.about-tags span').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                gsap.to(tag, { y: -4, scale: 1.08, backgroundColor: 'rgba(255, 69, 0, 0.2)', borderColor: '#FF4500', boxShadow: '0 8px 25px rgba(255, 69, 0, 0.3)', duration: 0.35, ease: 'back.out(2)', overwrite: 'auto' });
            });
            tag.addEventListener('mouseleave', () => {
                gsap.to(tag, { y: 0, scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.15)', boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
            });
        });

        document.querySelectorAll('.about-resume-btn, .contact-link, .contact-email').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(el, { y: -4, scale: 1.04, boxShadow: '0 12px 30px rgba(255, 69, 0, 0.35)', duration: 0.4, ease: 'back.out(1.7)', overwrite: 'auto' });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { y: 0, scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
            });
        });
    }

    // Escape closes all modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeModal(); closeAboutModal(); closeWorkModal(); closeProjectPopup(); }
    });

    // Initialize Lucide Icons on page load
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
