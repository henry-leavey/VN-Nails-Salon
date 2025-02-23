function loadComponent(id, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback(); // Execute callback after loading
        })
        .catch(error => console.error('Error loading', file, error));
}

loadComponent('header', 'header.html', function() {
    // Ensure this runs AFTER the header loads
    let page = window.location.pathname.split('/').pop(); // Get filename (e.g., "services.html")
    if (page === "" || page === "index.html") page = "index.html"; // Default to home

    const navLinks = {
        "index.html": "nav-home",
        "services.html": "nav-services",
        "booking.html": "nav-booking",
        "gallery.html": "nav-gallery",
        "about.html": "nav-about"
    };

    if (navLinks[page]) {
        let activeNav = document.getElementById(navLinks[page]);
        if (activeNav) {
            activeNav.parentElement.classList.add("current");
        }
    }
});

loadComponent('footer', 'footer.html'); // Load footer.html