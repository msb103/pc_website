const canvas = document.getElementsByClassName('canvas')[0];
const ctx = canvas.getContext('2d');
const shape = 1; // set 0 for dodecahedran, 1 for sphere

// Set canvas size
//canvas.width = window.innerHeight/2;
canvas.width = 300;
//canvas.height = window.innerHeight;
//canvas.height = window.innerHeight/2;
canvas.height = 200;
canvas.style.top = 30;

const numDots = 500;
const dots = [];

// vertices of dodecahedron
const vertices = [
[0.396, 0, 0.515],
    [-0.396, 0, 0.515],
    [0.123, 0.377, 0.515],
    [0.794, 0.238, 0.238],
    [0.794, -0.238, 0.238],
    [0.123, -0.377, 0.515],
    [-0.202, 0.377, 0.238],
    [-0.202, -0.377, 0.238],
    [0.318, 0.262, 0.238],
    [0, 0.650, 0],
    [-0.318, 0.262, 0.238],
    [0.202, 0.377, -0.238],
    [-0.123, 0.377, -0.515],
    [-0.794, 0.238, -0.238],
    [-0.794, -0.238, -0.238],
    [-0.123, -0.377, -0.515],
    [0.202, -0.377, -0.238],
    [0.318, -0.262, -0.238],
    [0, -0.650, 0],
    [-0.318, -0.262, -0.238],
    [0.396, 0, -0.515],
    [-0.396, 0, -0.515]
];

function calculateNormal(v1, v2, v3) {
    const u = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]];
    const v = [v3[0] - v1[0], v3[1] - v1[1], v3[2] - v1[2]];
    return [
        u[1] * v[2] - u[2] * v[1],
        u[2] * v[0] - u[0] * v[2],
        u[0] * v[1] - u[1] * v[0]
    ];
}

// Function to normalize a vector
function normalizeVector(vector) {
    const magnitude = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2]);
    return [vector[0] / magnitude, vector[1] / magnitude, vector[2] / magnitude];
}

const radius = 100;



// Generate random dots on the surface of a dodecahedran
if (shape == 0) {
    
    for (let i = 0; i < numDots; i++) {
        // Generate random point on the unit sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1) - Math.PI / 2;
        const x = Math.cos(theta) * Math.cos(phi);
        const y = Math.sin(theta) * Math.cos(phi);
        const z = Math.sin(phi);

        // Find the face the point is closest to
        let minDistance = Infinity;
        let closestFace = null;
        for (const face of vertices) {
            const [v1, v2, v3] = face;
            const normal = calculateNormal(v1, v2, v3);
            const pointToVertex = [x - v1[0], y - v1[1], z - v1[2]];
            const distance = Math.abs(normal[0] * pointToVertex[0] + normal[1] * pointToVertex[1] + normal[2] * pointToVertex[2]);
            if (distance < minDistance) {
                minDistance = distance;
                closestFace = face;
            }
        }

        // Project the point onto the face
        const [v1, v2, v3] = closestFace;
        const normal = normalizeVector(calculateNormal(v1, v2, v3));
        const d = -(normal[0] * v1[0] + normal[1] * v1[1] + normal[2] * v1[2]);
        const t = (-normal[0] * x - normal[1] * y - normal[2] * z - d) / (normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
        const projectedX = x + t * normal[0];
        const projectedY = y + t * normal[1];
        const projectedZ = z + t * normal[2];

        // Normalize vector to fit within a sphere of radius 200
        const magnitude = Math.sqrt(projectedX * projectedX + projectedY * projectedY + projectedZ * projectedZ);
        const normalizedX = (projectedX / magnitude) * 200;
        const normalizedY = (projectedY / magnitude) * 200;
        const normalizedZ = (projectedZ / magnitude) * 200;
        points.push({ x: normalizedX, y: normalizedY, z: normalizedZ });
    }

    // Render dodecahedron
    ctx.beginPath();
    vertices.forEach(vertex => {
        const [x, y, z] = vertex;
        const screenX = (x * 100) + canvas.width / 2;
        const screenY = (y * 100) + canvas.height / 2;
        ctx.lineTo(screenX, screenY);
    });
    ctx.closePath();
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    // Render points
    points.forEach(point => {
        const { x, y } = point;
        const screenX = x + canvas.width / 2;
        const screenY = y + canvas.height / 2;
        ctx.beginPath();
        ctx.arc(screenX, screenY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
    });
} else {

// Generate random dots on the surface of a sphere
    for (let i = 0; i < numDots; i++) {
        const phi = Math.random() * 2 * Math.PI;
        const theta = Math.random() * 2 * Math.PI;
        

        const x = radius * Math.sin(phi) * Math.cos(theta) + canvas.width / 2 ;
        const y = radius * Math.sin(phi) * Math.sin(theta) + canvas.height / 2;
        const z = radius * Math.cos(phi) ;

        dots.push({ x, y, z });
    }
}

let angle = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(dot => {
        // Rotate dots around the sphere's own vertical axis
        const newX = (dot.x - canvas.width / 2) * Math.cos(angle) +  - (dot.z  - canvas.height / 2) * Math.sin(angle)  + canvas.width /2;
        const newZ = (dot.x - canvas.width / 2) * Math.sin(angle) + (dot.z - canvas.height / 2) * Math.cos(angle) + canvas.height / 2;

        dot.x = newX;
        dot.z = newZ;

        // Project dots onto 2D screen
        /*const scale = 200 / (200 + dot.z);
        const screenX = dot.x * scale;
        const screenY = dot.y * scale + canvas.height / 2;*/

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        //ctx.arc(screenX, screenY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#929292';
        ctx.fill();

        if (Math.random() < 0.001) { // Adjust probability to control the number of glowing stars
            const radius = 5 + Math.random() * 3; // Randomize star size
            const opacity = 0.2 + Math.random() * 0.3; // Randomize star opacity
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
            //ctx.fillStyle = 'rgba(255, 255, 255, ${opacity})'; // Semi-transparent white color
            ctx.fillStyle = '#A29706';
            //ctx.fillStyle = '#fff';
            ctx.fill();
        }
    });

    

    requestAnimationFrame(draw);
    //setTimeout(drawWithDelay, 1000);
}
angle += 0.005;

draw();