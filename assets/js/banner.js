const images = [
    "images/nailsbanner2.png",
    "images/nailsbanner3.png"
];

let currentIndex = 0;
const imageElement = document.getElementById("banner-image");

function changeImage() {
    // Slide out current image
    imageElement.style.transform = "translateX(-100%)"; // Move left off screen

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length; // Move to next image
        imageElement.src = images[currentIndex]; // Change image source
        imageElement.style.transform = "translateX(100%)"; // Reset to start off-screen right
        
        setTimeout(() => {
            imageElement.style.transform = "translateX(0)"; // Slide in
        }, 50); // Small delay to allow position reset before sliding in
    }, 1); // Wait for slide out animation to finish
}

// Change image every 5 seconds
setInterval(changeImage, 5000);
