(() => {

    class Car {
        constructor(name, price) {
            this.name = name;
            this.price = price;
            this.partials = {};
            this.urls = [
                "двери",
                "задние-крылья",
                "задний-бампер",
                "капот",
                "минимальный",
                "оптика",
                "передний-бампер",
                "пороги-внутренние",
                "пороги-наружние",
                "стандарт",
                "стандарт+",
                "стандарт++",
                "стандарт+++",
                "целиком",
                "clear"
            ];
        }
        loadImg() {
            let cnt = 0;

            let onLoad = () => {
                cnt++;
                if (cnt === this.urls.length) {
                    console.log(this.partials);
                }
            }

            this.urls.forEach((e, idx) => {
                let img = new Image();
                img.onload = onLoad;
                img.src = `./img/cars/${this.name}/${e}.jpg`
                this.partials[e] = { img, price: this.price[idx] };
            });
        }
    }
    let parts = {
        urls: [
            "зеркала",
            "капот-полностью",
            "крылья-полностью",
            "передний-бампер",
            "полка-заднего-бампера",
            "пороги-внутренние",
            "противотуманки",
            "ручки",
            "торцы-дверей",
            "фары",
            "часть-капота",
            "часть-крыльев"
        ],
        images: {},
        loadImg() {
            return new Promise((res, rej) => {
                length = this.urls.length;
                let cnt = 0;
                let images = {};
                function onLoad(){
                    cnt+=1;
                    if(cnt === length) {
                        res(images);
                    }  
                }
                this.urls.forEach(e => {
                    let img = new Image();
                    img.onload = onLoad;
                    img.src = `./img/parts/${e}.svg`;
                    images[e] = img;
                });
            });
        }
    };
    parts.loadImg().then(data => {
        console.log(data);
    });


    let mazdaPrice = [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300];
    let citPrice = [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200];
    let mersPrice = [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500];

    let cars = {
        mers: new Car('mers', mersPrice),
        cit: new Car('cit', citPrice),
        mazda: new Car('mazda', mazdaPrice)
    };

    for (car in cars) {
        cars[car].loadImg();
    }

    let navBar = {
        elem: document.querySelector('.navbar'),
        cards: document.querySelectorAll('.card'),
        currentCar: 'mers',
        mouseover() {
            this.elem.addEventListener('mouseover', e => {
                let target = e.target.closest('.card');
                if (!target) {
                    return;
                }

                if (target.dataset.name !== this.currentCar) {
                    this.currentCar = target.dataset.name;
                    this.cards.forEach(e => e.classList.remove('active'));
                    target.classList.add('active');
                    viewBar.renderImg('стандарт++', this.currentCar);
                    sidebar.selectDefault();
                }

            });
        }
    };
    navBar.mouseover();


    let viewBar = {
        elem: document.querySelector('.viewbar'),
        mainWindow: document.querySelector('.mainwindow'),
        renderImg(part, car) {
            let img = this.mainWindow.children[0];
            let newImg = cars[car].partials[part].img;
            if (img !== newImg) {
                this.mainWindow.replaceChild(newImg, img);
            }
        }
    };

    document.querySelector('.dropdown').addEventListener('click', e => {
        let target = e.target.tagName === "LI" ? e.target : e.target.parentElement;
        target.classList.toggle('active');
        let content = target.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });



    let customBar = {
        elem: document.querySelector('.custombar'),
        update(partsArr) {
            this.elem.innerHTML = partsArr;
        }
    }
    let sidebar = {
        elem: document.querySelector('.sidebar'),
        listItems: [...document.querySelectorAll('.sidebar li')].filter(e => {
            return !e.classList.contains('dropdown');
        }),
        currentPart: 'стандарт++',
        selectDefault() {
            this.listItems.forEach(e => e.classList.remove('active'));
            let item = this.elem.querySelector('[data-item="стандарт++"]');
            item.classList.add('active');
            viewBar.renderImg('стандарт++', navBar.currentCar);
        },
        click() {
            this.elem.addEventListener('click', e => {
                let target = e.target;
                if (target.dataset.item !== undefined) {
                    this.listItems.forEach(e => e.classList.remove('active'));
                    target.classList.add('active');
                    viewBar.renderImg(target.dataset.item, navBar.currentCar);
                    customBar.update(target.dataset.item);
                }
            });
        }
    };
    sidebar.click();

})();