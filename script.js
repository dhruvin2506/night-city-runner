const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const soundManager = {
    sounds: {
        jump: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAEAAABVgANTU1NTU1Q0NDQ0NDUFBQUFBQXl5eXl5ea2tra2tra3l5eXl5eYaGhoaGhpSUlJSUlKGhoaGhobi4uLi4uMXFxcXFxdPT09PT0+Dg4ODg4O3t7e3t7f////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAABVjMK1YIAAAAAAAAAAAAAAAAAAAAAP/zSMQAAAGkGuUAAABLQqe4IAgEXEr3IBAEAQBAEAQBAEwCP8eUQCA5cUCDgQBAEAnB8+cUCcKAgJ/lEDgQBAMeU+oCAIAgGPKIKBjygQE4UBAEAQAAABERERERERGYzGYzGYzGABgYGBgYGBgBSUlJSUlJSQICAgICAgICBAQEBAQEBAQQEBAQEBAQEBISEhISEhISEBISEhISEhISEhISEhISEhL/80jEFQAAAaQAAAAAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zSMQpAAAAaQAAAAAAAAA0gAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'),
        collect: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAEAAABVgANTU1NTU1Q0NDQ0NDUFBQUFBQXl5eXl5ea2tra2tra3l5eXl5eYaGhoaGhpSUlJSUlKGhoaGhobi4uLi4uMXFxcXFxdPT09PT0+Dg4ODg4O3t7e3t7f////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAABVjMK1YIAAAAAAAAAAAAAAAAAAAAAP/zSMQAAAGkGuUAAABLQMe4IAgEAQBAEAkEPKBOFAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAABERERERERGYzGYzGYzGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/zSMQVAAAAaQAAAAAAAAA0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/80jEKQAAAGkAAAAAAAAANIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),
        crash: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAEAAABVgANTU1NTU1Q0NDQ0NDUFBQUFBQXl5eXl5ea2tra2tra3l5eXl5eYaGhoaGhpSUlJSUlKGhoaGhobi4uLi4uMXFxcXFxdPT09PT0+Dg4ODg4O3t7e3t7f////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAABVjMK1YIAAAAAAAAAAAAAAAAAAAAAP/zSMQAAAGkGuUAAABLQ8ogcCAIBAEAQBAEAQDHlAQE4QCcHBAIA+cUCf5c4EAQcQBAEAQBAEAnCgTg+cUBAEAQBAEAQBAIBgcuIAgCAIAgCAIBGIBAEAQDGIBAEAQBAAAAERERERERGYzGYzGYzGABgYGBgYGBgBSUlJSUlJSQICAgICAgICBAQEBAQEBAQQEBAQEBAQEBISEhISEhISEBISEhISEhISEhISEhISEhL/80jEFQAAAaQAAAAAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zSMQpAAAAaQAAAAAAAAA0gAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'),
        powerup: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAEAAABVgANTU1NTU1Q0NDQ0NDUFBQUFBQXl5eXl5ea2tra2tra3l5eXl5eYaGhoaGhpSUlJSUlKGhoaGhobi4uLi4uMXFxcXFxdPT09PT0+Dg4ODg4O3t7e3t7f////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAABVjMK1YIAAAAAAAAAAAAAAAAAAAAAP/zSMQAAAGkGuUAAABLQqe4IAgEXEr3IBAEAQBAEAQBAEwCP8eUQCA5cUCDgQBAEAnB8+cUCcKAgJ/lEDgQBAMeU+oCAIAgGPKIKBjygQE4UBAEAQAAABERERERERGYzGYzGYzGABgYGBgYGBgBSUlJSUlJSQICAgICAgICBAQEBAQEBAQQEBAQEBAQEBISEhISEhISEBISEhISEhISEhISEhISEhL/80jEFQAAAaQAAAAAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zSMQpAAAAaQAAAAAAAAA0gAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV')
    },
    play: function(sound) {
        if (this.sounds[sound]) {
            this.sounds[sound].currentTime = 0;
            this.sounds[sound].play().catch(e => console.log("Audio play failed:", e));
        }
    }
};
let gameColors = {
    background: '#0a0a2e',
    ball: '#00ffff',
    building: '#1a237e'
};

function startGame() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    resetGame();
}

function toggleSettings() {
    const settings = document.getElementById('settings');
    settings.style.display = settings.style.display === 'none' ? 'block' : 'none';
}

function updateColors() {
    gameColors.background = document.getElementById('bgColor').value;
    gameColors.ball = document.getElementById('ballColor').value;
    gameColors.building = document.getElementById('buildingColor').value;
    
    // Update canvas background
    canvas.style.background = `linear-gradient(to bottom, 
        ${gameColors.background} 0%,
        ${gameColors.building} 40%,
        ${adjustColor(gameColors.building, 20)} 70%,
        ${adjustColor(gameColors.building, 40)} 100%
    )`;
}

function adjustColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
}
const POWER_UPS = {
    SHIELD: { duration: 5000, color: '#ffd700' },
    SLOW_TIME: { duration: 3000, color: '#00ff00' },
    SCORE_MULTIPLIER: { duration: 4000, color: '#ff00ff' }
};

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
    trail: [],
    isShielded: false,
    powerUpEffects: new Map()
};

const gameState = {
    score: 0,
    highScore: localStorage.getItem('highScore') || 0,
    obstacles: [],
    powerUps: [],
    activePowerUps: new Set(),
    multiplier: 1,
    baseObstacleGap: 128,
    baseObstacleWidth: 60,
    obstacleSpeed: 1.5,    
    spawnInterval: 2200,
    powerUpInterval: 5000,  
    isGameOver: false,
    lastSpawnTime: 0,
    lastPowerUpSpawn: 0,
    timeInAir: 0,
    particles: [],
    difficultyFactor: 0,
    difficultyLevels: {
        1: { speed: 1.2, gap: 150, spawnRate: 2800 },
        5: { speed: 1.4, gap: 140, spawnRate: 2600 },
        10: { speed: 1.6, gap: 130, spawnRate: 2400 },
        15: { speed: 1.8, gap: 120, spawnRate: 2200 }
    }
};

function createPowerUp() {
    const types = Object.keys(POWER_UPS);
    const type = types[Math.floor(Math.random() * types.length)];
    return {
        x: canvas.width,
        y: 100 + Math.random() * (canvas.height - 200),
        type,
        radius: 10,
        collected: false,
        color: POWER_UPS[type].color
    };
}

