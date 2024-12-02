# Night City Runner 🌃

A cyberpunk-themed endless runner game built with vanilla JavaScript and HTML5 Canvas. Navigate through a neon-lit cityscape, dodging buildings while collecting points in this Flappy Bird-inspired game with a futuristic twist.

## 🎮 Game Features

- Smooth, physics-based gameplay
- Dynamic difficulty scaling
- Particle effects and visual trails
- Procedurally generated buildings with random window patterns
- Twinkling star background
- Score tracking
- Responsive controls

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic local server (optional, but recommended)

### Installation

1. Clone the repository:

git clone https://github.com/yourusername/night-city-runner.git
cd night-city-runner


2. File Structure:

night-city-runner/
├── index.html
├── styles.css
├── script.js/
└── README.md


3. Run the game:
   - Option 1: Open `index.html` directly in your browser
   - Option 2 (Recommended): Serve through a local server
     
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js's http-server
     npx http-server
     

## 🎯 How to Play

- Press **SPACE** to make your character jump/float
- Navigate through gaps between buildings
- Avoid hitting buildings and screen boundaries
- Each successful pass through buildings earns you points
- The game gets progressively harder as your score increases
- Press **SPACE** to restart when game is over

## 🛠️ Technical Implementation

### Core Components

1. **Player**
   - Physics-based movement
   - Trail effects
   - Collision detection

2. **Environment**
   - Procedural building generation
   - Dynamic window patterns
   - Star background system

3. **Game State**
   - Score tracking
   - Difficulty progression
   - Particle system management

4. **Renderer**
   - Efficient canvas rendering
   - Visual effects
   - UI elements

### Key Technologies

- HTML5 Canvas
- CSS3
- Vanilla JavaScript (ES6+)
- RequestAnimationFrame for smooth animation

## 🔧 Customization

You can modify game parameters in `script.js`:

```javascript
const CONFIG = {
    canvas: {
        width: 480,
        height: 320
    },
    player: {
        startX: 50,
        radius: 15,
        gravity: 0.025,
        jumpForce: -3.8,
        // ...
    },
    // ...
};
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Flappy Bird
- Cyberpunk aesthetic inspiration from various sources
- Special thanks to the HTML5 Canvas community

## 🐛 Known Issues

- None currently reported. Please submit issues through GitHub's issue tracker.

## 🚧 Future Improvements

- [ ] Mobile touch controls
- [ ] Power-ups system
- [ ] Sound effects and background music
- [ ] High score system
- [ ] Multiple character skins
- [ ] Additional obstacle types
- [ ] Social sharing features

Playing Online
Visit: https://github.com/dhruv1n2506/night-city-runner

Desktop App Installation
Prerequisites


Node.js

npm


Building Desktop App

bashCopy# 
Install dependencies

npm install electron electron-builder --save-dev

npm install electron-store

# Add build scripts to package.json
npm run build

# Run locally
npm start

# Build distributables
npm run build

## 📞 Contact
- Your Name - Dhruvin Patel
- Project Link: [https://github.com/yourusername/night-city-runner](https://github.com/yourusername/night-city-runner)
