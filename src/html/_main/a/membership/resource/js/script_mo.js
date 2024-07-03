/**
* --------------------------------
* mo js
* --------------------------------
*/


let con04Swiper = null,
	oldscrollT,
	scrollT = 0;

$(window).on('scroll', function () {
	scrollT = $(this).scrollTop();

	//header
	if ( scrollT <= 0) {
		$('header').removeClass('down up');
		if ($('.bottom.type1').length) {
			$('.bottom.type1').removeClass('down up');
		} else if ($('.bottom-floting').length) {
			$('.bottom-floting').removeClass('down up');
		}
	} else if ((scrollT > oldscrollT && oldscrollT >= 0) || (scrollT >= Number($(document).outerHeight() - $(window).height()))) {
		$('header').addClass('down').removeClass('up');
		if ($('.bottom.type1').length) {
			$('.bottom.type1').addClass('down').removeClass('up');
		} else if ($('.bottom-floting').length) {
			$('.bottom-floting').addClass('down').removeClass('up');
		}
	} else {
		$('header').removeClass('down').addClass('up');
		if ($('.bottom.type1').length) {
			$('.bottom.type1').removeClass('down').addClass('up');
		} else if ($('.bottom-floting').length) {
			$('.bottom-floting').removeClass('down').addClass('up');
		}
	}
	oldscrollT = scrollT;
});

document.addEventListener('DOMContentLoaded', function () {
	// init
	gsap.registerPlugin(ScrollTrigger);
	gsap.registerPlugin(ScrollToPlugin);
	// gsap.registerPlugin(ScrollSmoother);

	gsap.to('.con01 > .dim', {opacity: 0, delay: 0.5});
});

