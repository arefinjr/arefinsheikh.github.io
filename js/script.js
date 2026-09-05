/* ============================================================
   Portfolio interactions — vanilla JS, no dependencies
   ============================================================ */
(function () {
    "use strict";

    /* ---------- 1. Reveal-on-scroll (IntersectionObserver) ---------- */
    const revealEls = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target); // animate once
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("visible"));
    }

    /* ---------- 2. Navbar: shadow/border on scroll ---------- */
    const navbar = document.getElementById("navbar");
    if (navbar) {
        const onScroll = () => {
            navbar.classList.toggle("scrolled", window.scrollY > 12);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    /* ---------- 3. Scroll-spy: highlight active nav link ---------- */
    const sections = ["services", "projects", "about", "contact"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);
    const navLinks = document.querySelectorAll(".nav-link");

    if (sections.length > 0 && navLinks.length > 0) {
        const spyObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navLinks.forEach((link) => {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === `#${entry.target.id}`
                            );
                        });
                    }
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        sections.forEach((sec) => spyObserver.observe(sec));
    }

    /* ---------- 4. Mobile menu ---------- */
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const iconOpen = document.getElementById("icon-open");
    const iconClose = document.getElementById("icon-close");

    if (menuBtn && mobileMenu && iconOpen && iconClose) {
        const closeMenu = () => {
            mobileMenu.classList.add("hidden");
            iconOpen.classList.remove("hidden");
            iconClose.classList.add("hidden");
            menuBtn.setAttribute("aria-expanded", "false");
        };

        menuBtn.addEventListener("click", () => {
            const isOpen = !mobileMenu.classList.contains("hidden");
            if (isOpen) {
                closeMenu();
            } else {
                mobileMenu.classList.remove("hidden");
                iconOpen.classList.add("hidden");
                iconClose.classList.remove("hidden");
                menuBtn.setAttribute("aria-expanded", "true");
            }
        });

        document.querySelectorAll(".mobile-link, #mobile-menu .btn-resume").forEach((el) => {
            el.addEventListener("click", closeMenu);
        });
    }

    /* ---------- 5. Back-to-top button ---------- */
    const toTopBtn = document.getElementById("to-top");
    if (toTopBtn) {
        toTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ---------- 6. Dynamic footer year ---------- */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ---------- 7. Static-site mailto fallback note ----------
       The contact form uses action="mailto:..." so it works with zero
       backend on GitHub Pages. To upgrade later, point the form at
       Formspree: action="https://formspree.io/f/YOUR_FORM_ID"
       method="POST" — no JS change needed.                         */
})();