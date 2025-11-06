const umbrellaImg = document.getElementById('umbrella-image');
const colorCircles = document.querySelectorAll('.color-circle');
const uploadBtn = document.getElementById('upload-btn');
const logoInput = document.getElementById('logo-input');

colorCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    const color = circle.dataset.color;
    umbrellaImg.src = `public/${color}_umbrella.png`;
  });
});

uploadBtn.addEventListener('click', () => logoInput.click());

logoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const logo = document.createElement('img');
    logo.src = event.target.result;
    logo.classList.add('logo-preview');

    const existingLogo = document.querySelector('.logo-preview');
    if (existingLogo) existingLogo.remove();

    logo.style.position = 'absolute';
    logo.style.width = '80px';
    logo.style.top = '50%';
    logo.style.left = '50%';
    logo.style.transform = 'translate(-50%, -50%)';
    logo.style.opacity = '0.85';
    umbrellaImg.parentElement.style.position = 'relative';
    umbrellaImg.parentElement.appendChild(logo);
  };
  reader.readAsDataURL(file);
});
