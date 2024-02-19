window.addEventListener("load", function () {
  const canvas = document.querySelector("#canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = this.window.innerWidth;
  canvas.height = this.window.innerHeight;

  class Particle {
    constructor(effect) {
      this.effect = effect;
      this.x = Math.random() * this.effect.width;
      this.y = Math.random() * this.effect.height;
      // rectangle size
      this.size = Math.random() * 50;
      // v = velocity
      this.vx = Math.random() * 2 - Math.random() * 1;
      this.vy = Math.random() * 2 - Math.random() * 1;
    }
    // draw rectangle
    draw(context) {
      context.fillRect(this.x, this.y, this.size, this.size);
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
    }
  }

  class Effect {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.particlesArray = [];
      this.image = document.querySelector("#image1");
      this.centerX = this.width * 0.5;
      this.centerY = this.height * 0.5;
      // how to make to center? half img width and height
      this.x = this.centerX - this.image.width * 0.5;
      this.y = this.centerY - this.image.height * 0.5;
    }
    init() {
      for (let i = 0; i < 100; i++) {
        this.particlesArray.push(new Particle(this));
      }
    }
    draw(context) {
      this.particlesArray.forEach((particle) => particle.draw(context));
      context.drawImage(this.image, this.x, this.y);
    }
    update() {
      this.particlesArray.forEach((particle) => particle.update());
    }
  }

  const effect = new Effect(canvas.width, canvas.height);
  effect.init();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.draw(ctx);
    effect.update();
    requestAnimationFrame(animate);
  }
  animate();
});
