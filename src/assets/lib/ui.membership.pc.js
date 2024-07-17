gsap.registerPlugin(ScrollTrigger);

const scrollctr = {
    lock() {
        window.addEventListener('wheel', this.scrollhandler, {passive: false});
    },
    clear() {
        window.removeEventListener('wheel', this.scrollhandler);
    },
    scrollhandler(event) {
        event.preventDefault();
    }
};
const scrollsmt = {
    st : '',
    dst : 24,
    acl : 1.8,
    dcl : 0.9,
    stm : '',
    trg : false,
    hgt : false,
    str : undefined,
    end : undefined,
    handler : '',
    mod : '',
    init(a, b) {
        if(a) this.str = a;
        if(b) this.end = b;
        if(! document.body.classList.contains('smt')) {
            this.handler = this.move.bind(this);
            document.body.classList.add('smt');
            window.addEventListener('wheel', this.handler, {passive: false});
        }
    },
    move(e) {
        e.preventDefault();
        if(this.trg == false) {
            this.st = Math.abs(document.body.getBoundingClientRect().top) || window.scrollTop || 0;
            e.deltaY > 0 ? this.stm = 0.1 : this.stm = -0.1;
            this.trg = true;
            this.hgt = true;
            this.interval();
        } else {
            this.hgt = false;
            this.stm = e.deltaY > 0 ? this.dst : -this.dst;
        }
    },
    interval() {
        if(this.trg) {
            this.stm *= this.hgt == true ? this.acl : this.dcl;
            Math.abs(this.stm) < 0.1 && this.hgt == false ? this.trg = false : true;
            Math.abs(this.stm) >= Math.abs(this.dst) ? this.hgt = false : true;
            this.st += this.stm;

            if(this.str != undefined && (this.st <= this.str)) {
                this.st = this.str;
            }
            if(this.end != undefined && (this.st >= this.end)) {
                this.st = this.end;
            }

            window.scrollTo(0, this.st);
            requestAnimationFrame(this.interval.bind(this));
        }
    },
    clear() {
        if(document.body.classList.contains('smt')) {
            document.body.classList.remove('smt');
            this.str = undefined;
            this.end = undefined;
            window.removeEventListener('wheel', this.handler);
        }
    }
};

// let initDelayTime = 1500;
let membershipSection = document.querySelector('.membership-section');
let membershipSectionArea = membershipSection.querySelectorAll('.pc-area');


const pc_setting = () => {
    const trigger = ScrollTrigger.create({
        trigger: membershipSection.firstElementChild,
        start: '20% top',
        end: '50% bottom',
        onEnter(){
            gsap.to(membershipSection.querySelector('.down'), {opacity: 0, x: 0});
            gsap.to(membershipSection.querySelector('.bar'), {opacity: 0, x: '100%'});
        },
        onLeaveBack(){
            gsap.to(membershipSection.querySelector('.down'), {opacity: 1, x: 0});
            gsap.to(membershipSection.querySelector('.bar'), {opacity: 1, x: 0});
        }
    });
    trigger.vars.onLeaveBack();
}