// load
window.addEventListener('load', function () {
	//bottom smartorder
	// $('.bottom .smartorder').addClass('active');
	// $('.bottom .smartorder .smartorder-dim').click(function () {
	// 	$('.bottom .smartorder').removeClass('active');
	// });

	const bottomType1 = document.querySelector('.bottom.type1');

	// scroll ani
	const fadeInAniY = target => {
		fadeElems = document.querySelectorAll(target);
	
		fadeElems.forEach(elem => {
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
		fadeElems = document.querySelectorAll(target);
	
		fadeElems.forEach(elem => {
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
		fadeElems = document.querySelectorAll(target);
	
		fadeElems.forEach(elem => {
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

	const bgColorT = "linear-gradient(95deg, #26D2B4 0%, #05AA8D 100%)";
	const bgColorM = "linear-gradient(107deg, #294FCB 16%, #7EB0FC 85%)"; // "linear-gradient(107deg, #0F2973 16%, #6075E5 85%)";
	const bgColorLeftT = "#26D2B4";
	const bgColorRightT = "#05aa8d";
	const bgColorLeftM = "#294FCB"; // #0F2973
	const bgColorRightM = "#7EB0FC"; // #6075E5
	const textDuration = 800;

	let bottomAni = gsap.timeline({
		delay: 2.0,
		repeat: -1,
		repeatDelay: 4,
		onStart: function() {
			// console.log('start 硫ㅻ쾭�� > �ъ뼱');
			$(".bottom.type1 .txtarea .txt1 .membership").delay(1000).fadeOut(textDuration);
			$(".bottom.type1 .txtarea .txt1 .tours").delay(1000).fadeIn(textDuration);
		},
		onRepeat: function() {
			// console.log('repeat 硫ㅻ쾭�� > �ъ뼱');
			$(".bottom.type1 .txtarea .txt1 .membership").stop().delay(1000).fadeOut(textDuration);
			$(".bottom.type1 .txtarea .txt1 .tours").stop().delay(1000).fadeIn(textDuration);
		},
	})
	.fromTo(".bottom.type1 .txtarea .bg .left", {background: bgColorLeftM}, {ease: "none", duration: 1.5, background: bgColorLeftT, repeat: 1, yoyo: true, repeatDelay: 3,}, 'a')
	.fromTo(".bottom.type1 .txtarea .bg .right", {background: bgColorRightM}, {ease: "none", duration: 1.5, background: bgColorRightT, repeat: 1, yoyo: true, repeatDelay: 3,}, 'a')
	.fromTo(".bottom.type1 .txtarea .bg div", {background: bgColorM}, {ease: "none", duration: 1.5, background: bgColorT, repeat: 1, yoyo: true, repeatDelay: 3,
		onComplete: function() {
			// console.log('complete �ъ뼱 > 硫ㅻ쾭��');
			$(".bottom.type1 .txtarea .txt1 .membership").delay(0).stop().fadeIn(textDuration);
			$(".bottom.type1 .txtarea .txt1 .tours").delay(0).stop().fadeOut(textDuration);
		}
	}, 'a');

	// con01
	let initDelayTime = 1500;
	let con01Swiper;
	let con01Split01 = new SplitText('.con01-swiper .slide01 .text .txt02', {type:'words,lines', linesClass:'line-cover'});
	let con01Split02 = new SplitText('.con01-swiper .slide02 .text .txt02', {type:'words,lines', linesClass:'line-cover'});

	gsap.set('.con01-swiper .swiper-slide .text .txt02', {opacity: 0});
	gsap.set('.con01 .con01-swiper .slide01 .text, .con01 .con01-swiper .indicator', {opacity: 0});

	// box motion
	gsap.timeline({defaults: { ease: 'circ.out', }})
	.to('.con01 .box .top', {
		height: 0,
		duration: 1.0,
		delay: 1.0,
		onComplete() {
			gsap.to('.con01 .con01-swiper .slide01 .text, .con01 .con01-swiper .indicator', {opacity: 1});
			gsap.to('#header', {opacity: 1, y: 0, duration: 1.2});
			// gsap.to('.nav, .scroll-down', {opacity: 1, x: 0, duration: 1.2});
			// gsap.to('.btn-tour', {opacity: 1, x: 0, duration: 1.2});
			// gsap.to('.channeltalk', {opacity: 1, y: 0, duration: 1.2, ease: 'power3.inOut'});
		}
	})
	.to('.con01 .box .left, .con01 .box .bottom', {
		height: 0,
		duration: 1.2,
		delay: -1.0,
		onComplete() {
			// console.log('box motion end');
			$('.con01 .box').hide();
			// smoother.paused(false); // scroll unlock
			document.querySelector('.con01').classList.add('active');
			document.body.classList.remove('fixed');
			document.getElementById('header').classList.add('active');
			if (document.querySelector('.bottom-floting')) {
				document.querySelector('.bottom-floting').classList.add('active');
			}

			// if (bottomType1) {
			// 	bottomType1.classList.remove('on');
			// 	document.querySelector('.bottom.type1 .bfloting').classList.add('active');
			// }
			// document.querySelector('.channeltalk').classList.add('active');
		}
	});

	let con01Ani = gsap.timeline({
		scrollTrigger: {
			trigger: ".con01",
			start: "top center",
			end: 'center center-=10%',
			// markers: true,
			toggleClass: 'active',
			onEnterBack: function() {
				// console.log('onEnterBack')
				if (!bottomAni.isActive()) bottomAni.restart();
			}
		}
	})

	const con01AniTxt = idx => {
		gsap.set('.con01-swiper .swiper-slide .text .txt02', {opacity: 0});

		setTimeout(() => {
			gsap.set('.con01-swiper .swiper-slide-active .text .txt02', {opacity: 1});
			gsap.from(idx == 0 ? con01Split01.words : con01Split02.words, {opacity: 0, y: 50, stagger: 0.08});
		}, 500);
	}

	setTimeout(() => {
		con01Swiper = new Swiper('.con01 .con01-swiper .swiper', {
			effect: 'fade',
			speed: 800,
			autoplay: {
				delay: 8000,
				disableOnInteraction: false,
			},
			// loop: true,
			autoplayDisableOnInteraction: false,
			observer: true,
			observeParents: true,
			navigation: {
				nextEl: '.con01 .con01-swiper .swiper-button-next',
				prevEl: '.con01 .con01-swiper .swiper-button-prev',
			},
			pagination: {
				el: '.con01 .swiper-pagination',
				type: 'fraction',
					formatFractionCurrent: number => {
						return '0' + number
					},
					formatFractionTotal: number => {
						return '0' + number
					},
					renderFraction: (currentClass, totalClass) => {
						return '<span class="' + currentClass + '"></span><span class="' + totalClass + '"></span>';
					}
				},
			on: {
				init: function(){
					let activeIndex = this.activeIndex;

					// video
					this.slides[activeIndex].querySelector('video').play();

					// txt
					con01AniTxt(activeIndex);
				},
				slideChangeTransitionStart: function () {
					let activeIndex = this.activeIndex;

					// video
					let videos = document.querySelectorAll('.con01 .con01-swiper .video video');

					Array.from(videos).forEach(video => {
						video.pause();
						video.currentTime = 0;
					});

					if ($(this.slides[activeIndex]).find('video').length) {
						this.slides[activeIndex].querySelector('video').play();
					}

					// txt
					con01AniTxt(activeIndex);

					$('.con01 .swiper-btn-play').removeClass('active');
				},
				slideChangeTransitionEnd: () => {
					$('.con01 .swiper-btn-play').addClass('active');
				},
			},
		});

		con01Swiper.autoplay.stop();

		setTimeout(function() {
			con01Swiper.autoplay.start();
			$('.con01 .swiper-btn-play').addClass('active');
		}, 100);

		$('.con01 .swiper-btn-play').click(function() {
			if ($(this).hasClass('active')) {
				con01Swiper.autoplay.stop();
				$(this).removeClass('active').addClass('play');
			} else {
				con01Swiper.autoplay.start();
				$(this).addClass('active').removeClass('play');
			}
		});

		$('.con01 .con01-swiper .swiper-button-prev, .con01 .con01-swiper .swiper-button-next').click(function(){
			if (!con01Swiper.autoplay.running) {
				con01Swiper.autoplay.start();
				$('.con01 .swiper-btn-play').addClass('active').removeClass('play');
			}
		});

		const circleEl = document.querySelector('.con01 .swiper-btn-play span circle');
		circleEl.style.setProperty('--total_length', circleEl.getTotalLength());

		con01Swiper.on('slideChange', function() {
			if (!$('.con01 .swiper-btn-play').hasClass('play')) {
				$('.con01 .swiper-btn-play').removeClass('play active');
			}

			setTimeout(function() {
				if (!$('.con01 .swiper-btn-play').hasClass('play')) {
					$('.con01 .swiper-btn-play').addClass('active');
				}
			}, 100);
		});
	}, initDelayTime);

	fadeInAniReverseX('.con02 .text .tit');
	fadeInAniReverseX('.con02 .text .txt');
	fadeInAniReverseX('.con02 .category');
	fadeInAniX('.con02 .con02-swiper');

	// con02
	ScrollTrigger.create({
		trigger: '.con02',
		start: '-15% center',
		// markers: true,
		onEnter: () => {
			$('.con02').addClass('active');
			if (bottomType1) {
				$('.bottom.type1').addClass('active');
				$('.bottom.type1 .bfloting').addClass('active');
				document.querySelector('.con02-txt2').classList.add('active');

				if (bottomAni.isActive()) {
					bottomAni.pause();
					$(".bottom .txtarea .txt1 .tours").stop().fadeOut();
					$(".bottom .txtarea .txt1 .membership").stop().fadeIn();
					gsap.to(".bottom .txtarea .bg .left", {background: bgColorLeftM})
					gsap.to(".bottom .txtarea .bg .right", {background: bgColorRightM})
					gsap.to(".bottom .txtarea .bg div", {background: bgColorM});
				}
			}
		},

		onEnterBack: () => {
			$('.con02').addClass('active');
			if (bottomType1) {
				$('.bottom.type1').addClass('active');
				$('.bottom.type1 .bfloting').addClass('active');
				document.querySelector('.con02-txt2').classList.add('active');
			}
		},

		onLeave: () => {
			$('.con02').removeClass('active');
			if (bottomType1) {
				$('.bottom.type1').removeClass('active');
				$('.bottom.type1 .bfloting').removeClass('active');
				document.querySelector('.con02-txt2').classList.remove('active');
			}
		},

		onLeaveBack: () => {
			$('.con02').removeClass('active');
			if (bottomType1) {
				$('.bottom.type1').removeClass('active');
				$('.bottom.type1 .bfloting').removeClass('active');
				document.querySelector('.con02-txt2').classList.remove('active');
			}
		},
	});

	let con02Swiper = new Swiper('.con02 .con02-swiper .swiper', {
		slidesPerView: 'auto',
		spaceBetween: 16,
		speed: 700,
	});

	document.querySelector('.con02 .con02-swiper .swiper-slide:nth-child(2)').addEventListener('click', function() {
		this.querySelector('.btn').classList.toggle('active');
		this.querySelector('.txt').classList.toggle('active');
	});

	// con03
	gsap.set('.con03 .bg', {opacity: 0});
	gsap.set('.con03 .top', {x: '-50px', opacity: 0});

	fadeInAniX('.con03 .box .list-top');
	fadeInAniReverseX('.con03 .box .list-bottom');

	let con03AniTop = gsap.timeline({
		scrollTrigger: {
			trigger: '.con02',
			start: 'bottom center',
			// markers: true,
			onEnter: () => {
				gsap.to('.con03 .bg', {opacity: 1, duration: 2.5, ease: 'power3.out'});
				gsap.to('.con03 .top', {x: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.2});
				// gsap.to('.con03 .bottom', {y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.6});
			},
			onLeaveBack: () => {
				gsap.to('.con03 .bg', {opacity: 0});
				gsap.to('.con03 .top', {x: '-50px', opacity: 0});
			}
		}
	});

	let con03Ani = gsap.timeline({
		scrollTrigger: {
			trigger: '.con03',
			start: '444px top',
			end: '+=1400 center',
			// markers: true,
			pin: true,
			scrub: 1,
			onLeave: () => {
				fadeInAniX('.con03 .card-txt');
				fadeInAniReverseX('.con03 .card');
			},
		},
	});

	con03Ani
		.fromTo('.con03 .list-top', {xPercent: 5.55}, {xPercent: -54.44}, 'a')
		.fromTo('.con03 .list-bottom', {xPercent: -54.44}, {xPercent: 5.55}, 'a');

		document.querySelector('.con03 .icon').addEventListener('click', () => {
			document.querySelector('.info').classList.toggle('active');
		});

	// con04
	const con04Swipers = (index) => {
		if (con04Swiper) con04Swiper.destroy();

		document.querySelectorAll('.con04 .con04-swiper').forEach(swiper => swiper.classList.remove('active'));
		document.querySelector(`.con04 .swiper0${index+1}`).classList.add('active');

		con04Swiper = new Swiper(`.con04 .swiper0${index + 1} .swiper`, {
			slidesPerView: 'auto',
			freeMode: {
				enabled: true,
				minimumVelocity: 0.2,
			},
		})
	}

	let con04TabSwiper = new Swiper('.con04 .con04-tab-swiper .swiper', {
		slidesPerView: 'auto',
		speed: 700,
		on: {
			slideChangeTransitionStart: function() {
				con04Swipers(this.activeIndex);
				this.slides.forEach(slide => slide.classList.remove('active'));
				this.slides[this.activeIndex].classList.add('active');
			},
		}
	});

	setTimeout(() => con04Swipers(0), 1000);

	const tabSwiperSet = target => {
		if (typeof target == 'string') target = document.querySelector(target);

		con04TabSwiper.slides.forEach(slide => slide.classList.remove('active'));
		target.classList.add('active');

		const scrollAreaAll =  document.querySelectorAll('.con04 .con04-swiper .scroll-area');

		scrollAreaAll.forEach(scrollArea => scrollArea.scrollTop = 0);
	}

	document.querySelector('.con04 .con04-tab-swiper .slide01').addEventListener('click', function() {
		con04Swipers(0);
		con04TabSwiper.slideTo(0);
		tabSwiperSet(this);
	});

	document.querySelector('.con04 .con04-tab-swiper .slide02').addEventListener('click', function() {
		con04Swipers(1);
		con04TabSwiper.slideTo(1);
		tabSwiperSet(this);
	});

	document.querySelector('.con04 .con04-swiper .btn-prev.btn02').addEventListener('click', function() {
		con04Swipers(0);
		con04TabSwiper.slideTo(0);
		tabSwiperSet('.con04 .con04-tab-swiper .slide01');
	});

	document.querySelector('.con04 .con04-swiper .btn-next.btn01').addEventListener('click', function() {
		con04Swipers(1);
		con04TabSwiper.slideTo(1);
		tabSwiperSet('.con04 .con04-tab-swiper .slide02');
	});

	fadeInAniReverseX('.con04 .text .tit');
	fadeInAniX('.con04 .con04-swiper-wrap');

	gsap.utils.toArray(document.querySelectorAll('.con04 .con04-tab-swiper .swiper-slide')).forEach(elem => {
		gsap.set(elem, { opacity: 0, x: 150, duration: 0.6, });
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

	// con05
	fadeInAniY('.con05 .vin .inner > div');

	ScrollTrigger.create({
		trigger: '.con05',
		start: 'top center',
		end: 'bottom+=100px bottom',
		// markers: true,
		onEnter: function() {
			if ($('.bottom.type1').length) {
				$('.bottom.type1').addClass('active');
				$('.bottom.type1 .bfloting').addClass('active');
				document.querySelector('.con05-txt2').classList.add('active');
			}
		},
		onEnterBack: function() {
			if ($('.bottom.type1').length) {
				$('.bottom.type1').addClass('active');
				$('.bottom.type1 .bfloting').addClass('active');
				document.querySelector('.con05-txt2').classList.add('active');
			}
		},
		onLeave: function() {
			if ($('.bottom.type1').length) {
				$('.bottom.type1').removeClass('active');
				$('.bottom.type1 .bfloting').removeClass('active');
				document.querySelector('.con05-txt2').classList.remove('active');
			}
		},
		onLeaveBack: function() {
			if ($('.bottom.type1').length) {
				$('.bottom.type1').removeClass('active');
				$('.bottom.type1 .bfloting').removeClass('active');
				document.querySelector('.con05-txt2').classList.remove('active');
			}
		},
	});

	let tours = gsap.utils.toArray('.con05 .list .tour'),
	getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

	tours.forEach((tour, i) => {
		let
			bg = tour.querySelector('.background'),
			txt = tour.querySelector('.txt');

		let con05Ani = gsap.timeline({
			scrollTrigger: {
				trigger: tour,
				start: () => i ? 'top bottom' : 'top top',
				end: 'bottom top',
				scrub: true,
				invalidateOnRefresh: true
			}
		});

		if (bg && txt) {
			con05Ani.fromTo(bg, {
				y: () => i ? -window.innerHeight * getRatio(tour) : 0
			}, {
				y: () => window.innerHeight * (1 - getRatio(tour)),
				ease: 'none'
			});

			con05Ani.fromTo(txt, {
				y: () => i ? window.innerHeight * -getRatio(tour) * 2 : 0
			}, {
				y: () => window.innerHeight * getRatio(tour) * 2,
				ease: 'none'
			}, 0);
		}
	});

	fadeInAniY('.con05 .tour4 .txt01');
	fadeInAniY('.con05 .tour4 .txt02');
	fadeInAniY('.con05 .tour4 .table');

	// con06
	fadeInAniX('.con06 .text .txt01');
	fadeInAniX('.con06 .text .txt02');
	fadeInAniX('.con06 .text .txt03');
	fadeInAniReverseX('.con06 .con06-swiper');
	// fadeInAniX('.con06 .txt');
	fadeInAniY('.con06 .list');
	fadeInAniY('.con06 .btn');

	ScrollTrigger.create({
		trigger: '.con06',
		start: 'top 50%',
		// markers: true,
		onEnter: () => {
			$('.con06').addClass('active');
		},
		onLeaveBack: () => {
			$('.con06').removeClass('active');
		},
	});

	let con06BgSwiper = new Swiper('.con06 .con06-bg-swiper .swiper', {
		effect: 'fade',
		loop: true,
		speed: 1000,
		slidesPerView: 1,
		simulateTouch: false,
		watchSlidesProgress: true,
	});

	let con06Swiper = new Swiper('.con06 .con06-swiper .swiper', {
		effect: 'fade',
		loop: true,
		speed: 1000,
		slidesPerView: 1,
		navigation: {
			nextEl: '.con06 .swiper-btns .swiper-button-next',
			prevEl: '.con06 .swiper-btns .swiper-button-prev',
		},
		thumbs: {
			swiper: con06BgSwiper,
		},
	});

	// con07
	fadeInAniY('.con07 .text .txt01');
	fadeInAniY('.con07 .text .txt02');
	fadeInAniY('.con07 .category');
	fadeInAniY('.con07 .con07-swiper');
	
	let con07Swiper = new Swiper('.con07 .con07-swiper .swiper', {
		slidesPerView: 'auto',
		spaceBetween: 16,
		speed: 700,
	});

	// con08
	document.querySelectorAll('.con08 > div').forEach(el => fadeInAniY(`.con08 .${el.className}`));

	// con09
	document.querySelectorAll('.con09 > div').forEach(el => fadeInAniY(`.con09 .${el.className}`));

	// floting con02
	const con02FlotingSet = target => {
		const el = document.querySelector(target);

		let floting = el.querySelector('.floting');
		let btn = floting.querySelector('.btn');
		let txt = btn.querySelector('.txt');
		let before = btn.querySelector('.before');
		let after = btn.querySelector('.after');
		let go = btn.querySelector('.go');
		let bottomValue = 0;

		let flotingAni = gsap.timeline({ paused: true, });

		flotingAni.to(floting, {opacity: 1, bottom: bottomValue, duration: 0.2, delay: 0.6}, 'a')
		.to([before, after], {rotation: 315, duration: 1.4, delay: 0.4}, 'a')
		.to(btn, {width: 166, duration: 0.6, delay: 1.5}, 'a')
		.to(txt, {opacity: 1, duration: 0.6,  delay: 1.8}, 'a')
		.to(go, {opacity: 1, duration: 0.6,  delay: 2.0}, 'a');

		ScrollTrigger.create({
			trigger: '.con02',
			start: '50% center',
			end: '140% bottom',
			// markers: true,
			onEnter: () => {
				// console.log('onEnter');
				flotingAni.play();
			},
			onEnterBack: () => {
				// console.log('onEnterBack');
				flotingAni.restart();
			},
			onLeave: () => {
				// console.log('onLeave');
				flotingAni.reverse();
			},
			onLeaveBack: () => {
				// console.log('onLeaveBack');
				flotingAni.reverse();
			},
		});
	}

	if (!bottomType1) con02FlotingSet('.con02 .floting-box .bottom');

	// floting con05
	let con05FlotingAni = gsap.timeline({ paused: true, });

	if (!bottomType1) {
		const con05FlotingStart = target => {
			const el = document.querySelector(target);

			let floting = el.querySelector('.floting');
			let btn = floting.querySelector('.btn');
			let txt = btn.querySelector('.txt');
			let before = btn.querySelector('.before');
			let after = btn.querySelector('.after');
			let go = btn.querySelector('.go');
			let bottomValue = 32;

			con05FlotingAni = gsap.timeline({ paused: true, });

			con05FlotingAni.to(floting, {opacity: 1, bottom: bottomValue, duration: 0.2, delay: 0.6}, 'a')
			.to([before, after], {rotation: 315, duration: 1.4, delay: 0.4}, 'a')
			.to(btn, {width: 166, duration: 0.6, delay: 1.5}, 'a')
			.to(txt, {opacity: 1, duration: 0.6,  delay: 1.8}, 'a')
			.to(go, {opacity: 1, duration: 0.6,  delay: 2.0}, 'a');

			con05FlotingAni.play();
		}

		const con05FlotingEnd = () => con05FlotingAni.reverse();

		// con05
		ScrollTrigger.create({
			trigger: '.con05',
			start: '15% bottom',
			end: 'bottom+=126px bottom',
			// markers: true,
			onEnter: () => {
				// console.log('onEnter');
				con05FlotingStart('.con05 .floting-box .bottom');
				document.querySelector('.con05 .floting-box').classList.add('active');
			},

			onLeave: () => {
				// console.log('onLeave')
				con05FlotingEnd('.con05 .floting-box .bottom');
				document.querySelector('.con05 .floting-box').classList.remove('active');
			},

			onEnterBack: () => {
				// console.log('onEnterBack');
				con05FlotingStart('.con05 .floting-box .bottom');
				document.querySelector('.con05 .floting-box').classList.add('active');
			},

			onLeaveBack: () => {
				// console.log('onLeaveBack');
				con05FlotingEnd('.con05 .floting-box .bottom');
				document.querySelector('.con05 .floting-box').classList.remove('active');
			},
		});
	}

	// btn top
	document.querySelector('.btn-top').addEventListener('click', () => {
		let allTriggers = ScrollTrigger.getAll();

		allTriggers.forEach(trigger => {
			if (trigger.vars.trigger == '.con02') trigger.disable();
			else if (trigger.vars.trigger == '.con03') trigger.disable();
			else if (trigger.vars.trigger == '.con05') trigger.disable();
		});

		gsap.to(window, {scrollTo: 0, duration: 1, delay: 0.4, onComplete(){
			allTriggers.forEach(trigger => {
				if (trigger.vars.trigger == '.con02') trigger.enable();
				else if (trigger.vars.trigger == '.con03') trigger.enable();
				else if (trigger.vars.trigger == '.con05') trigger.enable();
			});
		}});
	});

	// popup
	const popupOpen = target => {
		document.querySelector(target).classList.add('active');
		document.body.classList.add('fixed');
		document.body.style.top = -scrollT + 'px';
	}

	let oldT = scrollT;

	if (bottomType1) {
		bottomType1.addEventListener('click', function() {
			oldT = scrollT;

			if (this.classList.contains('active')) {
				popupOpen('.popup01');
			}
		});
	} else {
		document.querySelectorAll('.con .floting-box').forEach(floting => {
			floting.addEventListener('click', () => {
				oldT = scrollT;

				popupOpen('.popup01');
			});
		})
	}

	// aside
	document.querySelector('#bottom .menu1').addEventListener('click', () => {
		oldT = scrollT;
		document.body.classList.add('fixed');
		document.body.style.top = -scrollT + 'px';
		document.querySelector('#aside').classList.add('open');
		// gsap.set('.dim-aside', {x: 0});
		// gsap.to('.dim-aside', {opacity: 1});
		$('#aside .case').removeClass('active');
		$('#aside .case01').addClass('active');
	});

	document.querySelector('#aside .btn-close').addEventListener('click', function () {
		document.querySelector('#aside').classList.remove('open');
		document.body.style.top = 0 + 'px';
		document.body.classList.remove('fixed');
		window.scrollTo(0, oldT)
		// gsap.to('.dim-aside', {opacity: 0, onComplete(){ gsap.set('.dim-aside', {x: '100%'}); }});
	});

	let asideCase03Ani = gsap.timeline({paused: true})
	// let asideCase03Ani = gsap.timeline({})
	.fromTo('#aside .case03 .cover01 .dot02', {opacity: 0}, {opacity: 1})
	.fromTo('#aside .case03 .cover01 .dot01', {opacity: 0}, {opacity: 1})
	.fromTo('#aside .case03 .cover02', {opacity: 0, width: '52px', borderRadius: '52px'}, {opacity: 1, width: '124px', borderRadius: '99px', ease: 'circ.out'}, '-=0.4')
	.fromTo('#aside .case03 .cover02 img', {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, '-=0.4')
	.fromTo('#aside .case03 .cover03', {opacity: 0, width: '52px', borderRadius: '52px'}, {opacity: 1, width: '311px', borderRadius: '99px', ease: 'circ.out'}, '-=0.4')
	.fromTo('#aside .case03 .cover03 img', {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, '-=0.4')
	.fromTo('#aside .case03 .cover04', {opacity: 0, width: '52px', borderRadius: '52px'}, {opacity: 1, width: '296px', borderRadius: '99px', ease: 'circ.out'}, '-=0.3')
	.fromTo('#aside .case03 .cover04 img', {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, '-=0.4');

	let asideCase04Ani = gsap.timeline({paused: true})
	.fromTo('#aside .case04 .cover01 .dot02', {opacity: 0}, {opacity: 1})
	.fromTo('#aside .case04 .cover01 .dot01', {opacity: 0}, {opacity: 1})
	.fromTo('#aside .case04 .cover02', {opacity: 0, width: '52px', borderRadius: '52px'}, {opacity: 1, width: '124px', borderRadius: '99px', ease: 'circ.out'}, '-=0.4')
	.fromTo('#aside .case04 .cover02 img', {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, '-=0.4')
	.fromTo('#aside .case04 .cover03', {opacity: 0, width: '52px', borderRadius: '52px'}, {opacity: 1, width: '283px', borderRadius: '99px', ease: 'circ.out'}, '-=0.4')
	.fromTo('#aside .case04 .cover03 img', {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, '-=0.4');

	// case01
	$('#aside .case01').click(function(){
		$('#aside .case').removeClass('active');
		$('#aside .case02').addClass('active');
		// reset
		$('#aside .cover').removeClass('next');
		$('#aside .dim').show();
		$('#aside .bell').hide();
	});

	// case02
	$('#aside .case02').click(function(){
		$('#aside .case').removeClass('active');
		$('#aside .case03').addClass('active');
		asideCase03Ani.restart();
	});

	// case03 close
	$('#aside .case03 .close').click(function(){
		asideCase03Ani.reverse(1.8);
		setTimeout(() => {
			$('#aside .case03 .dim').fadeOut();
			$('#aside .case03 .cover').addClass('next');
			$('#aside .case03 .bell').fadeIn();
		}, 1400);
	});

	// case03
	$('#aside .case03 .cont').click(function(){
		$('#aside .case').removeClass('active');
		$('#aside .case04').addClass('active');
		asideCase04Ani.restart();
	});

	// case03 bell
	$('#aside .case03 .bell').click(function(){
		$('#aside .dim').fadeIn();
		$('#aside .bell').fadeOut();
		$('#aside .case03 .next').removeClass('next');
		asideCase03Ani.restart();
	});

	// case04 close
	$('#aside .case04 .close').click(function(){
		asideCase04Ani.reverse(1.8);
		setTimeout(() => {
			$('#aside .case04 .dim').fadeOut();
			$('#aside .case04 .cover').addClass('next');
			$('#aside .case04 .bell').fadeIn();
		}, 1400);
	});

	// case04 bell
	$('#aside .case04 .bell').click(function(){
		$('#aside .dim').fadeIn();
		$('#aside .bell').fadeOut();
		$('#aside .case04 .next').removeClass('next');
		asideCase04Ani.restart();
	});

	// case04
	$('#aside .case04 .cont').click(function(){
		$('#aside .case').removeClass('active');
		$('#aside .case01').addClass('active');
	});

	// document.querySelector('.popup02 > img').addEventListener('click', function() {
	// 	let num = this.getAttribute('src').split('popup02_')[1].replace('.jpg', '');

	// 	if (num != '3') {
	// 		num++;
	// 		this.setAttribute('src', './resource/images/mo/popup02_' + num + '.jpg');
	// 	} else {
	// 		document.querySelector('.popup02 .btn-close').click();
	// 	}
	// });

	document.querySelectorAll('.popup .btn-close').forEach(close => {
		close.addEventListener('click', function() {
			setTimeout(() => {
				document.body.style.top = 0 + 'px';
				document.body.classList.remove('fixed');
				window.scrollTo(0, oldT)
				this.closest('.popup').classList.remove('active');

				// if (this.closest('.popup02')) {
				// 	setTimeout(() => {
				// 		this.closest('.popup02').querySelector('img').setAttribute('src', './resource/images/mo/popup02_0.jpg')
				// 	}, 400)
				// }
			});
		});
	});
});

$(window).on('resize', () => ScrollTrigger.refresh());