const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');

let isNoButtonMoving = false;

// When user clicks "Yes"
yesBtn.addEventListener('click', () => {
    celebration.classList.add('show');
    
    // Add confetti effect
    createConfetti();
});

// Make "No" button run away when mouse gets near
noBtn.addEventListener('mouseenter', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Also move when trying to click (for touch devices)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
});

// Prevent any interaction with the No button
noBtn.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
});

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Detect mouse movement near the button - more aggressive
let lastMoveTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    // Throttle to prevent too many calculations but keep it responsive
    if (now - lastMoveTime < 30) return;
    lastMoveTime = now;
    
    const btnRect = noBtn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate distance from mouse to button center
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    const distance = Math.sqrt(
        Math.pow(mouseX - btnCenterX, 2) + Math.pow(mouseY - btnCenterY, 2)
    );
    
    // If mouse is within 150px of the button, move it away
    if (distance < 150) {
        if (!isNoButtonMoving) {
            // First time moving - convert to fixed position
            const rect = noBtn.getBoundingClientRect();
            noBtn.classList.add('moving');
            noBtn.style.left = rect.left + 'px';
            noBtn.style.top = rect.top + 'px';
            isNoButtonMoving = true;
        }
        moveNoButton();
    }
});

// Move the "No" button to a random position
function moveNoButton() {
    if (!isNoButtonMoving) {
        // First time moving - convert to fixed position
        const rect = noBtn.getBoundingClientRect();
        noBtn.classList.add('moving');
        noBtn.style.left = rect.left + 'px';
        noBtn.style.top = rect.top + 'px';
        isNoButtonMoving = true;
    }
    
    // Calculate safe boundaries within the viewport
    const padding = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;
    
    // Generate random position
    const randomX = Math.random() * (maxX - padding) + padding;
    const randomY = Math.random() * (maxY - padding) + padding;
    
    // Apply the new position
    noBtn.style.transition = 'all 0.3s ease-out';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Optional: Make the "Yes" button bigger to encourage clicking it
    const currentScale = parseFloat(yesBtn.style.transform?.match(/scale\(([\d.]+)\)/)?.[1] || 1);
    const newScale = Math.min(currentScale + 0.1, 1.5);
    yesBtn.style.transform = `scale(${newScale})`;
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#c06c84', '#f67280', '#355c7d', '#6c5ce7'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `fall ${2 + Math.random() * 3}s linear`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30);
    }
}

// Add fall animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 20}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
