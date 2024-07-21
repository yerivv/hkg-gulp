console.log('멤버십 모바일');
gsap.registerPlugin(ScrollTrigger);

const mo_setting = () => {
    const membershipSection = document.querySelector('.membership-section');
    const trigger = ScrollTrigger.create({
        trigger: membershipSection.firstElementChild,
        start: '20% top',
        end: '50% bottom',
        onLeave: () => membershipSection.querySelector('.mo-bar').classList.remove('active'),
        onLeaveBack: () => membershipSection.querySelector('.mo-bar').classList.add('active')
    });
    trigger.vars.onLeaveBack();
	//스크롤 버그 픽스
    //ScrollTrigger.normalizeScroll(false);
	if(navigator.userAgent.toLowerCase().indexOf('android') > -1 || navigator.userAgent.indexOf('NAVER') > -1 || navigator.userAgent.indexOf('KAKAOTALK') > -1) {
		//ScrollTrigger.normalizeScroll(true);
	}
};

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
                if(this.slides[activeIndex].querySelector('video')) {
                    this.slides[activeIndex].querySelector('video').play();
                }
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
    ScrollTrigger.create({
        trigger: a,
        start: '-15% center',
        onEnter: () => a.classList.add('active'),
        onLeaveBack: () => a.classList.remove('active'),
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

    let tgsSetTop = gsap.timeline({
        scrollTrigger: {
            trigger: prevPcTgs,
            start: 'bottom center',
            onEnter: () => a.classList.add('active'),
            onLeaveBack: () => a.classList.remove('active')
        }
    });

    let tgsSet = gsap.timeline({
        scrollTrigger: {
            trigger: a,
            start: '444px top',
            end: '+=1400 center',
            pin: true,
            scrub: 1,
        },
    });
    tgsSet.fromTo(a.querySelector('.list1'), {x: '32px'}, {x: '-404px'}, 'a')
        .fromTo(a.querySelector('.list2'), {x: '-404px'}, {x: '32px'}, 'a');
}

const fn_mo_season_back = a => {
    ScrollTrigger.create({
        trigger: a,
        start: '-15% center',
        onEnter: () => a.classList.add('active'),
        onLeaveBack: () => a.classList.remove('active'),
    });

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
}
const fn_mo_season = a => {
    ScrollTrigger.create({
        trigger: a,
        start: '-15% center',
        onEnter: () => a.classList.add('active'),
        onLeaveBack: () => a.classList.remove('active'),
    });

    const tabs = a.querySelectorAll('.tab .menu');
    const items = a.querySelectorAll('.tab-wrap > .content .item');
    const prevButtons = a.querySelectorAll('button.prev');
    const nextButtons = a.querySelectorAll('button.next');
    const tabContainer = a.querySelector('.tab');
    
    let currentIndex = 0;

    const updateActiveTab = index => {
        tabs.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add('active');
                const tabOffsetLeft = tab.offsetLeft;
                const tabOffsetWidth = tab.offsetWidth;
                const containerScrollWidth = tabContainer.scrollWidth;
                const containerClientWidth = tabContainer.clientWidth;
                let scrollLeftValue = tabOffsetLeft - (containerClientWidth / 2) + (tabOffsetWidth / 2);
                
                if (scrollLeftValue < 0) {
                    scrollLeftValue = 0;
                } else if (scrollLeftValue + containerClientWidth > containerScrollWidth) {
                    scrollLeftValue = containerScrollWidth - containerClientWidth;
                }
                
                tabContainer.scrollLeft = scrollLeftValue;
            } else {
                tab.classList.remove('active');
            }
        });
    }

    const updateActiveItem = index => {
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                item.closest('.content').scrollLeft = 0;
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
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateActiveTab(currentIndex);
            updateActiveItem(currentIndex);
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % items.length;
            updateActiveTab(currentIndex);
            updateActiveItem(currentIndex);
        });
    });
}

