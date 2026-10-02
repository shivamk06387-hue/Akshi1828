/* =========================================
   PAGE SYSTEM
========================================= */

let currentPage = 1;


/* =========================================
   INITIAL SETUP
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    createParticles();

    setupCarousel();

});


/* =========================================
   START CELEBRATION
========================================= */

function startCelebration() {

    console.log(
        "🎉 Celebration button clicked"
    );


    createCelebrationBurst();


    setTimeout(function () {

        goToPage(2);

    }, 650);

}


/* =========================================
   PAGE NAVIGATION
========================================= */

function goToPage(pageNumber) {

    const oldPage =
        document.getElementById(
            "page" + currentPage
        );


    const newPage =
        document.getElementById(
            "page" + pageNumber
        );


    if (!newPage) {

        console.error(
            "Page nahi mili:",
            pageNumber
        );

        return;

    }


    if (
        currentPage === pageNumber
    ) {

        return;

    }


    /* OLD PAGE */

    if (oldPage) {

        oldPage.classList.remove(
            "active-page"
        );

        oldPage.classList.add(
            "leaving-page"
        );

    }


    /* NEW PAGE */

    setTimeout(function () {

        if (oldPage) {

            oldPage.classList.remove(
                "leaving-page"
            );

        }


        newPage.classList.add(
            "active-page"
        );

        newPage.classList.add(
            "entering-page"
        );


        currentPage =
            pageNumber;


        window.scrollTo(
            0,
            0
        );


        setTimeout(function () {

            newPage.classList.remove(
                "entering-page"
            );

        }, 1000);


        /* =================================
           PAGE 2
        ================================= */

        if (
            pageNumber === 2
        ) {

            setTimeout(function () {

                updateCarousel();

            }, 100);

        }


        /* =================================
           PAGE 3
        ================================= */

        if (
            pageNumber === 3
        ) {

            setTimeout(function () {

                createCelebrationBurst();

                createCelebrationBurst();

            }, 500);

        }

    }, 450);

}


/* =========================================
   PARTICLES
========================================= */

function createParticles() {

    const container =
        document.getElementById(
            "particles"
        );


    if (!container) {
        return;
    }


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.className =
            "particle";


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.animationDuration =
            5 +
            Math.random() * 8 +
            "s";


        particle.style.animationDelay =
            Math.random() * 7 +
            "s";


        const size =
            2 +
            Math.random() * 5;


        particle.style.width =
            size + "px";


        particle.style.height =
            size + "px";


        container.appendChild(
            particle
        );

    }

}


/* =========================================
   CELEBRATION BURST
========================================= */

function createCelebrationBurst() {

    const symbols = [
        "💕",
        "💖",
        "💗",
        "✨",
        "💓",
        "🌸"
    ];


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "celebration-piece";


        piece.innerHTML =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            200 +
            Math.random() *
            500;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        piece.style.setProperty(
            "--x",
            x + "px"
        );


        piece.style.setProperty(
            "--y",
            y + "px"
        );


        piece.style.fontSize =
            12 +
            Math.random() * 18 +
            "px";


        document.body.appendChild(
            piece
        );


        setTimeout(function () {

            piece.remove();

        }, 1800);

    }

}


/* =========================================
   CAROUSEL
========================================= */

let carouselIndex = 0;

let photoCards = [];

let carouselTimer = null;

let isDragging = false;

let dragStartX = 0;


/* =========================================
   SETUP CAROUSEL
========================================= */

function setupCarousel() {

    photoCards =
        Array.from(
            document.querySelectorAll(
                ".photo-card"
            )
        );


    if (!photoCards.length) {
        return;
    }


    createCarouselDots();

    updateCarousel();

    startCarouselAutoPlay();


    const carousel =
        document.getElementById(
            "coverflow"
        );


    if (!carousel) {
        return;
    }


    /* MOUSE DOWN */

    carousel.addEventListener(
        "mousedown",
        function (event) {

            isDragging = true;

            dragStartX =
                event.clientX;

            stopCarouselAutoPlay();

        }
    );


    /* MOUSE UP */

    window.addEventListener(
        "mouseup",
        function () {

            if (!isDragging) {
                return;
            }


            isDragging = false;

            startCarouselAutoPlay();

        }
    );


    /* MOUSE MOVE */

    window.addEventListener(
        "mousemove",
        function (event) {

            if (!isDragging) {
                return;
            }


            const difference =
                event.clientX -
                dragStartX;


            if (
                Math.abs(
                    difference
                ) > 45
            ) {

                if (
                    difference < 0
                ) {

                    moveCarousel(1);

                } else {

                    moveCarousel(-1);

                }


                dragStartX =
                    event.clientX;

            }

        }
    );


    /* TOUCH START */

    carousel.addEventListener(
        "touchstart",
        function (event) {

            dragStartX =
                event.touches[0].clientX;

            stopCarouselAutoPlay();

        },
        {
            passive: true
        }
    );


    /* TOUCH END */

    carousel.addEventListener(
        "touchend",
        function (event) {

            const endX =
                event.changedTouches[0]
                    .clientX;


            const difference =
                endX -
                dragStartX;


            if (
                Math.abs(
                    difference
                ) > 40
            ) {

                if (
                    difference < 0
                ) {

                    moveCarousel(1);

                } else {

                    moveCarousel(-1);

                }

            }


            startCarouselAutoPlay();

        },
        {
            passive: true
        }
    );


    /* WHEEL */

    carousel.addEventListener(
        "wheel",
        function (event) {

            event.preventDefault();


            if (
                event.deltaY > 0 ||
                event.deltaX > 0
            ) {

                moveCarousel(1);

            } else {

                moveCarousel(-1);

            }

        },
        {
            passive: false
        }
    );

}


