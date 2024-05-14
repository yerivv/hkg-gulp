console.log('calendar js');

const calendar = {
    year : '',
    month : '',
    el : '',
    head: true,
    day: ['일', '월', '화', '수', '목', '금', '토'],
    body: 1,
    navi : false,
    range: false,
    mode: '',
    init(o) {
        o && o.el ? this.el = document.querySelector(o.el) : this.el = this.el;
        o && o.head ? this.head = o.head : this.head = this.head;
        o && o.body ? this.body = o.body : this.body = this.body;
        o && o.navi ? this.navi = o.navi : this.navi = this.navi;
        o && o.range ? this.range = o.range : this.range = this.range;
        
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth();

        if(! this.el) return false;
        if(this.body > 1) this.navi = false;
        this.mode = 'inline';
        this.create();
    },
    in(o) {
        this.mode = 'layer';
    },
    create() {
        if(! this.el.classList.contains('hkcalendar')) {
            this.el.classList.add('hkcalendar');
            
            if(this.head == true) {
                let head = document.createElement('div');
                head.classList.add('hkcalendar-head', 'd-flex', 'flex-col-7');
                for(let i of this.day) {
                    let td = document.createElement('span');
                    td.classList.add('th', 'col');
                    td.innerHTML = i;
                    head.append(td);
                }
                this.el.append(head);
            }

            for(let i = 0; i < this.body; i++) {
                let body = document.createElement('div');
                body.setAttribute('midx', i);
                body.classList.add('hkcalendar-body');
                this.el.append(body);
            }
            this.setting(this.year, this.month);
        }
    },
    prev(a, b) {
        this.setting(a, b - 1);
    },
    next(a, b) {
        this.setting(a, b + 1);
    },
    setting(a, b) {
        for(let i of this.el.querySelectorAll('.hkcalendar-body')) {
            i.innerHTML = '';
            let year = Number(a);
            let month = Number(b) + Number(i.getAttribute('midx'));
            if(month < 0) year--, month = month + 12;
            if(month >= 12) year++, month = month - 12;
            let fstday = new Date(year, month, 1);
            let lstday = new Date(year, month + 1, 0);
            let weeks = new Array(Math.ceil((fstday.getDay() + lstday.getDate()) / 7));
            let count = 1 - fstday.getDay();

            let caption = document.createElement('div');
            caption.classList.add('hkcalendar-body-caption');
            if(this.navi == true) {
                caption.innerHTML += '<span class="hkcalendar-body-caption-prev">&lt;</span>';
                caption.innerHTML += '<span class="hkcalendar-body-caption-tit">' + year + '년 ' + (month + 1) + '월</span>';
                caption.innerHTML += '<span class="hkcalendar-body-caption-next">&gt;</span>';
                i.append(caption);
                i.querySelector('.hkcalendar-body-caption-prev').addEventListener('click', () => this.prev(year, month));
                i.querySelector('.hkcalendar-body-caption-next').addEventListener('click', () => this.next(year, month));
            } else {
                caption.innerHTML = '<span class="hkcalendar-body-caption-tit">' + year + '년 ' + (month + 1) + '월</span>';
                i.append(caption);
            }

            for(let j of weeks) {
                let tr = document.createElement('div');
                tr.classList.add('hkcalendar-tr', 'd-flex', 'flex-col-7');
                i.append(tr);
                for(let j of this.day) {
                    let td = document.createElement('span');
                    let data = '';
                    data += new Date(year, month, count).getFullYear();
                    data += Number(new Date(year, month, count).getMonth()) + 1 < 10 ? '0' + (Number(new Date(year, month, count).getMonth()) + 1) : Number(new Date(year, month, count).getMonth()) + 1;
                    data += Number(new Date(year, month, count).getDate()) < 10 ? '0' + new Date(year, month, count).getDate() : new Date(year, month, count).getDate();
                    td.classList.add('td', 'col');
                    if(new Date(year, month, count).getDay() == 0) {
                        td.classList.add('sunday');
                    }
                    if(count <= 0 || count > lstday.getDate()) {
                        td.classList.add('other');
                    }
                    td.setAttribute('data', data);
                    td.innerHTML = new Date(year, month, count).getDate();
                    tr.append(td);
                    count++;
                }
            }
        }
    }
}