const fn_mo_membership = a => {
    ScrollTrigger.create({
        trigger: a,
        start: 'top center',
        end: 'bottom+=100px bottom',
        onEnter: () => a.classList.add('active'),
        onLeaveBack: () => a.classList.remove('active'),
    });

    ScrollTrigger.create({
        trigger: a.querySelector('.end'),
        start: 'top center',
        //end: 'bottom+=100px bottom',
        onEnter: () => a.classList.add('active'),
        onLeaveBack: () => a.classList.remove('active'),
    });

    let movementFactor = 0.8;
    let slides = a.querySelectorAll('.item');
    let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

    slides.forEach((slide, i) => {
        let bg = slide.querySelector('.background');
        let txt = slide.querySelector('.content');

        gsap.fromTo(bg, {
            y: () => i ? -movementFactor * 0.5 * slide.offsetHeight : 0
        }, {
            y: () => movementFactor * 0.5 * slide.offsetHeight,
            ease: "none",
            scrollTrigger: {
                trigger: slide,
                start: () => i ? "top bottom" : "-1px top", 
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true // to make it responsive
            }
        });

        // gsap.fromTo(txt, {
        //     //y: () => i ? -movementFactor * 1 * slide.offsetHeight : 0
        //     y: () => i ? -movementFactor * 0.5 * slide.offsetHeight : 0
        // }, {
        //     //y: () => movementFactor * 1 * slide.offsetHeight,
        //     y: () => movementFactor * 0.5 * slide.offsetHeight,
        //     ease: "none",
        //     scrollTrigger: {
        //         trigger: slide,
        //         start: () => i ? "top bottom" : "-1px top", 
        //         end: "bottom top",
        //         scrub: true,
        //         invalidateOnRefresh: true // to make it responsive
        //     }
        // });
    });
}

const fn_mo_customized = a => {
    ScrollTrigger.create({
        trigger: a,
        start: '-15% center',
        onEnter: () => a.classList.add('active'),
        onLeaveBack: () => a.classList.remove('active')
    });

	const backgroundSwiper = new Swiper(a.querySelector('.background .swiper'), {
		effect: 'fade',
		loop: true,
		speed: 1000,
		slidesPerView: 1,
		simulateTouch: false,
		watchSlidesProgress: true,
	});

	const bannerSwiper = new Swiper(a.querySelector('.list .swiper'), {
		effect: 'fade',
		loop: true,
		speed: 1000,
		slidesPerView: 1,
		navigation: {
			nextEl: a.querySelector('.list .next'),
			prevEl: a.querySelector('.list .prev'),
		},
		thumbs: {
			swiper: backgroundSwiper,
		},
	});
}

const fn_mo_product = a => {
    ScrollTrigger.create({
        trigger: a,
        start: '-15% center',
        onEnter: () => a.classList.add('active'),
        onLeaveBack: () => a.classList.remove('active')
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

            ScrollTrigger.refresh();
        });
    });
}

const fn_mo_community = a => {
    ScrollTrigger.create({
        trigger: a,
        start: '-25% center',
        onEnter: () => a.classList.add('active'),
        onLeaveBack: () => a.classList.remove('active')
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
    ScrollTrigger.create({
        trigger: a,
        start: '-1px top',
		//end: 'bottom top',
        onEnter: () => a.classList.add('active'),
        onLeaveBack: () => a.classList.remove('active')
    });
}

const floting_mo = a => {
    let target = a.closest('.mo-area');
    
    ScrollTrigger.create({
        trigger: target,
        start: 'top center',
        end: 'bottom+=1px bottom',
        //end: '140% bottom',
        toggleClass: {
            targets: target.querySelectorAll('.mo-floting'),
            className: 'in'
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
	mo_setting();
});
window.onload = function() {
    for(let i of document.querySelectorAll('.mo-area')) {
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
        if(i.classList.contains('mo-add-area')){
            fn_mo_default(i);
        }
    }
    for(let j of document.querySelectorAll('.mo-floting')) {
        floting_mo(j);
    }
}