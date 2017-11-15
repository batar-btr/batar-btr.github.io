(function () {
    'use strict';
    var canvas = document.getElementById('btrn1'),
        ctx = canvas.getContext('2d'),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,
        options = {
            particleRadius: 2,
            addedRadius: 8,
            defaultSpeed: 0.5,
            addedSpeed: 0.2,
            lineWidth: 5,
            particlesAmount: 500,
            backGroundColor: 'white',
            color: '#555'
        };

    var particles = [];
    var mouseCoords = {
        x: undefined,
        y: undefined
    };
    function Particle(x, y) {
        this.radius = options.particleRadius * options.addedRadius * Math.random();
        this.x = this.radius + (Math.random() * (w - this.radius * 2));
        this.y = this.radius + (Math.random() * (h - this.radius * 2));
        this.speed = options.defaultSpeed + Math.random() * options.addedSpeed;
        this.color = grayScaleRandom();
        this.directionAngle = Math.floor(Math.random() * 360);
        this.direction = {
            x: Math.cos(this.directionAngle),
            y: Math.sin(this.directionAngle)
        };
    };
    function createParticles() {
        for (var i = 0; i < options.particlesAmount; i++) {
            particles.push(new Particle());
        }
        console.log(particles);
    };
    createParticles();

    function randomColor() {
        return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
    };

    function grayScaleRandom() {
        var item = Math.round(Math.random() * 150);
        return 'rgb(' + item + ',' + item + ',' + item + ')';
    };
    function checkDistance(x1, y1, x2, y2) {                       //Возвращает расстояние между точками.
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));  //Квадрат гипотинузы равен 
    };
    Particle.prototype.draw = function () {
        ctx.lineWidth = options.lineWidth;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    Particle.prototype.update = function () {
        this.checkCollision();
        this.x += this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;
        // координата - косинус угла, y - синус;
        if (checkDistance(this.x, this.y, mouseCoords.x, mouseCoords.y) < 100 && this.speed < 2) {
            this.direction.x = (this.x - mouseCoords.x) / checkDistance(this.x, this.y, mouseCoords.x, mouseCoords.y) * this.speed;
            this.direction.y = (this.y - mouseCoords.y) / checkDistance(this.x, this.y, mouseCoords.x, mouseCoords.y) * this.speed;
            this.speed += 0.5;
        } else if (this.speed > options.defaultSpeed) {
            this.speed -= 0.1;

        }

        // if(checkDistance(this.x, this.y, mouseCoords.x, mouseCoords.y) < 100) {
        //     this.radius < 50 ? this.radius += 1 : false ;
        // } else if(this.radius > options.particleRadius) {
        //     this.radius -=1;
        // }
    };
    Particle.prototype.checkCollision = function () {
        if (this.x + this.radius >= w || this.x <= this.radius) {
            this.direction.x *= -1;
        }
        if (this.y + this.radius >= h || this.y <= this.radius) {
            this.direction.y *= -1;
        }
        this.x > w - this.radius ? this.x = w - this.radius : this.x;
        this.y > h - this.radius ? this.y = h - this.radius : this.y;
        this.x < this.radius ? this.x = this.radius : this.x;
        this.y < this.radius ? this.y = this.radius : this.y;
    };
    // =============================================
    //                  WORKING LOOP
    // =============================================
    function loop() {
        ctx.fillStyle = options.backGroundColor;
        ctx.fillRect(0, 0, w, h);
        for (var i = 0; i < particles.length; i++) {
            particles[i].draw();
            particles[i].update();
        }
        window.requestAnimationFrame(loop);
    };

    window.requestAnimationFrame(loop);
    // =============================================
    // =============================================
    var anmId;
    function log() {
        anmId = window.requestAnimationFrame(log);
    };
    log();
    canvas.addEventListener('mousemove', function (e) {
        mouseCoords.x = e.pageX;
        mouseCoords.y = e.pageY;
    });

    canvas.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        window.cancelAnimationFrame(anmId);
    });






    window.addEventListener('resize', function () {
        w = window.innerWidth;
        h = window.innerHeight;
        console.log(w, h);
    });
})();