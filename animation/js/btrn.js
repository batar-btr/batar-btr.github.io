(function(){
    'use strict';
    var canvas = document.getElementById('btrn'),
        ctx = canvas.getContext('2d'),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,
        options = {
            particleRadius: 10,
            defaultSpeed: 0.9,
            addedSpeed: 0.9,
            lineWidth: 5,
            particlesAmount: 600,
            backGroundColor: 'white',
            color: '#555'
        };

    var particles = [];
    var mouseCoords = {
        x: undefined,
        y: undefined
    };
    function Particle(x,y){
        this.x = options.particleRadius + (Math.random() * (w-options.particleRadius*2));
        this.y = options.particleRadius + (Math.random() * (h-options.particleRadius*2));
        this.speed = options.defaultSpeed + Math.random() * options.addedSpeed;
        this.color = randomColor();
        this.radius = options.particleRadius* Math.random();
        this.directionAngle = Math.floor(Math.random() * 360);
        this.direction = {
            x: Math.cos(this.directionAngle) * this.speed,
            y: Math.sin(this.directionAngle) * this.speed
        };
    };
    function createParticles(){
        for(var i = 0; i < options.particlesAmount; i++) {
            particles.push(new Particle());
        }
        console.log(particles);
    };
    createParticles();

    function randomColor(){
        return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) +','+Math.floor(Math.random() * 256)+')';
    };

    function grayScaleRandom(){
        var item = Math.round(Math.random()*150);
        return 'rgb('+ item + ',' + item + ',' + item +')';
    };
    function checkDistance(x1, y1, x2, y2) {                       //Возвращает расстояние между точками.
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));  //Квадрат гипотинузы равен 
    };
    Particle.prototype.draw = function(){
        ctx.lineWidth = options.lineWidth;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    Particle.prototype.update = function(){
        this.checkCollision();
        this.x += this.direction.x;
        this.y += this.direction.y;

        if(checkDistance(this.x, this.y, mouseCoords.x, mouseCoords.y) < 100) {
            this.radius < 50 ? this.radius += 1 : false ;//!!!!!!!!!!!!!!!!!!!!!!!
        } else if(this.radius > options.particleRadius) {
            this.radius -=1;
        }

    };
    Particle.prototype.checkCollision = function () {
        if (this.x + options.particleRadius >= w || this.x <= options.particleRadius) {
            this.direction.x *= -1;
        }
        if (this.y + options.particleRadius >= h || this.y <= options.particleRadius) {
            this.direction.y *= -1;
        }
    };
    // =============================================
    //                  WORKING LOOP
    // =============================================
    function loop(){
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

    canvas.addEventListener('mousemove', function(e){
        mouseCoords.x = e.pageX;
        mouseCoords.y = e.pageY;
        // console.log(mouseCoords);
    });

    canvas.addEventListener('click', function(e){
        console.log(e);
    });



    
    


    
    window.addEventListener('resize', function(){
        w = window.innerWidth;
        h = window.innerHeight;
        console.log(w,h);
    });
})();