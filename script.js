document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('scroll-container');
    const depthMarker = document.getElementById('depth-marker');
    const oceanLayers = Array.from(document.querySelectorAll('.ocean-layer'));
    const body = document.body;

    // Max depth roughly based on Challenger Deep for gradient calculation
    const MAX_DEPTH = 11034;

    // Initial colors for gradient (light to dark)
    const surfaceColor = [135, 206, 235]; // Sky Blue
    const deepColor = [0, 0, 51];      // Deep Dark Blue/Black

    function updateDepth() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const currentDepth = Math.min(MAX_DEPTH, (scrollTop / scrollHeight) * MAX_DEPTH);

        depthMarker.textContent = `${Math.round(currentDepth)}m`;

        // Calculate color transition
        const scrollFraction = Math.min(scrollTop / (scrollHeight * 0.8), 1); // Reach darkest color before hitting absolute bottom

        const r = Math.round(surfaceColor[0] + (deepColor[0] - surfaceColor[0]) * scrollFraction);
        const g = Math.round(surfaceColor[1] + (deepColor[1] - surfaceColor[1]) * scrollFraction);
        const b = Math.round(surfaceColor[2] + (deepColor[2] - surfaceColor[2]) * scrollFraction);

        body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        // Update content for visible layers
        oceanLayers.forEach(layer => {
            const layerTop = layer.offsetTop;
            const layerHeight = layer.offsetHeight;
            const layerBottom = layerTop + layerHeight;

            // Check if layer is in viewport
            if (scrollTop + window.innerHeight > layerTop && scrollTop < layerBottom) {
                if (!layer.classList.contains('active')) {
                    layer.classList.add('active');
                    const creatures = layer.getAttribute('data-creatures');
                    const fact = layer.getAttribute('data-facts');

                    const creaturesSpan = layer.querySelector('.content .creatures');
                    const factSpan = layer.querySelector('.content .fact');

                    if (creaturesSpan) creaturesSpan.textContent = creatures || 'N/A';
                    if (factSpan) factSpan.textContent = fact || 'N/A';
                }
            } else {
                // Optional: Reset when out of view to re-trigger if desired
                // layer.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links (if any were added)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', updateDepth);
    updateDepth(); // Initial call to set depth and content
});
