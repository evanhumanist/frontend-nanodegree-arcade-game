const WIN_CONTENT = document.querySelector('.win'); //Targets the Win section
const CANVAS = document.querySelector('.mainCanvas');
const WIN_BUTTON = document.querySelector('.win-button');
//this code waits for the canvas to load before trying to target it
// function targetCanvas(canvas) {
//     canvas = document.querySelector('.mainCanvas');
// }
// setTimeout(targetCanvas(CANVAS), 10);

// Enemies our player must avoid
const Enemy = function(x = 0, y = 0, randomSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.randomSpeed = randomSpeed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 606) {
        this.x = -101;
    } else {
        this.x = this.x + (this.randomSpeed * dt);
    }
    if (player.x >= this.x -45 && player.x <= (this.x + 60) && player.y >= this.y - 14 && player.y <= (this.y + 68)) {
        console.log(this.x, this.y);
        console.log(player.x, player.y);
        player.x = 202;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x = 202, y = 380) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.y < 0 && !CANVAS.classList.contains('hide')) {
        CANVAS.classList.toggle('hide');
        WIN_CONTENT.classList.toggle('hide');
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
    switch (e) {
        case 'left':
            if (this.x > 0) {
                this.x = this.x - 101;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y = this.y - 83;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x = this.x + 101;
            }
            break;
        case 'down':
            if (this.y < 380) {
                this.y = this.y + 83;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = []
for (let i = 0; i < 5; i++){
    startXLocation = Math.floor(Math.random() * 505);
    startYLocation = (Math.ceil(Math.random() * 3) * 83) - 23;
    speed = Math.random() * 900;
    allEnemies[i] = new Enemy(startXLocation, startYLocation, speed);
}
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

WIN_BUTTON.addEventListener('click', function() {
    player.x = 202;
    player.y = 380;
    CANVAS.classList.toggle('hide');
    WIN_CONTENT.classList.toggle('hide');
});
