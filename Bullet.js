class Bullet {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    isInBounds(canvas) {
        return this.x >= 0 && this.x <= canvas.width && this.y >= 0 && this.y <= canvas.height;
    }
}

export default Bullet;
