/**
* --------------------------------
* pc js
* --------------------------------
*/

document.addEventListener('DOMContentLoaded', function () {
	// console.log('dom');

	// scroll reset Top
	if (history.scrollRestoration) {
		history.scrollRestoration = 'manual';
	} else {
		window.onbeforeunload = function() {
			window.scrollTo(0, 0);
		}
	}

	// init
	gsap.registerPlugin(ScrollTrigger);
	gsap.registerPlugin(ScrollToPlugin);
	gsap.registerPlugin(ScrollSmoother);

	// set
	gsap.set('#header', {opacity: 0, y: -150});
	gsap.set('.nav, .scroll-down', {opacity: 0, x: -150});
	if ($('body').hasClass('type2')) {
		gsap.set('.btn-tour', {opacity: 0, x: 150});
		gsap.set('.channeltalk', {opacity: 0, y: 50});
	} else {
		gsap.set('.bar', {opacity: 0, x: '100%'});
		// let alarmAni = gsap.timeline()
		// .to('.alarm .box .line', {width: '100%', duration: 1.0})
		// .to('.alarm .box .line', {height: '100%', duration: 1.0})
		// .to('.alarm .box', {x: '60vw', duration: 2.2, delay: 1.2, ease: 'power3.inOut'})
		// .to('.alarm .dim', {opacity: 0, onComplete(){
		// 	$('.alarm').hide();
		// 	gsap.to('.bar', {opacity: 1, x: 0, duration: 1.2});
		// }}, '-=1.0');
	}

	gsap.to('.con01 > .dim', {opacity: 0, delay: 0.5});
});