const pc_navigation = () => {
    const navUl = membershipSection.querySelector('.nav ul');
    const navItems = [];
    membershipSectionArea.forEach((area, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add('dot');
        span.textContent = index;
        li.appendChild(span);

        if (index === 0) {
            li.classList.add('active');
        }

        navUl.appendChild(li);
        navItems.push(li);
    });

    navItems.forEach((li, index) => {
        li.addEventListener('click', function () {
            const target = membershipSectionArea[index];
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const navOnScroll = () => {
        let currentActiveIndex = -1;

        membershipSectionArea.forEach((area, index) => {
            const rect = area.getBoundingClientRect();
            const offset = window.innerHeight * 0.5;

            if (rect.top <= offset && rect.bottom >= offset) {
                currentActiveIndex = index;
            }
        });

        if (currentActiveIndex !== -1) {
            navItems.forEach(li => li.classList.remove('active'));
            navItems[currentActiveIndex].classList.add('active');
        }
    };
    window.addEventListener('scroll', navOnScroll);
    navOnScroll();
}

const fn_pc_keyvisual = a => {
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

const fn_pc_recommend = a => {
    ScrollTrigger.create({
        trigger: a,
        start: '-15% center',
        onEnter: function() {
            a.classList.add('active');
        },
        onLeaveBack: function() {
            a.classList.remove('active');
        },
    });

    let slides = a.querySelectorAll('.slide');
    slides.forEach(function(slide) {
        slide.addEventListener('mouseover', function() {
            slide.classList.add('active');
        });

        slide.addEventListener('mouseout', function() {
            slide.classList.remove('active');
        });
    });

    let tabs = a.querySelectorAll('.tab .menu');
    let contents = a.querySelectorAll('.content .box');
    let recommendSwiperAct = new Swiper(a.querySelector('.active .swiper'), {
        slidesPerView: 'auto',
        spaceBetween: 12,
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
                let recommendSwiper = new Swiper(content.querySelector('.swiper'), {
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                });
            });

            let index = tab.getAttribute('data-index');
            contents[index].classList.add('active');
        });
    });
}

const fn_pc_tgs = a => {
    let prevPcTgs = a.previousElementSibling;
    gsap.set(a.querySelector('.dim'), {opacity: 1});
    gsap.set(a.querySelector('.text-box'), {y: '50px', opacity: 0});
    gsap.set(a.querySelector('.card-box'), {y: '50px', opacity: 0});

	let tgsSetTop = gsap.timeline({
		scrollTrigger: {
			trigger: prevPcTgs,
			start: '80% 20%',
			onEnter: function() {
				gsap.to(a.querySelector('.dim'), {opacity: 0, duration: 2.5, ease: 'power3.out'});
				gsap.to(a.querySelector('.text-box'), {y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.2,
				onComplete(){
					// document.querySelector('.con03 .top .txt01').classList.add('hover');
					setTimeout(() => {
						//document.querySelector('.con03 .top .txt01').classList.remove('hover');
					}, 1000);
				}});
				gsap.to(a.querySelector('.card-box'), {y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.6});
			},
			onLeaveBack: function() {
				gsap.to(a.querySelector('.dim'), {opacity: 1});
				gsap.to(a.querySelector('.text-box'), {y: '50px', opacity: 0});
				gsap.to(a.querySelector('.card-box'), {y: '50px', opacity: 0});
			}
		}
	});

	let tgsSet = gsap.timeline({
		scrollTrigger: {
			trigger: a,
			start: 'top top',
			end: '+=4000 bottom',
			pin: true,
			scrub: 1,
			id: 'scrollTriggerPcTgs',
		}
	});

	tgsSet.fromTo(a.querySelector('.list1'),
		{bottom: 140, yPercent: 100},
		{bottom: 0, yPercent: 0}
	, 'a')
	.fromTo(a.querySelector('.list2'),
		{top: 0 , yPercent: -100},
		{top: 140, yPercent: 0}
	, 'a')
	.fromTo(a.querySelector('.list'),
		{opacity: 1},
		{opacity: 1, duration: 0.2}
	, 'b');

    let cards = a.querySelectorAll('.card-box .list .item');
    cards.forEach(function(card) {
        card.addEventListener('mouseover', function() {
            card.classList.add('active');
        });

        card.addEventListener('mouseout', function() {
            card.classList.remove('active');
        });
    });

    let slides = a.querySelectorAll('.scroll-box .list .item');
    slides.forEach(function(slide) {
        slide.addEventListener('mouseover', function() {
            slide.classList.add('active');
        });

        slide.addEventListener('mouseout', function() {
            slide.classList.remove('active');
        });
    });
}

const fn_pc_season = a => {
    const tabs = a.querySelectorAll('.tab .menu');
    const items = a.querySelectorAll('.list .item');
    const prevButtons = a.querySelectorAll('button.prev');
    const nextButtons = a.querySelectorAll('button.next');

    let currentIndex = 0;

    const createAnimation = target => {
        return gsap.timeline({ paused: true })
            .to(target.querySelector('.box1'), { backgroundColor: 'rgba(255, 255, 255, 0.3)', duration: 0.8})
            .from(target.querySelector('.box1 .lable', '.box1 .tit'), {opacity: 0, y: '50px', duration: 0.5}, '-=0.3')
            .from(target.querySelector('.box1 .subtxt'), {opacity: 0, y: '50px', duration: 0.5}, '-=0.3')
            .to(target.querySelector('.box2'), { backgroundColor: 'rgba(255, 255, 255, 0.1)' }, '-=0.9')
            .from(target.querySelector('.box2 .content'), { opacity: 0, y: '50px', duration: 0.5 }, '-=0.3')
            .to(target.querySelector('.box3'), { backgroundColor: 'rgba(3, 15, 48, 0.4)' }, '-=0.9')
            .from(target.querySelector('.box3 .content'), { opacity: 0, y: '50px', duration: 0.5 }, '-=0.3')
    }

    const animations = Array.from(items).map(item => createAnimation(item));

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
            
            let box2Swiper = new Swiper(item.querySelector('.box2 .swiper'), {
                direction: "vertical",
                slidesPerView: "auto",
                freeMode: true,
                scrollbar: {
                    el: ".swiper-scrollbar",
                },
                mousewheel: true,
            });
            let box3Swiper = new Swiper(item.querySelector('.box3 .swiper'), {
                direction: "vertical",
                slidesPerView: "auto",
                freeMode: true,
                scrollbar: {
                    el: ".swiper-scrollbar",
                },
                mousewheel: true,
            });
            
            item.querySelectorAll('.swiper').forEach(box => {
                box.addEventListener('wheel', (event) => {
                    scrollsmt.clear();
                    event.stopPropagation();
                });
            });

            document.addEventListener('wheel', event => {
                if (!event.target.closest('.swiper')) {
                    scrollsmt.init();
                }
            });

            if (i === index) {
                item.classList.add('active');
                animations[i].restart();
                box2Swiper.init();
                box3Swiper.init();
            } else {
                item.classList.remove('active');
                box2Swiper.destroy();
                box3Swiper.destroy();
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

    ScrollTrigger.create({
        trigger: a,
        start: '-10% center',
        onEnter: function() {
            a.classList.add('active');
            updateActiveTab(currentIndex);
            updateActiveItem(currentIndex);
        },
        onLeaveBack: function() {
            a.classList.remove('active');
        },
    });
}

const fn_pc_membership = a => {
    let pcMembershipFirst = a.querySelector('.first');
    ScrollTrigger.create({
        trigger: pcMembershipFirst,
        start: 'top center',
        onEnter: function() {
            a.classList.add('active');
            pcMembershipFirst.classList.add('active');
        },
        onLeaveBack: function() {
            a.classList.remove('active');
            pcMembershipFirst.classList.remove('active');
        },
    });

    let pcMembershipLast = a.querySelector('.last');
    ScrollTrigger.create({
        trigger: pcMembershipLast,
        start: 'top center',
        onEnter: function() {
            pcMembershipLast.classList.add('active');
        },
        onLeaveBack: function() {
            pcMembershipLast.classList.remove('active');
        },
    });

    let slides = gsap.utils.toArray(document.querySelectorAll('.item'));
    let getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);

    slides.forEach((slide, i) => {
        let bg = slide.querySelector('.background');
        let content = slide.querySelector('.content');

        // a.querySelectorAll('.scroll').forEach(box => {
        //     box.addEventListener('wheel', (event) => {
        //         scrollsmt.clear();
        //         event.stopPropagation();
        //     });
        // });
    
        // a.addEventListener('wheel', event => {
        //     if (!event.target.closest('.scroll')) {
        //         scrollsmt.init();
        //     }
        // });

        let slideAni = gsap.timeline({
            scrollTrigger: {
                trigger: slide,
                start: () => i ? 'top bottom' : 'top top',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true
            }
        });

        if (bg && content) {
            slideAni.fromTo(bg, {
                y: () => i ? -window.innerHeight * getRatio(slide) : 0
            }, {
                y: () => window.innerHeight * (1 - getRatio(slide)),
                ease: 'none'
            });

            slideAni.fromTo(content, {
                y: () => i ? window.innerHeight * -getRatio(slide) * 2 : 0
            }, {
                y: () => window.innerHeight * getRatio(slide) * 2,
                ease: 'none'
            }, 0);
        }
    });
}

const fn_pc_customized = a => {
    let customizedSwiperBg = new Swiper(a.querySelector('.background .swiper'), {
		effect: 'fade',
		loop: true,
		speed: 1000,
		slidesPerView: 1,
		simulateTouch: false,
		watchSlidesProgress: true,
	});
    let customizedSwiper = new Swiper(a.querySelector('.list'), {
        effect: 'fade',
        loop: true,
        speed: 1000,
        slidesPerView: 1,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: '.pc-customized .next',
            prevEl: '.pc-customized .prev',
        },
        thumbs: {
			swiper: customizedSwiperBg,
		},
        on: {
            slideChange: function(){
                let slides = a.querySelectorAll('.swiper-slide');
                slides.forEach(slide => slide.classList.remove('active-slide'));
            }
        }
    });

    ScrollTrigger.create({
		trigger: a,
		start: 'top center',
		onEnter: function() {
			a.classList.add('active');
            customizedSwiper.autoplay.start();
		},
		onLeaveBack: function() {
			a.classList.remove('active');
            customizedSwiper.autoplay.stop();
		},
	});
}

