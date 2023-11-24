// particle effects //
function Cloud(element, radius, lifeSpan, origin, height) {
  var offset = origin;
  var moving = false;
  var canvas = document.getElementById(element);
  var c = canvas.getContext("2d");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  window.addEventListener("resize", function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  });

  function CloudParticle(x, y, dx, dy, r, ls) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.opacity = 0.4;
    this.lifeSpan = ls;
    this.isDead = false;

    this.update = function () {
      this.x += this.dx;
      this.y += this.dy;

      if (this.y > canvas.height / 2 + offset.y + height) {
        this.lifeSpan = 0;
      }
      if (
        this.x > canvas.width / 2 + offset.x + r * 1.8 ||
        (this.x < canvas.width / 2 + offset.x - r * 1.8 && !moving)
      ) {
        this.lifeSpan = 0;
      }

      c.beginPath();
      c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      var grd = c.createRadialGradient(
        this.x,
        this.y,
        this.r,
        this.x,
        this.y + this.r,
        this.r + 15
      );
      grd.addColorStop(0, "rgba(150, 150, 160," + this.opacity + ")");
      grd.addColorStop(0.7, "rgba(100, 100, 100," + this.opacity + ")");
      c.fillStyle = this.r > 15 ? grd : "rgba(90, 90, 90," + this.opacity + ")";
      c.fill();

      this.opacity -= 0.4 / (ls / 0.05);
      this.r -= r / (ls / 0.1);
      this.lifeSpan -= 0.1;

      if (this.lifeSpan <= 0) {
        this.isDead = true;
      }
    };
  }

  function randomVelocity() {
    return {
      x: (Math.random() - 0.5) * 2.2,
      y: (Math.random() + 1.5) * 0.2,
    };
  }

  function CloudBurst() {
    var particles = [];
    for (var i = 0; i <= 20; i++) {
      setTimeout(function () {
        particles.push(
          new CloudParticle(
            canvas.width / 2 + offset.x,
            canvas.height / 2 + offset.y,
            randomVelocity().x,
            randomVelocity().y,
            radius,
            lifeSpan
          )
        );
      }, 50 * i);
    }
    this.render = function () {
      for (var i = 0, l = particles.length; i < l; i++) {
        if (!particles[i].isDead) {
          particles[i].update();
        } else {
          particles[i].x = canvas.width / 2 + offset.x;
          particles[i].y = canvas.height / 2 + offset.y;
          particles[i].dx = randomVelocity().x;
          particles[i].dy = randomVelocity().y;
          particles[i].r = radius;
          particles[i].opacity = 0.4;
          particles[i].lifeSpan = lifeSpan;
          particles[i].isDead = false;
        }
      }
    };
  }

  function RainParticle() {
    var rainSpan = radius * 4;
    this.x =
      Math.random() * rainSpan + canvas.width / 2 + offset.x - rainSpan / 2;
    this.y = canvas.height / 2 + offset.y + 20;

    this.update = function () {
      if (this.y > canvas.height - 5) {
        this.x =
          Math.random() * rainSpan + canvas.width / 2 + offset.x - rainSpan / 2;
        this.y = canvas.height / 2 + offset.y + 20;
      } else {
        this.y += 5;
      }
      c.beginPath();
      c.strokeStyle = "rgba(200, 200, 230, .2)";
      c.moveTo(this.x, this.y);
      c.lineTo(this.x, this.y + 15);
      c.closePath();
      c.stroke();
    };
  }
  var cloudBursts = [];
  var rainDrops = [];
  var burstCount = 0;

  var feedCanvas = setInterval(function () {
    cloudBursts.push(new CloudBurst());
    burstCount++;
    if (burstCount > 5) {
      clearInterval(feedCanvas);
      setTimeout(function () {
        var beginRain = setInterval(function () {
          if (rainDrops.length === 20) {
            clearInterval(beginRain);
          }
          rainDrops.push(new RainParticle());
        }, 100);
      }, 1000);
    }
  }, 500);

  this.animate = function () {
    canvas.width = canvas.width;
    for (var i = 0, l = rainDrops.length; i < l; i++) {
      rainDrops[i].update();
    }
    for (var i = 0, l = cloudBursts.length; i < l; i++) {
      cloudBursts[i].render();
    }
    requestAnimationFrame(this.animate.bind(this));
  };

  this.move = function (newOffset) {
    moving = true;
    var dx = (newOffset.x - offset.x) / 300;
    var dy = (newOffset.y - offset.y) / 300;
    var tick = 0;
    (function increment() {
      offset.x += dx;
      offset.y += dy;
      tick++;
      if (tick <= 300) {
        requestAnimationFrame(increment);
      } else {
        setTimeout(function () {
          moving = false;
        }, 1000);
      }
    })();
  };
}

var firstCloud = new Cloud("first", 50, 22, { x: -300, y: 40 }, 55);
firstCloud.animate();
firstCloud.move({ x: -50, y: 40 });
var secondCloud = new Cloud("second", 30, 16, { x: 300, y: -70 }, 33);
secondCloud.animate();
secondCloud.move({ x: 40, y: -70 });


