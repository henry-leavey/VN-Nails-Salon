let currentImageIndex = 0;
let images = [];

// Fetch images dynamically from JSON or GitHub API
async function loadGallery() {
    try {
        const gallery = document.getElementById("gallery");

        const response = await fetch("images.json");
        images = await response.json();

        images.forEach((fileName, index) => {
            const img = document.createElement("img");
            img.src = `images/nailgallery/${fileName}`;
            img.alt = fileName.replace(".jpg", "");
            img.onclick = () => openModal(index);

            const imgContainer = document.createElement("div");
            imgContainer.classList.add("image-container");

            //const label = document.createElement("p");
            //label.textContent = fileName.replace(".jpg", "");

            imgContainer.appendChild(img);
            //imgContainer.appendChild(label);
            gallery.appendChild(imgContainer);
        });

    } catch (error) {
        console.error("Error loading images:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadGallery);

// Open Modal
function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");

    modalImage.src = document.querySelectorAll(".gallery img")[currentImageIndex].src;
    modalCaption.textContent = document.querySelectorAll(".gallery img")[currentImageIndex].alt;

    modal.classList.add("show");
}

// Close Modal
function closeModal() {
    document.getElementById("imageModal").classList.remove("show");
}

// Change Image (Next/Prev)
function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");

    modalImage.src = document.querySelectorAll(".gallery img")[currentImageIndex].src;
    modalCaption.textContent = document.querySelectorAll(".gallery img")[currentImageIndex].alt;
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
