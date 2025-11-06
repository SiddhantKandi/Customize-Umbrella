# ☂️ Custom Umbrella Customizer

A sleek, interactive web app that lets users **customize their own umbrella** by changing its color and uploading a logo for an instant live preview.
The app also allows users to **download their custom umbrella design** and automatically **save their progress** using local storage.

---

## 🌟 Features

* 🎨 **Color Selection** — Click on a color circle to instantly change the umbrella color.
* 🖼️ **Logo Upload** — Upload your brand or personal logo (supports `.png` and `.jpg`).
* 💾 **Auto Save** — Your selected color and uploaded logo are saved in the browser.
* ⬇️ **Download Preview** — Save your customized umbrella as an image (`.png`).
* ⚙️ **Smooth Loader Animation** — Loader spins while applying new colors or uploading logos.
* 💡 **Tooltips** — Hover over buttons for quick guidance.

---

## 🧰 Tech Stack

* **HTML5** — Semantic structure
* **CSS3** — Responsive, modern styling with gradients & animations
* **JavaScript (Vanilla)** — DOM manipulation, file handling, and canvas export

## 📦 Installation & Setup

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/SiddhantKandi/Customize-Umbrella.git
```

### 2. Navigate into the Project Folder

```bash
cd custom-umbrella
```

### 3. Open the Project

You can open the project in your favorite code editor (like VS Code) or directly in your browser:

```bash
# If you’re using VS Code
code .

# Or simply open index.html manually
```

---

## ▶️ Run the Project

1. Open the **`index.html`** file in your browser.
2. Click on any **color circle** to change the umbrella’s color.
3. Click **“Upload Logo”** and select a `.png` or `.jpg` image.
4. Wait for the loader to spin — your logo will appear on the umbrella.
5. Click **“Download Preview”** to save your design as a `.png` image.

---

## 💡 Folder Structure

```
custom-umbrella/
│
├── public/
│   ├── blue_umbrella.png
│   ├── yellow_umbrella.png
│   ├── pink_umbrella.png
│   ├── loader_icon.svg
│   ├── upload_icon.svg
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🛠️ Customization

You can easily modify:

* Umbrella colors (add new colors in `color-options` section of `index.html`)
* Logo position or size (adjust `.logo-preview` in `style.css`)
* Loader animation speed or color (in `#umbrella-loader` styles)

---

## 🧑‍💻 Contributing

Feel free to fork the repo and enhance the app!
Pull requests for new features (like draggable logo, multiple umbrella styles, or color picker) are always welcome.
