console.log('멤버십 모바일');

let membershipSection = document.querySelector('.membership-section');
let membershipSectionArea = membershipSection.querySelectorAll('.mo-area');

const fn_pc_recommend = a => {
    // ScrollTrigger.create({
    //     trigger: a,
    //     start: '-15% center',
    //     onEnter: function() {
    //         a.classList.add('active');
    //     },
    //     onLeaveBack: function() {
    //         a.classList.remove('active');
    //     },
    // });

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
    let recommendSwiperAct = new Swiper(a.querySelector('.active .swiper'), {
        //slidesPerView: 1.4,
        slidesPerView: 'auto',
        spaceBetween: 16,
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
                    //slidesPerView: 1.4,
                    slidesPerView: 'auto',
                    spaceBetween: 16,
                });
            });

            let index = tab.getAttribute('data-index');
            contents[index].classList.add('active');
        });
    });
}

setTimeout(() => {
    for(let i of document.querySelectorAll('.mo-area')) {
        if(i.classList.contains('mo-recommend')){
            fn_pc_recommend(i);
        }
    }
}, 0);