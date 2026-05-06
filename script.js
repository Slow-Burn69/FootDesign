// DONNÉES IMAGES (Vos photos fournies)
const galleryData = [
    // Avant Match
    { id: 1, title: "Next Match A", category: "avant-match", img: "image footall/Avant Match/1 nov a.png" },
    { id: 2, title: "Ligue Matchday", category: "avant-match", img: "image footall/Avant Match/7 dec A.png" },
    { id: 3, title: "Game Night", category: "avant-match", img: "image footall/Avant Match/9 nov.png" },
    { id: 4, title: "Impact Poster", category: "avant-match", img: "image footall/Avant Match/14 dec a.png" },
    { id: 5, title: "Stadium Vision", category: "avant-match", img: "image footall/Avant Match/16 nov A.png" },
    { id: 6, title: "Battle Saturday", category: "avant-match", img: "image footall/Avant Match/22 samedi.png" },
    { id: 7, title: "Octobre Red", category: "avant-match", img: "image footall/Avant Match/26 oct a1.png" },
    { id: 8, title: "Blue Squad", category: "avant-match", img: "image footall/Avant Match/26 oct a2.png" },
    { id: 9, title: "Winter Clash", category: "avant-match", img: "image footall/Avant Match/30 nov.png" },

    // Compositions (Ajoutées automatiquement)
    { id: 10, title: "Compo 1 Nov", category: "composition", img: "image footall/composition/1 NOV COMPO.png" },
    { id: 11, title: "Compo 7 Dec", category: "composition", img: "image footall/composition/7 DEC COMP.png" },
    { id: 12, title: "Compo 16 Nov", category: "composition", img: "image footall/composition/16 nov comp.png" },
    { id: 13, title: "Compo 26 Oct", category: "composition", img: "image footall/composition/26 OCT.png" },

    // Résultats
    { id: 14, title: "Victoire 10 Nov", category: "resultat", img: "image footall/resultat/10 nov A.png" },
    { id: 15, title: "Score 13 Oct", category: "resultat", img: "image footall/resultat/13 oct res.png" },
    { id: 16, title: "Resultat 19 Oct", category: "resultat", img: "image footall/resultat/19 oct rees a.png" },
    { id: 17, title: "Victoire 2 Nov", category: "resultat", img: "image footall/resultat/2 nov A.png" },
    { id: 18, title: "Match 22 Samedi", category: "resultat", img: "image footall/resultat/22 res.png" },
    { id: 19, title: "Resultat 28 Oct", category: "resultat", img: "image footall/resultat/res 28 oct.png" },
    { id: 20, title: "Score 5 Oct", category: "resultat", img: "image footall/resultat/res 5 oct 1.png" },

    // Motivation
    { id: 21, title: "Focus 7 Dec", category: "motivation", img: "image footall/motivation/7 DEC MOTIV.png" },
    { id: 22, title: "Motivation 02", category: "motivation", img: "image footall/motivation/MOTIVATOIN 02.png" },
    { id: 23, title: "Spirit", category: "motivation", img: "image footall/motivation/motiv ress.png" },
    { id: 24, title: "Hard Work", category: "motivation", img: "image footall/motivation/motivation 9 nov.png" },
    { id: 25, title: "Dream Big", category: "motivation", img: "image footall/motivation/motivation.png" }
];

// ============================================
// GSAP ANIMATIONS SETUP
// ============================================

// Register ALL GSAP Plugins (including Premium)
gsap.registerPlugin(
    ScrollTrigger,
    TextPlugin,
    SplitText,
    ScrollSmoother,
    Draggable,
    Flip,
    MotionPathPlugin,
    DrawSVGPlugin,
    MorphSVGPlugin,
    ScrambleTextPlugin,
    CustomEase,
    Observer,
    InertiaPlugin
);

// Custom Eases for premium feel
CustomEase.create("smooth", "0.4, 0, 0.2, 1");
CustomEase.create("bounce", "0.68, -0.55, 0.265, 1.55");
CustomEase.create("elastic", "0.5, 1.5, 0.8, 1");

// Custom Ease for premium feel
const customEase = "smooth";

// Mobile detection
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// GSAP Config for performance
ScrollTrigger.config({ limitCallbacks: true });
if (isTouch) {
    ScrollTrigger.normalizeScroll(true);
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Main cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;

        // Follower has more lag for smooth effect
        followerX += (mouseX - followerX) * 0.08;
        followerY += (mouseY - followerY) * 0.08;

        gsap.set(cursor, { x: cursorX, y: cursorY });
        gsap.set(follower, { x: followerX, y: followerY });

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .glow-card, .filter-btn, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        gsap.to(follower, { scale: 0.8, duration: 0.1 });
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
        gsap.to(follower, { scale: 1, duration: 0.2 });
    });
}

