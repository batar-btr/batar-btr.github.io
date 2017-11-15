(function () {
    'use strict';

    var canvas = document.getElementById('particles'),
        ctx = canvas.getContext('2d'),

        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,

        options = {                          //Обьект настроек
            backGroundColor: '#222',
            defaultSpeed: 1,
            addedSpeed: 2,
            particleColor: '#ebebeb',
            defaultRadius: 2,
            addedRadius: 2,
            particleAmount: 20,
            communicateRadius: 400,
            lineWidth: 0.5,
            lineColor: 'rgba(255,255,255,opacity)'
        },

        particles = [];

    function checkDistance(x1, y1, x2, y2) {                       //Возвращает расстояние между точками.
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));  //Квадрат гипотинузы равен 
    };                                                            //сумме квадратов катетов
    // console.log(checkDistance(4,5,200,200));
    function Particle(x, y) {    // Конструктор частиц
        this.x = x || Math.random() * w;
        this.y = y || Math.random() * h;
        this.speed = options.defaultSpeed + Math.random() * options.addedSpeed;
        this.directionAngle = Math.floor(Math.random() * 360);
        this.color = options.particleColor;
        this.radius = options.defaultRadius + Math.random() * options.addedRadius;
        this.direction = {
            x: Math.cos(this.directionAngle) * this.speed,
            y: Math.sin(this.directionAngle) * this.speed
        };
    };
    function createParticles() {
        for (var i = 0; i < options.particleAmount; i++) {
            particles.push(new Particle());
        }
    };
    function communicateParticles(currentParticle, allParticles) {
        for (var i = 0; i < allParticles.length; i++) {
            var distance = checkDistance(currentParticle.x, currentParticle.y, allParticles[i].x, allParticles[i].y);
            var opacity = 1 - distance / options.communicateRadius;
            // console.log(distance, opacity);
            if (opacity > 0) {
                ctx.lineWidth = options.lineWidth;
                ctx.strokeStyle = options.lineColor.replace('opacity', opacity);
                ctx.beginPath();
                ctx.moveTo(currentParticle.x, currentParticle.y);
                ctx.lineTo(allParticles[i].x, allParticles[i].y);
                ctx.closePath();
                ctx.stroke();
            }
        }
    };
    Particle.prototype.update = function () {
        this.checkCollision();
        this.x += this.direction.x;
        this.y += this.direction.y;
    };
    Particle.prototype.checkCollision = function () {
        if (this.x >= w || this.x <= 0) {
            this.direction.x *= -1;
        }
        if (this.y >= h || this.y <= 0) {
            this.direction.y *= -1;
        }
    };
    Particle.prototype.drawParticle = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    createParticles();

    // console.log(particles);
    function loop() {

        ctx.fillStyle = options.backGroundColor;
        ctx.fillRect(0, 0, w, h);
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].drawParticle();
        }
        for (var a = 0; a < particles.length; a++) {
            communicateParticles(particles[a], particles);
        }

        window.requestAnimationFrame(loop);

        // console.log(Date.now());
    };
    window.requestAnimationFrame(loop);

    canvas.addEventListener('click', function (e) {
        particles.push(new Particle(e.pageX, e.pageY));
        // console.log("clicked");
    });
    canvas.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        particles.splice(particles.length - 1, 1);
    });
    // console.log(canvas, ctx);


})();


