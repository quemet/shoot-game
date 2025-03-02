import Player from './Player.js';

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.player1 = new Player(canvas.width / 4, canvas.height / 2, 20, 20, 5, 'white');
        this.player2 = new Player((canvas.width / 4) * 3, canvas.height / 2, 20, 20, 5, 'blue');
        this.timer = 60; // 1 minute timer
        this.interval = null;
        this.controls = {
            player1: {
                up: 'ArrowUp',
                down: 'ArrowDown',
                left: 'ArrowLeft',
                right: 'ArrowRight',
                shoot: 'Enter'
            },
            player2: {
                up: 'w',
                down: 's',
                left: 'a',
                right: 'd',
                shoot: ' '
            }
        };
        this.obstacles = [
            { x: 100, y: 100, width: 50, height: 50 },
            { x: 200, y: 300, width: 50, height: 50 },
            { x: 400, y: 150, width: 50, height: 50 },
            { x: 300, y: 400, width: 50, height: 50 },
            { x: 500, y: 250, width: 50, height: 50 },
            { x: 150, y: 450, width: 50, height: 50 },
            { x: 350, y: 50, width: 50, height: 50 },
            { x: 450, y: 350, width: 50, height: 50 }
        ];
        this.init();
    }

    init() {
        this.update();
        this.startTimer();
    }

    startTimer() {
        this.interval = setInterval(() => {
            this.timer--;
            document.getElementById('timer').innerText = `Time: ${this.timer}s`;
            if (this.timer <= 0) {
                clearInterval(this.interval);
                if(this.player1.score > this.player2.score) {
                    alert(`Game Over! Player 1 Wins! Player 1 Score: ${this.player1.score}, Player 2 Score: ${this.player2.score}`);
                } else {
                    alert(`Game Over! Player 2 Wins! Player 1 Score: ${this.player1.score}, Player 2 Score: ${this.player2.score}`);
                }
                location.reload();
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.interval);
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawObstacles();
        this.player1.updateBullets(this.canvas, this.obstacles, [this.player2]);
        this.player2.updateBullets(this.canvas, this.obstacles, [this.player1]);
        this.checkCollisions();
        this.player1.draw(this.ctx);
        this.player2.draw(this.ctx);
        this.updateScores();
        requestAnimationFrame(() => this.update());
    }

    drawObstacles() {
        this.ctx.fillStyle = 'gray';
        this.obstacles.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    checkCollisions() {
        this.player1.bullets.forEach((bullet, index) => {
            if (this.player2.checkCollision(bullet)) {
                this.player1.bullets.splice(index, 1);
                this.player1.score++;
            }
        });

        this.player2.bullets.forEach((bullet, index) => {
            if (this.player1.checkCollision(bullet)) {
                this.player2.bullets.splice(index, 1);
                this.player2.score++;
            }
        });
    }

    updateScores() {
        document.getElementById('player1-score').innerText = `Player 1 Score: ${this.player1.score}`;
        document.getElementById('player2-score').innerText = `Player 2 Score: ${this.player2.score}`;
    }

    handleInput(event) {
        const key = event.key;
        if (key === this.controls.player1.up) {
            this.player1.move('up', this.canvas, this.obstacles);
        } else if (key === this.controls.player1.down) {
            this.player1.move('down', this.canvas, this.obstacles);
        } else if (key === this.controls.player1.left) {
            this.player1.move('left', this.canvas, this.obstacles);
        } else if (key === this.controls.player1.right) {
            this.player1.move('right', this.canvas, this.obstacles);
        } else if (key === this.controls.player1.shoot) {
            this.player1.shoot(this.player2);
        } else if (key === this.controls.player2.up) {
            this.player2.move('up', this.canvas, this.obstacles);
        } else if (key === this.controls.player2.down) {
            this.player2.move('down', this.canvas, this.obstacles);
        } else if (key === this.controls.player2.left) {
            this.player2.move('left', this.canvas, this.obstacles);
        } else if (key === this.controls.player2.right) {
            this.player2.move('right', this.canvas, this.obstacles);
        } else if (key === this.controls.player2.shoot) {
            this.player2.shoot(this.player1);
        }
    }
}

export default Game;