// ============================================
// PAGE LOADER ANIMATION
// ============================================
function initLoader() {
    return new Promise((resolve) => {
        const loader = document.getElementById('loader');
        const progress = document.querySelector('.loader-progress');
        const percent = document.querySelector('.loader-percent');

        if (!loader) {
            resolve();
            return;
        }

        const tl = gsap.timeline({
            onComplete: () => {
                // Fade out loader
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                    onComplete: () => {
                        loader.style.display = 'none';
                        resolve();
                    }
                });
            }
        });

        // Animate progress bar
        tl.to(progress, {
            width: "100%",
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: function () {
                const progressValue = Math.round(this.progress() * 100);
                percent.textContent = progressValue + "%";
            }
        })
            // Scale up logo
            .from(".loader-logo", {
                scale: 0.9,
                opacity: 0,
                duration: 0.5,
                ease: "back.out(1.7)"
            }, 0)
            // Split logo text effect
            .to(".loader-logo span", {
                color: "#60a5fa",
                textShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                duration: 0.3,
                yoyo: true,
                repeat: 2
            }, 0.5);
    });
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
    if (isTouch) return; // Disable on mobile for performance and better UX
    
    const buttons = document.querySelectorAll('.bg-accent, .bg-white, .filter-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

// ============================================
// PREMIUM SPLITTEXT ANIMATIONS
// ============================================
function initSplitTextAnimations() {
    // Hero title split animation
    const heroTitle = document.querySelector("#index h1");
    if (heroTitle) {
        const split = new SplitText(heroTitle, { type: "chars,words,lines" });

        gsap.from(split.chars, {
            opacity: 0,
            y: 100,
            rotateX: -90,
            stagger: 0.02,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: heroTitle,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // Portfolio title scramble effect
    const portfolioTitle = document.querySelector("#portfolio h2");
    if (portfolioTitle) {
        ScrollTrigger.create({
            trigger: portfolioTitle,
            start: "top 80%",
            onEnter: () => {
                gsap.to(portfolioTitle, {
                    duration: 2,
                    scrambleText: {
                        text: "PORTFOLIO",
                        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                        revealDelay: 0.5,
                        speed: 0.3
                    }
                });
            },
            once: true
        });
    }

    // Contact title animation
    const contactTitle = document.querySelector("#contact h2");
    if (contactTitle) {
        const contactSplit = new SplitText(contactTitle, { type: "words" });

        gsap.from(contactSplit.words, {
            opacity: 0,
            y: 50,
            rotateY: 45,
            stagger: 0.1,
            duration: 0.8,
            ease: customEase,
            scrollTrigger: {
                trigger: contactTitle,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    }
}

// ============================================
// SCRAMBLE TEXT HOVER EFFECTS
// ============================================
function initScrambleTextEffects() {
    const scrambleElements = document.querySelectorAll('.glitch-text');

    scrambleElements.forEach(element => {
        const originalText = element.textContent;

        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                duration: 0.8,
                scrambleText: {
                    text: originalText,
                    chars: "XO#_-+=",
                    revealDelay: 0.1,
                    speed: 0.4
                }
            });
        });
    });
}

// ============================================
// DRAGGABLE GALLERY CARDS
// ============================================
function initDraggableGallery() {
    if (isTouch) return; // Disable draggable on mobile to avoid scroll conflict
    
    const cards = document.querySelectorAll('.card-3d');

    cards.forEach(card => {
        Draggable.create(card, {
            type: "x,y",
            bounds: card.parentElement,
            inertia: true,
            edgeResistance: 0.65,
            onDragEnd: function () {
                // Spring back to original position
                gsap.to(this.target, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });
            },
            onDrag: function () {
                const inner = this.target.querySelector('.card-3d-inner');
                if (inner) {
                    gsap.to(inner, {
                        rotateY: this.deltaX * 0.2,
                        rotateX: -this.deltaY * 0.2,
                        duration: 0.1
                    });
                }
            }
        });
    });
}

// ============================================
// SCROLL SMOOTHER SETUP
// ============================================
let smoother = null;
function initScrollSmoother() {
    // Add wrapper structure for ScrollSmoother
    const body = document.body;
    const main = document.querySelector('main');

    if (!main) return;

    // Wrap content for smooth scrolling
    if (!document.querySelector('#smooth-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.id = 'smooth-wrapper';

        const content = document.createElement('div');
        content.id = 'smooth-content';

        // Move main content into smoother
        while (body.firstChild) {
            if (body.firstChild.id !== 'cursor' &&
                body.firstChild.id !== 'cursor-follower' &&
                body.firstChild.id !== 'loader') {
                content.appendChild(body.firstChild);
            } else {
                wrapper.parentElement?.insertBefore(body.firstChild, wrapper);
                break;
            }
        }

        wrapper.appendChild(content);
        body.appendChild(wrapper);
    }

    // Create ScrollSmoother instance
    smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: isTouch ? 0.5 : 1.5, // Less smooth on mobile for better responsiveness
        effects: true,
        smoothTouch: 0.1
    });
}

// ============================================
// FLIP ANIMATION FOR GALLERY FILTER
// ============================================
function flipFilterGallery(cat, btn) {
    const container = document.getElementById('full-gallery');
    if (!container) return;

    // Get initial state
    const state = Flip.getState(".glow-card");

    // Update button states
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-accent', 'text-white', 'active', 'shadow-lg');
        b.classList.add('bg-muted', 'text-gray-400');
    });
    btn.classList.add('bg-accent', 'text-white', 'active', 'shadow-lg');
    btn.classList.remove('bg-muted', 'text-gray-400');

    // Filter items
    const filtered = cat === 'all' ? galleryData : galleryData.filter(i => i.category === cat);

    // Render filtered items
    container.innerHTML = filtered.map(item => `
        <div class="glow-card group relative bg-surface border border-white/5 rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer" onclick="openLightbox(${item.id})">
            <img src="${item.img}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0" alt="${item.title}" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
            <div class="absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <p class="text-[9px] font-black text-accent uppercase tracking-[0.3em] mb-1">${item.category}</p>
                <h4 class="text-xl font-black italic uppercase tracking-tighter">${item.title}</h4>
            </div>
        </div>
    `).join('');

    // Animate with Flip
    Flip.from(state, {
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.05,
        absolute: true,
        onEnter: elements => gsap.fromTo(elements,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5 }
        ),
        onLeave: elements => gsap.to(elements,
            { opacity: 0, scale: 0.8, duration: 0.3 }
        )
    });
}

