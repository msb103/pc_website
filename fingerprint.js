function generateFingerprint(canvas, width, height) {
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Generate random fingerprint-like pattern
    ctx.fillStyle = '#f0f0f0'; // Set background color
    ctx.fillRect(0, 0, width, height); // Fill background

    // Draw random arcs and lines to simulate fingerprint ridges
    for (let i = 0; i < 200; i++) {
        const startX = Math.random() * width;
        const startY = Math.random() * height;
        const endX = startX + Math.random() * 20 - 10; // Random end point within 10 pixels from start point
        const endY = startY + Math.random() * 20 - 10; // Random end point within 10 pixels from start point
        const controlX = startX + Math.random() * 100 - 50; // Random control point within 50 pixels from start point
        const controlY = startY + Math.random() * 100 - 50; // Random control point within 50 pixels from start point
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        ctx.strokeStyle = '#000000'; // Set stroke color
        ctx.lineWidth = Math.random() * 3; // Set random line width
        ctx.stroke();
    }
}

// Usage example
const canvas = document.createElement('canvas');
generateFingerprint(canvas, 200, 200); // Generate fingerprint image with specified width and height
document.body.appendChild(canvas); // Append canvas to the document
