console.log('calendar js');

const calendar = {
    day: ['일', '월', '화', '수', '목', '금', '토'],
    inline(o) {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let option = {
            el: '',
            target: '',
            start: '',
            end: '',
            head: true,
            navi: true,
            body: 1,
            range: false,
            rangeFix: 0,
            offday: '',
            mode: 'inline',
            format: '.'
        };
        o && o.el ? option.el = document.querySelector(o.el) : option.el = option.el;
        o && o.target ? option.target = document.querySelector(o.target) : option.target = option.target;
        o && o.start ? option.start = document.querySelector(o.start) : option.start = option.start;
        o && o.end ? option.end = document.querySelector(o.end) : option.end = option.end;
        o && o.head ? option.head = o.head : option.head = option.head;
        o && o.navi ? option.navi = o.navi : option.navi = option.navi;
        o && o.body ? option.body = o.body : option.body = option.body;
        o && o.range ? option.range = o.range : option.range = option.range;
        o && o.rangeFix ? option.rangeFix = o.rangeFix : option.rangeFix = option.rangeFix;
        o && o.offday ? option.offday = document.querySelector(o.offday) : option.offday = option.offday;
        o && o.format ? option.format = o.format : option.format = option.format;

        if(! option.el) return false;
        if(option.body > 1) option.navi = false;
        this.create(year, month, option);
    },
    layer(a) {
        let year;
        let month;
        let option = {
            el: '',
            target: document.querySelector(a),
            start: '',
            end: '',
            head: false,
            navi: true,
            body: 1,
            range: false,
            rangeFix: 0,
            offday: '',
            mode: 'layer',
            format: '.'
        };
        
        option.target.addEventListener('click', () => {
            year = new Date().getFullYear();
            month = new Date().getMonth();
            
            if(option.target.tagName == 'INPUT' || option.target.tagName == 'input') {
                if(option.target.value) {
                    year = option.target.value.substring(0, 4);
                    month = Number(option.target.value.substring(5, 7)) - 1;
                }
            } else {
                if(option.target.textContent) {
                    year = option.target.textContent.substring(0, 4);
                    month = Number(option.target.textContent.substring(5, 7)) - 1;
                }
            }
            this.create(year, month, option);
        });
    },
    create(year, month, option) {
        if(option.mode == 'inline') {
            if(! option.el.classList.contains('hkcalendar')) {
                option.el.classList.add('hkcalendar', 'inline');
                
                if(option.head == true) {
                    let day = document.createElement('div');
                    day.classList.add('hkcalendar-head', 'd-flex', 'flex-col-7');
                    for(let i of this.day) {
                        let td = document.createElement('span');
                        td.classList.add('th', 'col');
                        td.innerHTML = i;
                        day.append(td);
                    }
                    option.el.append(day);
                }

                for(let i = 0; i < option.body; i++) {
                    let date = document.createElement('div');
                    date.setAttribute('midx', i);
                    date.classList.add('hkcalendar-body');
                    option.el.append(date);
                }
                this.setting(year, month, option);
            }
        }
        if(option.mode == 'layer') {
            if(! option.target.classList.contains('hkcalendar-layer-opened')) {
                option.target.classList.add('hkcalendar-layer-opened');
                option.el = document.createElement('div');
                option.el.classList.add('hkcalendar', 'layer');
                option.el.style.top = window.scrollY + option.target.offsetHeight + option.target.getBoundingClientRect().top + 'px';
                option.el.style.left = window.scrollX + option.target.getBoundingClientRect().left + 'px';
                document.body.append(option.el);
                
                if(option.head == true) {
                    let day = document.createElement('div');
                    day.classList.add('hkcalendar-head', 'd-flex', 'flex-col-7', 'gap-x-8');
                    for(let i of this.day) {
                        let td = document.createElement('span');
                        td.classList.add('th', 'col');
                        td.innerHTML = i;
                        day.append(td);
                    }
                    option.el.append(day);
                }

                for(let i = 0; i < option.body; i++) {
                    let date = document.createElement('div');
                    date.setAttribute('midx', i);
                    date.classList.add('hkcalendar-body');
                    option.el.append(date);
                }

                let close = document.createElement('button');
                close.setAttribute('type', 'button');
                close.classList.add('hkcalendar-close');
                close.innerHTML = '<i class="i-16 i-close">닫기</i>';
                option.el.append(close);
                
                this.setting(year, month, option);
            }
            let handler = (e) => {
                if(e.target != option.target && e.target != option.el && e.target.closest('.hkcalendar') == null || e.target.classList.contains('hkcalendar-close')) {
                    option.target.classList.remove('hkcalendar-layer-opened');
                    option.el?.remove();
                    window.removeEventListener('click', handler);
                }
            };
            window.addEventListener('click', handler);
        }
    },
    add(year, month, option) {
        let date = document.createElement('div');
        date.setAttribute('midx', Number(option.el.lastChild.getAttribute('midx')) + 1);
        date.classList.add('hkcalendar-body');
        option.el.append(date);

        this.setting(year, month, option);
    },
    prev(year, month, option) {
        setTimeout(() => {
            this.setting(year, month - 1, option);
        }, 0);
    },
    next(year, month, option) {
        setTimeout(() => {
            this.setting(year, month + 1, option);
        }, 0);
    },
    setting(year, month, option) {
        for(let i of option.el.querySelectorAll('.hkcalendar-body')) {
            if(option.range != true || i.innerHTML == '') {
                i.innerHTML = '';
                let y = Number(year);
                let m = Number(month) + Number(i.getAttribute('midx'));
                y = y + Math.floor(m / 12);
                m = m - (Math.floor(m / 12) * 12);
                let fstday = new Date(y, m, 1);
                let lstday = new Date(y, m + 1, 0);
                let today = '';
                today += new Date().getFullYear();
                today += Number(new Date().getMonth()) + 1 < 10 ? '0' + (Number(new Date().getMonth()) + 1) : Number(new Date().getMonth()) + 1;
                today += Number(new Date().getDate()) < 10 ? '0' + new Date().getDate() : new Date().getDate();
                let weeks = new Array(Math.ceil((fstday.getDay() + lstday.getDate()) / 7));
                let count = 1 - fstday.getDay();

                let caption = document.createElement('div');
                caption.classList.add('hkcalendar-body-caption');
                if(option.navi == true) {
                    caption.innerHTML += '<span class="hkcalendar-body-caption-prev">&lt;</span>';
                    caption.innerHTML += '<span class="hkcalendar-body-caption-tit">' + y + '년 ' + (m + 1) + '월</span>';
                    caption.innerHTML += '<span class="hkcalendar-body-caption-next">&gt;</span>';
                    i.append(caption);
                    i.querySelector('.hkcalendar-body-caption-prev').addEventListener('click', () => this.prev(y, m, option));
                    i.querySelector('.hkcalendar-body-caption-next').addEventListener('click', () => this.next(y, m, option));
                } else {
                    caption.innerHTML = '<span class="hkcalendar-body-caption-tit">' + y + '년 ' + (m + 1) + '월</span>';
                    i.append(caption);
                }

                for(let j of weeks) {
                    let tr = document.createElement('div');
                    option.mode == 'layer' ? tr.classList.add('hkcalendar-tr', 'd-flex', 'flex-col-7', 'gap-x-8') : tr.classList.add('hkcalendar-tr', 'd-flex', 'flex-col-7');
                    i.append(tr);
                    for(let j of this.day) {
                        let data = '';
                        data += new Date(y, m, count).getFullYear();
                        data += Number(new Date(y, m, count).getMonth()) + 1 < 10 ? '0' + (Number(new Date(y, m, count).getMonth()) + 1) : Number(new Date(y, m, count).getMonth()) + 1;
                        data += Number(new Date(y, m, count).getDate()) < 10 ? '0' + new Date(y, m, count).getDate() : new Date(y, m, count).getDate();

                        let td = document.createElement('span');
                        td.classList.add('td', 'col');
                        if(new Date(y, m, count).getDay() == 0) {
                            td.classList.add('sunday');
                        }
                        if(count <= 0 || count > lstday.getDate()) {
                            option.range == true ? td.classList.add('other', 'disabled') : td.classList.add('other');
                        }
                        if(option.range == true && data < today) {
                            td.classList.add('disabled');
                        }
                        if(option.range == true && td.classList.contains('other')) {
                            td.setAttribute('data', '');
                        } else {
                            td.setAttribute('data', data);
                            td.innerHTML = '<span class="data">' + new Date(y, m, count).getDate() + '</span>';
                        }
                        
                        if(option.range == true && data == today && !td.classList.contains('other')) {
                            let text = document.createElement('span');
                            text.classList.add('text');
                            text.innerHTML = 'today';
                            td.append(text);
                            td.classList.add('today');
                        }

                        if(option.range == false) {
                            let value = '';
                            if(option.target.tagName == 'INPUT' || option.target.tagName == 'input') {
                                value += option.target.value.substring(0, 4);
                                value += option.target.value.substring(5, 7);
                                value += option.target.value.substring(8, 10);
                            } else {
                                value += option.target.textContent.substring(0, 4);
                                value += option.target.textContent.substring(5, 7);
                                value += option.target.textContent.substring(8, 10);
                            }
                            if(data == value) {
                                td.classList.add('current');
                            }
                            td.addEventListener('click', (e) => {
                                if(e.target.classList.contains('current')) {
                                    e.target.classList.remove('current');
                                    this.insert(option.target, option.format, '');
                                } else {
                                    option.el.querySelector('.current')?.classList.remove('current');
                                    e.target.classList.add('current');
                                    this.insert(option.target, option.format, data);
                                    if(option.mode == 'layer') {
                                        option.target.classList.remove('hkcalendar-layer-opened');
                                        option.el.remove();
                                    }
                                }
                            });
                            if(count <= 0) {
                                td.addEventListener('click', () => {
                                    this.prev(y, m, option);
                                });
                            }
                            if(count > lstday.getDate()) {
                                td.addEventListener('click', () => {
                                    this.next(y, m, option);
                                });
                            }
                        }
                        if(option.range == true) {
                            let svalue = '';
                            if(option.start.tagName == 'INPUT' || option.start.tagName == 'input') {
                                svalue += option.start.value.substring(0, 4);
                                svalue += option.start.value.substring(5, 7);
                                svalue += option.start.value.substring(8, 10);
                            } else {
                                svalue += option.start.textContent.substring(0, 4);
                                svalue += option.start.textContent.substring(5, 7);
                                svalue += option.start.textContent.substring(8, 10);
                            }
                            if(data == svalue) {
                                td.classList.add('start');
                            }
                            let evalue = '';
                            if(option.end.tagName == 'INPUT' || option.end.tagName == 'input') {
                                evalue += option.end.value.substring(0, 4);
                                evalue += option.end.value.substring(5, 7);
                                evalue += option.end.value.substring(8, 10);
                            } else {
                                evalue += option.end.textContent.substring(0, 4);
                                evalue += option.end.textContent.substring(5, 7);
                                evalue += option.end.textContent.substring(8, 10);
                            }
                            if(data == evalue) {
                                td.classList.add('end');
                            }
                            td.addEventListener('click', (e) => {
                                let edata = '';
                                let fdata = '';
                                let add = true;
                                if(option.rangeFix != 0) {
                                    edata += e.target.getAttribute('data').substring(0, 4);
                                    edata += option.format;
                                    edata += e.target.getAttribute('data').substring(4, 6);
                                    edata += option.format;
                                    edata += e.target.getAttribute('data').substring(6, 8);
                                    edata = new Date(edata);
                                    edata.setDate(edata.getDate() + option.rangeFix);

                                    fdata += edata.getFullYear();
                                    fdata += Number(edata.getMonth()) + 1 < 10 ? '0' + (Number(edata.getMonth()) + 1) : Number(edata.getMonth()) + 1;
                                    fdata += Number(edata.getDate()) < 10 ? '0' + edata.getDate() : edata.getDate();
                                    
                                    for(let i of option.el.querySelectorAll('.td')) {
                                        if(i.getAttribute('data') == fdata) add = false;
                                    }
                                    if(add == true) this.add(year, month, option);
                                }
                                
                                if(e.target.getAttribute('data') == today || e.target.classList.contains('other') || e.target.classList.contains('disabled')) {
                                    return false;
                                }

                                if(option.el.querySelectorAll('.start').length != 0 && option.el.querySelectorAll('.end').length != 0) {
                                    for(let i of option.el.querySelectorAll('.start')) {
                                        i.classList.remove('start');
                                    }
                                    for(let i of option.el.querySelectorAll('.end')) {
                                        i.classList.remove('end');
                                    }
                                    for(let i of option.el.querySelectorAll('.range')) {
                                        i.classList.remove('range');
                                    }

                                    e.target.classList.add('start');
                                    this.insert(option.start, option.format, data);
                                    this.insert(option.end, option.format, '');
                                    if(option.rangeFix != 0) {
                                        for(let i of option.el.querySelectorAll('.td')) {
                                            if(i.getAttribute('data') == fdata) {
                                                i.classList.add('end');
                                                this.insert(option.end, option.format, fdata);
                                            }
                                        }
                                    }
                                } else {
                                    if(option.el.querySelectorAll('.start').length == 0 && option.el.querySelectorAll('.end').length == 0) {
                                        e.target.classList.add('start');
                                        this.insert(option.start, option.format, data);
                                        if(option.rangeFix != 0) {
                                            for(let i of option.el.querySelectorAll('.td')) {
                                                if(i.getAttribute('data') == fdata) {
                                                    i.classList.add('end');
                                                    this.insert(option.end, option.format, fdata);
                                                }
                                            }
                                        }
                                    } else if(option.el.querySelectorAll('.start').length != 0 && option.el.querySelectorAll('.end').length == 0 && e.target.classList.contains('start')) {
                                        e.target.classList.remove('start');
                                        this.insert(option.start, option.format, '');
                                    } else if(option.el.querySelectorAll('.start').length != 0 && option.el.querySelectorAll('.end').length == 0) {
                                        if(Number(e.target.getAttribute('data')) < Number(option.el.querySelector('.start').getAttribute('data'))) {
                                            this.insert(option.end, option.format, option.el.querySelector('.start').getAttribute('data'));
                                            option.el.querySelector('.start').classList.add('end');
                                            option.el.querySelector('.start').classList.remove('start');
                                            e.target.classList.add('start');
                                            this.insert(option.start, option.format, data);
                                        } else {
                                            e.target.classList.add('end');
                                            this.insert(option.end, option.format, data);
                                        }
                                    }
                                }
                                if(option.el.querySelectorAll('.start').length && option.el.querySelectorAll('.end').length) {
                                    for(let i of option.el.querySelectorAll('.td')) {
                                        if(Number(i.getAttribute('data')) >= Number(option.el.querySelector('.start').getAttribute('data')) && Number(i.getAttribute('data')) <= Number(option.el.querySelector('.end').getAttribute('data'))) {
                                            i.classList.add('range');
                                        }
                                    }
                                }
                            });
                        }
                        tr.append(td);
                        count++;
                    }
                }
                if(option.offday) {
                    option.offday.style.display = 'none';
                    for(let i of option.el.querySelectorAll('.td')) {
                        for(let j of option.offday.children) {
                            if(i.getAttribute('data') == j.innerHTML) {
                                i.classList.add('disabled');
                            }
                        }
                    }
                }
            }
        }
    },
    insert(target, format, data) {
        let value = '';
        if(data != '') {
            value += data.substring(0, 4);
            value += format;
            value += data.substring(4, 6);
            value += format;
            value += data.substring(6, 8);
        }

        if(target.tagName == 'INPUT' || target.tagName == 'input') {
            target.value = value;
        } else {
            target.innerHTML = value;
        }
    }
}