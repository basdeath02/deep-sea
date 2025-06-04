document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('scroll-container');
    // const depthMarker = document.getElementById('depth-marker'); // Removed
    const depthIndicatorContainer = document.getElementById('depth-indicator-container');
    const depthIndicatorText = document.getElementById('depth-indicator-text');
    const oceanLayers = Array.from(document.querySelectorAll('.ocean-layer'));
    const body = document.body;

    // Max depth roughly based on Challenger Deep for gradient calculation
    // const MAX_DEPTH = 11034; // Removed/Replaced
    const MAX_DISPLAY_DEPTH = 10924; // For the text display

    // Initial colors for gradient (light to dark)
    const surfaceColor = [135, 206, 235]; // Sky Blue
    const deepColor = [0, 0, 51];      // Deep Dark Blue/Black

    // SUNLIGHT_ZONE_ENTRY_SCROLL will be dynamic via offsetTop

    function updateDepth() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        // const currentDepth = Math.min(MAX_DEPTH, (scrollTop / scrollHeight) * MAX_DEPTH); // Old calculation
        // depthMarker.textContent = `${Math.round(currentDepth)}m`; // Old marker update

        // Indicator Visibility & Depth Calculation
        const sunlightZone = document.getElementById('sunlight-zone');
        if (!sunlightZone) {
            console.error("#sunlight-zone element not found!");
            return;
        }
        const sunlightZoneOffsetTop = sunlightZone.offsetTop;

        if (scrollTop >= sunlightZoneOffsetTop) {
            if (depthIndicatorContainer) depthIndicatorContainer.style.display = 'flex';

            const scrollRangeForDepthDisplay = scrollHeight - sunlightZoneOffsetTop;
            const currentScrollInDisplayRange = Math.max(0, scrollTop - sunlightZoneOffsetTop);
            let displayedDepth = (currentScrollInDisplayRange / scrollRangeForDepthDisplay) * MAX_DISPLAY_DEPTH;
            displayedDepth = Math.min(displayedDepth, MAX_DISPLAY_DEPTH); // Cap at max depth
            if (depthIndicatorText) depthIndicatorText.textContent = Math.round(displayedDepth) + " METERS DEEP";

        } else {
            if (depthIndicatorContainer) depthIndicatorContainer.style.display = 'none';
        }

        // Calculate color transition using global scroll fraction
        const globalScrollFraction = Math.min(scrollTop / (scrollHeight * 0.95), 1); // Reach darkest color a bit before absolute bottom

        const r = Math.round(surfaceColor[0] + (deepColor[0] - surfaceColor[0]) * globalScrollFraction);
        const g = Math.round(surfaceColor[1] + (deepColor[1] - surfaceColor[1]) * globalScrollFraction);
        const b = Math.round(surfaceColor[2] + (deepColor[2] - surfaceColor[2]) * globalScrollFraction);

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
