// Pinball Game  
// Author: Yousaf Arbaz
// Get the canvas element  
// document.addEventListener('DOMContentLoaded', startGame)

// Setting timeout so that everything properly loads
export const gameLoadTime = 4000;
setTimeout(startGame, gameLoadTime)

// Function containing all game code
function startGame() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Set the canvas dimensions  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Define the game variables  
    var ballX = canvas.width / 2;
    var ballY = canvas.height / 2;
    var ballSpeedX = 5;
    var ballSpeedY = 5;
    var ballRadius = 10;
    var paddleWidth = 100;
    var paddleHeight = 20;
    var paddleX = canvas.width / 2 - paddleWidth / 2;
    var paddleY = canvas.height - paddleHeight;
    const paddleSpeed = 30;
    var score = 0;
    var lives = 3;
    var currentPlayActive = false;
    let interval;
    let style = {
        text_clr: 'black',
        ball_clr: 'black',
        paddle_clr: 'black',
        bg_clr: 'black',
        font_size_100: '24px',
        font_size_200: (canvas.width < '600') ? '20px' : '40px',
    }
    // Draw the game elements  
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the ball  
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = style.ball_clr;
        ctx.fill();

        // Draw the paddle  
        ctx.fillStyle = style.paddle_clr;
        ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

        // Draw the score  
        ctx.font = `${style.font_size_100} Arial`;
        ctx.fillStyle = style.text_clr;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('Score: ' + score, 10, 10);

        // Draw the lives  
        ctx.textAlign = 'right';
        ctx.fillText('Lives: ' + lives, canvas.width - 10, 10);
    }
    function drawWelcomeScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the score  
        ctx.font = `${style.font_size_100} Arial`;
        ctx.fillStyle = style.text_clr;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('Score: ' + score, 10, 10);

        // Draw the lives  
        ctx.textAlign = 'right';
        ctx.fillText('Lives: ' + lives, canvas.width - 10, 10);

        // Draw  
        ctx.font = `${style.font_size_200} Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(`Press SpaceBar to Start Game!`, canvas.width / 2, canvas.height / 2);
    }
    // Update the game state  
    function update() {
        // Move the ball  
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Bounce off the edges  
        if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
            ballSpeedX = -ballSpeedX;
        }
        if (ballY - ballRadius < 0) {
            ballSpeedY = -ballSpeedY;
        }

        // Check for collision with the paddle  
        if (ballY + ballRadius > paddleY && ballX + ballRadius > paddleX && ballX - ballRadius < paddleX + paddleWidth) {
            ballSpeedY = -ballSpeedY;
            score++;
        }

        // Check for game over  
        if (ballY + ballRadius > canvas.height) {
            lives--;
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;

        }

        // Check for win  
        if (score >= 100) {
            // Draw the Game Over  
            ctx.font = `${style.font_size_200} Arial`;
            ctx.fillStyle = style.text_clr;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(`You Win!`, canvas.width / 2, canvas.height / 2);
            ctx.fillText(`score: ${score}`, canvas.width / 2, (canvas.height / 2) + 40);

            clearInterval(interval)
            currentPlayActive = false
            score = 0;
            lives = 3;
        }
        if (lives <= 0) {
            // Draw the Game Over  
            ctx.font = `${style.font_size_200} Arial`;
            ctx.fillStyle = style.text_clr;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(`Game Over!`, canvas.width / 2, canvas.height / 2);
            ctx.fillText(`score: ${score}`, canvas.width / 2, (canvas.height / 2) + 40);

            clearInterval(interval)
            currentPlayActive = false
            score = 0;
            lives = 3;
        }

    }

    // Handle key presses  
    function handleKeyPress(event) {
        if (paddleX > canvas.width - paddleWidth) {
            paddleX = canvas.width - paddleWidth;
            return
        }
        if (paddleX < 0) {
            paddleX = 0;
            return
        }
        if (event.key === 'A' || event.key === 'a') {
            paddleX -= paddleSpeed;
        }
        if (event.key === 'D' || event.key === 'd') {
            paddleX += paddleSpeed;
        }
    }
    // Handle mousemove event  
    function mouseMove(event) {
        paddleX = event.offsetX - (paddleWidth / 2)

        if (paddleX > canvas.width - paddleWidth) {
            paddleX = canvas.width - paddleWidth;
            return
        }
        if (paddleX < 0) {
            paddleX = 0;
            return
        }
    }
    // Handle touchmove event  
    function touchDown(event) {
        const rect = event.target.getBoundingClientRect()
        const offsetX = (event.touches[0].clientX - window.pageXOffset - rect.left)
        paddleX = offsetX - (paddleWidth / 2)

        if (paddleX > canvas.width - paddleWidth) {
            paddleX = canvas.width - paddleWidth;
            return
        }
        if (paddleX < 0) {
            paddleX = 0;
            return
        }
    }

    // Main loop
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' && !currentPlayActive) {
            currentPlayActive = true;
            interval = setInterval(() => {
                requestAnimationFrame(update)
                draw();
            }, 10)
        }
    })
    document.addEventListener('touchstart', (e) => {
        if (!currentPlayActive) {
            currentPlayActive = true;
            interval = setInterval(() => {
                requestAnimationFrame(update)
                draw();
            }, 10)
        }
    })

    // Show welcome screen
    drawWelcomeScreen();
    
    // Initialize the event listeners
    document.addEventListener('keydown', handleKeyPress);
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('touchmove', touchDown);

    // Create a HTML element with ID "canvas" and add the above code into a script element for this to work.

    // html code <canvas id="canvas"></canvas>
    // Paste the above JavaScript code into the script tag.

}
