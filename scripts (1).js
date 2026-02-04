// Matrix Rain Effect
class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.fontSize = 16;
        this.columns = this.canvas.width / this.fontSize;
        this.drops = [];
        
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }
        
        this.chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.isRunning = false;
    }
    
    draw() {
        if (!this.isRunning) return;
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00FF41';
        this.ctx.font = this.fontSize + 'px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
    }
    
    start() {
        this.isRunning = true;
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
    }
    
    animate() {
        if (!this.isRunning) return;
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width / this.fontSize;
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }
    }
}

// Initialize Matrix Rain
const matrixRain = new MatrixRain('matrixCanvas');

// Typewriter effect for logo
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Typewriter effect for section titles
function typeWriterTitle(element, text, speed = 80) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 300);
}

// Initialize logo typewriter on page load
window.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    typeWriter(logo, 'webfish', 150);
    loadGames();
    loadScripts();
    updateBackground('home');
});

// Handle window resize for matrix rain
window.addEventListener('resize', () => {
    matrixRain.resize();
});

// Background switching
function updateBackground(section) {
    const webfishBg = document.getElementById('webfishBg');
    const blurredBg = document.getElementById('blurredBg');
    const matrixBg = document.getElementById('matrixCanvas');
    
    // Remove all active classes
    webfishBg.classList.remove('active');
    blurredBg.classList.remove('active');
    matrixBg.classList.remove('active');
    
    // Stop matrix rain
    matrixRain.stop();
    
    // Add appropriate background
    if (section === 'home') {
        webfishBg.classList.add('active');
    } else if (section === 'scripts') {
        matrixBg.classList.add('active');
        matrixRain.start();
    } else if (section === 'games') {
        blurredBg.classList.add('active');
    }
}

// Sidebar functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Show different sections
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.sidebar-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Update background
    updateBackground(section);
    
    // Show selected section
    if (section === 'home') {
        document.getElementById('homeSection').classList.add('active');
        document.querySelectorAll('.sidebar-tab')[0].classList.add('active');
    } else if (section === 'scripts') {
        document.getElementById('scriptsSection').classList.add('active');
        document.querySelectorAll('.sidebar-tab')[1].classList.add('active');
        
        // Typewriter effect for scripts title
        const scriptsTitle = document.getElementById('scriptsTitle');
        typeWriterTitle(scriptsTitle, "webfishes scripts");
    } else if (section === 'games') {
        document.getElementById('gamesSection').classList.add('active');
        document.querySelectorAll('.sidebar-tab')[2].classList.add('active');
    }
}

// Discord modal functions
function openDiscordModal() {
    document.getElementById('discordModal').classList.add('active');
}

function closeDiscordModal() {
    document.getElementById('discordModal').classList.remove('active');
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('discordModal');
    if (e.target === modal) {
        closeDiscordModal();
    }
});

// Game Window Functions
let currentGameFile = '';
let currentGameName = '';

