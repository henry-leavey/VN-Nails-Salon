document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
        const menuToggle = document.getElementById("menu-toggle");
        const sideMenu = document.getElementById("side-menu");
        const closeMenu = document.getElementById("close-menu");

        if (!menuToggle || !sideMenu || !closeMenu) {
            console.error("Menu toggle, side menu, or close button not found.");
            return;
        }

        // Open the menu when clicking the toggle button
        if (event.target.id === "menu-toggle") {
            sideMenu.style.left = "0";
        }

        // Close the menu when clicking the close button
        if (event.target.id === "close-menu") {
            sideMenu.style.left = "-250px";
        }

        // Close the menu if clicking outside of it
        if (!sideMenu.contains(event.target) && event.target !== menuToggle) {
            sideMenu.style.left = "-250px";
        }
    });
});
