// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Horizontal scroll for movie rows with mouse wheel
const movieRows = document.querySelectorAll('.row-posters');

movieRows.forEach(row => {
    row.addEventListener('wheel', (e) => {
        e.preventDefault();
        row.scrollLeft += e.deltaY;
    });
});

// Play button functionality
const playButtons = document.querySelectorAll('.btn-play, .icon-btn');

playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const movieTitle = button.closest('.hero-content') ? 
            document.querySelector('.hero-title').textContent : 
            button.closest('.poster-card')?.querySelector('h4')?.textContent || 'Movie';
        
        alert(`Playing: ${movieTitle}\n\nThis is a demo. In a real app, this would start playing the video.`);
    });
});

// Add to list functionality
const addButtons = document.querySelectorAll('.icon-btn:nth-child(2)');

addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        button.textContent = '✓';
        setTimeout(() => {
            button.textContent = '+';
        }, 1500);
        
        const movieTitle = button.closest('.poster-card')?.querySelector('h4')?.textContent || 'Movie';
        showNotification(`Added "${movieTitle}" to My List`);
    });
});

// More info button functionality
const infoButtons = document.querySelectorAll('.icon-btn:nth-child(3), .btn-info');

infoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const movieTitle = button.closest('.hero-content') ? 
            document.querySelector('.hero-title').textContent : 
            button.closest('.poster-card')?.querySelector('h4')?.textContent || 'Movie';
        
        alert(`More Info about: ${movieTitle}\n\nThis would open a detailed modal with:\n- Synopsis\n- Cast & Crew\n- Reviews\n- Related Content`);
    });
});

// Poster card click
const posterCards = document.querySelectorAll('.poster-card');

posterCards.forEach(card => {
    card.addEventListener('click', () => {
        const movieTitle = card.querySelector('h4')?.textContent || 'Movie';
        alert(`Selected: ${movieTitle}\n\nThis would open the movie details page.`);
    });
});

// Search button
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    const searchTerm = prompt('Search for movies, TV shows, and more:');
    if (searchTerm) {
        alert(`Searching for: "${searchTerm}"\n\nThis would show search results.`);
    }
});

// Notifications button
const notificationsBtn = document.querySelector('.notifications-btn');

notificationsBtn.addEventListener('click', () => {
    showNotification('You have 3 new recommendations!');
});

// Profile menu dropdown
const profileMenu = document.querySelector('.profile-menu');

profileMenu.addEventListener('click', () => {
    const options = ['Profile', 'Account', 'Help Center', 'Sign out of Netflix'];
    const selected = prompt(`Profile Menu:\n${options.join('\n')}\n\nEnter option number (1-4):`);
    
    if (selected) {
        alert(`Selected: ${options[selected - 1]}\n\nThis would navigate to the selected page.`);
    }
});

// Navigation links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const sectionName = link.textContent;
        console.log(`Navigating to: ${sectionName}`);
    });
});

// Smooth scroll animation for hero section
const hero = document.querySelector('.hero');
let scrollPosition = 0;

window.addEventListener('scroll', () => {
    scrollPosition = window.scrollY;
    if (scrollPosition < hero.offsetHeight) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Hover effect enhancement for posters
posterCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '100';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Notification system
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #181818;
            color: #fff;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.5);
            z-index: 9999;
            animation: slideIn 0.3s ease;
            font-size: 14px;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Simulate loading states
window.addEventListener('load', () => {
    console.log('Netflix Clone loaded successfully!');
    
    // Add fade-in animation to main content
    const mainContent = document.querySelector('.main-content');
    mainContent.style.opacity = '0';
    mainContent.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        mainContent.style.opacity = '1';
    }, 100);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Space bar to play/pause (when not in input)
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        const firstPlayButton = document.querySelector('.btn-play');
        if (firstPlayButton) {
            firstPlayButton.click();
        }
    }
    
    // Press 'S' for search
    if (e.code === 'KeyS' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        searchBtn.click();
    }
    
    // Press 'N' for notifications
    if (e.code === 'KeyN' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        notificationsBtn.click();
    }
});

// Easter egg - Konami code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            showNotification('🎉 Easter Egg Activated! You found the Konami Code!');
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

console.log('🎬 Netflix Clone - Ready to stream!');
console.log('Keyboard shortcuts: Space = Play, S = Search, N = Notifications');
