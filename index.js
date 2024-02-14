window.addEventListener("load", function () {
  const canvas = document.querySelector("#canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = this.window.innerWidth;
  canvas.height = this.window.innerHeight;
});
