const colors = [
    {
        name: "#00a0dc",
        image: "/img/Blue umbrella.png",
        background: "rgb(195 239 255)",
        filter: "invert(51%) sepia(98%) saturate(3337%) hue-rotate(180deg) brightness(95%) contrast(102%)"
    },
    {
        name: "#d8338b",
        image: "/img/Pink umbrella.png",
        background: "rgb(235 212 224)",
        filter: "invert(25%) sepia(72%) saturate(6800%) hue-rotate(303deg) brightness(93%) contrast(103%)"
    },
    {
        name: "#fed249",
        image: "/img/Yello umbrella.png",
        background: "rgb(255 249 232)",
        filter: "invert(91%) sepia(68%) saturate(592%) hue-rotate(355deg) brightness(103%) contrast(100%)"
    }
];

const colorOptions = document.getElementById("colorOptions");
const umbrellaImage = document.getElementById("umbrellaImage");
const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("logo-upload");
const logoPreview = document.getElementById("logoPreview");
const logoImage = document.getElementById("logoImage");
const loaderIcon = document.getElementById("loaderIcon");

let currentIndex = 0;

function updateColor(index) {
    currentIndex = index;
    const selectedColor = colors[currentIndex];

    document.querySelectorAll(".color-button").forEach((btn, i) => {
        btn.classList.toggle("active", i === currentIndex);
    });

    document.body.style.backgroundColor = selectedColor.background;
    uploadButton.style.backgroundColor = selectedColor.name;
    loaderIcon.style.filter = selectedColor.filter;

    const hasLogo = logoPreview.style.display === "block";

    if (hasLogo) {
        document.getElementById("logoLoader").style.display = "block";
        document.getElementById("uploadLoaderIcon").classList.remove("hidden");
        document.getElementById("uploadIcon").classList.add("hidden");

        umbrellaImage.style.display = "none";
        logoPreview.style.display = "none";

        setTimeout(() => {
            umbrellaImage.src = selectedColor.image;

            document.getElementById("logoLoader").style.display = "none";
            document.getElementById("uploadLoaderIcon").classList.add("hidden");
            document.getElementById("uploadIcon").classList.remove("hidden");

            umbrellaImage.style.display = "block";
            logoPreview.style.display = "block";
        }, 3000);
    } else {
        umbrellaImage.src = selectedColor.image;
    }
}

colors.forEach((color, index) => {
    const btn = document.createElement("button");
    btn.className = "color-button";
    if (index === currentIndex) btn.classList.add("active");
    btn.style.backgroundColor = color.name;
    btn.onclick = () => updateColor(index);
    colorOptions.appendChild(btn);
});

updateColor(currentIndex);

umbrellaImage.addEventListener("click", () => {
    const nextIndex = (currentIndex + 1) % colors.length;
    updateColor(nextIndex);
});

fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
        alert("Only PNG and JPG files are allowed");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
    }

    document.getElementById("logoLoader").style.display = "block";
    umbrellaImage.style.display = "none";
    logoPreview.style.display = "none";

    document.getElementById("uploadIcon").classList.add("hidden");
    document.getElementById("uploadLoaderIcon").classList.remove("hidden");

    const reader = new FileReader();
    reader.onload = function (e) {
        logoImage.src = e.target.result;

        setTimeout(() => {
            logoPreview.style.display = "block";
            umbrellaImage.style.display = "block";
            document.getElementById("logoLoader").style.display = "none";

            document.getElementById("uploadLoaderIcon").classList.add("hidden");
            document.getElementById("uploadIcon").classList.remove("hidden");

            document.getElementById("uploadText").textContent = file.name;
            document.getElementById("closeIcon").classList.remove("hidden");
        }, 3000);
    };

    reader.readAsDataURL(file);
});

document.getElementById("closeIcon").addEventListener("click", removeLogo);

function removeLogo() {
    fileInput.value = "";
    logoPreview.style.display = "none";
    document.getElementById("uploadText").textContent = "Upload Logo";
    document.getElementById("closeIcon").classList.add("hidden");
}