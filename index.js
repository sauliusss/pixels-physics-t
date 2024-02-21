window.addEventListener("load", function () {
  const canvas = document.querySelector("#canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = this.window.innerWidth;
  canvas.height = this.window.innerHeight;

  class Particle {
    constructor(effect, x, y, color) {
      this.effect = effect;
      this.x = Math.random() * this.effect.width;
      this.y = 0;
      this.originX = Math.floor(x);
      this.originY = Math.floor(y);
      this.color = color;
      // rectangle size
      this.size = this.effect.gap;
      // v = velocity
      this.vx = Math.random() * 2 - Math.random() * 1;
      this.vy = Math.random() * 2 - Math.random() * 1;
      // animation speed
      this.ease = Math.random() * 0.1;
    }
    // draw rectangle
    draw(context) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.size, this.size);
    }
    update() {
      this.x += (this.originX - this.x) * this.ease;
      this.y += (this.originY - this.y) * this.ease;
    }
    warp() {
      this.x = Math.random() * this.effect.width;
      this.y = Math.random() * this.effect.height;
      this.ease = 0.05;
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
      this.x = 0;
      this.y = 0;
      this.gap = 5;
    }
    init(context) {
      context.drawImage(this.image, this.x, this.y);
      const pixels = context.getImageData(0, 0, this.width, this.height).data;
      for (let y = 0; y < this.height; y += this.gap) {
        for (let x = 0; x < this.height; x += this.gap) {
          const index = (y * this.width + x) * 4;
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const alpha = pixels[index + 3];
          const color = "rgb(" + red + "," + green + "," + blue + ")";

          if (alpha > 0) {
            this.particlesArray.push(new Particle(this, x, y, color));
          }
        }
      }
    }
    draw(context) {
      this.particlesArray.forEach((particle) => particle.draw(context));
    }
    update() {
      this.particlesArray.forEach((particle) => particle.update());
    }
    warp() {
      this.particlesArray.forEach((particle) => particle.update());
    }
  }

  const effect = new Effect(canvas.width, canvas.height);
  effect.init(ctx);
  console.log(effect.particlesArray);
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.draw(ctx);
    effect.update();
    requestAnimationFrame(animate);
  }
  animate();

  // warp button
  const warpButton = this.document.querySelector("#warpButton");
  warpButton.addEventListener("click", function () {
    effect.warp;
  });
});
