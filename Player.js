import Bullet from './Bullet.js';

class Player {
    constructor(x, y, width, height, speed, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
        this.bullets = [];
        this.score = 0;
        this.maxBullets = 5;
        this.canShoot = true;
    }

    move(direction, canvas, obstacles) {
        let newX = this.x;
        let newY = this.y;

        switch (direction) {
            case 'up':
                newY -= this.speed;
                break;
            case 'down':
                newY += this.speed;
                break;
            case 'left':
                newX -= this.speed;
                break;
            case 'right':
                newX += this.speed;
                break;
        }

        if (this.isValidMove(newX, newY, canvas, obstacles)) {
            this.x = newX;
            this.y = newY;
        }
    }

    isValidMove(newX, newY, canvas, obstacles) {
        if (newX < 0 || newX + this.width > canvas.width || newY < 0 || newY + this.height > canvas.height) {
            return false;
        }

        for (let obstacle of obstacles) {
            if (
                newX < obstacle.x + obstacle.width &&
                newX + this.width > obstacle.x &&
                newY < obstacle.y + obstacle.height &&
                newY + this.height > obstacle.y
            ) {
                return false;
            }
        }

        return true;
    }

    shoot(target) {
        if (this.bullets.length < this.maxBullets && this.canShoot) {
            let dx = 0, dy = 0;
            if (Math.abs(target.x - this.x) > Math.abs(target.y - this.y)) {
                // Target is more to the left or right
                dx = target.x > this.x ? 5 : -5;
            } else {
                // Target is more to the top or bottom
                dy = target.y > this.y ? 5 : -5;
            }
            const bullet = new Bullet(this.x + this.width / 2, this.y + this.height / 2, 5, dx, dy);
            this.bullets.push(bullet);

            if (this.bullets.length >= this.maxBullets) {
                this.canShoot = false;
                setTimeout(() => {
                    this.canShoot = true;
                }, 1000);
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.bullets.forEach(bullet => bullet.draw(ctx));
    }

    updateBullets(canvas, obstacles, players) {
        this.bullets.forEach(bullet => bullet.move());
        this.bullets = this.bullets.filter(bullet => bullet.isInBounds(canvas) && !this.checkBulletCollision(bullet, obstacles, players));
    }

    checkCollision(bullet) {
        return (
            bullet.x > this.x &&
            bullet.x < this.x + this.width &&
            bullet.y > this.y &&
            bullet.y < this.y + this.height
        );
    }

    checkBulletCollision(bullet, obstacles, players) {
        // Check collision with obstacles
        for (let obstacle of obstacles) {
            if (
                bullet.x > obstacle.x &&
                bullet.x < obstacle.x + obstacle.width &&
                bullet.y > obstacle.y &&
                bullet.y < obstacle.y + obstacle.height
            ) {
                return true;
            }
        }

        // Check collision with players
        for (let player of players) {
            if (player.checkCollision(bullet)) {
                player.score++;
                return true;
            }
        }

        return false;
    }
}

export default Player;