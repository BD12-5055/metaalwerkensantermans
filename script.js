// ---------- INTRO LOADER ----------
const loader = document.getElementById("loader");
const count = document.getElementById("count");
let n = 0;
const tick = setInterval(() => {
  n += Math.floor(Math.random() * 6) + 2;
  if (n >= 100) {
    n = 100;
    clearInterval(tick);
    setTimeout(() => loader.classList.add("is-done"), 350);
    setTimeout(() => loader.classList.add("is-gone"), 1500);
  }
  count.textContent = n;
}, 55);

// ---------- CUSTOM CURSOR ----------
const cursor = document.getElementById("cursor");
let cx = 0,
  cy = 0,
  tx = 0,
  ty = 0;
window.addEventListener("mousemove", (e) => {
  tx = e.clientX;
  ty = e.clientY;
});
function loop() {
  cx += (tx - cx) * 0.18;
  cy += (ty - cy) * 0.18;
  cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
  requestAnimationFrame(loop);
}
loop();

document.querySelectorAll("a, button, .service, .gallery__track figure").forEach(
  (el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
  }
);

// ---------- SCROLL REVEALS ----------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ---------- DUPLICATE GALLERY FOR SEAMLESS LOOP ----------
const track = document.querySelector(".gallery__track");
if (track) track.innerHTML += track.innerHTML;