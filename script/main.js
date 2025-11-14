// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then((data) => data.json())
    .then((data) => {
      dataArr = Object.keys(data);
      dataArr.map((customData) => {
        if (data[customData] !== "") {
          const el = document.querySelector(
            `[data-node-name*="${customData}"]`
          );
          if (el) {
            if (customData === "imagePath" || customData === "musicPath") {
              el.setAttribute("src", data[customData]);
            } else {
              el.innerText = data[customData];
            }
          }
        }

        // Check if the iteration is over
        // Run amimation if so
        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          animationTimeline();
        }
      });
    });
};

// Animation Timeline
const animationTimeline = () => {
  // Split chars that need to be animated individually (guard if elements missing)
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  if (textBoxChars && textBoxChars.innerHTML) {
    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
      .split("")
      .join("</span><span>")}</span`;
  }

  if (hbd && hbd.innerHTML) {
    hbd.innerHTML = `<span>${hbd.innerHTML
      .split("")
      .join("</span><span>")}</span`;
  }

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  const tl = new TimelineMax();
  const bgm = document.getElementById("bgm");
  const playBgm = () => {
    if (!bgm) return;
    bgm.volume = 0.8;
    const attempt = bgm.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {
        // Autoplay blocked: show a minimal button to enable sound
        const btn = document.createElement("button");
        btn.textContent = "Bật nhạc"; // Enable music
        btn.setAttribute(
          "style",
          "position:fixed;bottom:16px;right:16px;z-index:9999;padding:10px 14px;border-radius:8px;border:none;background:#ff69b4;color:#fff;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.2)"
        );
        btn.addEventListener("click", () => {
          bgm
            .play()
            .then(() => btn.remove())
            .catch(() => {});
        });
        document.body.appendChild(btn);
      });
    }
  };

  // Try to prime autoplay: start muted early (allowed), unmute at party
  const primeBgmAutoplay = () => {
    if (!bgm) return;
    try {
      bgm.muted = true;
      const p = bgm.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // ignore; fallback button will appear when playBgm runs
        });
      }
    } catch (_) {
      // ignore
    }
  };

  tl.to(".container", 0.1, {
    visibility: "visible",
  })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
      // scale: 0.7
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible",
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(127, 206, 248)",
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=0.5"
    )
    .to(
      ".idea-5 .smiley",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
      },
      0.2
    )
    // Start/unmute music as soon as "Vì Vậy" shows
    .add(() => {
      if (!bgm) return;
      if (bgm.paused) {
        playBgm();
      }
      bgm.muted = false;
    })
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
      },
      0.2,
      "+=1"
    )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400,
      },
      {
        opacity: 1,
        y: -1000,
      },
      0.2
    )
    .from(
      ".lydia-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    // Add delay here to keep wishText visible longer
    .to({}, 6, {}) // Empty tween to add 7 seconds pause
    .add(() => {
      initFireworks();
    })
    .to({}, 8, {}) // Show fireworks for 8 seconds
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90,
      },
      "+=1"
    );

  // tl.seek("currentStep");
  // tl.timeScale(2);

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  if (replyBtn) {
    replyBtn.addEventListener("click", () => {
      tl.restart();
      // Reset nhạc nền để có thể nghe lại
      if (bgm) {
        bgm.currentTime = 0;
        bgm.pause();
      }
    });
  }
};

// Fireworks animation
const initFireworks = () => {
  const canvas = document.getElementById("fireworks");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fireworks = [];
  const particles = [];
  let animationId;
  
  // Load firework sound - reset mỗi lần init
  const fireworkSound = new Audio('audio/firework.mp3');
  fireworkSound.volume = 0.25;
  let soundPlayed = false; // reset về false mỗi lần replay
  
  // Timer-based firework spawning
  let lastFireworkTime = 0;
  const FIREWORK_INTERVAL = 1500; // ms, điều chỉnh để thay đổi tốc độ bắn
  
  class Firework {
    constructor(sx, sy, tx, ty) {
      this.x = sx;
      this.y = sy;
      this.sx = sx;
      this.sy = sy;
      this.tx = tx;
      this.ty = ty;

      // Khoảng cách tới điểm nổ
      this.distanceToTarget = Math.hypot(tx - sx, ty - sy);
      this.distanceTraveled = 0;

      this.trail = [];
      this.trailLength = 4;
      this.angle = Math.atan2(ty - sy, tx - sx);

      // Ma sát để chậm dần
      this.friction = 0.97; // 0.96–0.98 đều ổn

      // TÍNH speed ban đầu dựa trên distanceToTarget
      // Đảm bảo tổng quãng đường của chuỗi speed * friction^n > distanceToTarget
      // speed0 ≈ distance * (1 - friction) / friction * hệ số dư (1.2)
      this.speed =
        (this.distanceToTarget * (1 - this.friction) / this.friction) * 1.2;

      this.brightness = Math.random() * 40 + 40;
      this.hue = Math.random() * 360; // mỗi quả pháo 1 màu chủ đạo
    }

    update(index) {
      // lưu trail
      this.trail.unshift({ x: this.x, y: this.y });
      if (this.trail.length > this.trailLength) this.trail.pop();

      if (this.distanceTraveled >= this.distanceToTarget) {
        // TỚI ĐIỂM NỔ → tạo particle
        createParticles(this.tx, this.ty, this.hue);
        fireworks.splice(index, 1);
        return;
      }

      // Bắn nhanh lúc đầu, chậm dần về sau
      this.speed *= this.friction;

      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;

      this.distanceTraveled += Math.hypot(vx, vy);
      this.x += vx;
      this.y += vy;
    }

    draw() {
      ctx.beginPath();
      const last = this.trail[this.trail.length - 1] || this;
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(this.x, this.y);
      ctx.lineWidth = 2;
      ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
      ctx.stroke();
    }
  }

  class Particle {
    constructor(x, y, hue) {
      this.x = x;
      this.y = y;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = Math.random() * 4 + 2; // 2–6
      this.friction = 0.96;
      this.gravity = 0.3;
      this.hue = hue + (Math.random() * 40 - 20); // lệch nhẹ quanh màu chính
      this.brightness = Math.random() * 30 + 50;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.015;
      this.radius = Math.random() * 1.5 + 1.5;
    }

    update(index) {
      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= this.decay;

      if (this.alpha <= this.decay) {
        particles.splice(index, 1);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
      ctx.fill();
    }
  }

  function createParticles(x, y, hue) {
    let particleCount = 200; // 350 -> 200 là đủ dày mà không rối
    while (particleCount--) {
      particles.push(new Particle(x, y, hue));
    }

    // Play firework explosion sound only once
    if (!soundPlayed) {
      try {
        fireworkSound.play().catch(() => {});
        soundPlayed = true;
      } catch (e) {
        // Ignore audio errors
      }
    }
  }

  function loop(timestamp) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // 0.5 -> 0.2 cho trail dài hơn
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";

    let i = fireworks.length;
    while (i--) {
      fireworks[i].draw();
      fireworks[i].update(i);
    }

    let j = particles.length;
    while (j--) {
      particles[j].draw();
      particles[j].update(j);
    }
    
    // Timer-based firework spawning instead of random
    if (!lastFireworkTime) {
      lastFireworkTime = timestamp;
    }
    
    if (timestamp - lastFireworkTime > FIREWORK_INTERVAL) {
      // Bắn 2-3 quả pháo hoa cùng lúc
      const count = 5 + Math.floor(Math.random() * 2); // 2 hoặc 3 quả
      for (let k = 0; k < count; k++) {
        fireworks.push(new Firework(
          canvas.width / 2,
          canvas.height,
          Math.random() * canvas.width,
          (Math.random() * canvas.height) / 2
        ));
      }
      lastFireworkTime = timestamp;
    }

    animationId = requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
};

// Run fetch and animation in sequence
fetchData();