// ============================================
// MOTION PATH FOOTBALL ANIMATION
// ============================================
function initFootballAnimation() {
    // Create a floating football element
    const heroSection = document.querySelector('#index .relative.min-h-screen');
    if (!heroSection) return;

    const football = document.createElement('div');
    football.innerHTML = `<svg class="football-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
        <circle cx="12" cy="12" r="4" fill="#3b82f6"/>
    </svg>`;
    football.style.cssText = 'position: absolute; top: 20%; right: 10%; z-index: 5; opacity: 0.3; color: #3b82f6;';
    football.id = 'floating-football';
    heroSection.appendChild(football);

    // Define motion path
    gsap.to('#floating-football', {
        duration: 8,
        repeat: -1,
        ease: "none",
        motionPath: {
            path: "M0,0 C50,-50 100,50 150,0 S250,50 300,0",
            autoRotate: true
        }
    });

    // Add spin animation
    gsap.to('#floating-football svg', {
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: "none"
    });
}

// ============================================
// OBSERVER FOR SCROLL DIRECTION EFFECTS
// ============================================
function initScrollDirectionEffects() {
    let lastScrollDirection = 1;

    Observer.create({
        target: window,
        type: "wheel,touch,scroll",
        onChangeY: (self) => {
            const direction = self.deltaY > 0 ? 1 : -1;

            if (direction !== lastScrollDirection) {
                lastScrollDirection = direction;

                // Tilt cards based on scroll direction
                gsap.to('.card-3d-inner', {
                    rotateX: direction * 5,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Reset after a moment
                gsap.to('.card-3d-inner', {
                    rotateX: 0,
                    duration: 0.5,
                    delay: 0.2,
                    ease: "elastic.out(1, 0.5)"
                });
            }
        }
    });
}

// ============================================
// DRAWSVG DECORATIVE LINES
// ============================================
function initDrawSVGAnimations() {
    // Create decorative SVG lines around the hero section
    const heroSection = document.querySelector('#index .relative.min-h-screen');
    if (!heroSection) return;

    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = `
        <svg class="decorative-lines" width="200" height="200" viewBox="0 0 200 200" 
             style="position: absolute; top: 10%; left: 5%; z-index: 1; opacity: 0.2;">
            <path id="line1" d="M10,100 Q50,50 100,100 T190,100" 
                  stroke="#3b82f6" stroke-width="2" fill="none"/>
            <path id="line2" d="M100,10 Q150,50 100,100 T100,190" 
                  stroke="#3b82f6" stroke-width="2" fill="none"/>
            <circle id="circle1" cx="100" cy="100" r="50" 
                    stroke="#3b82f6" stroke-width="1" fill="none"/>
        </svg>
    `;
    heroSection.appendChild(svgContainer);

    // Animate the lines drawing on scroll
    ScrollTrigger.create({
        trigger: heroSection,
        start: "top 80%",
        onEnter: () => {
            gsap.fromTo("#line1",
                { drawSVG: "0%" },
                { drawSVG: "100%", duration: 2, ease: "power2.inOut" }
            );
            gsap.fromTo("#line2",
                { drawSVG: "0%" },
                { drawSVG: "100%", duration: 2, delay: 0.3, ease: "power2.inOut" }
            );
            gsap.fromTo("#circle1",
                { drawSVG: "0%" },
                { drawSVG: "100%", duration: 3, delay: 0.5, ease: "power2.inOut" }
            );
        },
        once: true
    });
}

// ============================================
// MORPHSVG DECORATIVE SHAPES
// ============================================
function initMorphSVGAnimations() {
    // Create morphing decorative shape
    const heroSection = document.querySelector('#index .relative.min-h-screen');
    if (!heroSection) return;

    const morphContainer = document.createElement('div');
    morphContainer.innerHTML = `
        <svg class="morph-decoration" width="100" height="100" viewBox="0 0 100 100"
             style="position: absolute; bottom: 20%; right: 5%; z-index: 1; opacity: 0.15;">
            <path id="morphShape" 
                  d="M50,10 L90,50 L50,90 L10,50 Z" 
                  fill="#3b82f6"/>
        </svg>
    `;
    heroSection.appendChild(morphContainer);

    // Circle path for morphing
    const circlePath = "M50,10 C72,10 90,28 90,50 C90,72 72,90 50,90 C28,90 10,72 10,50 C10,28 28,10 50,10 Z";
    const diamondPath = "M50,10 L90,50 L50,90 L10,50 Z";
    const starPath = "M50,10 L58,38 L90,38 L64,54 L74,82 L50,66 L26,82 L36,54 L10,38 L42,38 Z";

    // Continuous morphing animation
    const morphTl = gsap.timeline({ repeat: -1, yoyo: true });

    morphTl.to("#morphShape", {
        duration: 2,
        morphSVG: circlePath,
        ease: "power2.inOut"
    })
        .to("#morphShape", {
            duration: 2,
            morphSVG: starPath,
            ease: "power2.inOut"
        })
        .to("#morphShape", {
            duration: 2,
            morphSVG: diamondPath,
            ease: "power2.inOut"
        });

    // Add rotation
    gsap.to(".morph-decoration", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
    });
}

// ============================================
// LOADER & INTRO ANIMATION
// ============================================
function initIntroAnimation() {
    const tl = gsap.timeline();

    // Animate header
    tl.from("#main-header", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: customEase
    })
        // Logo text animation
        .from("#main-header a:first-child", {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.5")
        // Nav links stagger
        .from("#main-header nav a", {
            y: -30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: customEase
        }, "-=0.3");
}

// ============================================
// HERO SECTION ANIMATIONS
// ============================================
// ============================================
// HERO SECTION ANIMATIONS & VIDEO SCROLL
// ============================================
function initHeroAnimations() {
    const heroSection = document.querySelector("#index");
    const video = document.querySelector("#hero-video");

    // Initial entrance animation
    const entranceTl = gsap.timeline({ delay: 0.3 });

    entranceTl.from(".hero-main-text .reveal", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: customEase
    })
        .from(".hero-main-text h1", {
            scale: 0.9,
            duration: 1.5,
            ease: "power3.out"
        }, 0);

    // Video Scroll Sequence
    if (video) {
        // We removed the video scrub to let it play smoothly as an autoplaying background
        let mm = gsap.matchMedia();
        
        mm.add("(min-width: 769px)", () => {
            // Desktop sequence
            createHeroTimeline(3000);
        });
        
        mm.add("(max-width: 768px)", () => {
            // Mobile sequence (shorter scroll)
            createHeroTimeline(1500);
        });

        function createHeroTimeline(endValue) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#index",
                    start: "top top",
                    end: `+=${endValue}`,
                    pin: true,
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: true
                }
            });

            // 1. Fade out main text
            tl.to(".hero-main-text", { opacity: 0, scale: 0.9, duration: 1 })
                .to("#story-1", { opacity: 1, y: 0, duration: 2 }, ">-0.5")
                .to("#story-1", { opacity: 0, y: -50, duration: 1 })
                .to("#story-2", { opacity: 1, y: 0, duration: 2 })
                .to("#story-2", { opacity: 0, y: -50, duration: 1 })
                .to("#story-3", { opacity: 1, y: 0, duration: 2 })
                .to("#story-3", { opacity: 0, scale: 1.1, duration: 1 });
        }

        console.log("Video scroll timeline created with matchMedia.");
    } else {
        console.error("Hero video element not found!");
    }
}

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================
function initScrollAnimations() {
    // Expertise section
    gsap.from(".lg\\:col-span-4 h2", {
        scrollTrigger: {
            trigger: ".lg\\:col-span-4",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: customEase
    });

    // Service cards stagger
    gsap.from(".glow-card", {
        scrollTrigger: {
            trigger: ".lg\\:col-span-8",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: customEase
    });

    // Featured gallery title
    gsap.from("#home-gallery", {
        scrollTrigger: {
            trigger: "#home-gallery",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: customEase
    });
}

// ============================================
// GALLERY ANIMATIONS
// ============================================
function animateGalleryItems() {
    const items = document.querySelectorAll("#full-gallery .glow-card");

    gsap.from(items, {
        y: 100,
        opacity: 0,
        scale: 0.9,
        stagger: {
            each: 0.08,
            from: "start"
        },
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#full-gallery",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
}

// ============================================
// LIGHTBOX ANIMATIONS
// ============================================
function animateLightboxOpen() {
    const tl = gsap.timeline();

    tl.fromTo("#lightbox",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
    )
        .fromTo("#lightbox-img",
            { scale: 0.8, opacity: 0, rotateY: 15 },
            { scale: 1, opacity: 1, rotateY: 0, duration: 0.5, ease: "back.out(1.2)" },
            "-=0.1"
        )
        .fromTo("#lightbox-title",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4 },
            "-=0.2"
        )
        .fromTo("#lightbox-cat",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3 },
            "-=0.2"
        )
        .fromTo("#lightbox button:last-child",
            { scale: 0 },
            { scale: 1, duration: 0.3, ease: "back.out(2)" },
            "-=0.1"
        );

    return tl;
}

function animateLightboxClose() {
    return gsap.to("#lightbox", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
    });
}

// ============================================
// PAGE TRANSITION ANIMATIONS
// ============================================
function animatePageTransition(pageId) {
    const section = document.getElementById(pageId);

    // Exit current page
    gsap.to(".page-section.active", {
        opacity: 0,
        y: -30,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
            section.classList.add('active');

            // Enter new page
            gsap.fromTo(section,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: customEase }
            );

            // Re-run scroll animations for new page
            ScrollTrigger.refresh();

            // Init portfolio galleries and effects if portfolio page
            if (pageId === 'portfolio') {
                setTimeout(() => {
                    initPortfolioCategoryGalleries();
                    init3DCardTilt();
                    initFloatingElements();
                    ScrollTrigger.refresh();
                }, 200);
            }
        }
    });
}