function createBuilding(x, height, width) {
    const windows = [];
    const windowSize = 5;
    const windowGap = 10;
    
    for (let i = 0; i < height; i += windowGap) {
        for (let j = 0; j < width - windowSize; j += windowGap) {
            if (Math.random() > 0.3) {
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
  
    const gradient = ctx.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, gameColors.building);
    gradient.addColorStop(1, adjustColor(gameColors.building, 20));
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, height);
    
    ctx.strokeStyle = adjustColor(gameColors.building, 40);
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
   
    windows.forEach(window => {
        ctx.fillStyle = window.lit ? 'rgba(255, 255, 200, 0.8)' : 'rgba(255, 255, 200, 0.2)';
        ctx.fillRect(x + window.x, y + window.y, 4, 4);
    });
}

function calculateDifficulty() {
    gameState.difficultyFactor = Math.floor(gameState.score / 4);
    
    const baseGap = Math.max(
        70, // Reduced from 100
        gameState.baseObstacleGap - (gameState.difficultyFactor * 8) // Increased from 6
    );
    
    const baseWidth = Math.min(
        200, // Increased from 120
        gameState.baseObstacleWidth + (gameState.difficultyFactor * 6) // Increased from 4
    );
    
    return {
        gap: Math.max(65, baseGap + (Math.random() * 15 - 7.5)), // Reduced gap variation
        width: Math.max(80, baseWidth + (Math.random() * 40 - 20)) // Increased width variation
    };
}

function createObstacle() {
    const difficulty = calculateDifficulty();
    const minGapPosition = 40 + (gameState.difficultyFactor * 2); // Increases minimum height with difficulty
    const maxGapPosition = canvas.height - difficulty.gap - minGapPosition;
    const gapPosition = minGapPosition + Math.random() * (maxGapPosition - minGapPosition);
    
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

    function applyPowerUp(type) {
        const endTime = Date.now() + POWER_UPS[type].duration;
        player.powerUpEffects.set(type, endTime);

        switch (type) {
            case 'SHIELD':
                player.isShielded = true;
                break;
            case 'SLOW_TIME':
                gameState.obstacleSpeed *= 0.5;
                break;
            case 'SCORE_MULTIPLIER':
                gameState.multiplier = 2;
                break;
        }
    }

    function removePowerUp(type) {
        player.powerUpEffects.delete(type);

        switch (type) {
            case 'SHIELD':
                player.isShielded = false;
                break;
            case 'SLOW_TIME':
                gameState.obstacleSpeed *= 2;
                break;
            case 'SCORE_MULTIPLIER':
                gameState.multiplier = 1;
                break;
        }
    }

    function updatePowerUps() {
        const currentTime = Date.now();

        gameState.powerUps.forEach((powerUp, index) => {
            if (!powerUp.collected) {
                powerUp.x -= gameState.obstacleSpeed;

                const dx = powerUp.x - player.x;
                const dy = powerUp.y - player.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < player.radius + powerUp.radius) {
                    powerUp.collected = true;
                    applyPowerUp(powerUp.type);
                    soundManager.play('powerup');
                }
            }
        });

        gameState.powerUps = gameState.powerUps.filter(p => p.x > -20);

        for (const [effect, endTime] of player.powerUpEffects) {
            if (currentTime >= endTime) {
                removePowerUp(effect);
            }
        }
    }

    function resetGame() {
        player.y = canvas.height / 2;
        player.velocity = 0;
        player.trail = [];
        player.isShielded = false;
        player.powerUpEffects.clear();
        gameState.obstacles = [];
        gameState.powerUps = [];
        gameState.particles = [];
        gameState.score = 0;
        gameState.multiplier = 1;
        gameState.difficultyFactor = 0;
        gameState.isGameOver = false;
        gameState.timeInAir = 0;
        gameState.obstacleSpeed = 1.2;
        scoreElement.textContent = '0';
    }

    function update() {
        if (gameState.isGameOver) return;


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


        player.trail.unshift({x: player.x, y: player.y});
        if (player.trail.length > 10) player.trail.pop();


        for (let i = gameState.particles.length - 1; i >= 0; i--) {
            const particle = gameState.particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.02;
            if (particle.life <= 0) {
                gameState.particles.splice(i, 1);
            }
        }


        const currentTime = Date.now();
        if (currentTime - gameState.lastSpawnTime > gameState.spawnInterval) {
            gameState.obstacles.push(createObstacle());
            gameState.lastSpawnTime = currentTime;
        }

        if (gameState.score > 0 && gameState.score % 10 === 0 && !gameState.powerUps.length) {
            gameState.powerUps.push(createPowerUp());
            gameState.lastPowerUpSpawn = currentTime;
        }

        updatePowerUps();

        for (let i = gameState.obstacles.length - 1; i >= 0; i--) {
            const obstacle = gameState.obstacles[i];
            obstacle.x -= gameState.obstacleSpeed;

            if (obstacle.x + obstacle.width < 0) {
                gameState.obstacles.splice(i, 1);
            }

            if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
                obstacle.passed = true;
                gameState.score += gameState.multiplier;
                if (gameState.score > gameState.highScore) {
                    gameState.highScore = gameState.score;
                    localStorage.setItem('highScore', gameState.highScore);
                }
                scoreElement.textContent = gameState.score;
            }

            if (!player.isShielded && 
                player.x + player.radius * 0.7 > obstacle.x && 
                player.x - player.radius * 0.7 < obstacle.x + obstacle.width) {
                if (player.y - player.radius * 0.7 < obstacle.gapY || 
                    player.y + player.radius * 0.7 > obstacle.gapY + obstacle.gap) {
                    gameState.isGameOver = true;
                    soundManager.play('crash');
                }
            }
        }


        if (player.y + player.radius > canvas.height || player.y - player.radius < 0) {
            if (!player.isShielded) {
                gameState.isGameOver = true;
                soundManager.play('crash');
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + star.twinkle * 0.7})`;
            ctx.fill();
        });


        ctx.fillStyle = '#1a1a3a';
        for (let x = 0; x < canvas.width; x += 30) {
            const height = 20 + Math.sin(x * 0.1) * 10;
            ctx.fillRect(x, canvas.height - height, 20, height);
        }


        gameState.particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.life})`;
            ctx.fill();
        });

        gameState.powerUps.forEach(powerUp => {
            if (!powerUp.collected) {
                ctx.beginPath();
                ctx.arc(powerUp.x, powerUp.y, powerUp.radius, 0, Math.PI * 2);
                ctx.fillStyle = powerUp.color;
                ctx.fill();
                ctx.strokeStyle = 'white';
                ctx.stroke();
            }
        });

        player.trail.forEach((pos, index) => {
            const size = player.radius * (1 - index / player.trail.length);
            const opacity = 1 - index / player.trail.length;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${opacity * 0.5})`;
            ctx.fill();
        });


        const gradient = ctx.createRadialGradient(
            player.x, player.y, 0,
            player.x, player.y, player.radius
        );
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(1, gameColors.ball);
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        if (player.isShielded) {
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.radius + 5, 0, Math.PI * 2);
            ctx.strokeStyle = POWER_UPS.SHIELD.color;
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        gameState.obstacles.forEach(obstacle => {
            drawBuilding(
                ctx, 
                obstacle.x, 
                0, 
                obstacle.width, 
                obstacle.gapY,
                obstacle.windows[0]
            );
            
            drawBuilding(
                ctx, 
                obstacle.x, 
                obstacle.gapY + obstacle.gap, 
                obstacle.width, 
                canvas.height - (obstacle.gapY + obstacle.gap),
                obstacle.windows[1]
            );
        });

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`High Score: ${gameState.highScore}`, canvas.width - 10, 30);

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
                soundManager.play('jump');
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