const fn_pc_product = a => {
    ScrollTrigger.create({
        trigger: a,
        start: '-15% center',
        onEnter: function() {
            a.classList.add('active');
        },
        onLeaveBack: function() {
            a.classList.remove('active');
        },
    });

    let slides = a.querySelectorAll('.slide');
    slides.forEach(function(slide) {
        slide.addEventListener('mouseover', function() {
            slide.classList.add('active');
        });

        slide.addEventListener('mouseout', function() {
            slide.classList.remove('active');
        });
    });

    let tabs = a.querySelectorAll('.tab .menu');
    let contents = a.querySelectorAll('.content .box');
    let productSwiperAct = new Swiper(a.querySelector('.active .swiper'), {
        slidesPerView: 'auto',
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
                let productSwiper = new Swiper(content.querySelector('.swiper'), {
                    slidesPerView: 'auto',
                });
            });

            let index = tab.getAttribute('data-index');
            contents[index].classList.add('active');
        });
    });
}

const fn_pc_community = a => {
    ScrollTrigger.create({
        trigger: a,
        start: '-25% center',
        onEnter: function() {
            a.classList.add('active');
        },
        onLeaveBack: function() {
            a.classList.remove('active');
        },
    });

    let boardAni = gsap.timeline({
        scrollTrigger: {
            trigger: a,
            start: 'top top',
            //end: '+=3000 bottom',
            pin: true,
            scrub: 1,
        }
    });

    boardAni.fromTo(a.querySelector('.list1'),
        {bottom: '-640px'},
        {bottom: 0}
    , 'a')
    .fromTo(a.querySelector('.list2'),
        {top: '-340px'},
        {top: '100px'}
    , 'a')
    .fromTo(a,
        {opacity: 1},
        {opacity: 1, duration: 0.2}
    , 'b');


    let tabs = a.querySelectorAll('.tab .menu');
    let contents = a.querySelectorAll('.box2 .board');

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

const pc_help_resize = () => {
    if(document.body.clientWidth > 1920) {
        for(let i of document.querySelectorAll('.pc-help')) {
            i.classList.add('wide');
        }
    } else {
        for(let i of document.querySelectorAll('.pc-help')) {
            i.classList.remove('wide');
        }
    }
};

const setfloatingAni = (floatingEl) => {
    let floatingAni = gsap.timeline({ paused: true });
    floatingAni.to(floatingEl.querySelector('.floating'), { opacity: 1, bottom: '52px', duration: 0.2, delay: 0.6 }, 'a')
        .to(floatingEl.querySelector('.before'), { rotation: 315, duration: 1.4, delay: 0.4 }, 'a')
        .to(floatingEl.querySelector('.after'), { rotation: 315, duration: 1.4, delay: 0.4 }, 'a')
        .to(floatingEl.querySelector('.box'), { width: 'auto', duration: 0.6, delay: 1.5 }, 'a')
        .to(floatingEl.querySelector('.txt'), { opacity: 1, duration: 0.6, delay: 1.8 }, 'a')
        .to(floatingEl.querySelector('.btn-go'), { opacity: 1, duration: 0.6, delay: 2.0 }, 'a');

    return floatingAni;
}

const setFloatingTrigger = (section) => {
    // const sectionHeight = section.innerHeight;
    // const viewportHeight = window.innerHeight;

    // let startValue;
    // let endValue;

    // if (sectionHeight >= viewportHeight) {
    //     // section 높이가 100vh와 같거나 클때
    //     startValue = 'top center';
    //     endValue = '140% bottom';
    // } else {
    //     // section 높이가 100vh를 넘지 않을때
    //     startValue = 'top bottom';
    //     endValue = '140% bottom';
    // }

    ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom+=1px bottom',
        toggleClass: {
            targets: section.querySelectorAll('.pc-floting'),
            className: 'in'
        }
        // onEnter() {
        //     floatingAni.play();
        // },
        // onLeave() {
        //     floatingAni.reverse();
        // },
        // onEnterBack() {
        //     floatingAni.play();
        // },
        // onLeaveBack() {
        //     floatingAni.reverse();
        // },
    });
}

