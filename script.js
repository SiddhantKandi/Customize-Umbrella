const umbrellaImg = document.getElementById('umbrella-image');
const umbrellaLoader = document.getElementById('umbrella-loader');
const colorCircles = document.querySelectorAll('.color-circle');
const uploadBtn = document.getElementById('upload-btn');
const logoInput = document.getElementById('logo-input');

let currentColor = 'blue';
let uploadedLogo = null;

function showLoader(color) {
  umbrellaImg.style.visibility = 'hidden';
  umbrellaLoader.style.visibility = 'visible';
  umbrellaLoader.style.filter = getColorFilter(color);

  const existingLogo = document.querySelector('.logo-preview');
  if (existingLogo) existingLogo.style.visibility = 'hidden';
}

function hideLoader() {
  umbrellaLoader.style.visibility = 'hidden';
  umbrellaImg.style.visibility = 'visible';

  const existingLogo = document.querySelector('.logo-preview');
  if (existingLogo) existingLogo.style.visibility = 'visible';
}

colorCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    const color = circle.dataset.color;
    currentColor = color;

    showLoader(color);

    
    const newUmbrella = new Image();
    newUmbrella.src = `public/${color}_umbrella.png`;

    newUmbrella.onload = () => {
     
      setTimeout(() => {
        umbrellaImg.src = newUmbrella.src;

        const existingLogo = document.querySelector('.logo-preview');
        if (existingLogo) existingLogo.remove();

        if (uploadedLogo) {
          const logo = document.createElement('img');
          logo.src = uploadedLogo;
          logo.classList.add('logo-preview');
          umbrellaImg.parentElement.appendChild(logo);
        }
        hideLoader();
      }, 1000); 
    };
  });
});

uploadBtn.addEventListener('click', () => logoInput.click());

logoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  showLoader(currentColor);

  reader.onload = (event) => {
    uploadedLogo = event.target.result;

    setTimeout(() => {
      hideLoader();

      const existingLogo = document.querySelector('.logo-preview');
      if (existingLogo) existingLogo.remove();

      const logo = document.createElement('img');
      logo.src = uploadedLogo;
      logo.classList.add('logo-preview');
      umbrellaImg.parentElement.appendChild(logo);
    }, 1200);
  };

  reader.readAsDataURL(file);
});

function getColorFilter(color) {
  switch (color) {
    case 'yellow': return 'invert(86%) sepia(85%) saturate(401%) hue-rotate(1deg) brightness(103%) contrast(102%)';
    case 'red': return 'invert(33%) sepia(98%) saturate(5000%) hue-rotate(353deg) brightness(100%) contrast(102%)';
    case 'orange': return 'invert(58%) sepia(100%) saturate(984%) hue-rotate(2deg) brightness(103%) contrast(102%)';
    case 'pink': return 'invert(58%) sepia(89%) saturate(3118%) hue-rotate(310deg) brightness(95%) contrast(105%)';
    case 'blue':
    default: return 'invert(41%) sepia(93%) saturate(2127%) hue-rotate(175deg) brightness(95%) contrast(102%)';
  }
}
