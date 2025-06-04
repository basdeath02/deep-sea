document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('wave-canvas');
    if (!canvas) {
        console.error('Wave canvas element not found!');
        return;
    }
    const ctx = canvas.getContext('2d');

    let waveFrequency = 0.02;
    let waveAmplitude = 20;
    let waveSpeed = 0.02;
    let phase = 0;

    // Colors
    const waveColor1 = 'rgba(173, 216, 230, 0.7)'; // Light blue with some transparency
    const waveColor2 = 'rgba(135, 206, 250, 0.5)'; // Slightly different light blue
    const waveColor3 = 'rgba(240, 248, 255, 0.3)'; // Almost white (AliceBlue) foam tips

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.15; // Match CSS vh, or fixed like 100px
        waveAmplitude = canvas.height / 3; // Adjust amplitude based on canvas height
    }

    function drawWave(color, amplitude, frequency, currentPhase, yOffset) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height); // Start from bottom left of canvas

        for (let x = 0; x < canvas.width; x++) {
            // Primary wave
            const yBase = canvas.height / 1.5 + yOffset; // Base Y position for this wave
            const y = yBase + Math.sin(x * frequency + currentPhase) * amplitude;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height); // Go to bottom right
        ctx.lineTo(0, canvas.height); // Go to bottom left to close path
        ctx.fillStyle = color;
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        phase += waveSpeed;

        // Draw multiple waves for a more appealing effect
        // Base wave (darker)
        drawWave(waveColor1, waveAmplitude, waveFrequency, phase, 0);
        // Middle wave (slightly lighter, different phase/frequency for variation)
        drawWave(waveColor2, waveAmplitude * 0.7, waveFrequency * 1.2 + 0.01, phase * 0.8, 5);
        // Top wave / foam (lighter, smaller amplitude)
        drawWave(waveColor3, waveAmplitude * 0.4, waveFrequency * 1.5 + 0.02, phase * 1.2, 10);


        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);

    // Initial setup
    resizeCanvas();
    animate();
});
