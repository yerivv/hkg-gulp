
let fadeElems = [];
let realIndex = 0;

const fn = (() => {
	"use strict";

	return {
		scrollFadeInAni: (target) => {
			fadeElems = document.querySelectorAll(target);

			fadeElems.forEach((elem) => {
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
	// fullpage
	$('#fullpage').fullpage({
		// anchors: ['section1', 'section2', 'section3', 'section4'],
		sectionSelector: '.con',
		controlArrows: false,
		slidesNavigation: true,
		slidesNavPosition: 'top',
		navigation: true,
        navigationPosition: 'left',
		afterLoad: function(origin, destination, direction) {
			$('.con').eq(destination.index).addClass('active');
		},
		onLeave: function(origin, destination, direction) {
			$('.con').eq(origin.index).removeClass('active');

			if (destination == 1){
				$('#header').removeClass('active');
				$('#header img').eq(0).attr('src', './resources/images/header01-1.png');
				$('#header img').eq(1).attr('src', './resources/images/header02-1.png');
				$('#header img').eq(2).attr('src', './resources/images/header03-1.png');
			} 
			if (destination >= 2) {
				$('#header').addClass('active');
				$('#header img').eq(0).attr('src', './resources/images/header01.png');
				$('#header img').eq(1).attr('src', './resources/images/header02.png');
				$('#header img').eq(2).attr('src', './resources/images/header03.png');
			}
		},
	});

	// gsap.registerPlugin(ScrollTrigger);

	// visual
	let visualSwiper = new Swiper('.visual .swiper', {
		effect: 'fade',
		speed: 800,
		loop: true,
		autoplay: {
			delay: 6000,
		},
		on: {
			slideChangeTransitionStart: function() {
				realIndex = this.realIndex;
				const navBtns = document.querySelectorAll('.visual .visual-nav .btn-nav');

				navBtns.forEach((btn, index) => {
					index == realIndex ? btn.classList.add('active') : btn.classList.remove('active');
				});
			},
		}
	});

	const visualNav = document.querySelector('.visual .visual-nav');
	const visualNavBtns = visualNav.querySelectorAll('.btn-nav');

	visualNavBtns.forEach((btn, index) => {
		btn.addEventListener('mouseover', () => {
			visualSwiper.slideToLoop(index);
		});
	});

	// con01
	const con01Swiper = new Swiper('.con01-swiper .swiper', {
		mousewheel: true,
		direction: 'vertical',
		speed: 800,
		on: {
			slideChangeTransitionStart: function() {
				document.querySelector('.con01 .inner .bg-wrap').classList.remove('bg1', 'bg2', 'bg3');
				document.querySelector('.con01 .inner .bg-wrap').classList.add(`bg${this.activeIndex + 1}`);
			},
		}
	});

	$(document).on('mouseenter', '.con01 .con01-swiper', () => {
		$.fn.fullpage.setMouseWheelScrolling(false);
		$.fn.fullpage.setAllowScrolling(false);
	});

	$(document).on('mouseleave', '.con01 .con01-swiper', () => {
		$.fn.fullpage.setMouseWheelScrolling(true);
		$.fn.fullpage.setAllowScrolling(true);
	});

	$('.con03 .box-wrap .box').on('mouseenter', function() {
		$(this).addClass('active').siblings().removeClass('active');
		let index = $(this).index();

		$('.con03 .img-wrap img').eq(index).fadeIn().siblings().fadeOut();
		$('.con03 .img-wrap img').eq(index).addClass('active').siblings().removeClass('active');
	});

	const con02Swiper = new Swiper('.con02 .swiper', {
		slidesPerView: 'auto',
	});
	// con04
	const con04Swiper = new Swiper('.con04 .con04-swiper .swiper', {
		slidesPerView: 1,
		spaceBetween: 0,
		pagination: {
			el: '.con04 .swiper-pagination'
		},
		on: {
			slideChangeTransitionStart: function() {
				var idx = con04Swiper.realIndex + 1;
				$('.con04 .swiper-btns .count span').text("0"+idx);
				$('.con04 .swiper-btns .count em').text("0"+$('.con04 .con04-swiper .swiper .swiper-slide').length);
			},
		}
	});

	const con04textSwiper = new Swiper('.con04 .text-swiper', {
		slidesPerView: 1,
		spaceBetween: 20,
		controller: {
			control: con04Swiper, // con05Swiper瑜� �쒖뼱 ���곸쑝濡� �ㅼ젙
		},
	});

	con04Swiper.controller.control = con04textSwiper; // con05textSwiper瑜� �쒖뼱 ���곸쑝濡� �ㅼ젙

	$('#header img').eq(2).on('click', function() {
		$('.my').fadeIn();
		$('.dim').fadeIn();
	});
	$('#footer').click(function(){
		$('html, body').animate({scrollTop: 0}, 400);
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
});