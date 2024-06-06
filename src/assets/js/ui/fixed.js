console.log('fixed area js');

const fixed = {
    init(a) {
        this.setting(a);
        window.addEventListener('resize', () => {
            this.setting(a);
        });
        window.addEventListener('scroll', () => {
            this.setting(a);
        });

        let observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                let {height} = entry.contentRect;
                this.setting(a);
            }
        });
        observer.observe(document.getElementById('contents'));
        for(let i of document.querySelectorAll('.area-fixed')) {
            observer.observe(i);
        }
    },
    setting(a) {
        if(document.querySelectorAll('.area-fixed').length) {
            let trg = document.getElementById('contents');
            let y = trg.getBoundingClientRect().top + trg.offsetHeight - window.innerHeight;
            let ph = 0;
            for(let i of document.querySelector('.area-fixed').children) {
                ph += i.offsetHeight;
            }
            for(let i of areapadding) {
                if(a == i.area) {
                    ph += i.padding;
                }
            }
            document.querySelector(a).style.minHeight = 'calc(100vh - ' + (window.scrollY + trg.getBoundingClientRect().top) + 'px)';
            document.querySelector(a).style.paddingBottom = ph + 'px';
            
            if(y < 0) {
                document.querySelector('.area-fixed').classList.add('inline');
            } else {
                document.querySelector('.area-fixed').classList.remove('inline');
            }
        }
    }
};

let areapadding = [
    {
        area: '.help-section',
        padding: 44
    },
    {
        area: '.inquiry-section',
        padding: 40
    },
    {
        area: '.custom-section',
        padding: 60
    }
]