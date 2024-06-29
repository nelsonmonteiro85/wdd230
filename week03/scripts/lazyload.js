document.addEventListener("DOMContentLoaded", function() {
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Set last modified date
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

    // Lazy load and fade in images as they come into view
    const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"][data-src]'));

    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.onload = function() {
                        lazyImage.style.opacity = 1;
                    };
                    lazyImage.removeAttribute('data-src');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers that do not support IntersectionObserver
        const lazyLoad = function() {
            lazyImages.forEach(img => {
                if (isElementInViewport(img)) {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    img.onload = function() {
                        img.style.opacity = 1;
                    };
                }
            });

            // Remove event listener once all images are loaded
            if (document.querySelectorAll('img[loading="lazy"][data-src]').length === 0) {
                window.removeEventListener('scroll', lazyLoad);
            }
        };

        // Initial load check
        lazyLoad();

        // Add scroll event listener for lazy loading
        window.addEventListener('scroll', lazyLoad);
    }

    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
