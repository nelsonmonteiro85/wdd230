// Function to toggle links and save state in local storage
function toggleLinks(id) {
    const weekLinksToShow = document.getElementById(id);
    const weekLinks = document.querySelectorAll('.week-links');

    if (weekLinksToShow.style.display === 'block') {
        weekLinksToShow.style.display = 'none';
        localStorage.setItem(id, 'hidden'); // Save state in local storage
    } else {
        weekLinks.forEach(link => {
            link.style.display = 'none';
        });
        weekLinksToShow.style.display = 'block';
        localStorage.setItem(id, 'visible'); // Save state in local storage
    }
}

// Restore link visibility based on local storage on page load
document.addEventListener('DOMContentLoaded', function() {
    // Clear local storage to reset to original state
    localStorage.clear();
});
