// get canvas object and set its size to the whole screen
let canvas: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement;
const size = (canvas: HTMLCanvasElement): void => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight * 0.9;
};
size(canvas);

// resize the canvas when the screen is resized & Update circle positions when the window is resized
window.addEventListener('resize', () => {
	size(canvas);
	initializeCircles(175); // Reinitialize circles with updated canvas dimensions
});
// set background-color for whole canvas
canvas.setAttribute('style', 'background-color: #333333');
const colors: string[] = ['#267365', '#F2CB05', '#F29F05', '#F29F05', '#F23030'];

// Function to get a random color from the colors array
function getRandomColor() {
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
}

// eventlistener so circles will follow mouse
const mouse = {
	x: 0,
	y: 0,
};
canvas.addEventListener('mousemove', (event) => {
	mouse.x = event.x;
	mouse.y = event.y - window.innerHeight * 0.1;
});

// get 2d-context to draw on canvas (c = context)
const c: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

// class for drawing and animating a circle
class AnimatedCircle {
	private corX: number;
	private corY: number;
	private radius: number;
	private dirX: number;
	private dirY: number;
	private color: string;
	private context: CanvasRenderingContext2D;
	private canvasWidth: number;
	private canvasHeight: number;

	constructor(
		x: number,
		y: number,
		rad: number,
		dX: number,
		dY: number,
		color: string,
		context: CanvasRenderingContext2D,
		canvasWidth: number,
		canvasHeight: number
	) {
		this.corX = x;
		this.corY = y;
		this.radius = rad;
		this.dirX = dX;
		this.dirY = dY;
		this.color = color;
		this.context = context;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
	}

	public draw() {
		this.context.beginPath();
		this.context.arc(this.corX, this.corY, this.radius, 0, Math.PI * 2, false);
		this.context.fillStyle = this.color; // Set circle fill color
		this.context.fill(); // Fill the circle with the specified color
		this.context.strokeStyle = '#000000'; // Set circle color
		this.context.lineWidth = 5;
		this.context.stroke();
	}

	public update() {
		const distanceX = mouse.x - this.corX;
		const distanceY = mouse.y - this.corY;
		const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

		if (distance < 80) {
			// Calculate angle towards mouse
			const angle = Math.atan2(distanceY, distanceX);

			// Scale the speed based on distance
			const speed = Math.min(distance / 20, 5); // Adjust the divisor to control the maximum speed

			// Calculate new position towards mouse
			const newX = this.corX + Math.cos(angle) * speed;
			const newY = this.corY + Math.sin(angle) * speed;

			// Update position
			this.corX = newX;
			this.corY = newY;
		} else {
			// Continue moving in the current direction
			this.corX += this.dirX;
			this.corY += this.dirY;
			if (this.corX + this.radius > this.canvasWidth || this.corX - this.radius < 0) this.dirX = -this.dirX;
			if (this.corY + this.radius > this.canvasHeight || this.corY - this.radius < 0) this.dirY = -this.dirY;
		}

		if (this.corX < 0 || this.corX > canvas.width || this.corY < 0 || this.corY > canvas.height) {
			this.corX = 100;
			this.corY = 100;
		}

		this.draw();
	}
}

let circles: AnimatedCircle[];
const minDistanceFromEdge = 50; // Minimum distance from the edge of the canvas
function initializeCircles(amount: number) {
	circles = [];
	circles.length = 0; // Clear the circles array

	for (let i = 0; i < amount; i++) {
		const radius = Math.random() * 10 + 5; // Random radius between 5 and 15
		const x = Math.random() * (canvas.width - 2 * radius - 2 * minDistanceFromEdge) + radius + minDistanceFromEdge;
		const y = Math.random() * (canvas.height - 2 * radius - 2 * minDistanceFromEdge) + radius + minDistanceFromEdge;
		const dirX = (Math.random() - 0.5) * 2; // Random velocity between -1 and 1
		const dirY = (Math.random() - 0.5) * 2; // Random velocity between -1 and 1
		const color = getRandomColor(); // Get a random color from the colors array

		const circle = new AnimatedCircle(x, y, radius, dirX, dirY, color, c, canvas.width, canvas.height);
		circles.push(circle);
	}

	animate();
}

initializeCircles(175); // Initialize circles when the page loads

function animate() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	for (const circle of circles) {
		circle.update();
	}
	requestAnimationFrame(animate);
}
