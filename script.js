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

    // Get the video dimensions
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Crop to 4:5 aspect ratio (centered crop)
    const targetAspect = 4 / 5;
    let cropWidth = videoWidth;
    let cropHeight = videoWidth / targetAspect;

    if (cropHeight > videoHeight) {
      cropHeight = videoHeight;
      cropWidth = videoHeight * targetAspect;
    }

    const cropX = (videoWidth - cropWidth) / 2;
    const cropY = (videoHeight - cropHeight) / 2;

    // Draw cropped section of webcam into photo strip
    ctx.drawImage(
      video,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      i * photoHeight,
      photoWidth,
      photoHeight
    );
  }

  // Draw the strip overlay on top
  ctx.drawImage(stripImg, 0, 0, canvas.width, canvas.height);
  canvas.style.display = 'block';

  const image = canvas.toDataURL('image/png');
  downloadLink.href = image;
}

captureBtn.addEventListener('click', captureSequence);
