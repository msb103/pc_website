const container = document.getElementById("scrollContainer");
const track = document.getElementById("scrollTrack");

let speed = 0.5;
let position = 0;
let paused = false;

// Clone once
track.innerHTML += track.innerHTML;
const loopWidth = track.scrollWidth / 2;

// Pause immediately on pointer interaction
container.addEventListener("pointerenter", () => paused = true);
container.addEventListener("pointerdown", () => paused = true);
container.addEventListener("pointerleave", () => paused = false);

function animate() {
  if (!paused) {
    position -= speed;

    if (position <= -loopWidth) {
      position = 0;
    }

    track.style.transform = `translate3d(${position}px,0,0)`;
  }

  requestAnimationFrame(animate);
}

animate();