// load
window.addEventListener('load', function () {
	let initDelayTime = 1500;
	let smoother;

	smoother = ScrollSmoother.create({
		// wrapper: '#smooth-wrapper',
		// content: '#smooth-content',
		smooth: 1.8,
		effects: true,
		// onStop(){}
	});

	smoother.paused(true); // scroll lock

	// header
	const headerAni = gsap.from('#header', {
		yPercent: -100,
		paused: true,
		duration: 0.4
	}).progress(1);

	ScrollTrigger.create({
		start: 'top top',
		end: 'max',
		onUpdate: (self) => {
			self.direction === -1 ? headerAni.play() : headerAni.reverse()
		}
	});

	// header, bar �댁뿬��
	document.querySelector('.btn-my').addEventListener('click', function () {
		document.querySelector('#aside').classList.add('open');
		gsap.set('.dim-aside', {x: 0});
		gsap.to('.dim-aside', {opacity: 1});
		smoother.paused(true); // scroll lock
		$('#aside .case').removeClass('active');
		$('#aside .case01').addClass('active');
	});

	// aside
	document.querySelector('#aside .btn-close').addEventListener('click', function () {
		document.querySelector('#aside').classList.remove('open');
		gsap.to('.dim-aside', {opacity: 0, onComplete(){ gsap.set('.dim-aside', {x: '100%'}); }});
		smoother.paused(false); // scroll unlock
	});

	let asideCase03Ani = gsap.timeline({paused: true})
	// let asideCase03Ani = gsap.timeline({})
	.fromTo('#aside .case03 .cover01 .dot02', {opacity: 0}, {opacity: 1})
	.fromTo('#aside .case03 .cover01 .dot01', {opacity: 0}, {opacity: 1})
	.fromTo('#aside .case03 .cover02', {opacity: 0, width: '52px', borderRadius: '52px'}, {opacity: 1, width: '124px', borderRadius: '99px', ease: 'circ.out'}, '-=0.4')
	.fromTo('#aside .case03 .cover02 img', {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, '-=0.4')
	.fromTo('#aside .case03 .cover03', {opacity: 0, width: '52px', borderRadius: '52px'}, {opacity: 1, width: '353px', borderRadius: '99px', ease: 'circ.out'}, '-=0.4')
	.fromTo('#aside .case03 .cover03 img', {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, '-=0.4')
	.fromTo('#aside .case03 .cover04', {opacity: 0, width: '52px', borderRadius: '52px'}, {opacity: 1, width: '348px', borderRadius: '99px', ease: 'circ.out'}, '-=0.3')
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
		$('#aside .case').scrollTop(0);
	});

	// case02
	$('#aside .case02').click(function(){
		$('#aside .case').removeClass('active');
		$('#aside .case03').addClass('active');
		asideCase03Ani.restart();
	});

	// case03 close
	$('#aside .case03 .close').click(function(){
		asideCase03Ani.reverse(1.7);
		setTimeout(() => {
			$('#aside .case03 .dim').fadeOut();
			$('#aside .case03 .cover').addClass('next');
			$('#aside .case03 .bell').fadeIn();
		}, 1300);
	});

	// case03 bell
	$('#aside .case03 .bell').click(function(){
		asideCase03Ani.restart();
		$('#aside .case03 .dim').fadeIn();
		$('#aside .case03 .cover').removeClass('next');
		$('#aside .case03 .bell').fadeOut();
	});

	// case03
	$('#aside .case03 .cont').click(function(){
		$('#aside .case').removeClass('active');
		$('#aside .case04').addClass('active');
		asideCase04Ani.restart();
	});

	// case04 close
	$('#aside .case04 .close').click(function(){
		asideCase04Ani.reverse(1.7);
		setTimeout(() => {
			$('#aside .case04 .dim').fadeOut();
			$('#aside .case04 .cover').addClass('next');
			$('#aside .case04 .bell').fadeIn();
		}, 1300);
	});

	// case04 bell
	$('#aside .case04 .bell').click(function(){
		asideCase04Ani.restart();
		$('#aside .case04 .dim').fadeIn();
		$('#aside .case04 .cover').removeClass('next');
		$('#aside .case04 .bell').fadeOut();
	});

	// case04
	$('#aside .case04 .cont').click(function(){
		$('#aside .case').removeClass('active');
		$('#aside .case01').addClass('active');
	});

	// nav anchor
	document.querySelectorAll('.nav li').forEach((li, index) => {
		li.addEventListener('click', function () {
			smoother.scrollTo(`.con0${index + 1}`, true);
		});
	});

	// nav color change
	gsap.utils.toArray('.con').forEach((cont, index)=>{
		if (index == 7) return;
		let navAni = gsap.timeline().to(`.nav li:nth-child(${index + 1}) .dot .img02`, {opacity: 1,});

		ScrollTrigger.create({
			trigger: cont,
			start: 'top center',
			end: index === 2 ? '+=4000 center' : 'bottom center',
			// preventOverlaps: true,
			// fastScrollEnd: true,
			// end: 'bottom center',
			// markers:true,
			animation: navAni,
			toggleActions: 'restart reverse restart reverse',
			// refreshPriority: 1,
		});
	});

	ScrollTrigger.create({
		trigger: '.con04',
		start: 'top center',
		end: 'bottom center',
		onEnter(){ document.querySelector('.nav').classList.add('active'); },
		onEnterBack(){ document.querySelector('.nav').classList.add('active'); },
		onLeave(){ document.querySelector('.nav').classList.remove('active'); },
		onLeaveBack(){ document.querySelector('.nav').classList.remove('active'); }
	});

	ScrollTrigger.create({
		trigger: '.con05 .vin',
		start: 'top center',
		end: 'bottom center',
		onEnter(){ document.querySelector('.nav').classList.add('active'); },
		onEnterBack(){ document.querySelector('.nav').classList.add('active'); },
		onLeave(){ document.querySelector('.nav').classList.remove('active'); },
		onLeaveBack(){ document.querySelector('.nav').classList.remove('active'); }
	});

	ScrollTrigger.create({
		trigger: '.con05 .last',
		start: 'top center',
		end: 'bottom center',
		onEnter(){ document.querySelector('.nav').classList.add('active'); },
		onEnterBack(){ document.querySelector('.nav').classList.add('active'); },
		onLeave(){ document.querySelector('.nav').classList.remove('active'); },
		onLeaveBack(){ document.querySelector('.nav').classList.remove('active'); }
	});

	ScrollTrigger.create({
		trigger: '.con07',
		start: 'top center',
		end: 'bottom center',
		// toggleActions: 'restart none reverse none',
		// toggleClass: { className: 'active', targets: '.nav' },
		onEnter(){ document.querySelector('.nav').classList.add('active'); },
		onLeaveBack(){ document.querySelector('.nav').classList.remove('active'); }
	});

	ScrollTrigger.create({
		trigger: '.con08 .bottom',
		start: '-20% center',
		end: 'bottom center',
		// markers: true,
		onEnter(){
			gsap.to('.nav', {opacity: 0});
		},
		onLeaveBack(){
			gsap.to('.nav', {opacity: 1});
		},
	});

	if ($('body').hasClass('type2')) {
		ScrollTrigger.create({
			trigger: '.con08 .bottom',
			start: '-20% center',
			end: 'bottom center',
			// markers: true,
			onEnter(){
				gsap.to('.channeltalk', {opacity: 0});
			},
			onLeaveBack(){
				gsap.to('.channeltalk', {opacity: 1});
			},
		});
	}

	// scroll down
	ScrollTrigger.create({
		trigger: '.con01',
		start: '20% top',
		end: '50% bottom',
		// markers: true,
		// toggleActions: 'restart none reverse none',
		onEnter(){
			gsap.to('.scroll-down', {opacity: 0, x: -150});

			if ($('body').hasClass('type2')) {
				gsap.to('.btn-tour', {opacity: 0, x: 170});
			} else {
				gsap.to('.bar', {opacity: 0, x: '100%'});
			}
		},
		onLeaveBack(){
			if ($('body').hasClass('type2')) {
				gsap.to('.scroll-down, .btn-tour', {opacity: 1, x: 0});
			} else {
				gsap.to('.scroll-down, .bar', {opacity: 1, x: 0});
			}
		}
	});

	// floting
	gsap.utils.toArray('.floting-box .bottom').forEach((el, index) => {
		let floting = el.querySelector('.floting');
		let btn = floting.querySelector('.btn');
		let txt = btn.querySelector('.txt');
		let before = btn.querySelector('.before');
		let after = btn.querySelector('.after');
		let go = btn.querySelector('.btn-go');
		let bottomValue = index == 0 ? 0 : '52px';

		let flotingAni = gsap.timeline({paused: true});

		flotingAni.to(floting, {opacity: 1, bottom: bottomValue, duration: 0.2, delay: 0.6}, 'a')
		.to([before, after], {rotation: 315, duration: 1.4, delay: 0.4}, 'a')
		.to(btn, {width: 447, duration: 0.6, delay: 1.5}, 'a')
		.to(txt, {opacity: 1, duration: 0.6,  delay: 1.8}, 'a')
		.to(go, {opacity: 1, duration: 0.6,  delay: 2.0}, 'a');

		if (index == 0) {
			// con02 floting
			ScrollTrigger.create({
				trigger: '.con02',
				start: '50% center',
				end: '140% bottom',
				// markers: true,
				onEnter(){
					// console.log('onEnter');
					flotingAni.play();
				},
				onEnterBack(){
					// console.log('onEnterBack');
					flotingAni.restart();
				},
				onLeave(){
					// console.log('onLeave');
					flotingAni.reverse();
				},
				onLeaveBack(){
					// console.log('onLeaveBack');
					flotingAni.reverse();
				},
			});
		} else {
			// con05 floting
			ScrollTrigger.create({
				trigger: el,
				start: 'bottom bottom-=10px',
				endTrigger: el.parentNode,
				end: 'bottom+=40px bottom',
				pin: el,
				pinSpacing: false,
				// markers: true,
				onEnter(){
					// console.log('onEnter');
					flotingAni.play();
				},
				onEnterBack(){
					// console.log('onEnterBack');
					flotingAni.restart();
				},
				onLeave(){
					// console.log('onLeave');
					flotingAni.reverse();
				},
				onLeaveBack(){
					// console.log('onLeaveBack');
					flotingAni.reverse();
				},
			});
		}
	});

	// �뚯썝沅� 臾몄쓽
	$('.floting-box .btn-go').click(function(){
		$('.inquiry').addClass('open');
		gsap.set('.dim-inquiry', {x: 0});
		gsap.to('.dim-inquiry', {opacity: 1});
		smoother.paused(true); // scroll lock
	});

	$('.inquiry .btn-close').click(function(){
		$('.inquiry').removeClass('open');
		gsap.to('.dim-inquiry', {opacity: 0, onComplete(){ gsap.set('.dim-inquiry', {x: '100%'}); }});
		smoother.paused(false); // scroll unlock
		$('.inquiry .cont').scrollTop(0);
	});

	// con01
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
			gsap.to('.nav, .scroll-down', {opacity: 1, x: 0, duration: 1.2});

			if ($('body').hasClass('type2')) {
				gsap.to('.btn-tour', {opacity: 1, x: 0, duration: 1.2});
				gsap.to('.channeltalk', {opacity: 1, y: 0, duration: 1.2, ease: 'power3.inOut'});
			} else {
				gsap.to('.bar', {opacity: 1, x: 0, duration: 1.2});
			}
		}
	})
	.to('.con01 .box .left, .con01 .box .right', {
		width: 0,
		duration: 1.2,
		onComplete() {
			// console.log('box motion end');
			$('.con01 .box').hide();
			smoother.paused(false); // scroll unlock
			document.querySelector('.con01').classList.add('active');
		}
	});

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
			on: {
				init: function(){
					// console.log('slide init');

					let activeIndex = this.activeIndex;

					// video
					this.slides[activeIndex].querySelector('video').play();

					// txt
					con01AniTxt(activeIndex);
				},
				slideChangeTransitionStart: function () {
					// console.log('slide Start');

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
				slideChangeTransitionEnd: function() {
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

	function con01AniTxt(idx) {
		gsap.set('.con01-swiper .swiper-slide .text .txt02', {opacity: 0});

		setTimeout(() => {
			gsap.set('.con01-swiper .swiper-slide-active .text .txt02', {opacity: 1});
			gsap.from(idx == 0 ? con01Split01.words : con01Split02.words, {opacity: 0, y: 50, stagger: 0.08});
		}, 500);
	}

	// con02
	ScrollTrigger.create({
		trigger: '.con02',
		start: '-15% center',
		// markers: true,
		onEnter: function() {
			$('.con02').addClass('active');
		},
		onLeaveBack: function() {
			$('.con02').removeClass('active');
		},
	});

	let con02Swiper = new Swiper('.con02 .con02-swiper .swiper', {
		slidesPerView: 'auto',
		spaceBetween: 32,
		// pagination: {
		// 	el: '.con02 .con02-swiper .swiper-pagination',
		// 	type: 'progressbar'
		// },
		observer: true,
		observeParents: true,
	});

	let isHover = false;

	$('.con02 .con02-swiper .slide02').hover(function(){
		isHover = true;
		$('.con02 .con02-swiper .slide02 .plus').hide();
		gsap.to('.con02 .con02-swiper .slide02 .btn',{scale: 10});
	},function(){
		isHover = false;
		gsap.to('.con02 .con02-swiper .slide02 .btn',{scale: 1, onComplete(){
			if (!isHover) {
				$('.con02 .con02-swiper .slide02 .plus').show();
			}
		}});
	});

	// con03
	gsap.set('.con03 .bg', {opacity: 0});
	gsap.set('.con03 .top', {y: '50px', opacity: 0});
	gsap.set('.con03 .bottom', {y: '50px', opacity: 0});

	let con03AniTop = gsap.timeline({
		scrollTrigger: {
			trigger: '.con02',
			start: '80% 20%',
			// markers: true,
			onEnter: function() {
				gsap.to('.con03 .bg', {opacity: 1, duration: 2.5, ease: 'power3.out'});
				gsap.to('.con03 .top', {y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.2,
				onComplete(){
					// document.querySelector('.con03 .top .txt01').classList.add('hover');
					setTimeout(() => {
						document.querySelector('.con03 .top .txt01').classList.remove('hover');
					}, 1000);
				}});
				gsap.to('.con03 .bottom', {y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.6});
			},
			onLeaveBack: function() {
				gsap.to('.con03 .bg', {opacity: 0});
				gsap.to('.con03 .top', {y: '50px', opacity: 0});
				gsap.to('.con03 .bottom', {y: '50px', opacity: 0});
			}
		}
	});

	let con03Ani = gsap.timeline({
		scrollTrigger: {
			trigger: '.con03',
			start: 'top top',
			end: '+=4000 bottom',
			pin: true,
			scrub: 1,
			// markers: true,
			id: 'scrollTriggerCon03Ani',
			// refreshPriority: 1,
			// preventOverlaps: true,
			// fastScrollEnd: true,
		}
	});

	con03Ani.fromTo('.con03 .left',
		{bottom: 140, yPercent: 100},
		{bottom: 0, yPercent: 0}
	, 'a')
	.fromTo('.con03 .right',
		{top: 0 , yPercent: -100},
		{top: 140, yPercent: 0}
	, 'a')
	.fromTo('.con03 .card',
		{opacity: 0},
		{opacity: 1, duration: 0.2}
	, 'b')
	.fromTo('.con03 .bottom .txt01',
		{opacity: 1},
		{opacity: 0, duration: 0.2}
	, 'b')
	.fromTo('.con03 .bottom .txt02',
		{opacity: 0},
		{opacity: 1, duration: 0.2}
	, 'b')
	.fromTo('.con03 ul',
		{opacity: 1},
		{opacity: 1, duration: 0.2}
	, 'c');

	// con04
	ScrollTrigger.create({
		trigger: '.con04',
		start: '-10% center',
		// markers: true,
		onEnter: function() {
			// console.log('onEnter');
			$('.con04').addClass('active');
			$('.con04 .btn01').click();
		},
		onLeaveBack: function() {
			// console.log('onLeaveBack');
			$('.con04').removeClass('active');
			con04Ani01.reverse();
			con04Ani02.reverse();
		},
	});

	let con04Ani01 = gsap.timeline({ paused: true, })
	.to('.con04 .box01 .col01', {backgroundColor: 'transparent', duration: 0.8, delay: 0.2},)
	.from('.con04 .box01 .col01 .obj01', {opacity: 0, y: '50px', duration: 0.5}, '-=0.3')
	.from('.con04 .box01 .col01 .obj02', {opacity: 0, y: '50px', duration: 0.5}, '-=0.3')
	.to('.con04 .box01 .col02', {backgroundColor: 'transparent'}, '-=0.9')
	.from('.con04 .box01 .col02 .obj01', {opacity: 0, y: '50px', duration: 0.5}, '-=0.3')
	.to('.con04 .box01 .col03', {backgroundColor: 'transparent'}, '-=0.9')
	.from('.con04 .box01 .col03 .dim', {opacity: 0, duration: 0.5}, '-=0.3')
	.from('.con04 .box01 .col03 .obj01', {opacity: 0, y: '50px', duration: 0.5}, '-=0.3')

	let con04Ani02 = gsap.timeline({ paused: true, })
	.to('.con04 .box02 .col01', {backgroundColor: 'transparent', duration: 0.8, delay: 0.2},)
	.from('.con04 .box02 .col01 .obj01', {opacity: 0, y: '50px', duration: 0.5}, '-=0.3')
	.from('.con04 .box02 .col01 .obj02', {opacity: 0, y: '50px', duration: 0.5}, '-=0.3')
	.to('.con04 .box02 .col02', {backgroundColor: 'transparent'}, '-=0.9')
	.from('.con04 .box02 .col02 .obj01', {opacity: 0, y: '50px', duration: 0.5}, '-=0.3')
	.to('.con04 .box02 .col03', {backgroundColor: 'transparent'}, '-=0.9')
	.from('.con04 .box02 .col03 .dim', {opacity: 0, duration: 0.5}, '-=0.3')
	.from('.con04 .box02 .col03 .obj01', {opacity: 0, y: '50px', duration: 0.5}, '-=0.3')

	$('.con04 .btn01, .con04 .box02 .btn-prev').click(function(){
		$('.con04 .btn').removeClass('active');
		$('.con04 .btn01').addClass('active');
		$('.con04 .text .text02').css({'opacity': 0});
		$('.con04 .box01').addClass('active');
		$('.con04 .box02').removeClass('active');
		con04Ani01.restart();
		$('.con04 .col02 .obj01').scrollTop(0);
	});

	$('.con04 .btn02, .con04 .box01 .btn-next').click(function(){
		$('.con04 .btn').removeClass('active');
		$('.con04 .btn02').addClass('active');
		$('.con04 .text .text02').css({'opacity': 1});
		$('.con04 .box01').removeClass('active');
		$('.con04 .box02').addClass('active');
		con04Ani02.restart();
		$('.con04 .col02 .obj01').scrollTop(0);
	});

	// con05
	// vin
	ScrollTrigger.create({
		trigger: '.con05',
		start: 'top center',
		// markers: true,
		onEnter: function() {
			$('.con05 .vin').addClass('active');
		},
		onLeaveBack: function() {
			$('.con05 .vin').removeClass('active');
		},
	});

	// last
	ScrollTrigger.create({
		trigger: '.con05 .last',
		start: 'top center',
		// markers: true,
		onEnter: function() {
			$('.con05 .last').addClass('active');
		},
		onLeaveBack: function() {
			$('.con05 .last').removeClass('active');
		},
	});

	let tours = gsap.utils.toArray('.con05 .list .tour'),
	getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);

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

	// con06
	ScrollTrigger.create({
		trigger: '.con06',
		start: '-25% center',
		// markers: true,
		onEnter: function() {
			$('.con06').addClass('active');
		},
		onLeaveBack: function() {
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
			nextEl: '.con06 .con06-swiper .swiper-button-next',
			prevEl: '.con06 .con06-swiper .swiper-button-prev',
		},
		thumbs: {
			swiper: con06BgSwiper,
		},
		on: {
			slideChangeTransitionStart: function () {
				gsap.set('.con06 .con06-swiper .swiper-slide .txt01', {y: '70px', opacity: 0});
				gsap.set('.con06 .con06-swiper .swiper-slide .txt02', {y: '70px', opacity: 0});
			},
			slideChangeTransitionEnd: function () {
				gsap.to('.con06 .con06-swiper .swiper-slide-active .txt01', {y: 0, opacity: 1, duration: 0.6});
				gsap.to('.con06 .con06-swiper .swiper-slide-active .txt02', {y: 0, opacity: 1, duration: 0.6, delay: 0.2});
			},
		},
	});

	// con07
	ScrollTrigger.create({
		trigger: '.con07',
		start: '-25% center',
		// markers: true,
		onEnter: function() {
			$('.con07').addClass('active');
		},
		onLeaveBack: function() {
			$('.con07').removeClass('active');
		},
	});

	let con07Ani = gsap.timeline({
		scrollTrigger: {
			trigger: '.con07',
			start: 'top top',
			// end: '+=2000 bottom',
			pin: true,
			scrub: 1,
			// markers: true,
		}
	});

	con07Ani.fromTo('.con07 .left',
		{bottom: '-640px'},
		{bottom: 0}
	, 'a')
	.fromTo('.con07 .right',
		{top: '-340px'},
		{top: '100px'}
	, 'a')
	.fromTo('.con07',
		{opacity: 1},
		{opacity: 1, duration: 0.2}
	, 'b');

	// btn top
	document.querySelector('.btn-top').addEventListener('click', function () {
		// window.scrollTo({ top: 0 });

		// $('html, body').animate({scrollTop: 0}, 200);
		// return false;

		// smoother.scrollTo('.con01', true);

		let allTriggers = ScrollTrigger.getAll();
		allTriggers.forEach((trigger) => {
			if (trigger.vars.id == 'scrollTriggerCon03Ani') trigger.disable();
		});

		gsap.to(window, {scrollTo: 0, duration: 1, delay: 0.4, onComplete(){
			allTriggers.forEach((trigger) => {
				if (trigger.vars.id == 'scrollTriggerCon03Ani') trigger.enable();
			});
		}});
	});
});

// scroll
// window.addEventListener('scroll', function () {
// });

// function scrollBtnTop() {
// 	let scrollT = window.scrollY;
// 	if (scrollT + window.innerHeight > document.querySelector('footer').offsetTop - 24) {
// 		document.querySelector('.btn-top').classList.remove('fixed');
// 		document.querySelector('.btn-top').style.bottom = parseInt(document.querySelector('footer').offsetHeight - 24) + 'px';
// 	} else {
// 		document.querySelector('.btn-top').classList.add('fixed');
// 		document.querySelector('.btn-top').style.bottom = '24px';
// 	}
// }