const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// Create star background
const stars = Array(100).fill().map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.7,
    size: Math.random() * 2,
    twinkle: Math.random()
}));

const player = {
    x: 50,
    y: canvas.height / 2,
    radius: 15,
    velocity: 0,
    gravity: 0.025,
    jumpForce: -3.8,
    maxVelocity: 1.5,
    dragCoefficient: 0.994,
    trail: []
};

const gameState = {
    score: 0,
    obstacles: [],
    baseObstacleGap: 150,
    baseObstacleWidth: 80,  // Wider for buildings
    obstacleSpeed: 1.2,
    spawnInterval: 2800,
    isGameOver: false,
    lastSpawnTime: 0,
    timeInAir: 0,
    particles: [],
    difficultyFactor: 0
};

function createBuilding(x, height, width) {
    const windows = [];
    const windowSize = 5;
    const windowGap = 10;
    
    for (let i = 0; i < height; i += windowGap) {
        for (let j = 0; j < width - windowSize; j += windowGap) {
            if (Math.random() > 0.3) { // 70% chance of window appearing
                windows.push({
                    x: j,
                    y: i,
                    lit: Math.random() > 0.5
                });
            }
        }
    }
    return windows;
}

function drawBuilding(ctx, x, y, width, height, windows) {
    // Building base
    const gradient = ctx.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, '#1a237e');
    gradient.addColorStop(1, '#303f9f');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, height);
    
    // Building outline
    ctx.strokeStyle = '#3949ab';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // Windows
    windows.forEach(window => {
        ctx.fillStyle = window.lit ? 'rgba(255, 255, 200, 0.8)' : 'rgba(255, 255, 200, 0.2)';
        ctx.fillRect(x + window.x, y + window.y, 4, 4);
    });
}

function calculateDifficulty() {
    gameState.difficultyFactor = Math.floor(gameState.score / 4);
    
    const baseGap = Math.max(
        100,
        gameState.baseObstacleGap - (gameState.difficultyFactor * 6)
    );
    
    const baseWidth = Math.min(
        120,
        gameState.baseObstacleWidth + (gameState.difficultyFactor * 4)
    );
    
    return {
        gap: Math.max(90, baseGap + (Math.random() * 20 - 10)),
        width: Math.max(60, baseWidth + (Math.random() * 30 - 15))
    };
}

function createObstacle() {
    const difficulty = calculateDifficulty();
    const gapPosition = 60 + Math.random() * (canvas.height - difficulty.gap - 120);
    
    return {
        x: canvas.width,
        gapY: gapPosition,
        passed: false,
        width: difficulty.width,
        gap: difficulty.gap,
        windows: [
            createBuilding(0, gapPosition, difficulty.width),
            createBuilding(0, canvas.height - (gapPosition + difficulty.gap), difficulty.width)
        ]
    };
}

function createParticle(x, y) {
    return {
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        size: Math.random() * 3 + 1
    };
}

function resetGame() {
    player.y = canvas.height / 2;
    player.velocity = 0;
    player.trail = [];
    gameState.obstacles = [];
    gameState.particles = [];
    gameState.score = 0;
    gameState.difficultyFactor = 0;
    gameState.isGameOver = false;
    gameState.timeInAir = 0;
    scoreElement.textContent = '0';
}

function update() {
    if (gameState.isGameOver) return;

    // Update stars
    stars.forEach(star => {
        star.twinkle = Math.sin(Date.now() * 0.001 + star.x) * 0.5 + 0.5;
    });

    gameState.timeInAir++;
    
    const gravityEffect = player.gravity * (1 + gameState.timeInAir * 0.00003);
    player.velocity += gravityEffect;
    player.velocity *= player.dragCoefficient;
    
    if (player.velocity > player.maxVelocity) {
        player.velocity = player.maxVelocity;
    }
    
    const floatAmount = Math.sin(gameState.timeInAir * 0.03) * 0.12;
    player.velocity += floatAmount;
    
    player.y += player.velocity;

    // Update trail
    player.trail.unshift({x: player.x, y: player.y});
    if (player.trail.length > 10) player.trail.pop();

    // Update particles
    for (let i = gameState.particles.length - 1; i >= 0; i--) {
        const particle = gameState.particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;
        if (particle.life <= 0) {
            gameState.particles.splice(i, 1);
        }
    }

    // Spawn obstacles
    const currentTime = Date.now();
    if (currentTime - gameState.lastSpawnTime > gameState.spawnInterval) {
        gameState.obstacles.push(createObstacle());
        gameState.lastSpawnTime = currentTime;
    }

    // Update obstacles and check collisions
    for (let i = gameState.obstacles.length - 1; i >= 0; i--) {
        const obstacle = gameState.obstacles[i];
        obstacle.x -= gameState.obstacleSpeed;

        if (obstacle.x + obstacle.width < 0) {
            gameState.obstacles.splice(i, 1);
        }

        if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
            obstacle.passed = true;
            gameState.score++;
            scoreElement.textContent = gameState.score;
        }

        // Collision detection
        if (player.x + player.radius * 0.7 > obstacle.x && 
            player.x - player.radius * 0.7 < obstacle.x + obstacle.width) {
            if (player.y - player.radius * 0.7 < obstacle.gapY || 
                player.y + player.radius * 0.7 > obstacle.gapY + obstacle.gap) {
                gameState.isGameOver = true;
            }
        }
    }

    // Check wall collisions
    if (player.y + player.radius > canvas.height || player.y - player.radius < 0) {
        gameState.isGameOver = true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + star.twinkle * 0.7})`;
        ctx.fill();
    });

    // Draw distant city silhouette
    ctx.fillStyle = '#1a1a3a';
    for (let x = 0; x < canvas.width; x += 30) {
        const height = 20 + Math.sin(x * 0.1) * 10;
        ctx.fillRect(x, canvas.height - height, 20, height);
    }

    // Draw particles
    gameState.particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.life})`;
        ctx.fill();
    });

    // Draw trail
    player.trail.forEach((pos, index) => {
        const size = player.radius * (1 - index / player.trail.length);
        const opacity = 1 - index / player.trail.length;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${opacity * 0.5})`;
        ctx.fill();
    });

    // Draw player
    const gradient = ctx.createRadialGradient(
        player.x, player.y, 0,
        player.x, player.y, player.radius
    );
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(1, '#00ffff');
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    // Draw buildings (obstacles)
    gameState.obstacles.forEach(obstacle => {
        // Draw top building
        drawBuilding(
            ctx, 
            obstacle.x, 
            0, 
            obstacle.width, 
            obstacle.gapY,
            obstacle.windows[0]
        );
        
        // Draw bottom building
        drawBuilding(
            ctx, 
            obstacle.x, 
            obstacle.gapY + obstacle.gap, 
            obstacle.width, 
            canvas.height - (obstacle.gapY + obstacle.gap),
            obstacle.windows[1]
        );
    });

    if (gameState.isGameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, canvas.height/2 - 40, canvas.width, 80);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over! Press Space to Restart', canvas.width/2, canvas.height/2);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (gameState.isGameOver) {
            resetGame();
        } else {
            player.velocity = player.jumpForce;
            gameState.timeInAir = 0;
            for (let i = 0; i < 5; i++) {
                gameState.particles.push(createParticle(player.x, player.y));
            }
        }
        event.preventDefault();
    }
});

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();