/* =========================================
   UPDATE CAROUSEL
========================================= */

function updateCarousel() {

    if (!photoCards.length) {
        return;
    }


    const total =
        photoCards.length;


    photoCards.forEach(
        function (
            card,
            index
        ) {

            let offset =
                index -
                carouselIndex;


            if (
                offset >
                total / 2
            ) {

                offset -= total;

            }


            if (
                offset <
                -total / 2
            ) {

                offset += total;

            }


            const absOffset =
                Math.abs(
                    offset
                );


            const translateX =
                offset * 210;


            const translateZ =
                -absOffset * 170;


            const rotateY =
                offset * -28;


            const scale =
                offset === 0
                    ? 1
                    : 0.82;


            const opacity =
                absOffset > 2
                    ? 0
                    : 1;


            card.style.transform =
                `
                translateX(${translateX}px)
                translateZ(${translateZ}px)
                rotateY(${rotateY}deg)
                scale(${scale})
                `;


            card.style.opacity =
                opacity;


            card.style.zIndex =
                100 - absOffset;


            card.classList.toggle(
                "active-card",
                offset === 0
            );

        }
    );


    updateCarouselDots();

}


/* =========================================
   MOVE CAROUSEL
========================================= */

function moveCarousel(direction) {

    if (!photoCards.length) {
        return;
    }


    const total =
        photoCards.length;


    carouselIndex =
        (
            carouselIndex +
            direction +
            total
        ) % total;


    updateCarousel();

}


/* =========================================
   AUTO CAROUSEL
========================================= */

function startCarouselAutoPlay() {

    stopCarouselAutoPlay();


    carouselTimer =
        setInterval(
            function () {

                if (
                    currentPage === 2
                ) {

                    moveCarousel(1);

                }

            },
            4200
        );

}


function stopCarouselAutoPlay() {

    if (carouselTimer) {

        clearInterval(
            carouselTimer
        );

        carouselTimer = null;

    }

}


/* =========================================
   DOTS
========================================= */

function createCarouselDots() {

    const dotsContainer =
        document.getElementById(
            "carouselDots"
        );


    if (!dotsContainer) {
        return;
    }


    dotsContainer.innerHTML =
        "";


    photoCards.forEach(
        function (_, index) {

            const dot =
                document.createElement(
                    "div"
                );


            dot.className =
                "carousel-dot";


            dot.addEventListener(
                "click",
                function () {

                    carouselIndex =
                        index;

                    updateCarousel();

                }
            );


            dotsContainer.appendChild(
                dot
            );

        }
    );

}


function updateCarouselDots() {

    const dots =
        document.querySelectorAll(
            ".carousel-dot"
        );


    dots.forEach(
        function (
            dot,
            index
        ) {

            dot.classList.toggle(
                "active",
                index ===
                carouselIndex
            );

        }
    );

}


/* =========================================
   LIKE BUTTON
========================================= */

function toggleLike(button) {

    button.classList.toggle(
        "liked"
    );


    if (
        button.classList.contains(
            "liked"
        )
    ) {

        button.innerHTML =
            "♥";

        createHeart(button);

    } else {

        button.innerHTML =
            "♡";

    }

}


/* =========================================
   HEART ANIMATION
========================================= */

function createHeart(button) {

    const heart =
        document.createElement(
            "span"
        );


    heart.innerHTML =
        "💗";


    heart.style.position =
        "fixed";


    const rect =
        button.getBoundingClientRect();


    heart.style.left =
        rect.left + "px";


    heart.style.top =
        rect.top + "px";


    heart.style.zIndex =
        "200";


    heart.style.fontSize =
        "25px";


    heart.style.pointerEvents =
        "none";


    document.body.appendChild(
        heart
    );


    heart.animate(
        [
            {
                transform:
                    "translateY(0) scale(0.5)",

                opacity: 1
            },

            {
                transform:
                    "translateY(-80px) scale(1.4)",

                opacity: 0
            }
        ],
        {
            duration: 900,
            easing: "ease-out"
        }
    );


    setTimeout(
        function () {

            heart.remove();

        },
        950
    );

}


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            currentPage !== 2
        ) {
            return;
        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            moveCarousel(1);

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            moveCarousel(-1);

        }

    }
);