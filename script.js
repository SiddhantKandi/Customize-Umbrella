const umbrellaImg = document.getElementById('umbrella-image');
const umbrellaLoader = document.getElementById('umbrella-loader');
const colorCircles = document.querySelectorAll('.color-circle');
const uploadBtn = document.getElementById('upload-btn');
const removeBtn = document.getElementById('remove-btn');
const logoInput = document.getElementById('logo-input');
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


function updateButtonStates(hasLogo) {
    removeBtn.disabled = !hasLogo;
    uploadBtn.disabled = hasLogo;

    if (hasLogo) {
        removeBtn.setAttribute('data-tooltip', 'Remove uploaded logo from umbrella');
        uploadBtn.setAttribute('data-tooltip', 'Remove current logo to upload a new one');
    } else {
        removeBtn.setAttribute('data-tooltip', 'Upload a logo to enable this');
        uploadBtn.setAttribute('data-tooltip', 'Upload a logo to customize your umbrella');
    }
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

uploadBtn.addEventListener('click', () => logoInput.click());

removeBtn.addEventListener('click', () => {
    const logo = document.querySelector('.logo-preview');
    if (logo) logo.remove();
    uploadedLogo = null;
    logoInput.value = '';
    updateButtonStates(false);
});

logoInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
        errorMessage.textContent = 'File size exceeds 5MB limit.';
        e.target.value = '';
        updateButtonStates(false);
        return;
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
        errorMessage.textContent = 'Please select only .jpg or .png files.';
        e.target.value = '';
        updateButtonStates(false);
        return;
    }

    errorMessage.textContent = '';
    handleLogoUpload(file);
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

            updateButtonStates(true);
        }, 1000);
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

document.addEventListener('DOMContentLoaded', () => {
    updateButtonStates(false);
});
