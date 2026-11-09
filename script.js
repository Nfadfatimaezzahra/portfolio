
document.addEventListener("DOMContentLoaded", () => {

    /* =================================
       1. MOBILE NAVIGATION
    ================================= */

    const header = document.querySelector("header");
    const nav = document.querySelector("#main-navigation");

    if (header && nav) {

        const menuButton = document.createElement("button");

        menuButton.type = "button";
        menuButton.className = "menu-toggle";
        menuButton.textContent = "☰";

        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-controls", "main-navigation");

        header.prepend(menuButton);

        function closeMenu() {
            nav.classList.remove("active");
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation");
        }

        menuButton.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("active");

            menuButton.textContent = isOpen ? "✕" : "☰";

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {
                closeMenu();
            }

        });

    }


    /* =================================
       2. TYPING ANIMATION
    ================================= */

    const heroTitle = document.querySelector(".hero h2");

    if (
        heroTitle &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        const titles = [
            "English Literature Graduate",
            "Web Development Student",
            "Future Front-End Developer"
        ];

        let titleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentTitle = titles[titleIndex];

            if (!deleting) {

                characterIndex++;

                heroTitle.textContent =
                    currentTitle.substring(0, characterIndex);

                if (characterIndex === currentTitle.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1800);

                    return;
                }

                setTimeout(typeEffect, 90);

            } else {

                characterIndex--;

                heroTitle.textContent =
                    currentTitle.substring(0, characterIndex);

                if (characterIndex === 0) {

                    deleting = false;

                    titleIndex =
                        (titleIndex + 1) % titles.length;

                    setTimeout(typeEffect, 400);

                    return;
                }

                setTimeout(typeEffect, 45);

            }

        }

        typeEffect();

    }


    /* =================================
       3. SCROLL REVEAL ANIMATION
    ================================= */

    const revealElements = document.querySelectorAll(
        ".section, .content-card, .skill-card, .project-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =================================
       4. DYNAMIC COPYRIGHT YEAR
    ================================= */

    const footerText = document.querySelector("footer p");

    if (footerText) {

        footerText.textContent =
            `© ${new Date().getFullYear()} Fatimaezzzahra N'fad. All Rights Reserved.`;

    }


    /* =================================
       5. BACK TO TOP BUTTON
    ================================= */

    const topButton = document.createElement("button");

    topButton.type = "button";
    topButton.textContent = "↑";
    topButton.className = "back-to-top";

    topButton.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(topButton);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    }, { passive: true });


    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});
