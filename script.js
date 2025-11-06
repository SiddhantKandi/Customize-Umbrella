const umbrellaImg = document.getElementById('umbrella-image');
const umbrellaLoader = document.getElementById('umbrella-loader');
const colorCircles = document.querySelectorAll('.color-circle');
const uploadBtn = document.getElementById('upload-btn');
const logoInput = document.getElementById('logo-input');
const saveBtn = document.getElementById('save-btn');
const downloadBtn = document.getElementById('download-btn');
const errorMessage = document.getElementById('error-message');

let currentColor = 'blue';
let uploadedLogo = null;

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function showLoader(color) {
    umbrellaImg.style.visibility = 'hidden';
    umbrellaLoader.style.visibility = 'visible';
    umbrellaLoader.style.filter = getColorFilter(color);
    const logo = document.querySelector('.logo-preview');
    if (logo) logo.style.visibility = 'hidden';
}

function hideLoader() {
    umbrellaLoader.style.visibility = 'hidden';
    umbrellaImg.style.visibility = 'visible';
    const logo = document.querySelector('.logo-preview');
    if (logo) logo.style.visibility = 'visible';
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
                const oldLogo = document.querySelector('.logo-preview');
                if (oldLogo) oldLogo.remove();

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


uploadBtn.addEventListener('click', () => {
    document.getElementById('logo-input').click();
});

logoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const errorMessage = document.getElementById('error-message');

    if (file) {
        if (file.size > MAX_FILE_SIZE) {
            errorMessage.textContent = 'File size exceeds 5MB limit. Please choose a smaller file.';
            e.target.value = ''; // Clear the file input
            return;
        }

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            errorMessage.textContent = 'Please select only .jpg or .png files.';
            e.target.value = '';
            return;
        }

        errorMessage.textContent = ''; // Clear any error messages
        // Process the valid file here
        handleLogoUpload(file);
    }
});

function handleLogoUpload(file) {
    showLoader(currentColor);

    const reader = new FileReader();
    reader.onload = event => {
        uploadedLogo = event.target.result;

        setTimeout(() => {
            hideLoader();
            const oldLogo = document.querySelector('.logo-preview');
            if (oldLogo) oldLogo.remove();

            const logo = document.createElement('img');
            logo.src = uploadedLogo;
            logo.classList.add('logo-preview');
            umbrellaImg.parentElement.appendChild(logo);
        }, 1200);
    };
    reader.readAsDataURL(file);
}


downloadBtn.addEventListener('click', () => {
    const umbrellaContainer = document.querySelector('.umbrella-section');
    html2canvas(umbrellaContainer, { backgroundColor: null }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'custom_umbrella.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});


saveBtn.addEventListener('click', () => {
    const design = {
        color: currentColor,
        logo: uploadedLogo,
    };
    localStorage.setItem('umbrellaDesign', JSON.stringify(design));
    alert('✅ Design saved successfully!');
});

window.addEventListener('DOMContentLoaded', () => {
    const savedDesign = localStorage.getItem('umbrellaDesign');
    if (!savedDesign) return;

    const { color, logo } = JSON.parse(savedDesign);
    currentColor = color;
    uploadedLogo = logo;


    umbrellaImg.src = `public/${color}_umbrella.png`;


    if (uploadedLogo) {
        const logoImg = document.createElement('img');
        logoImg.src = uploadedLogo;
        logoImg.classList.add('logo-preview');
        umbrellaImg.parentElement.appendChild(logoImg);
    }
});

function getColorFilter(color) {
    switch (color) {
        case 'yellow':
            return 'invert(86%) sepia(85%) saturate(401%) hue-rotate(1deg) brightness(103%) contrast(102%)';
        case 'pink':
            return 'invert(58%) sepia(89%) saturate(3118%) hue-rotate(310deg) brightness(95%) contrast(105%)';
        case 'blue':
        default:
            return 'invert(41%) sepia(93%) saturate(2127%) hue-rotate(175deg) brightness(95%) contrast(102%)';
    }
}