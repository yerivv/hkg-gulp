console.log('멤버십 모바일');
gsap.registerPlugin(ScrollTrigger);

let membershipSection = document.querySelector('.membership-section');
let membershipSectionArea = membershipSection.querySelectorAll('.mo-area');

const fadeInAniY = target => {
    target.forEach(elem => {
        gsap.set(elem, { opacity: 0, y: 150, duration: 0.8, });
        gsap.to(elem, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'expo',
            scrollTrigger: {
                trigger: elem,
                start: 'top 90%',
                end: 'bottom 90%',
                toggleActions: 'play none resume reset',
            },
        });
    });
}

const fadeInAniX = target => {
    target.forEach(elem => {
        gsap.set(elem, { opacity: 0, x: 150, duration: 0.8, });
        gsap.to(elem, {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'expo',
            scrollTrigger: {
                trigger: elem,
                start: 'top 90%',
                end: 'bottom 90%',
                toggleActions: 'play none resume reset',
            },
        });
    });
}

const fadeInAniReverseX = target => {
    target.forEach(elem => {
        gsap.set(elem, { opacity: 0, x: -150, duration: 0.8, });
        gsap.to(elem, {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'expo',
            scrollTrigger: {
                trigger: elem,
                start: 'top 90%',
                end: 'bottom 90%',
                toggleActions: 'play none resume reset',
            },
        });
    });
}

const fn_mo_keyvisual = a => {
    // SplitText와 애니메이션 함수 정의
    const initTextAnimation = (element) => {
        let splitText = new SplitText(element, { type: 'words,lines', linesClass: 'line-cover' });

        const animateText = () => {
            gsap.set(element, { opacity: 0 });

            setTimeout(() => {
                gsap.set(element, { opacity: 1 });
                gsap.from(splitText.words, { opacity: 0, y: 50, stagger: 0.08 });
            }, 500);
        };

        return animateText;
    };

    const keyvisualControl = a.querySelector('.control');
    let keyvisualSwiper = new Swiper(a.querySelector('.swiper'), {
        effect: 'fade',
        speed: 800,
        slidesPerView: 1,
        navigation: {
            nextEl: a.querySelector('.next'),
            prevEl: a.querySelector('.prev'),
            disabledClass: 'disabled',
        },
        pagination: {
            el: a.querySelector('.pagination'),
            type: 'fraction',
            currentClass: 'current',
            totalClass: 'total',
            formatFractionCurrent: function(number) {
                return '0' + number
            },
            formatFractionTotal: function(number) {
                return '0' + number
            },
            renderFraction: function(currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span><span class="' + totalClass + '"></span>';
            }
        },
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        autoplayDisableOnInteraction: false,
        observer: true,
        observeParents: true,
        on: {
            init: function(){
                let activeIndex = this.activeIndex;
                let activeSlide = this.slides[this.activeIndex];
                // video
                this.slides[activeIndex].querySelector('video').play();
                // txt
                let animateText = initTextAnimation(activeSlide.querySelector('.tit'));
                animateText();
            },
            slideChangeTransitionStart: function () {
                let activeIndex = this.activeIndex;
                let activeSlide = this.slides[this.activeIndex];
                // video
                let videos = a.querySelectorAll('.video video');
                Array.from(videos).forEach(video => {
                    video.pause();
                    video.currentTime = 0;
                });
    
                if ($(this.slides[activeIndex]).find('video').length) {
                    this.slides[activeIndex].querySelector('video').play();
                }
    
                // txt
                let animateText = initTextAnimation(activeSlide.querySelector('.tit'));
                animateText();
                keyvisualControl.classList.remove('active');
            },
            slideChangeTransitionEnd: function() {
                keyvisualControl.classList.add('active');
            },
        },
    });

    keyvisualSwiper.autoplay.stop();

    setTimeout(function() {
        keyvisualSwiper.autoplay.start();
        keyvisualControl.classList.add('active');
    }, 100);

    keyvisualControl.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            keyvisualSwiper.autoplay.stop();
            this.classList.remove('active');
            this.classList.add('play');
        } else {
            keyvisualSwiper.autoplay.start();
            this.classList.add('active');
            this.classList.remove('play');
        }
    });

    a.querySelectorAll('.next, .prev').forEach(button => {
        button.addEventListener('click', function() {
            if (!keyvisualSwiper.autoplay.running) {
                keyvisualSwiper.autoplay.start();
                keyvisualControl.classList.add('active');
                keyvisualControl.classList.remove('play');
            }
        });
    });

    const circleEl = keyvisualControl.querySelector('span circle');
    circleEl.style.setProperty('--total_length', circleEl.getTotalLength());

    keyvisualSwiper.on('slideChange', function() {
        if (!keyvisualControl.classList.contains('play')) {
            keyvisualControl.classList.remove('play', 'active');
        }

        setTimeout(function() {
            if (!keyvisualControl.classList.contains('play')) {
                keyvisualControl.classList.add('active');
            }
        }, 100);
    });
}

