const umbrellaImg = document.getElementById('umbrella-image');
const colorCircles = document.querySelectorAll('.color-circle');
const uploadBtn = document.getElementById('upload-btn');
const logoInput = document.getElementById('logo-input');

colorCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    const color = circle.dataset.color;

    umbrellaImg.style.opacity = 0;
    setTimeout(() => {
      umbrellaImg.src = `public/${color}_umbrella.png`;
      umbrellaImg.style.opacity = 1;
    }, 200);
  });
});

uploadBtn.addEventListener('click', () => logoInput.click());

logoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    // Remove previous logo if it exists
    const existingLogo = document.querySelector('.logo-preview');
    if (existingLogo) existingLogo.remove();

    const logo = document.createElement('img');
    logo.src = event.target.result;
    logo.classList.add('logo-preview');

    logo.style.position = 'absolute';
    logo.style.width = '50px'; 
    logo.style.bottom = '13%'; 
    logo.style.left = '50%';
    logo.style.transform = 'translateX(-50%)';
    logo.style.opacity = '0.9';
    logo.style.pointerEvents = 'none'; 
    logo.style.transition = 'opacity 0.3s ease-in-out';

    umbrellaImg.parentElement.style.position = 'relative';
    umbrellaImg.parentElement.appendChild(logo);
  };

  reader.readAsDataURL(file);
});
