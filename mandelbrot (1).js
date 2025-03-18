function mandelbrot(x, y, maxIterations) {
  let zx = 0;
  let zy = 0;
  let i = 0;

  while (i < maxIterations && zx * zx + zy * zy < 4) {
    const tempZx = zx * zx - zy * zy + x;
    zy = 2 * zx * zy + y;
    zx = tempZx;
    i++;
  }
  return i;
}

function drawMandelbrot(canvas, xStart, yStart, xEnd, yEnd, maxIterations) {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d');

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {
      const x = xStart + (px / width) * (xEnd - xStart);
      const y = yStart + (py / height) * (yEnd - yStart);

      const iterations = mandelbrot(x, y, maxIterations);

      if (iterations === maxIterations) {
        ctx.fillStyle = '#000'; // Black if in the set
      } else {
        const color = Math.floor((iterations / maxIterations) * 255);
        ctx.fillStyle = `rgb(${color}, ${color}, ${color})`; // Shades of gray based on iterations
      }
      ctx.fillRect(px, py, 1, 1);
    }
  }
}

// Example usage:
const canvas = document.getElementById('myCanvas'); // Assuming you have a canvas element with id "myCanvas"
canvas.width = 500;
canvas.height = 500;

const xStart = -2;
const xEnd = 1;
const yStart = -1.5;
const yEnd = 1.5;
const maxIterations = 100;

drawMandelbrot(canvas, xStart, yStart, xEnd, yEnd, maxIterations);