const fn_mo_recommend = a => {
    fadeInAniReverseX([a.querySelector('.titles')]);
    fadeInAniReverseX([a.querySelector('.tab')]);
    fadeInAniX([a.querySelector('.content')]);

    ScrollTrigger.create({
        trigger: a,
        start: '-15% center',
        onEnter: function() {
            a.classList.add('active');
        },
        onEnterBack: function() {
            a.classList.add('active');
        },
        onLeave: function() {
            a.classList.remove('active');
        },
        onLeaveBack: function() {
            a.classList.remove('active');
        },
    });

    let slides = a.querySelectorAll('.slide');
    slides.forEach(function(slide) {
        if(slide.querySelector('.hover')){
            slide.querySelector('.default').addEventListener('click', function(e) {
                e.preventDefault();
                slide.classList.add('active');
            });
        }
        slide.addEventListener('mouseout', function() {
            slide.classList.remove('active');
        });
    });

    let tabs = a.querySelectorAll('.tab .menu');
    let contents = a.querySelectorAll('.content .box');

    contents.forEach(function(content) {
        new Swiper(content.querySelector('.swiper'), {
            slidesPerView: 'auto',
            spaceBetween: 16,
        });
    });

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            let index = tab.getAttribute('data-index');
            
            tabs.forEach(function(item) {
                item.classList.remove('active');
            });
            tab.classList.add('active');

            contents.forEach(function(content) {
                content.classList.remove('active');
            });
            contents[index].classList.add('active');
        });
    });
}

const fn_mo_tgs = a => {
    let prevPcTgs = a.previousElementSibling;
    const textBox = a.querySelector('.text-box');
    const dimBox = a.querySelector('.dim');
    gsap.set(dimBox, {opacity: 1});
    gsap.set(textBox, {x: '-50px', opacity: 0});

    fadeInAniX([a.querySelector('.list1')]);
    fadeInAniReverseX([a.querySelector('.list2')]);

    let tgsSetTop = gsap.timeline({
        scrollTrigger: {
            trigger: prevPcTgs,
            start: 'bottom center',
            onEnter: () => {
                gsap.to(dimBox, {opacity: 0, duration: 2.5, ease: 'power3.out'});
                gsap.to(textBox, {x: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.2});
            },
            onLeaveBack: () => {
                gsap.to(dimBox, {opacity: 1});
                gsap.to(textBox, {x: '-50px', opacity: 0});
            }
        }
    });

    let tgsSet = gsap.timeline({
        scrollTrigger: {
            trigger: a,
            start: '444px top',
            end: '+=1400 center',
            pin: true,
            scrub: 1,
            onLeave: () => {
                fadeInAniReverseX([a.querySelector('.card-box')]);
            },
        },
    });

    tgsSet.fromTo(a.querySelector('.list1'), {xPercent: 5.55}, {xPercent: -54.44}, 'a')
        .fromTo(a.querySelector('.list2'), {xPercent: -54.44}, {xPercent: 5.55}, 'a');
}