function openGame(gameName, gameFile) {
    currentGameFile = gameFile;
    currentGameName = gameName;
    
    const gameWindow = document.getElementById('gameWindow');
    const gameTitle = document.getElementById('gameTitle');
    const gameFrame = document.getElementById('gameFrame');
    
    gameTitle.textContent = gameName;
    gameFrame.src = gameFile;
    
    gameWindow.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGame() {
    const gameWindow = document.getElementById('gameWindow');
    const gameFrame = document.getElementById('gameFrame');
    
    gameWindow.classList.remove('active');
    gameFrame.src = '';
    document.body.style.overflow = 'auto';
    
    // Exit fullscreen if active
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function toggleFullscreen() {
    const gameWindow = document.getElementById('gameWindow');
    
    if (!document.fullscreenElement) {
        gameWindow.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

function downloadGame() {
    if (!currentGameFile) return;
    
    // Create a link element
    const link = document.createElement('a');
    link.href = currentGameFile;
    link.download = currentGameFile;
    link.style.display = 'none';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show notification
    alert(`Downloading ${currentGameName}!`);
}

// Close game window with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const gameWindow = document.getElementById('gameWindow');
        if (gameWindow.classList.contains('active')) {
            closeGame();
        }
    }
});

// Games data - Updated to include actual uploaded files
const games = [
    { name: 'Webfishing', file: 'webfishing.html', icon: '🎣' },
    { name: 'Half Life', file: 'Half_Life.html', icon: '🔫' },
    { name: 'Cuphead', file: 'Cuphead.html', icon: '☕' },
    { name: 'Hotline Miami', file: 'Hotline_Miami.html', icon: '🔥' },
    { name: 'Super Mario 64', file: 'Super_Mario_64.html', icon: '🍄' },
    { name: 'Sonic Mania', file: 'Sonic_Mania.html', icon: '💨' },
    { name: 'Sonic.EXE', file: 'Sonic_EXE__ORIGINAL___1_.html', icon: '👹' },
    { name: 'Moto X3M', file: 'Moto_X3M.html', icon: '🏍️' },
    { name: 'Moto X3M 2', file: 'Moto_X3M_2.html', icon: '🏁' },
    { name: 'Bloxorz', file: 'Bloxorz.html', icon: '🎮' },
    { name: 'Time Shooter 2', file: 'Time_Shooter_2.html', icon: '⏱️' },
    { name: 'Time Shooter 3 SWAT', file: 'Time_Shooter_3__SWAT.html', icon: '🚔' },
    { name: "Papa's Pizzeria", file: 'Papa_s_Pizeria.html', icon: '🍕' },
    { name: 'Riddle School', file: 'Riddle_School.html', icon: '🏫' },
    { name: 'Riddle School 2', file: 'Riddle_School_2.html', icon: '📚' },
    { name: 'Riddle School 3', file: 'Riddle_School_3.html', icon: '✏️' },
    { name: 'Rooftop Snipers', file: 'Rooftop_Snipers.html', icon: '🎯' },
    { name: 'Soundboard', file: 'Soundboard.html', icon: '🔊' },
    { name: 'Steal A Brainrot', file: 'Steal_A_Brainrot.html', icon: '🧠' }
];

// Load games into grid
function loadGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    
    games.forEach((game, index) => {
        const gameBox = document.createElement('div');
        gameBox.className = 'game-box';
        gameBox.style.animationDelay = `${index * 0.05}s`;
        gameBox.innerHTML = `
            <h3>${game.name}</h3>
            <div class="game-icon">${game.icon}</div>
        `;
        gameBox.onclick = () => {
            openGame(game.name, game.file);
        };
        gamesGrid.appendChild(gameBox);
    });
}

// Roblox scripts data
const scripts = [
    {
        name: 'Universal ESP',
        description: 'See players through walls, display names, health bars, and distance. Works on most games!'
    },
    {
        name: 'Infinite Yield',
        description: 'The most popular admin commands script. Over 400+ commands for ultimate control.'
    },
    {
        name: 'Fly Script V3',
        description: 'Smooth flying with speed control. Press E to toggle, works universally!'
    },
    {
        name: 'Arsenal Aimbot',
        description: 'Precision aimbot for Arsenal with customizable FOV, smoothness, and team check.'
    },
    {
        name: 'Auto Farm Hub',
        description: 'Multi-game auto farm supporting Blox Fruits, Pet Simulator X, and 20+ more games.'
    }
];

// Load scripts into grid
function loadScripts() {
    const scriptsGrid = document.getElementById('scriptsGrid');
    scriptsGrid.innerHTML = '';
    
    scripts.forEach((script, index) => {
        const scriptBox = document.createElement('div');
        scriptBox.className = 'script-box';
        scriptBox.style.animationDelay = `${index * 0.1}s`;
        scriptBox.innerHTML = `
            <h3>${script.name}</h3>
            <p>${script.description}</p>
        `;
        scriptBox.onclick = () => {
            alert(`Script: ${script.name}\n\nThis is a demo. In production, this would copy the script or open an executor.`);
        };
        scriptsGrid.appendChild(scriptBox);
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
