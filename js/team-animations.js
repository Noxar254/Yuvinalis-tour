// Team mode animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add confetti effect for team achievements
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);
        
        // Create confetti pieces
        const colors = ['#27ae60', '#2ecc71', '#f1c40f', '#e67e22', '#3498db'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confettiContainer.appendChild(confetti);
        }
        
        // Remove confetti after animation completes
        setTimeout(() => {
            document.body.removeChild(confettiContainer);
        }, 6000);
    }
    
    // Add this function to the global scope so it can be called from track-miles.js
    window.showTeamCelebration = function() {
        createConfetti();
    };
    
    // Add pulse animation to team mode toggle
    const teamModeToggle = document.getElementById('teamModeToggle');
    if (teamModeToggle) {
        teamModeToggle.addEventListener('change', function() {
            if (this.checked) {
                pulseElement(document.querySelector('.team-mode-container'));
            }
        });
    }
    
    // Pulse animation for elements
    function pulseElement(element) {
        if (!element) return;
        
        element.classList.add('pulse-animation');
        
        // Remove class after animation completes
        setTimeout(() => {
            element.classList.remove('pulse-animation');
        }, 1000);
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .pulse-animation {
            animation: pulse 1s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .confetti-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        }
        
        .confetti {
            position: absolute;
            top: -10px;
            width: 10px;
            height: 20px;
            opacity: 0.7;
            transform: rotate(0deg);
            animation: fall linear forwards;
        }
        
        @keyframes fall {
            0% {
                top: -10px;
                transform: rotate(0deg) translateX(0);
                opacity: 0.7;
            }
            25% {
                transform: rotate(45deg) translateX(30px);
                opacity: 0.8;
            }
            50% {
                transform: rotate(90deg) translateX(-30px);
                opacity: 0.9;
            }
            75% {
                transform: rotate(180deg) translateX(30px);
                opacity: 0.8;
            }
            100% {
                top: 100vh;
                transform: rotate(360deg) translateX(-30px);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
});
