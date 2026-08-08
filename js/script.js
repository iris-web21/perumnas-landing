document.addEventListener('DOMContentLoaded', function() {

    // ===== MOBILE MENU =====
    const menuButton = document.querySelector('.menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeButton = document.querySelector('.mobile-menu__close');
    const overlay = document.querySelector('.mobile-menu__overlay');

    function openMenu() {
        mobileMenu.classList.add('is-open');
        menuButton.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', openMenu);
        closeButton.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
                closeMenu();
            }
        });
    }

    // ===== SEARCH FORM =====
    const searchForm = document.querySelector('.mobile-menu__search');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('.mobile-menu__search-input');
            const query = input.value.trim();
            if (query) {
                alert('Вы искали: ' + query);
            } else {
                alert('Введите запрос для поиска.');
            }
        });
    }

    // ===== FANCYBOX =====
    function initFancybox() {
        if (typeof Fancybox === 'undefined') {
            console.warn('Fancybox не загружен. Проверьте подключение библиотеки.');
            return;
        }
        Fancybox.bind('[data-fancybox="gallery"]', {
            infinite: true,
            Thumbs: false,
            Toolbar: { display: ['close'] },
            type: 'image',
        });
        Fancybox.bind('[data-fancybox="portfolio"]', {
            infinite: true,
            Thumbs: false,
            Toolbar: { display: ['close'] },
            type: 'image',
        });
    }

    // ===== SWIPER =====
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 2.5,
        spaceBetween: 20,
        speed: 1500,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: { slidesPerView: 1.2, spaceBetween: 10 },
            768: { slidesPerView: 2.2, spaceBetween: 15 },
            1024: { slidesPerView: 3.5, spaceBetween: 20 },
        },
        simulateTouch: false,
        // Убрали вызов initFancybox() внутри afterInit
    });

    // ===== ANIMATIONS ON SCROLL =====
    const sections = [
        { selector: '.features-section__inner', threshold: 0.15 },
        { selector: '.advantages-section__inner', threshold: 0.15 },
        { selector: '.portfolio-section__inner', threshold: 0.15 },
        { selector: '.faq-section__inner', threshold: 0.15 }
    ];

    sections.forEach(({ selector, threshold }) => {
        const el = document.querySelector(selector);
        if (el) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        el.classList.add('animate');
                        observer.unobserve(el);
                    }
                });
            }, { threshold });
            observer.observe(el);
        }
    });

    // ===== FAQ ACCORDION =====
    const questions = document.querySelectorAll('.faq-section__question');
    questions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.closest('.faq-section__item');
            const answer = item.querySelector('.faq-section__answer');
            const toggle = item.querySelector('.faq-section__toggle');

            if (answer.classList.contains('is-open')) {
                answer.classList.remove('is-open');
                toggle.classList.remove('is-active');
                toggle.textContent = '+';
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                document.querySelectorAll('.faq-section__answer').forEach(a => a.classList.remove('is-open'));
                document.querySelectorAll('.faq-section__toggle').forEach(t => {
                    t.classList.remove('is-active');
                    t.textContent = '+';
                    t.setAttribute('aria-expanded', 'false');
                });
                answer.classList.add('is-open');
                toggle.classList.add('is-active');
                toggle.textContent = '−';
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ===== SCROLL TO TOP =====
    const scrollBtn = document.querySelector('.scroll-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== HEADER BEHAVIOR =====
    const headerInner = document.querySelector('.header-inner');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 0) {
            headerInner.classList.add('is-scrolled');
        } else {
            headerInner.classList.remove('is-scrolled');
        }

        if (scrollY > 100) {
            if (scrollY > lastScrollY) {
                headerInner.classList.add('is-hidden');
            } else {
                headerInner.classList.remove('is-hidden');
            }
        } else {
            headerInner.classList.remove('is-hidden');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateHeader();
            });
            ticking = true;
        }
    });

    // ===== ИНИЦИАЛИЗАЦИЯ FANCYBOX (ОДИН РАЗ) =====
    initFancybox();
});