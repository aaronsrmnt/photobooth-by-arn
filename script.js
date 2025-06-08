const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const captureBtn = document.getElementById('capture-btn');
const countdownEl = document.getElementById('countdown');
const stripImg = document.getElementById('strip-template');
const downloadLink = document.getElementById('download');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  });

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function captureSequence() {
  const photoWidth = 328;
  const photoHeight = 384;

  countdownEl.textContent = '';

  for (let i = 0; i < 4; i++) {
    for (let j = 5; j > 0; j--) {
      countdownEl.textContent = j;
      await wait(1000);
    }
    countdownEl.textContent = '';
    ctx.drawImage(video, 0, i * photoHeight, photoWidth, photoHeight);
  }

  ctx.drawImage(stripImg, 0, 0, canvas.width, canvas.height);
  canvas.style.display = 'block';

  const image = canvas.toDataURL('image/png');
  downloadLink.href = image;
}

captureBtn.addEventListener('click', captureSequence);
