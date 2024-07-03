// �꾩뿭蹂���
let 
	con01Swiper = [],
	visualSwiper = null,
	visualInterval = null,
	realIndex = 0,
	activeIndex = 0,
	activeImg = 1,
	fadeElems;

const fn = (() => {
	"use strict";

	return {
		visualSwiper: () => {
			visualSwiper = new Swiper('.visual .swiper', {
				inititalSlide: 0,
				speed: 800,
				loop: true,
				on: {
					init: () => activeImg = 1,

					slideChangeTransitionStart: function() {
						realIndex = this.realIndex;
						activeIndex = this.activeIndex;

						const visual = document.querySelector('.visual');

						this.slides[this.realIndex].querySelectorAll('.img').forEach(img => img.classList.remove('active'));

						if (visual.classList.contains('active')) {
							this.slides[activeIndex].querySelectorAll('.img').forEach(img => img.classList.remove('active'));
							this.slides[activeIndex].querySelectorAll('.img')[activeImg].classList.add('active');
						}

						if (realIndex == 0) {
							visual.querySelector('.pagination .current').innerHTML = activeImg + 1;
						} else if (realIndex == 1) {
							visual.querySelector('.pagination .current').innerHTML = activeImg + 4;
						}
					},

					slideNextTransitionEnd: () => {
						if (document.querySelector('.visual').classList.contains('active')) {
							clearInterval(visualInterval)
							activeImg = 0;
							autoplayImg();
						}
					},

					slidePrevTransitionEnd: () => {
						if (document.querySelector('.visual').classList.contains('active')) {
							clearInterval(visualInterval)
							activeImg = 2;
							autoplayImg();
						}
					}
				}
			});
		},

		con01Swiper: (type) => {
			

			// if (type == 'reset') {
			// 	if (con01Swiper.length) {
			// 		con01Swiper.forEach(swiper => swiper.destroy());
			// 		con01Swiper = [];
			// 	}
			// } else {
			// 	const con01Swipers = document.querySelectorAll('.con01 .swiper');

			// 	[...con01Swipers].forEach((_, index) => {
			// 		con01Swiper[index] = new Swiper(`.box${index + 1} .swiper`);
			// 	});
			// }
		},

		scrollFadeInAni: target => {
			fadeElems = document.querySelectorAll(target);

			fadeElems.forEach(elem => {
				gsap.set(elem, { opacity: 0, y: 100, duration: 0.6, });
				gsap.to(elem, {
					opacity: 1,
					y: 0,
					duration: 1,
					ease: 'expo',
					scrollTrigger: {
						trigger: elem,
						start: 'top 80%',
						end: 'bottom 80%',
						toggleActions: 'play none none none',
					},
				});
			});
		},
	}
})();

