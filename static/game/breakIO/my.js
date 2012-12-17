$(document).ready(function () {
    "use strict";
    var canvas = $("#canvas"),
        context = canvas.get(0).getContext("2d"),
        scene = new TitleScene(),
        ballSpec = { speed: 5, radius: 6 },
        colors = [ { color: "#000", subColor: "#222" }, { color: "#FFF", subColor: "#DDD" } ],
        bounds = { top: 49, bottom: 465, left: 40, right: 424 };

    $("#playing").hide();

    setInterval(function update() {
        context.clearRect(0, 0, 465, 465);
        scene.update();
        scene.draw();
    }, 16);

// TitleScene
    function TitleScene() {
        $("#title").show();
        $("#clickToStart").one("click", function (e) {
            e.preventDefault();
            $("#title").hide();
            scene = new PlayingScene();
        });
    }

    TitleScene.prototype.update = function () { };

    TitleScene.prototype.draw = function () {
        context.fillStyle = "#000";
        context.fillRect(0, 0, 465, 465);
    };

// PlayingScene
    function PlayingScene() {
        var that = this;

        this.paddle = new Paddle();
        this.balls = [
            new Ball(208, 185, ballSpec.speed, -90, ballSpec.radius, 1),
            new Ball(224, 201, ballSpec.speed, -90, ballSpec.radius, 1),
            new Ball(256, 185, ballSpec.speed, -90, ballSpec.radius, 0),
            new Ball(240, 201, ballSpec.speed, -90, ballSpec.radius, 0),
            new Ball(224, 217, ballSpec.speed, 90, ballSpec.radius, 0),
            new Ball(208, 233, ballSpec.speed, 90, ballSpec.radius, 0),
            new Ball(240, 217, ballSpec.speed, 90, ballSpec.radius, 1),
            new Ball(256, 233, ballSpec.speed, 90, ballSpec.radius, 1)
        ];
        this.blocks = [];
        this.particles = [];
        this.particlePool = [];
        this.score = 0;

        for (var row = 0; row < 26; row++) {
            for (var col = 0; col < 12; col++) {
                ((col < 6) ^ (row < 10))
                    ? this.blocks.push(new Block(col * 32 + bounds.left, row * 16 + bounds.top, 1))
                    : this.blocks.push(new Block(col * 32 + bounds.left, row * 16 + bounds.top, 0));
            }
        }

        $("#playing").show();
        $(window).one("mousedown", function (e) {
            e.preventDefault();
            for (var i = that.balls.length - 1; i >= 0; i--) { that.balls[i].init(); }
        });
        $(window).mousemove(function (e) {
           that.paddle.update(e.pageX);
        });
    }

    PlayingScene.prototype.update = function () {
        var i, j, k, ball, block, particle, bounceH, bounceV, hitsCorner;

        for (i = this.balls.length - 1; i >= 0; i--) {
            ball = this.balls[i];
            if (!ball.launched) { continue; }
            ball.update();

            bounceH = bounceV = hitsCorner = false;
            for (j = this.blocks.length - 1; j >= 0; j--) {
                block = this.blocks[j];
                if (ball.sameColor(block) && ball.hitTest(block)) {
                    this.score += 100;

                    for (k = 0; k < 10; k++) {
                        particle = (this.particlePool.length) ? this.particlePool.pop() : new Particle();
                        particle.init(block);
                        this.particles.push(particle);
                    }
                    block.invert();

                    if ((ball.old.x < block.bounds.left || block.bounds.right < ball.old.x)
                        && (ball.old.y < block.bounds.top || block.bounds.bottom < ball.old.y)
                    ) {
                        hitsCorner = true;
                    } else if (ball.old.x < block.bounds.left || block.bounds.right < ball.old.x) {
                        bounceH = true;
                    } else if (ball.old.y < block.bounds.top || block.bounds.bottom < ball.old.y) {
                        bounceV = true;
                    }
                }
            }
            if (hitsCorner && !bounceH && !bounceV) { bounceH = bounceV = true; }

            if (this.paddle.hitTest(ball)){
                ball.bounceOnPaddle(this.paddle);
            } else if (!ball.pierces) {
                ball.bounce(bounceH, bounceV);
            }
        }

        for (i = this.particles.length - 1; i >= 0; i--) {
            particle = this.particles[i];
            particle.update();
            if (!particle.exists) {
                this.particles.splice(i, 1);
                this.particlePool.push(particle);
            }
        }
    };

    PlayingScene.prototype.draw = function () {
        var i;

        for (i = this.blocks.length - 1; i >= 0; i--) { this.blocks[i].draw(); }
        for (i = this.balls.length -1; i >= 0; i--) { this.balls[i].draw(); }
        this.paddle.draw();
        for (i = this.particles.length - 1; i >= 0; i--) { this.particles[i].draw(); }
        $(".score").html(this.score);
    };

// Paddle
    function Paddle() {
        this.x = 232;
        this.y = 400;
        this.halfWidth = 32;
    }

    Paddle.prototype.update = function (x) {
        this.x = Math.min(Math.max(bounds.left + this.halfWidth, x), bounds.right - this.halfWidth);
    };

    Paddle.prototype.hitTest = function (ball) {
        return (ball.old.y < this.y
            && ball.pos.y >= this.y
            && (this.x - this.halfWidth) < (ball.pos.x + ball.radius)
            && (ball.pos.x - ball.radius) < (this.x + this.halfWidth)
        );
    };

    Paddle.prototype.draw = function () {
        context.fillStyle = "#888";
        context.fillRect(this.x - this.halfWidth, this.y, this.halfWidth * 2, 8);
    };

// Ball
    function Ball(x, y, speed, angle, radius, colorIndex) {
        this.pos = { x: x, y: y };
        this.old = { x: x, y: y };
        this.vel = { x: 0, y: 0 };
        this.polar = { speed: speed, angle: angle };
        this.radius = radius;
        this.colorIndex = colorIndex;
        this.pierces = false;
        this.launched = false;
    }

    Ball.prototype.init = function () {
        this.launched = true;
    };

    Ball.prototype.update = function () {
        var v = false,
            h = false;

        this.old.x = this.pos.x;
        this.old.y = this.pos.y;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (this.pos.y < bounds.top + this.radius) {
            this.pos.y = bounds.top + this.radius;
            v = true;
        } else if (this.pos.y > bounds.bottom + this.radius) {
            this.pos.y = bounds.bottom + this.radius;
            v = true;
            this.polar.speed = ballSpec.speed;
            this.pierces = false;
        }

        if (this.pos.x < bounds.left + this.radius) {
            this.pos.x = bounds.left + this.radius;
            h = true;
        } else if (this.pos.x > bounds.right - this.radius) {
            this.pos.x = bounds.right - this.radius;
            h = true;
        }

        this.bounce(h, v);
    };

    Ball.prototype.bounce = function (h, v) {
        if (h) { this.polar.angle = (180 - this.polar.angle); }
        if (v) { this.polar.angle = -this.polar.angle; }
        if (h || v) { this.polar.speed = Math.min(this.polar.speed + 0.1, 16); }

        this.polar.angle += Math.random() * 2 - 1;
        this.polar.angle %= 360;
        if (this.polar.angle < -180) {
            this.polar.angle += 360;
        } else if (this.polar.angle > 180) {
            this.polar.angle -= 360;
        }

        this.turn();
    };

    Ball.prototype.turn = function () {
        var speed = this.polar.speed * ((this.pierces) ? 1.5 : 1);
        this.vel.x = speed * Math.cos(this.polar.angle * Math.PI / 180);
        this.vel.y = speed * Math.sin(this.polar.angle * Math.PI / 180);
    };

    Ball.prototype.sameColor = function (block) {
        return this.colorIndex === block.colorIndex;
    };

    Ball.prototype.hitTest = function (block) {
        var sqDist = 0;

        if (this.pos.x < block.bounds.left) {
            sqDist += (block.bounds.left - this.pos.x) * (block.bounds.left - this.pos.x);
        } else if (this.pos.x > block.bounds.right) {
            sqDist += (this.pos.x - block.bounds.right) * (this.pos.x - block.bounds.right);
        }

        if (this.pos.y < block.bounds.top) {
            sqDist += (block.bounds.top - this.pos.y) * (block.bounds.top - this.pos.y);
        } else if (this.pos.y > block.bounds.bottom) {
            sqDist += (this.pos.y - block.bounds.bottom) * (this.pos.y - block.bounds.bottom);
        }

        return sqDist <= this.radius * this.radius;
    };

    Ball.prototype.bounceOnPaddle = function (paddle) {
        this.bounce(false, true);
        this.polar.speed = ballSpec.speed;
        this.polar.angle = ((this.polar.angle + 90) * 0.8) - 90;
        this.polar.angle += (this.pos.x - paddle.x);
        this.polar.angle = Math.min(Math.max(-150, this.polar.angle), -30);
        this.pierces = (Math.abs(this.pos.x - paddle.x) < 8);
        this.turn();
    };

    Ball.prototype.draw = function () {
        context.save();
        context.fillStyle = colors[this.colorIndex].color;
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
        context.closePath();

        if (this.pierces) {
            context.strokeStyle = "#F00";
            context.lineWidth = 4;
            context.stroke();
        }

        context.fill();
        context.restore();
    };

// Block
    function Block(x, y, colorIndex) {
        this.bounds = { left: x, right: x + 32, top: y, bottom: y + 16 };
        this.colorIndex = colorIndex;
    }

    Block.prototype.invert = function () {
        this.colorIndex = ((this.colorIndex === 0) ? 1 : 0);
    };

    Block.prototype.draw = function () {
        context.save();
        context.fillStyle = colors[this.colorIndex].color;
        context.strokeStyle = colors[this.colorIndex].subColor;
        context.fillRect(this.bounds.left, this.bounds.top, 32, 16);
        context.strokeRect(this.bounds.left + 0.5, this.bounds.top + 0.5, 31, 15);
        context.restore();
    };

// Particle
    function Particle() {
        this.pos = { x: 0, y: 0, rotation: 0 };
        this.vel = { x: 0, y: 0, rotation: 0 };
        this.scale = 1;
        this.colorIndex = 0;
        this.exists = false;
    }

    Particle.prototype.init = function (block) {
        this.pos.x = block.bounds.left + Math.random() * (block.bounds.right - block.bounds.left);
        this.pos.y = block.bounds.top + Math.random() * (block.bounds.bottom - block.bounds.top);
        this.pos.rotation = 0;
        this.vel.x = Math.random() * 6 - 3;
        this.vel.y = Math.random() * 6 - 3;
        this.vel.rotation = Math.random() * 30 - 15;
        this.scale = Math.random() * 2 + 1;
        this.colorIndex = block.colorIndex;
        this.exists = true;
    };

    Particle.prototype.update = function () {
        this.vel.y += 0.3;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.pos.rotation += this.vel.rotation;
        this.scale -= 0.05;

        if (this.scale < 0.1) { this.exists = false; }
    };

    Particle.prototype.draw = function () {
        context.save();
        context.fillStyle = colors[this.colorIndex].subColor;
        context.globalAlpha = 0.5;
        context.setTransform(1, 0, 0, 1, this.pos.x, this.pos.y);
        context.scale(this.scale, this.scale);
        context.rotate(this.pos.rotation * Math.PI / 180);
        context.fillRect(-4, -4, 8, 8);
        context.restore();
    };
});