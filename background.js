document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('ocean-background');
    if (!canvas) {
        console.error('Canvas element not found for background animation.');
        return;
    }
    const ctx = canvas.getContext('2d');

    let particlesArray;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle class
    class Particle {
        constructor(x, y, size, speedX, speedY, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
            this.color = color;
        }

        // Method to draw individual particle
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fill();
        }

        // Check particle position, check mouse position, move the particle, draw the particle
        update() {
            // If particle is still within canvas
            if (this.y + this.size < 0) { // Reset particle if it moves above the screen
                this.y = canvas.height + this.size * 2; // Start from bottom
                this.x = Math.random() * canvas.width; // Random x position
            }
            this.y += this.speedY;
            this.draw();
        }
    }

    // Create particle array
    function init() {
        particlesArray = [];
        const numberOfParticles = (canvas.height * canvas.width) / 9000; // Adjust density
        for (let i = 0; i < numberOfParticles; i++) {
            const size = (Math.random() * 2) + 0.5; // Particle size
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speedX = 0; // No horizontal movement
            const speedY = (Math.random() * -1.5) - 0.2; // Slow upward movement
            const color = 'rgba(200, 220, 255, 0.3)'; // Light, semi-transparent blue/white
            particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    // Resize canvas when window size changes
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init(); // Reinitialize particles for new canvas size
    });
});