window.addEventListener('load', function() {
	let lastScrollTop = 0;
	$(window).scroll(function(event){
		let st = $(this).scrollTop();
		if (st > lastScrollTop){
			$('#header').css({top: -100});
		} else {
			$('#header').css({top: 0});
		}
		lastScrollTop = st;

		if (st > 0 ){
			$('#header .header1').attr('src','./resources/images/header01.png');
			$('#header .header2').attr('src','./resources/images/header02.png');
			$('#header .header3').attr('src','./resources/images/header03.png');
			$("#header").addClass('active')
			$('.top-btn').fadeIn();
		}
		else{
			
			$('#header .header1').attr('src','./resources/images/header01-1.png');
			$('#header .header2').attr('src','./resources/images/header02-1.png');
			$('#header .header3').attr('src','./resources/images/header03-1.png');
			$("#header").removeClass('active')
			$('.top-btn').fadeOut();
		}
	});
	// gsap
	gsap.registerPlugin(ScrollTrigger);

	fn.scrollFadeInAni('.con .tit');
	
	fn.scrollFadeInAni('.con03 .inner > img');
	fn.scrollFadeInAni('.con .sub-tit');
	fn.scrollFadeInAni('.con .badge');
	fn.scrollFadeInAni('.con .btn-area');
	fn.scrollFadeInAni('.con3 .btns');
	fn.scrollFadeInAni('.con.banner');
	fn.scrollFadeInAni('.banners');


	gsap.utils.toArray(document.querySelectorAll('.con02 .con-wrap .box:nth-child(even) .img')).forEach(elem => {
		gsap.set(elem, { opacity: 0, x: 100, duration: 0.6, });
		gsap.to(elem, {
			opacity: 1,
			x: 0,
			duration: 1.2,
			ease: 'expo',
			scrollTrigger: {
				trigger: elem,
				start: 'top 80%',
				end: 'bottom 80%',
				toggleActions: 'play none none none',
			},
		});
	});

	gsap.utils.toArray(document.querySelectorAll('.con02 .con-wrap .box:nth-child(even) .txt')).forEach(elem => {
		gsap.set(elem, { opacity: 0, x: -100, duration: 0.6, });
		gsap.to(elem, {
			opacity: 1,
			x: 0,
			duration: 1.0,
			ease: 'expo',
			scrollTrigger: {
				trigger: elem,
				start: 'top 80%',
				end: 'bottom 80%',
				toggleActions: 'play none none none',
			},
		});
	});

	gsap.utils.toArray(document.querySelectorAll('.con02 .con-wrap .box:nth-child(odd) .img')).forEach(elem => {
		gsap.set(elem, { opacity: 0, x: -100, duration: 0.6, });
		gsap.to(elem, {
			opacity: 1,
			x: 0,
			duration: 1.0,
			ease: 'expo',
			scrollTrigger: {
				trigger: elem,
				start: 'top 80%',
				end: 'bottom 80%',
				toggleActions: 'play none none none',
			},
		});
	});

	gsap.utils.toArray(document.querySelectorAll('.con02 .con-wrap .box:nth-child(odd) .txt')).forEach(elem => {
		gsap.set(elem, { opacity: 0, x: 100, duration: 0.6, });
		gsap.to(elem, {
			opacity: 1,
			x: 0,
			duration: 1.0,
			ease: 'expo',
			scrollTrigger: {
				trigger: elem,
				start: 'top 80%',
				end: 'bottom 80%',
				toggleActions: 'play none none none',
			},
		});
	});

	gsap.utils.toArray(document.querySelectorAll('.con03 .box')).forEach((elem, index) => {
		gsap.set(elem, { opacity: 0, y: 100, duration: 0.6, });
		gsap.to(elem, {
			opacity: 1,
			y: 0,
			duration: 1,
			delay:(index + 1) * .05,
			ease: 'expo',
			scrollTrigger: {
				trigger: elem,
				start: 'top 80%',
				end: 'bottom 80%',
				toggleActions: 'play none none none',
			},
		});
	});

	gsap.utils.toArray(document.querySelectorAll('.con03 .membership-img')).forEach((elem, index) => {
		gsap.set(elem, { opacity: 0, y: 100, duration: 0.6, });
		gsap.to(elem, {
			opacity: 1,
			y: 0,
			duration: 1,
			delay:(index + 1) * .1,
			ease: 'expo',
			scrollTrigger: {
				trigger: elem,
				start: 'top 80%',
				end: 'bottom 80%',
				toggleActions: 'play none none none',
			},
		});
	});

	gsap.utils.toArray(document.querySelectorAll('.con05 .con-item')).forEach((elem, index) => {
		gsap.set(elem, { opacity: 0, y: 100, duration: 0.6, });
		gsap.to(elem, {
			opacity: 1,
			y: 0,
			duration: 1,
			delay:(index + 1) * .1,
			ease: 'expo',
			scrollTrigger: {
				trigger: elem,
				start: 'top 80%',
				end: 'bottom 80%',
				toggleActions: 'play none none none',
			},
		});
	});

	gsap.utils.toArray(document.querySelectorAll('.con06 .con-item')).forEach((elem, index) => {
		gsap.set(elem, { opacity: 0, y: 100, duration: 0.6, });
		gsap.to(elem, {
			opacity: 1,
			y: 0,
			duration: 1,
			delay:(index + 1) * .1,
			ease: 'expo',
			scrollTrigger: {
				trigger: elem,
				start: 'top 80%',
				end: 'bottom 80%',
				toggleActions: 'play none none none',
			},
		});
	});

	gsap.set('.con04 img', { opacity: 0, scale: 0.8, duration: 0.6, });
	gsap.to('.con04 img', {
		opacity: 1,
		scale: 1,
		duration: 1,
		ease: 'expo',
		scrollTrigger: {
			trigger: '.con04 img',
			start: 'top 80%',
			end: 'bottom 80%',
			toggleActions: 'play none none none',
		},
	});

	// visual
	let visual = document.querySelector('.visual');
	let con01 = document.querySelector('.con01');

	// remove active
	const setRemoveActive = target => [...target].forEach(item => item.classList.remove('active'));

	// visual progress
	const setProgress = i => {
		const imgLen = visualSwiper.slides[activeIndex].querySelectorAll('.img').length;
		const progress = document.querySelector('.visual .progress');
		const progressWidth = (i + 1) * 100 / (imgLen*2); // img 媛쒖닔 * swiper-slide 媛쒖닔

		progress.style.width = `${progressWidth}%`;
	} 

	// prev
	const prevImgSlideAni = target => {
		const imgs = target;
		activeImg--;

		if (activeImg < 0) {
			activeImg = imgs.length - 1;
			visualSwiper.slidePrev();
			setProgress(activeImg + (realIndex * imgs.length));
			visual.querySelector('.pagination .current').innerHTML = activeImg + 1 + (realIndex * imgs.length);
		} else {
			setRemoveActive(imgs);
			imgs[activeImg].classList.add('active');
			setProgress(activeImg + (realIndex * imgs.length));
			visual.querySelector('.pagination .current').innerHTML = activeImg + 1 + (realIndex * imgs.length);
		}
	}

	// next
	const nextImgSlideAni = target => {
		const imgs = target;
		activeImg++;

		if (activeImg == imgs.length) {
			activeImg = 0;
			visualSwiper.slideNext();
			setProgress(activeImg + (realIndex * imgs.length));
			visual.querySelector('.pagination .current').innerHTML = activeImg + 1 + (realIndex * imgs.length);
		} else {
			setRemoveActive(imgs);
			imgs[activeImg].classList.add('active');
			setProgress(activeImg + (realIndex * imgs.length));
			visual.querySelector('.pagination .current').innerHTML = activeImg + 1 + (realIndex * imgs.length);
		}
	}

	// autoplay
	autoplayImg = () => {
		clearInterval(visualInterval)
		visualInterval = setInterval(() => {
			const imgs = visualSwiper.slides[activeIndex].querySelectorAll('.img');

			nextImgSlideAni(imgs);
		}, 5000);
	}

	visual.classList.add('active');
	fn.visualSwiper();
	setProgress(activeImg);

	// img click;
	visualSwiper.slides.forEach(slide => {
		const imgs = slide.querySelectorAll('.img');

		[...imgs].forEach((img, index) => {
			img.addEventListener('mouseenter', () => {
				clearInterval(visualInterval)

				activeImg = index;
				setRemoveActive(imgs);
				img.classList.add('active');
				setProgress(index+(realIndex*imgs.length));
				visual.querySelector('.pagination .current').innerHTML = (index+1)+(realIndex*imgs.length);

				autoplayImg(); // mouseleave 異붽� �� 二쇱꽍泥섎━
			});

			// // mouseleave 異붽� ��
			// img.addEventListener('mouseleave', autoplayImg());
		});
	});

	document.querySelector('.visual .btn-next').addEventListener('click', () => {
		const imgs = visualSwiper.slides[activeIndex].querySelectorAll('.img');

		clearInterval(visualInterval)
		nextImgSlideAni(imgs);
		autoplayImg();
	});

	document.querySelector('.visual .btn-prev').addEventListener('click', () => {
		const imgs = visualSwiper.slides[activeIndex].querySelectorAll('.img');

		clearInterval(visualInterval)
		prevImgSlideAni(imgs);
		autoplayImg();
	});
	
	document.querySelector('.visual .btn-autoplay').addEventListener('click', () => {
		clearInterval(visualInterval)
	});
	// con01
	const box04Swiper = new Swiper('.con01 .box4 .swiper', {
			slidesPerView: 1,
			spaceBetween: 20,
			effect: 'fade',
			on: {
				slideChangeTransitionStart: function() {
					let realIndex = this.realIndex;
					if(realIndex == 0) {
						$('.box4 figure img').attr('src','./resources/images/con01-04-01.jpg');
					} else if (realIndex == 1) {
						$('.box4 figure img').attr('src','./resources/images/con01-04-02.jpg');
					} else if (realIndex == 2) {
						$('.box4 figure img').attr('src','./resources/images/con01-04-03.jpg');
					} else if (realIndex == 3) {
						$('.box4 figure img').attr('src','./resources/images/con01-04-04.jpg');
					}
				},

			}
		});

		
		$('.box4 .btn').on('click', function() {
			if(box04Swiper.realIndex == 0) {
				if($(this).index() == 0) {
					box04Swiper.slideTo(1);
				}  
				if ($(this).index() == 1) {
					box04Swiper.slideTo(2);
				}
				if ($(this).index() == 2) {
					box04Swiper.slideTo(3);
				}
			} else if(box04Swiper.realIndex == 1) {
				
				if($(this).index() == 0) {
					box04Swiper.slideTo(2);
				}  
				if ($(this).index() == 1) {
					box04Swiper.slideTo(3);
				}
				if ($(this).index() == 2) {
					box04Swiper.slideTo(0);
				}
			} else if(box04Swiper.realIndex == 2) {
				if($(this).index() == 0) {
					box04Swiper.slideTo(3);
				}  
				if ($(this).index() == 1) {
					box04Swiper.slideTo(0);
				}
				if ($(this).index() == 2) {
					box04Swiper.slideTo(1);
				}
			} else if(box04Swiper.realIndex == 3) {
				
				if($(this).index() == 0) {
					box04Swiper.slideTo(0);
				}  
				if ($(this).index() == 1) {
					box04Swiper.slideTo(1);
				}
				if ($(this).index() == 2) {
					box04Swiper.slideTo(2);
				}
			}
		});
		
	const con01Wrap = document.querySelector('.con01 .con-wrap');
	const boxAll = con01Wrap.querySelectorAll('.box');
	const widthSet = () => boxAll.forEach(box => box.style.width = `80px`);
	let lastEnteredBox = boxAll[0];

	widthSet();

	$('.con01 .box1 .swiper-button-next').on('click', function() {
		widthSet();
		$('.con01 .box2').css('width','1208px');
		$('.con01 .box1').removeClass('active');
		$('.con01 .box2').addClass('active');
	});
	$('.con01 .box2 .swiper-button-next').on('click', function() {
		widthSet();
		$('.con01 .box3').css('width','1208px');
		$('.con01 .box2').removeClass('active');
		$('.con01 .box3').addClass('active');
	});
	$('.con01 .box3 .swiper-button-next').on('click', function() {
		widthSet();
		$('.con01 .box4').css('width','1208px');
		$('.con01 .box3').removeClass('active');
		$('.con01 .box4').addClass('active');
	});
	$('.con01 .box4 .swiper-button-next').on('click', function() {
		widthSet();
		$('.con01 .box5').css('width','1208px');
		$('.con01 .box4').removeClass('active');
		$('.con01 .box5').addClass('active');
	});
	$('.con01 .box5 .swiper-button-next').on('click', function() {
		widthSet();
		$('.con01 .box1').css('width','1208px');
		$('.con01 .box5').removeClass('active');
		$('.con01 .box1').addClass('active');
	});
	


	$('.con01 .box1 .swiper-button-prev').on('click', function() {
		widthSet();
		$('.con01 .box5').css('width','1208px');
		$('.con01 .box1').removeClass('active');
		$('.con01 .box5').addClass('active');
	});
	$('.con01 .box2 .swiper-button-prev').on('click', function() {
		widthSet();
		$('.con01 .box1').css('width','1208px');
		$('.con01 .box2').removeClass('active');
		$('.con01 .box1').addClass('active');
	});
	$('.con01 .box3 .swiper-button-prev').on('click', function() {
		widthSet();
		$('.con01 .box2').css('width','1208px');
		$('.con01 .box1').removeClass('active');
		$('.con01 .box2').addClass('active');
	});
	$('.con01 .box4 .swiper-button-prev').on('click', function() {
		widthSet();
		$('.con01 .box3').css('width','1208px');
		$('.con01 .box1').removeClass('active');
		$('.con01 .box3').addClass('active');
	});	
	$('.con01 .box5 .swiper-button-prev').on('click', function() {
		widthSet();
		$('.con01 .box4').css('width','1208px');
		$('.con01 .box5').removeClass('active');
		$('.con01 .box4').addClass('active');
	});

	// $('.con01 .box4 .btn').on('click', function() {
	// 	box04Swiper.slideTo($(this).index()+1);
	// });

	// $('.con01 .box figure img').on('click', function() {
	// 	box04Swiper.slideTo(0);
	// });

	lastEnteredBox.style.width = '1208px';

	let swiper01 = $('.con01 .box .swiper');
	boxAll.forEach(box => {
		box.addEventListener('mouseenter', () => {
			setTimeout(function(){
				if (lastEnteredBox) {
					widthSet();
				}

				lastEnteredBox = box;
				box.style.width = '1208px';

				$('.con01 .box').removeClass('active');
				lastEnteredBox.classList.add('active');
			},200)
		});

		box.addEventListener('mouseleave', () => {
			if (box == lastEnteredBox) { // 留덉�留됱쑝濡� 留덉슦�ㅺ� 吏꾩엯�� �곸옄留� 由ъ뀑
				// $('.con01 .box').removeClass('active');
				lastEnteredBox.classList.add('active');

			}  else {
			}
		});
	});
	
	lastEnteredBox.classList.add('active');

	const con05Swiper = new Swiper('.con05 .swiper', {
		slidesPerView: 'auto',
		spaceBetween: 32,
		centeredSlides: true,
		speed: 600,
		loop: true,
	});

	gsap.utils.toArray(document.querySelectorAll('.con05 .swiper-slide')).forEach((elem, index) => {
		gsap.set(elem, { opacity: 0, y: 100, duration: 0.6, });
		gsap.to(elem, {
			opacity: 1,
			y: 0,
			duration: 1,
			delay:(index + 1) * .1,
			ease: 'expo',
			scrollTrigger: {
				trigger: elem,
				start: 'top 80%',
				end: 'bottom 80%',
				toggleActions: 'play none none none',
			},
		});
	});

	window.addEventListener('scroll', function() {
		const visualBottom = document.querySelector('.visual').getBoundingClientRect().bottom;
		
	
		if (window.scrollY > visualBottom) {
			// .floating_btn�� .visual �곸뿭�� �섏뼱媛붿쓣 �� fade-in �대옒�ㅻ� 異붽��⑸땲��.
			$('.floating_btn').fadeIn()
		} else {
			// .floating_btn�� .visual �곸뿭 �덉뿉 �덉쓣 �� fade-in �대옒�ㅻ� �쒓굅�⑸땲��.
			$('.floating_btn').fadeOut()
		}
	});
	
	$('#header img').eq(2).on('click', function() {
		$('.my').fadeIn();
		$('.dim').fadeIn();
	});

	$('.my .close-btn').on('click', function(){
		$('.my').fadeOut();
		$('body').css('overflow', 'auto');
		$('.my .card-item').eq(0).addClass('on').siblings().removeClass('on');
		// $('.my .card-item').eq(1).css('bottom', '104px');
		// $('.my .card-item').eq(2).css('bottom', '48px');
		$('.my .my-body').removeClass('on')
		$('.my .my-body').eq(0).addClass('on')
		$('.dim').fadeOut();
		$('.my .my3').removeClass('on');
		$('.my .my1').addClass('on');
	});
	$('.my .my1').on('click', function(){
		$(this).removeClass('on');
		$('.my .my2').addClass('on');
	});

	$('.my .my2').on('click', function(){
		$(this).removeClass('on');
		$('.my .my3').addClass('on');
	});


	$('.my .card-item').on('click', function(){
		if($(this).hasClass('on')) {
			return;
		} else {
			$(this).addClass('on');
			$(this).find('.cover').fadeOut();
		}

		if($(this).eq(1)) {
			$(this).css('height','calc(100vh - 96px)');
			setTimeout(() => {	
				$('.my .card-item').eq(0).find('.step3 img').attr('src','./mo/resource/images/on-header_01.png')
				$('.my .card-item').eq(0).css({
					'backgroundColor':'#00ADD3',
					'padding':20
			},1000);
		})
	}

	});

	$('.my-body.step3 > img').on('click', function(){
		$(this).attr('src', './mo/resource/images/my01-02-01.png')
	});
	$('.my-body.step2 .btns').on('click', function(){

		$('.my-body.step2').removeClass('on');
		$('.my-body.step3').addClass('on');
	});



	$('.my .profile').on('click', function(){
		$('.my-body.step1').removeClass('on');
		$('.my-body.step2').addClass('on');
		$('.my .card-wrap .card-item.on').css('height','calc(100vh - 46px)')
		
	});
	// let tl = gsap.timeline({
	// 	scrollTrigger: {
	// 		trigger: '.con02',
	// 		start: "top top",
	// 		end: "+=200%",
	// 		pin:true,
	// 		scrub: 3
	// 	},
	// 	ease: 'expo'
	// })
	// .from(".con02 .middle-img .img-inner",{width:'100vw',duration:3,yPercent:0,},"-=0")
	// .from(".con02 .middle-img .img-inner",{yPercent:-18,duration:3},"-=3")
	// .from(".con02 .left-img",{scale:1.25,y:"65%",x:"-700%",duration:4},"-=2.5")
	// .from(".con02 .right-img",{scale:1.25,y:"65%",x:"450%",duration:4},"-=3.5")
	// .from(".con02 .text-area",{y:"200%",opacity:0,duration:4},"-=3.5")
	// .from(".con02 .title-area",{opacity:0 ,duration:3},"+=0.5")


	// gsap.to(".image-slide", {
	// 	x: ()=>- 1 * document.querySelector(".image-slide").offsetWidth,
	// 	scrollTrigger: {
	// 		trigger: ".image-slide",
	// 		start: "center center",
	// 		scrub: 2, 
	// 		end: () => "+=" + document.querySelector(".image-slide").offsetWidth
	// 	}
	// });
	
	// gsap.to(".con00", {
	// 	scrollTrigger: {
	// 		trigger: ".con00",
	// 		pin: true, 
	// 		start: "top top",
	// 		end: '+=200%'
	// 	}
	// });	

	
	// ScrollTrigger.create({
	// 	trigger: '.con05',
	// 	start: 'top center',
	// 	// markers: true,
	// 	onEnter: function() {
	// 		$('.con05 .vin').addClass('active');
	// 	},
	// 	onLeaveBack: function() {
	// 		$('.con05 .vin').removeClass('active');
	// 	},
	// });

	// ScrollTrigger.create({
	// 	trigger: '.con05 .last',
	// 	start: 'top center',
	// 	// markers: true,
	// 	onEnter: function() {
	// 		$('.con05 .last').addClass('active');
	// 	},
	// 	onLeaveBack: function() {
	// 		$('.con05 .last').removeClass('active');
	// 	},
	// });


	// let tours = gsap.utils.toArray('.con05 .list .tour'),
	// getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);

	// tours.forEach((tour, i) => {
	// 	let
	// 		bg = tour.querySelector('.background'),
	// 		txt = tour.querySelector('.inner');

	// 	let con05Ani = gsap.timeline({
	// 		scrollTrigger: {
	// 			trigger: tour,
	// 			start: () => i ? 'top bottom' : 'top top',
	// 			end: 'bottom top',
	// 			smooth: 2,
	// 			scrub: true,
	// 			invalidateOnRefresh: true
	// 		}
	// 	});

	// 	if (bg && txt ) {
	// 		con05Ani.fromTo(bg, {
	// 			y: () => i ? -window.innerHeight * getRatio(tour) : 0
	// 		}, {
	// 			y: () => window.innerHeight * (1 - getRatio(tour)),
	// 			ease: 'none'
	// 		});

	// 		con05Ani.fromTo(txt , {
	// 			y: () => i ? window.innerHeight * -getRatio(tour) * 2 : 0
	// 		}, {
	// 			y: () => window.innerHeight * getRatio(tour) * 2,
	// 			ease: 'none'
	// 		}, 0);
	// 	}
	// });
});
