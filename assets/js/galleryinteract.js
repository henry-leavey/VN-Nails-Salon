let currentAcrylicIndex = 0;
let acrylicImages = [];
let currentBIABIndex = 0;
let biabImages = [];
let currentShellacIndex = 0;
let shellacImages = [];
let currentType = ""; // Track which category is open

// Fetch images dynamically from JSON
async function loadGallery() {
    try {
        await loadImages("acrylics", "images/nailgallery/Acrylics/", acrylicImages);
        await loadImages("biab", "images/nailgallery/BIAB/", biabImages);
        await loadImages("shellac", "images/nailgallery/Shellac/", shellacImages);
    } catch (error) {
        console.error("Error loading images:", error);
    }
}

// Helper function to load images into the gallery
async function loadImages(galleryId, path, imageArray) {
    const response = await fetch(path + galleryId + ".json");
    const images = await response.json();
    imageArray.push(...images);

    const gallery = document.getElementById(galleryId);
    images.forEach((fileName, index) => {
        const img = document.createElement("img");
        img.src = path + fileName;
        img.alt = fileName.replace(".jpg", "");
        img.onclick = () => openModal(galleryId, index);

        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");
        imgContainer.appendChild(img);
        gallery.appendChild(imgContainer);
    });
}

document.addEventListener("DOMContentLoaded", loadGallery);

// Open Modal
function openModal(type, index) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");

    currentType = type; // Track which category is open

    if (type === "acrylics") {
        currentAcrylicIndex = index;
        modalImage.src = `images/nailgallery/Acrylics/${acrylicImages[index]}`;
        modalCaption.textContent = acrylicImages[index].replace(".jpg", "");
    } else if (type === "biab") {
        currentBIABIndex = index;
        modalImage.src = `images/nailgallery/BIAB/${biabImages[index]}`;
        modalCaption.textContent = biabImages[index].replace(".jpg", "");
    } else if (type === "shellac") {
        currentShellacIndex = index;
        modalImage.src = `images/nailgallery/Shellac/${shellacImages[index]}`;
        modalCaption.textContent = shellacImages[index].replace(".jpg", "");
    }

    modal.classList.add("show");
}

// Close Modal
function closeModal() {
    document.getElementById("imageModal").classList.remove("show");
}

// Change Image (Next/Prev)
function changeImage(direction) {
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");

    let imageList, currentIndex;

    if (currentType === "acrylics") {
        imageList = acrylicImages;
        currentAcrylicIndex = (currentAcrylicIndex + direction + imageList.length) % imageList.length;
        currentIndex = currentAcrylicIndex;
    } else if (currentType === "biab") {
        imageList = biabImages;
        currentBIABIndex = (currentBIABIndex + direction + imageList.length) % imageList.length;
        currentIndex = currentBIABIndex;
    } else if (currentType === "shellac") {
        imageList = shellacImages;
        currentShellacIndex = (currentShellacIndex + direction + imageList.length) % imageList.length;
        currentIndex = currentShellacIndex;
    } else {
        return;
    }

    // Update modal image and caption
    modalImage.src = `images/nailgallery/${currentType.charAt(0).toUpperCase() + currentType.slice(1)}/${imageList[currentIndex]}`;
    modalCaption.textContent = imageList[currentIndex].replace(".jpg", "");
}

// Keyboard Controls
document.addEventListener("keydown", function (event) {
    if (document.getElementById("imageModal").classList.contains("show")) {
        if (event.key === "ArrowRight") {
            changeImage(1);
            event.preventDefault();
        } else if (event.key === "ArrowLeft") {
            changeImage(-1);
            event.preventDefault();
        } else if (event.key === "Escape") {
            closeModal();
        }
    }
});

// Close modal if clicked outside of the image
document.getElementById("imageModal").addEventListener("click", function (event) {
    if (event.target === this) {
        closeModal();
    }
});
