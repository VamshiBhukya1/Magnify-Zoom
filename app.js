document.addEventListener("DOMContentLoaded", () => {
    const zoomSlider = document.getElementById("zoom");
    const shapeSelector = document.getElementById("shape");
    const images = document.querySelectorAll(".image-container");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxMagnifier = document.getElementById("lightbox-magnifier");
    const closeBtn = document.querySelector(".close");

    let currentImage = null;

    // Magnifier Effect for Gallery
    images.forEach(container => {
        const img = container.querySelector(".main-image");
        const magnifier = container.querySelector(".magnifier");

        container.addEventListener("mousemove", (e) => {
            applyMagnifier(e, img, magnifier);
        });

        container.addEventListener("mouseleave", () => {
            magnifier.style.display = "none";
        });

        // Open Lightbox
        container.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            currentImage = img; // Store reference to the clicked image
        });
    });

    // Magnifier Effect for Lightbox
    lightboxImg.addEventListener("mousemove", (e) => {
        applyMagnifier(e, lightboxImg, lightboxMagnifier);
    });

    lightboxImg.addEventListener("mouseleave", () => {
        lightboxMagnifier.style.display = "none";
    });

    // Close Lightbox
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // Zoom Level Update
    zoomSlider.addEventListener("input", () => {
        updateMagnifierZoom();
    });

    // Shape Change
    shapeSelector.addEventListener("change", () => {
        lightboxMagnifier.className = `magnifier ${shapeSelector.value}`;
    });

    // Function to Apply Magnifier Effect
    function applyMagnifier(e, img, magnifier) {
        const { left, top, width, height } = img.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        if (x > 0 && y > 0 && x < width && y < height) {
            magnifier.style.display = "block";
            magnifier.style.left = `${x - magnifier.offsetWidth / 2}px`;
            magnifier.style.top = `${y - magnifier.offsetHeight / 2}px`;
            magnifier.style.backgroundImage = `url(${img.src})`;
            magnifier.style.backgroundSize = `${width * zoomSlider.value}px ${height * zoomSlider.value}px`;
            magnifier.style.backgroundPosition = `-${x * zoomSlider.value - magnifier.offsetWidth / 2}px -${y * zoomSlider.value - magnifier.offsetHeight / 2}px`;
        } else {
            magnifier.style.display = "none";
        }
    }

    // Update Magnifier Zoom Level
    function updateMagnifierZoom() {
        if (currentImage) {
            const { width, height } = currentImage.getBoundingClientRect();
            lightboxMagnifier.style.backgroundSize = `${width * zoomSlider.value}px ${height * zoomSlider.value}px`;
        }
    }
});
