!(function () {
    const t = document,
      e = t.documentElement,
      i = t.body,
      n = (window.sr = ScrollReveal({ mobile: !1 }));
    e.classList.remove("no-js"),
      e.classList.add("js"),
      window.addEventListener("load", function () {
        i.classList.add("is-loaded");
      }),
      i.classList.contains("has-animations") &&
        window.addEventListener("load", function () {
          n.reveal(".feature-extended .device-mockup", {
            duration: 600,
            distance: "100px",
            easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
            origin: "bottom",
            viewFactor: 0.6,
          }),
            n.reveal(".feature-extended .feature-extended-body", {
              duration: 600,
              distance: "40px",
              easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
              origin: "top",
              viewFactor: 0.6,
            });
        });
    let s = function (t) {
      let e = this;
      (e.parentNode = t),
        e.getCanvasSize(),
        window.addEventListener("resize", function () {
          e.getCanvasSize();
        }),
        (e.mouseX = 0),
        (e.mouseY = 0),
        window.addEventListener("mousemove", function (t) {
          (e.mouseX = t.clientX), (e.mouseY = t.clientY);
        }),
        e.randomise();
    };
    (s.prototype.getCanvasSize = function () {
      (this.canvasWidth = this.parentNode.clientWidth),
        (this.canvasHeight = this.parentNode.clientHeight);
    }),
      (s.prototype.generateDecimalBetween = function (t, e) {
        return (Math.random() * (t - e) + e).toFixed(2);
      }),
      (s.prototype.update = function () {
        let t = this;
        (t.translateX = t.translateX - t.movementX),
          (t.translateY = t.translateY - t.movementY),
          (t.posX +=
            (t.mouseX / (t.staticity / t.magnetism) - t.posX) / t.smoothFactor),
          (t.posY +=
            (t.mouseY / (t.staticity / t.magnetism) - t.posY) / t.smoothFactor),
          (t.translateY + t.posY < 0 ||
            t.translateX + t.posX < 0 ||
            t.translateX + t.posX > t.canvasWidth) &&
            (t.randomise(), (t.translateY = t.canvasHeight));
      }),
      (s.prototype.randomise = function () {
        (this.velocity = 30),
          (this.smoothFactor = 50),
          (this.staticity = 30),
          (this.magnetism = 0.1 + 4 * Math.random()),
          (this.size = this.generateDecimalBetween(1, 4) * 10),
          (this.posX = 0),
          (this.posY = 0),
          (this.movementX = this.generateDecimalBetween(-2, 2) / this.velocity),
          (this.movementY = this.generateDecimalBetween(1, 20) / this.velocity),
          (this.translateX = this.generateDecimalBetween(0, this.canvasWidth)),
          (this.translateY = this.generateDecimalBetween(0, this.canvasHeight));
      });
  
    let a = function (t) {
      (this.canvas = document.getElementById(t)),
        (this.ctx = this.canvas.getContext("2d")),
        (this.dpr = window.devicePixelRatio);
    };
    (a.prototype.start = function () {
      let t = this;
      t.canvasSize(),
        window.addEventListener("resize", function () {
          t.canvasSize();
        }),
        (t.bubblesList = []),
        t.loadImage(),
        t.generateBubbles(),
        t.animate();
    }),
      (a.prototype.loadImage = function () {
        let img = new Image();
        img.src = "../static/img/cookie_1.png"; // Asegúrate de que esta ruta sea correcta
        img.onload = () => {
          this.particleImage = img;
        };
      }),
      (a.prototype.canvasSize = function () {
        (this.container = this.canvas.parentNode),
          (this.w = this.container.offsetWidth),
          (this.h = this.container.offsetHeight),
          (this.wdpi = this.w * this.dpr),
          (this.hdpi = this.h * this.dpr),
          (this.canvas.width = this.wdpi),
          (this.canvas.height = this.hdpi),
          (this.canvas.style.width = this.w + "px"),
          (this.canvas.style.height = this.h + "px"),
          this.ctx.scale(this.dpr, this.dpr);
      }),
      (a.prototype.animate = function () {
        let t = this;
        t.ctx.clearRect(0, 0, t.canvas.clientWidth, t.canvas.clientHeight),
          t.bubblesList.forEach(function (e) {
            e.update(),
              t.ctx.translate(e.translateX, e.translateY),
              t.particleImage
                ? t.ctx.drawImage(
                    t.particleImage,
                    e.posX - e.size / 2,
                    e.posY - e.size / 2,
                    e.size,
                    e.size
                  )
                : null,
              t.ctx.setTransform(t.dpr, 0, 0, t.dpr, 0, 0);
          }),
          requestAnimationFrame(this.animate.bind(this));
      }),
      (a.prototype.addBubble = function (t) {
        return this.bubblesList.push(t);
      }),
      (a.prototype.generateBubbles = function () {
        let t = this;
        for (let e = 0; e < t.bubbleDensity(); e++)
          t.addBubble(new s(t.canvas.parentNode));
      }),
      (a.prototype.bubbleDensity = function () {
        return 30;
      }),
      window.addEventListener("load", function () {
        const t = new a("hero-particles");
        t.start();
      }),
      (window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (t) {
          window.setTimeout(t, 1e3 / 60);
        });
  })();
  