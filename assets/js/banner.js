const images = [
    "images/nailsbanner2.png",
    "images/nailsbanner3.png"
];

let currentIndex = 0;
const imageElement = document.getElementById("banner-image");

function changeImage() {
    // Slide out the current image to the left
    imageElement.style.transform = "translateX(-100%)";

    setTimeout(() => {
        // Change the image source after sliding out
        currentIndex = (currentIndex + 1) % images.length;
        imageElement.src = images[currentIndex];

        // Reset position to the right (off-screen) and slide in
        //imageElement.style.transition = "none"; // Temporarily disable transition to reset instantly
        imageElement.style.transform = "translateX(100%)"; // Move the image off-screen to the right

        // Apply transition and slide the new image in from the right
        //imageElement.style.transition = "transform 1s ease-in-out"; // Re-enable transition for smooth sliding
        setTimeout(() => {
            imageElement.style.transform = "translateX(0)"; // Slide the new image in
        }, 100); // Small delay to ensure the position reset happens smoothly before transitioning
    }, 1000); // Wait for the slide-out animation to finish
}

// Change image every 5 seconds
setInterval(changeImage, 5000);