const floting_pc = a => {
    let target = a.closest('.pc-area');
    
    ScrollTrigger.create({
        trigger: target,
        start: 'top center',
        //end: 'bottom+=1px bottom',
        end: '140% bottom',
        toggleClass: {
            targets: a,
            className: 'in'
        }
    });

    //setFloatingTrigger(target)
    //let floatingAni = setfloatingAni(a);
    //setFloatingTrigger(target, floatingAni);
    //console.log('floating_pc', target)
}

//init
scrollctr.lock();
setTimeout(() => {
    pc_setting();
    pc_navigation();
    pc_help_resize();
    scrollsmt.init();
    window.addEventListener('resize', () => {
        pc_help_resize();
    });
    window.addEventListener('scroll', () => {
        pc_help_resize();
    });
    for(let i of document.querySelectorAll('.pc-area')) {
        if(i.classList.contains('pc-keyvisual')){
            fn_pc_keyvisual(i);
        }
        if(i.classList.contains('pc-recommend')){
            fn_pc_recommend(i);
        }
        if(i.classList.contains('pc-tgs')){
            fn_pc_tgs(i);
        }
        if(i.classList.contains('pc-season')){
            fn_pc_season(i);
        }
        if(i.classList.contains('pc-membership')){
            fn_pc_membership(i);
        }
        if(i.classList.contains('pc-customized')){
            fn_pc_customized(i);
        }
        if(i.classList.contains('pc-product')){
            fn_pc_product(i);
        }
        if(i.classList.contains('pc-community')){
            fn_pc_community(i);
        }
    }
    for(let j of document.querySelectorAll('.pc-floting')) {
        let w = Math.ceil(j.querySelector('.before').offsetWidth + 57);
        w > 620 ? w = 620 : w = w;
        j.querySelector('.before').classList.add('width' + w);
        j.querySelector('.before').classList.remove('before');
        floting_pc(j);
    }
}, 500);

function btnConsult(){
    const target = document.querySelector('.pc-consult');
    target.classList.add('active');

    scrollsmt.clear();
    target.querySelector('.inner').addEventListener('wheel', () => {
        scrollctr.clear();
    });

    target.querySelector('.bt-consult-close').addEventListener('click', () => {
        target.classList.remove('active');
        scrollsmt.init();
    })
}