const fn_mo_season = a => {
    fadeInAniReverseX([a.querySelector('.titles')]);
    fadeInAniX([a.querySelectorAll('.tab-wrap')]);

    const tabs = a.querySelectorAll('.tab .menu');
    const items = a.querySelectorAll('.tab-wrap > .content .swiper');
    const prevButtons = a.querySelectorAll('button.prev');
    const nextButtons = a.querySelectorAll('button.next');
    
    let currentIndex = 0;
    let itemSwiper = null;

    const itemSwipers = (currentIndex) => {
        if (itemSwiper) itemSwiper.destroy();
        const swiperElement = a.querySelector(`.tab-wrap > .content .swiper[data-index="${currentIndex}"]`);

        if (swiperElement) {
            a.querySelectorAll('.tab-wrap > .content .swiper').forEach(swiper => swiper.classList.remove('active'));
            a.querySelector(`.tab-wrap > .content .swiper[data-index="${currentIndex}"]`).classList.add('active');

            itemSwiper = new Swiper(swiperElement, {
                slidesPerView: 'auto',
                freeMode: {
                    enabled: true,
                    minimumVelocity: 0.2,
                },
            });
        }
    }
    itemSwipers(currentIndex)

    let tabSwiper = new Swiper(a.querySelector('.tab'), {
        slidesPerView: 'auto',
        slideActiveClass: 'active',
        speed: 700,
        on: {
            slideChangeTransitionStart: function() {
                itemSwipers(this.activeIndex);
                this.slides.forEach(slide => slide.classList.remove('active'));
                this.slides[this.activeIndex].classList.add('active');
            },
        }
    });

    const updateActiveTab = index => {
        tabs.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    const updateActiveItem = index => {
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                const scrollAreaAll =  item.querySelectorAll('.box .content');
                scrollAreaAll.forEach(scrollArea => scrollArea.scrollTop = 0);
            } else {
                item.classList.remove('active');
            }
        });
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            currentIndex = index;
            updateActiveTab(currentIndex);
            updateActiveItem(currentIndex);
            tabSwiper.slideTo(currentIndex);
            itemSwipers(currentIndex);
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateActiveTab(currentIndex);
            updateActiveItem(currentIndex);
            tabSwiper.slideTo(currentIndex);
            itemSwipers(currentIndex);
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % items.length;
            updateActiveTab(currentIndex);
            updateActiveItem(currentIndex);
            tabSwiper.slideTo(currentIndex);
            itemSwipers(currentIndex);
        });
    });

    // gsap.utils.toArray(a.querySelectorAll('.tab .swiper-slide')).forEach(elem => {
    //     gsap.set(elem, { opacity: 0, x: 150, duration: 0.6, });
    //     gsap.to(elem, {
    //         opacity: 1,
    //         x: 0,
    //         duration: 1.2,
    //         ease: 'expo',
    //         scrollTrigger: {
    //             trigger: elem,
    //             start: 'top 90%',
    //             end: 'bottom 90%',
    //             toggleActions: 'play none resume reset',
    //         },
    //     });
    // });
}

const fn_mo_membership = a => {
    fadeInAniY([a.querySelector('.titles')]);
    fadeInAniY([a.querySelector('.list .start')]);

    ScrollTrigger.create({
        trigger: a,
        start: 'top center',
        end: 'bottom+=100px bottom',
        // markers: true,
        onEnter: function() {
            a.classList.add('active');
        },
        onEnterBack: function() {
            a.classList.add('active');
        },
        onLeave: function() {
            a.classList.remove('active');
        },
        onLeaveBack: function() {
            a.classList.remove('active');
        },
    });

    let slides = gsap.utils.toArray(document.querySelectorAll('.item'));
    let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

    slides.forEach((slide, i) => {
        let
            bg = slide.querySelector('.background'),
            txt = slide.querySelector('.content');

        let slideAni = gsap.timeline({
            scrollTrigger: {
                trigger: slide,
                start: () => i ? 'top bottom' : 'top top',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true
            }
        });

        if (bg && txt) {
            slideAni.fromTo(bg, {
                y: () => i ? -window.innerHeight * getRatio(slide) : 0
            }, {
                y: () => window.innerHeight * (1 - getRatio(slide)),
                ease: 'none'
            });

            slideAni.fromTo(txt, {
                y: () => i ? window.innerHeight * -getRatio(slide) * 2 : 0
            }, {
                y: () => window.innerHeight * getRatio(slide) * 2,
                ease: 'none'
            }, 0);
        }
    });

    fadeInAniY([a.querySelector('.list .end')]);
}

