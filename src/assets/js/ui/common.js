const itemIndex = a => {
    let items = [...a.parentElement.children];
    return items.indexOf(a);
};

const insertAfter = (a, b) => {
    a.parentElement.insertBefore(b, a.nextSibling);
};

// blocking blank link
$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
    return false;
});

const singletab = a => {
    let target = a.parentElement;
    let parent = target.parentElement;

    for(let i of parent.children) {
        i.classList.remove('active');
    }
    target.classList.add('active');
};

const multitab = a => {
    a.parentElement.classList.toggle('active');
};

const tooltip = a => {
    let target = a.parentElement;
    target.classList.toggle('active');
	if(a.closest('.swiper-slide') != null) {
		a.closest('.swiper-slide').classList.toggle('active');
	}

    let click = (event) => {
        if((event.target != a && event.target.closest('.tipbox') == null) || event.target.classList.contains('i-close')) {
            target.classList.remove('active');
			if(a.closest('.swiper-slide') != null) {
				a.closest('.swiper-slide').classList.remove('active');
			}
            window.removeEventListener('click', click);
        }
    }
    window.addEventListener('click', click);
};

const contenttab = (a, b) => {
	let target = a;
	let parent = target.parentElement;
	let wrap = parent.closest('.tabWrap');
    
	for(let i of parent.children) {
        i.classList.remove('active');
    };
	a.classList.add('active');
	const allContents = wrap.querySelectorAll('.tabCont');
	allContents.forEach(content => {
		content.classList.remove('active');
	});
	if (b) {
		const targetContent = document.querySelector(b);
		if (targetContent) {
			targetContent.classList.add('active');
		}
		$(b+' [required]').prop('disabled', false);
	}else{
        $(b+' [required]').prop('disabled', true);
    }
};

const targetStickySetting = (a, b, c) => {
	const targetSection = document.querySelector(a);
	const tabContainer = targetSection.querySelector('.area-sorting .scroll');
	const tabs = tabContainer.querySelectorAll(b);
	const areas = targetSection.querySelectorAll(c);

	let upOffset = 72;
	let downOffset = 72;
	let headerHeight = 0;
	let lastScrollTop = 0;
	let scrollDirection = 'up';
	let isScrolling = false;

	const offsetH = () => {
		if (window.innerWidth < 800) {
			downOffset = 72;
			headerHeight = 56;
		} else {
			downOffset = 152;
			headerHeight = 80;
		}
	};

	const detectScrollDirection = () => {
		const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
		scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
		lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
	};

	const handleTargetScroll = () => {
		if (isScrolling) return;

		detectScrollDirection();
		const offset = scrollDirection === 'down' ? downOffset : upOffset + headerHeight;
		const scrollPosition = window.pageYOffset + offset + 1;

		areas.forEach((area, index) => {
			const areaTop = area.offsetTop;
			const areaHeight = area.offsetHeight;
			if (scrollPosition >= areaTop && scrollPosition < areaTop + areaHeight) {
				tabs.forEach(t => t.classList.remove('active'));
				tabs[index].classList.add('active');
				scrollTabIntoView(tabs[index]);
			}
		});
	};

	const handleTabClick = (event) => {
		isScrolling = true;
		setTimeout(() => { isScrolling = false; }, 500);

		tabs.forEach(t => t.classList.remove('active'));
		event.currentTarget.classList.add('active');

		const targetId = event.currentTarget.getAttribute('data-target');
		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			scrollToElement(targetElement);
		}
		scrollTabIntoView(event.currentTarget);
	};

	const scrollToElement = (element) => {
		const elementPosition = element.getBoundingClientRect().top;
		const offset = elementPosition > window.pageYOffset ? downOffset : upOffset + headerHeight;
		const offsetPosition = elementPosition + window.pageYOffset - offset;
		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	};

	const scrollTabIntoView = (tab) => {
		const tabContainerRect = tabContainer.getBoundingClientRect();
		const tabRect = tab.getBoundingClientRect();
		if (tabRect.left < tabContainerRect.left) {
			tabContainer.scrollLeft += tabRect.left - tabContainerRect.left - 20;
		} else if (tabRect.right > tabContainerRect.right) {
			tabContainer.scrollLeft += tabRect.right - tabContainerRect.right;
		}
	};

	tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
	window.addEventListener('resize', offsetH);
	window.addEventListener('scroll', handleTargetScroll);
	offsetH();
	handleTargetScroll();
};
// 공통 상단
// 페이지 스크롤다운 시, 숨김 처리 되었다가 스크롤업 액션 시 재노출
let lastScrollTop = 0;
let isScrollListenerAdded = false;

function handleScroll() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    toggleClassOnScroll('sub-head', currentScroll);
    toggleClassOnScroll('area-sticky', currentScroll);
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

function toggleClassOnScroll(elementId, currentScroll) {
    let element = document.getElementById(elementId);
    if (element) {
        if (currentScroll >= 56) {
            if (currentScroll > lastScrollTop) {
                element.classList.add("down");
            } else {
                element.classList.remove("down");
            }
        } else {
            element.classList.remove("down");
        }
    }
}

function checkWindowWidth() {
	if (window.innerWidth < 800) {
        if (!isScrollListenerAdded) {
            window.addEventListener("scroll", handleScroll);
            isScrollListenerAdded = true;
        }
    } else {
        if (isScrollListenerAdded) {
            window.removeEventListener("scroll", handleScroll);
            isScrollListenerAdded = false;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    handleScroll();
    checkWindowWidth();
});