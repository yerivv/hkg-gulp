window.addEventListener('DOMContentLoaded', () => {
    selectbox.init();
});

const selectbox = {
    init(a) {
        let select;
        if(a) {
            select = document.getElementsByName(a);
        } else {
            select = document.querySelectorAll('.custom-select.design select');
        }
        
        select.forEach((a) => {
            if(! a.parentElement.classList.contains('selectbox')) {
                let wrap = a.parentElement;
                wrap.classList.add('selectbox');
                let text = document.createElement('span');
                text.classList.add('select-text');
                text.innerHTML = a.options[a.selectedIndex].text;
                wrap.append(text);
                text.addEventListener('click', () => {
                    if(wrap.classList.contains('active')) {
                        this.close(wrap);
                    }
                    else {
                        this.open(wrap, wrap.querySelector('select'), text);
                    }
                });
            } else {
                a.parentElement.querySelector('.select-text').innerHTML = a.options[a.selectedIndex].text;
            }
            a.addEventListener('change', (event) => {
                for(let i of event.target.children) {
                    if(i.selected == true) {
                        a.parentElement.querySelector('.select-text').innerHTML = i.text;
                    }
                }
            });
            if(a.options[a.selectedIndex].getAttribute('class')) {
                a.parentElement.querySelector('.select-text').classList.add(a.options[a.selectedIndex].getAttribute('class'));
            }
            if(a.getAttribute('placeholder')) {
                if(a.getAttribute('placeholder') == a.options[a.selectedIndex].text) {
                    a.parentElement.querySelector('.select-text').classList.add('placeholder');
                }
            }
        });
    },
    open(a, b, c) {
        for(let i of document.querySelectorAll('.selectbox')) {
            i.classList.remove('active');
            if(i.querySelector('.select-list')) {
                i.querySelector('.select-list').remove();
            }
        }
        let h = 2;
        let ul = document.createElement('ul');
        ul.classList.add('select-list');
        for(let i of b.children) {
            let li = document.createElement('li');
            if(i.selected == true) li.classList.add('selected');
            if(i.disabled == true) li.classList.add('disabled');
            if(i.getAttribute('class')) li.classList.add(i.getAttribute('class'));
            li.append(i.text);
            ul.append(li);
            li.addEventListener('click', () => {
                this.setting(a, b, li);
            });
        }

        a.classList.add('active');
        a.append(ul);
        h += c.clientHeight * 4;
        h += a.querySelector('.select-list .selected').clientHeight;
        ul.style.maxHeight = h + 'px';
        ul.style.overflowY = 'auto';
        ul.scrollTo(0, (window.scrollY + a.querySelector('.select-list .selected').getBoundingClientRect().top) - (window.scrollY + a.querySelector('.select-list').getBoundingClientRect().top) - 1);


        if(a.closest('.layerpop_load') != null) {
            if(Number(ul.getBoundingClientRect().top + ul.offsetHeight) > Number(a.closest('.layerpop_load').querySelector('.content').getBoundingClientRect().top + a.closest('.layerpop_load').querySelector('.content').clientHeight)) {
                ul.style.top = 'auto';
                ul.style.bottom = '0px';
            }
        }

        window.addEventListener('click', (event) => {
            if(event.target != a && event.target.closest('.selectbox') == null) {
                this.close(a);
            }
        });
    },
    close(a) {
        a.classList.remove('active');
        if(a.querySelector('.select-list')) {
            a.querySelector('.select-list').remove();
        }
    },
    setting(a, b, c) {
        let selecttext = a.querySelector('.select-text');
        for(let i of b.children) {
            if(i.text == c.innerHTML) {
                i.selected = true;
            }
            else {
                i.selected = false;
            }
        }
        selecttext.innerHTML = b.options[b.selectedIndex].text;
        selecttext.classList.remove('placeholder');
        b.dispatchEvent(new Event('change'));
        this.close(a);

        selecttext.className = '';
        if(b.options[b.selectedIndex].getAttribute('class')) {
            selecttext.classList.add('select-text', b.options[b.selectedIndex].getAttribute('class'));
        } else {
            selecttext.className = 'select-text';
        }
        if(b.getAttribute('placeholder')) {
            if(b.getAttribute('placeholder') == b.options[b.selectedIndex].text) {
                a.querySelector('.select-text').classList.add('placeholder');
            }
        }
    }
};