const fn_mo_customized = a => {
    fadeInAniX([a.querySelector('.titles')]);
	fadeInAniReverseX([a.querySelector('.list')]);

	ScrollTrigger.create({
		trigger: a,
		start: 'top 50%',
		onEnter: function() {
            a.classList.add('active');
        },
        onEnterBack: function() {
            a.classList.add('active');
        },
        onLeave: function() {
            a.classList.remove('active');
        },
        onLeaveBack: function() {
            a.classList.remove('active');
        },
	});

	let con06BgSwiper = new Swiper(a.querySelector('.background .swiper'), {
		effect: 'fade',
		loop: true,
		speed: 1000,
		slidesPerView: 1,
		simulateTouch: false,
		watchSlidesProgress: true,
	});

	let con06Swiper = new Swiper(a.querySelector('.list .swiper'), {
		effect: 'fade',
		loop: true,
		speed: 1000,
		slidesPerView: 1,
		navigation: {
			nextEl: a.querySelector('.list .next'),
			prevEl: a.querySelector('.list .prev'),
		},
		thumbs: {
			swiper: con06BgSwiper,
		},
	});
}

const fn_mo_product = a => {
    fadeInAniY([a.querySelector('.titles')]);
    fadeInAniY([a.querySelector('.subtext'), a.querySelector('.tab'), a.querySelector('.content')]);

    ScrollTrigger.create({
        trigger: a,
        start: '-15% center',
        onEnter: function() {
            a.classList.add('active');
        },
        onEnterBack: function() {
            a.classList.add('active');
        },
        onLeave: function() {
            a.classList.remove('active');
        },
        onLeaveBack: function() {
            a.classList.remove('active');
        },
    });

    let subtexts = a.querySelectorAll('.subtext .title');
    let tabs = a.querySelectorAll('.tab .menu');
    let contents = a.querySelectorAll('.content .box');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            let index = tab.getAttribute('data-index');
            
            subtexts.forEach(function(subtext) {
                subtext.classList.remove('active');
            });
            subtexts[index].classList.add('active');
            
            tabs.forEach(function(item) {
                item.classList.remove('active');
            });
            tab.classList.add('active');

            contents.forEach(function(content) {
                content.classList.remove('active');
            });
            contents[index].classList.add('active');
        });
    });
}

const fn_mo_community = a => {
    fadeInAniY([a.querySelector('.titles')]);
    fadeInAniY([a.querySelector('.tab'), a.querySelector('.content')]);

    ScrollTrigger.create({
        trigger: a,
        start: '-25% center',
        onEnter: function() {
            a.classList.add('active');
        },
        onEnterBack: function() {
            a.classList.add('active');
        },
        onLeave: function() {
            a.classList.remove('active');
        },
        onLeaveBack: function() {
            a.classList.remove('active');
        },
    });

    let tabs = a.querySelectorAll('.tab .menu');
    let contents = a.querySelectorAll('.content .box');

    contents.forEach(function(content) {
        new Swiper(content.querySelector('.swiper'), {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 16,
        });
    });

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            
            tabs.forEach(function(item) {
                item.classList.remove('active');
            });

            tab.classList.add('active');

            contents.forEach(function(content) {
                content.classList.remove('active');
            });

            let index = tab.getAttribute('data-index');
            contents[index].classList.add('active');
        });
    });
}

const fn_mo_default = a => {
    fadeInAniY([a.querySelector('.inner')]);
}

setTimeout(() => {
    for(let i of document.querySelectorAll('.mo-area')) {
        fn_mo_default(i);
        if(i.classList.contains('mo-keyvisual')){
            fn_mo_keyvisual(i);
        }
        if(i.classList.contains('mo-recommend')){
            fn_mo_recommend(i);
        }
        if(i.classList.contains('mo-tgs')){
            fn_mo_tgs(i);
        }
        if(i.classList.contains('mo-season')){
            fn_mo_season(i);
        }
        if(i.classList.contains('mo-membership')){
            fn_mo_membership(i);
        }
        if(i.classList.contains('mo-customized')){
            fn_mo_customized(i);
        }
        if(i.classList.contains('mo-product')){
            fn_mo_product(i);
        }
        if(i.classList.contains('mo-community')){
            fn_mo_community(i);
        }
    }
}, 0);