// ============================================
// INTERACTIVE HOVER EFFECTS
// ============================================
function initHoverEffects() {
    // Magnetic button effect
    const magneticButtons = document.querySelectorAll('.bg-accent, .bg-white');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Nav links hover
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -2,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });
}

// ============================================
// CONTACT SECTION ANIMATIONS
// ============================================
function initContactAnimations() {
    ScrollTrigger.create({
        trigger: "#contact",
        start: "top 80%",
        onEnter: () => {
            const tl = gsap.timeline();

            tl.from("#contact h2", {
                x: -80,
                opacity: 0,
                duration: 0.8,
                ease: customEase
            })
                .from("#contact p", {
                    x: -60,
                    opacity: 0,
                    duration: 0.6,
                    ease: customEase
                }, "-=0.4")
                .from("#contact .space-y-6 > *", {
                    y: 30,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.5,
                    ease: customEase
                }, "-=0.3")
                .from("#contact form > *", {
                    y: 40,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: customEase
                }, "-=0.4");
        },
        once: true
    });
}

// ============================================
// FILTER ANIMATION
// ============================================
function animateFilter() {
    const items = document.querySelectorAll("#full-gallery .glow-card");

    gsap.fromTo(items,
        { scale: 0.8, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            stagger: 0.05,
            duration: 0.4,
            ease: "back.out(1.2)"
        }
    );
}

// ============================================
// MOBILE MENU ANIMATION
// ============================================
function animateMobileMenuOpen() {
    const menu = document.getElementById('mobile-menu');
    const links = menu.querySelectorAll('a, button');

    gsap.fromTo(menu,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
    );

    gsap.fromTo(links,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.4,
            ease: "back.out(1.5)"
        }
    );
}

function animateMobileMenuClose() {
    const menu = document.getElementById('mobile-menu');

    gsap.to(menu, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => menu.classList.add('hidden')
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================
function initParallaxEffects() {
    // Create parallax for various elements
    gsap.utils.toArray('.text-outline').forEach(el => {
        gsap.to(el, {
            x: 50,
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    // Parallax for main parallax section
    const parallaxImage = document.querySelector('.parallax-image');
    if (parallaxImage) {
        gsap.to(parallaxImage, {
            y: -100,
            scrollTrigger: {
                trigger: '.parallax-section',
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });
    }

    // Parallax on gallery images
    gsap.utils.toArray('.glow-card img').forEach(img => {
        gsap.to(img, {
            y: -30,
            scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });
}

// ============================================
// HORIZONTAL SCROLL GALLERY
// ============================================
function initHorizontalScroll() {
    // Init horizontal gallery on home page
    const homeContainer = document.getElementById('horizontal-gallery');
    if (homeContainer) {
        const horizontalItems = galleryData.slice(0, 8);
        homeContainer.innerHTML = horizontalItems.map(item => `
            <div class="card-3d" data-id="${item.id}">
                <div class="card-3d-inner">
                    <img src="${item.img}" class="card-3d-image" alt="${item.title}">
                    <div class="card-3d-overlay"></div>
                    <div class="card-3d-shine"></div>
                    <div class="card-3d-content">
                        <p class="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-2">${item.category}</p>
                        <h4 class="text-xl font-black italic uppercase tracking-tighter">${item.title}</h4>
                    </div>
                </div>
            </div>
        `).join('');

        const scrollWidth = homeContainer.scrollWidth;
        const viewportWidth = window.innerWidth;

        if (!isTouch && scrollWidth > viewportWidth) {
            gsap.to(homeContainer, {
                x: -(scrollWidth - viewportWidth + 100),
                ease: "none",
                scrollTrigger: {
                    trigger: ".horizontal-section",
                    start: "top 60%",
                    end: "bottom 40%",
                    scrub: 1.5,
                    invalidateOnRefresh: true
                }
            });
        }
    }

    // Add 3D tilt effect to all cards
    init3DCardTilt();
}

// ============================================
// PORTFOLIO CATEGORY GALLERIES
// ============================================
function initPortfolioCategoryGalleries() {
    const categories = ['avant-match', 'composition', 'resultat', 'motivation'];

    categories.forEach(category => {
        const container = document.querySelector(`.category-gallery[data-category="${category}"]`);
        if (!container) return;

        // Filter items by category
        const categoryItems = galleryData.filter(item => item.category === category);

        // Generate 3D cards
        container.innerHTML = categoryItems.map(item => `
            <div class="card-3d gradient-border" data-id="${item.id}">
                <div class="card-3d-inner">
                    <img src="${item.img}" class="card-3d-image" alt="${item.title}" loading="lazy">
                    <div class="card-3d-overlay"></div>
                    <div class="card-3d-shine"></div>
                    <div class="card-3d-content">
                        <p class="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-2">${item.category}</p>
                        <h4 class="text-xl font-black italic uppercase tracking-tighter">${item.title}</h4>
                        <button class="mt-3 text-[10px] font-black uppercase tracking-wider bg-accent/20 px-4 py-2 rounded-full hover:bg-accent transition">
                            Voir le projet
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    });

    // Animate each category section
    animateCategoryGalleries();

    // Add tilt effect
    init3DCardTilt();
}

// ============================================
// ANIMATE CATEGORY GALLERIES
// ============================================
function animateCategoryGalleries() {
    const containers = document.querySelectorAll('.category-gallery');

    containers.forEach((container, index) => {
        const section = container.closest('.category-section');
        const sectionId = section?.id;

        // Animate title with glitch
        const title = section?.querySelector('.glitch-text');
        if (title) {
            ScrollTrigger.create({
                trigger: section,
                start: "top 80%",
                onEnter: () => {
                    gsap.from(title, {
                        x: -100,
                        opacity: 0,
                        skewX: 10,
                        duration: 0.8,
                        ease: "power4.out"
                    });

                    // Glitch burst
                    gsap.to(title, {
                        textShadow: "4px 4px 0 #ff0000, -4px -4px 0 #00ffff",
                        duration: 0.1,
                        repeat: 5,
                        yoyo: true,
                        delay: 0.3,
                        onComplete: () => {
                            gsap.to(title, { textShadow: "none", duration: 0.2 });
                        }
                    });
                },
                once: true
            });
        }

        // Horizontal scroll for each gallery
        const scrollWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;

        if (!isTouch && scrollWidth > viewportWidth) {
            gsap.to(container, {
                x: -(scrollWidth - viewportWidth + 100),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top 50%",
                    end: `+=${scrollWidth - viewportWidth + 500}`,
                    scrub: 1.5,
                    invalidateOnRefresh: true
                }
            });
        }

        // Stagger cards entrance
        const cards = container.querySelectorAll('.card-3d');
        gsap.from(cards, {
            y: 100,
            opacity: 0,
            rotateY: 15,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// ============================================
// 3D CARD TILT EFFECT
// ============================================
function init3DCardTilt() {
    const cards = document.querySelectorAll('.card-3d');

    cards.forEach(card => {
        const inner = card.querySelector('.card-3d-inner');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = -(x - centerX) / 10;

            gsap.to(inner, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(inner, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
        });

        // Click to open lightbox
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            openLightbox(id);
        });
    });
}

// ============================================
// GLITCH TEXT ANIMATION
// ============================================
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;

    // Intensify glitch on scroll
    ScrollTrigger.create({
        trigger: '.horizontal-section',
        start: "top 80%",
        onEnter: () => {
            gsap.to('.glitch-text', {
                textShadow: "4px 4px 0 #ff0000, -4px -4px 0 #00ffff",
                duration: 0.1,
                repeat: 5,
                yoyo: true,
                onComplete: () => {
                    gsap.to('.glitch-text', {
                        textShadow: "none",
                        duration: 0.2
                    });
                }
            });
        }
    });

    // Glitch on hover
    glitchText.addEventListener('mouseenter', () => {
        gsap.to(glitchText, {
            skewX: 5,
            duration: 0.1,
            repeat: 3,
            yoyo: true,
            onComplete: () => {
                gsap.to(glitchText, { skewX: 0, duration: 0.2 });
            }
        });
    });
}

// ============================================
// IMAGE REVEAL ANIMATION
// ============================================
function initImageReveal() {
    gsap.utils.toArray('.reveal-mask').forEach(el => {
        ScrollTrigger.create({
            trigger: el,
            start: "top 80%",
            onEnter: () => el.classList.add('revealed')
        });
    });
}

// ============================================
// FLOATING ELEMENTS
// ============================================
function initFloatingElements() {
    gsap.utils.toArray('.floating').forEach((el, i) => {
        gsap.to(el, {
            y: -15,
            duration: 2 + (i * 0.5),
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    });
}

// ============================================
// ADVANCED SCROLL ANIMATIONS
// ============================================
function initAdvancedScrollAnimations() {
    // Parallax section text animation
    const parallaxTitle = document.querySelector('.parallax-section h3');
    if (parallaxTitle) {
        gsap.from(parallaxTitle, {
            y: 100,
            opacity: 0,
            scale: 0.9,
            scrollTrigger: {
                trigger: '.parallax-section',
                start: "top 70%",
                end: "top 30%",
                scrub: 1
            }
        });
    }

    // Glitch text entrance
    const glitchTitle = document.querySelector('.glitch-text');
    if (glitchTitle) {
        gsap.from(glitchTitle, {
            scale: 0.8,
            opacity: 0,
            rotateX: 45,
            scrollTrigger: {
                trigger: '.horizontal-section',
                start: "top 80%",
                end: "top 50%",
                scrub: 1
            }
        });
    }
}

// ============================================
// SCROLL INDICATOR ANIMATION
// ============================================
function initScrollIndicator() {
    gsap.to(".absolute.bottom-10 .w-0\\.5", {
        height: 80,
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        ease: "power1.inOut"
    });
}

// ============================================
// ORIGINAL FUNCTIONS (UPDATED)
// ============================================

// Header scroll effect with GSAP
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        gsap.to(header, {
            backgroundColor: "rgba(5, 5, 5, 0.8)",
            backdropFilter: "blur(10px)",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            duration: 0.3
        });
        header.classList.add('border-b', 'border-white/10');
    } else {
        gsap.to(header, {
            backgroundColor: "transparent",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            duration: 0.3
        });
        header.classList.remove('border-b', 'border-white/10');
    }
});

// Navigation with GSAP transitions
function showPage(pageId) {
    animatePageTransition(pageId);
    document.getElementById('mobile-menu').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile Menu with GSAP
document.getElementById('mobile-menu-btn').onclick = () => {
    document.getElementById('mobile-menu').classList.remove('hidden');
    animateMobileMenuOpen();
};

document.getElementById('close-menu').onclick = () => {
    animateMobileMenuClose();
};

// Gallery Render with GSAP
function renderGallery(filter = 'all') {
    const container = document.getElementById('full-gallery');
    const homeContainer = document.getElementById('home-gallery');

    const filtered = filter === 'all' ? galleryData : galleryData.filter(i => i.category === filter);

    // Portfolio Grid
    container.innerHTML = filtered.map(item => `
        <div class="glow-card group relative bg-surface border border-white/5 rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer" onclick="openLightbox(${item.id})">
            <img src="${item.img}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0" alt="${item.title}" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
            <div class="absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <p class="text-[9px] font-black text-accent uppercase tracking-[0.3em] mb-1">${item.category}</p>
                <h4 class="text-xl font-black italic uppercase tracking-tighter">${item.title}</h4>
            </div>
        </div>
    `).join('');

    // Home Preview (3 items)
    if (homeContainer) {
        homeContainer.innerHTML = galleryData.slice(0, 3).map(item => `
            <div class="home-gallery-item glow-card group relative bg-surface border border-white/5 rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer" onclick="showPage('portfolio')">
                <img src="${item.img}" class="w-full h-full object-cover transition duration-1000 group-hover:scale-110" alt="${item.title}">
                <div class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                <div class="absolute bottom-0 left-0 p-10">
                    <h4 class="text-2xl font-black italic uppercase mb-2">${item.title}</h4>
                    <span class="text-accent text-[10px] font-bold tracking-[0.4em] uppercase">Voir le projet</span>
                </div>
            </div>
        `).join('');

        // Animate home gallery items
        gsap.from(".home-gallery-item", {
            y: 80,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: customEase,
            scrollTrigger: {
                trigger: "#home-gallery",
                start: "top 80%"
            }
        });
    }

    // Animate gallery items after render
    if (container.children.length > 0) {
        animateFilter();
    }
}

function filterGallery(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-accent', 'text-white', 'active', 'shadow-lg');
        b.classList.add('bg-muted', 'text-gray-400');
    });
    btn.classList.add('bg-accent', 'text-white', 'active', 'shadow-lg');
    btn.classList.remove('bg-muted', 'text-gray-400');

    // Animate button click
    gsap.fromTo(btn,
        { scale: 0.95 },
        { scale: 1, duration: 0.3, ease: "back.out(2)" }
    );

    renderGallery(cat);
}

// Lightbox with GSAP
function openLightbox(id) {
    const item = galleryData.find(i => i.id === id);
    document.getElementById('lightbox-img').src = item.img;
    document.getElementById('lightbox-title').innerText = item.title;
    document.getElementById('lightbox-cat').innerText = item.category;
    document.getElementById('lightbox').classList.remove('hidden');
    document.getElementById('lightbox').classList.add('flex');
    document.body.style.overflow = 'hidden';

    animateLightboxOpen();
}

function closeLightbox() {
    animateLightboxClose().then(() => {
        document.getElementById('lightbox').classList.add('hidden');
        document.getElementById('lightbox').classList.remove('flex');
        document.body.style.overflow = 'auto';
    });
}

// ============================================
// INITIALIZATION
// ============================================
window.onload = async () => {
    // Init custom cursor first (works during loader)
    initCustomCursor();

    // Show loader animation
    await initLoader();

    // Init all GSAP animations after loader
    initIntroAnimation();
    initHeroAnimations();
    initScrollAnimations();
    initHoverEffects();
    initContactAnimations();
    initParallaxEffects();
    initScrollIndicator();
    initMagneticButtons();

    // Init new advanced effects
    initHorizontalScroll();
    initGlitchEffect();
    initImageReveal();
    initFloatingElements();
    initAdvancedScrollAnimations();

    // Init PREMIUM Plugin effects
    initSplitTextAnimations();      // SplitText
    initScrambleTextEffects();      // ScrambleTextPlugin
    initFootballAnimation();        // MotionPathPlugin
    initScrollDirectionEffects();   // Observer
    initDrawSVGAnimations();        // DrawSVGPlugin
    initMorphSVGAnimations();       // MorphSVGPlugin

    // Init portfolio category galleries
    initPortfolioCategoryGalleries();

    // Check if we are starting on a specific hash
    if (window.location.hash) {
        const pageId = window.location.hash.substring(1);
        if (document.getElementById(pageId)) {
            document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
            renderGallery();
            if (pageId === 'portfolio') {
                setTimeout(() => {
                    initPortfolioCategoryGalleries();
                    initDraggableGallery();  // Draggable
                    ScrollTrigger.refresh();
                }, 300);
            }
        } else {
            renderGallery();
        }
    } else {
        renderGallery();
    }

    // Refresh ScrollTrigger after page load
    setTimeout(() => ScrollTrigger.refresh(), 500);

    // Re-init cursor and Draggable for dynamically added elements
    setTimeout(() => {
        const interactiveElements = document.querySelectorAll('a, button, .glow-card, .filter-btn, input, textarea, .card-3d');
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursor-follower');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor?.classList.add('hover');
                follower?.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                cursor?.classList.remove('hover');
                follower?.classList.remove('hover');
            });
        });

        // Init draggable on cards
        initDraggableGallery();
    }, 1000);
};

// Handle window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Re-init portfolio galleries when navigating to portfolio
function onPortfolioEnter() {
    setTimeout(() => {
        initPortfolioCategoryGalleries();
        init3DCardTilt();
        initFloatingElements();
        ScrollTrigger.refresh();
    }, 100);
}
