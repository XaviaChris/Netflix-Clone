/**
 * NETFLIX PREMIUM DASHBOARD - JAVASCRIPT
 * Author: CodeWithDivine
 * Version: 1.0
 * Description: Interactive functionality for Netflix-inspired dashboard
 */

// ========== DOM CONTENT LOADED EVENT ==========
// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('Netflix Premium Dashboard loaded successfully.');
    
    // Initialize all functionality
    initScrollHeader();
    initMobileMenu();
    initCardInteractions();
    initButtonListeners();
    initResponsiveBehavior();
});

// ========== HEADER SCROLL EFFECT ==========
/**
 * Adds scroll event listener to change header appearance
 * when user scrolls down the page
 */
function initScrollHeader() {
    // Get the header element
    const header = document.getElementById('header');
    
    // Check if header exists to avoid errors
    if (!header) {
        console.warn('Header element not found.');
        return;
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        // Add 'scrolled' class when scrolled past 20px
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========== MOBILE MENU TOGGLE ==========
/**
 * Initializes mobile menu functionality
 * Toggles sidebar visibility on mobile devices
 */
function initMobileMenu() {
    // Get mobile menu button
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    // Get sidebar element
    const sidebar = document.getElementById('sidebar');
    
    // Check if elements exist
    if (!mobileMenuBtn || !sidebar) {
        console.warn('Mobile menu elements not found.');
        return;
    }
    
    // Add click event listener to mobile menu button
    mobileMenuBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event bubbling
        sidebar.classList.toggle('active');
        
        // Update aria-expanded attribute for accessibility
        const isExpanded = sidebar.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        
        console.log('Mobile menu ' + (isExpanded ? 'opened' : 'closed'));
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        // Only run on mobile screens (less than 992px)
        if (window.innerWidth <= 992) {
            const isSidebarActive = sidebar.classList.contains('active');
            const clickedInsideSidebar = sidebar.contains(event.target);
            const clickedMenuButton = mobileMenuBtn.contains(event.target);
            
            // Close sidebar if clicking outside and it's active
            if (isSidebarActive && !clickedInsideSidebar && !clickedMenuButton) {
                sidebar.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Auto-close sidebar on larger screens
        if (window.innerWidth > 992) {
            sidebar.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// ========== CONTENT CARD INTERACTIONS ==========
/**
 * Adds hover effects and click interactions to content cards
 */
function initCardInteractions() {
    // Get all content cards
    const contentCards = document.querySelectorAll('.content-card');
    
    // Check if cards exist
    if (contentCards.length === 0) {
        console.log('No content cards found.');
        return;
    }
    
    // Add event listeners to each card
    contentCards.forEach((card, index) => {
        // Add click event for navigation (placeholder)
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title')?.textContent || 'Unknown Title';
            console.log(`Clicked on: ${title}`);
            
            // In a real application, you would navigate to the content page
            // window.location.href = `/watch/${encodeURIComponent(title)}`;
        });
        
        // Add keyboard navigation support
        card.setAttribute('tabindex', '0'); // Make cards focusable
        
        card.addEventListener('keypress', function(event) {
            // Enter or Space key
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click(); // Trigger click event
            }
        });
    });
}

// ========== BUTTON EVENT LISTENERS ==========
/**
 * Adds functionality to various buttons on the page
 */
function initButtonListeners() {
    // Play buttons functionality
    const playButtons = document.querySelectorAll('.btn-play, .mobile-btn-play');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contentTitle = this.closest('.hero-content, .mobile-hero-content')
                ?.querySelector('h1')?.textContent || 'Content';
            
            console.log(`Playing: ${contentTitle}`);
            alert(`Now playing: ${contentTitle}`);
            
            // In a real application, you would start video playback here
            // videoPlayer.play(contentId);
        });
    });
    
    // Info buttons functionality
    const infoButtons = document.querySelectorAll('.btn-info, .mobile-btn-info');
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contentTitle = this.closest('.hero-content, .mobile-hero-content')
                ?.querySelector('h1')?.textContent || 'Content';
            
            console.log(`Showing info for: ${contentTitle}`);
            alert(`More information about: ${contentTitle}`);
            
            // In a real application, you would show a modal with content details
            // showContentModal(contentId);
        });
    });
    
    // Search icon functionality
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            console.log('Search clicked');
            
            // In a real application, you would show a search bar
            // showSearchBar();
            
            // For now, just focus on a search input if it exists
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            } else {
                alert('Search functionality would open here.');
            }
        });
    }
    
    // Notifications icon functionality
    const notificationsIcon = document.querySelector('.notifications-icon');
    if (notificationsIcon) {
        notificationsIcon.addEventListener('click', function() {
            console.log('Notifications clicked');
            alert('You have 3 new notifications.');
            
            // In a real application, you would show a notifications dropdown
            // showNotificationsDropdown();
        });
    }
}

// ========== RESPONSIVE BEHAVIOR ==========
/**
 * Handles additional responsive behaviors
 */
function initResponsiveBehavior() {
    // Check initial screen size
    checkScreenSize();
    
    // Listen for screen resize
    window.addEventListener('resize', checkScreenSize);
    
    // User profile click (for mobile)
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // On mobile, show user menu options
            if (window.innerWidth <= 768) {
                console.log('User profile clicked on mobile');
                alert('User menu would open here.');
            }
        });
    }
}

// ========== SCREEN SIZE CHECK ==========
/**
 * Checks current screen size and adjusts UI accordingly
 */
function checkScreenSize() {
    const screenWidth = window.innerWidth;
    
    // Log screen size changes (for debugging)
    if (screenWidth <= 768) {
        console.log('Mobile view active');
    } else if (screenWidth <= 992) {
        console.log('Tablet view active');
    } else {
        console.log('Desktop view active');
    }
}

// ========== ERROR HANDLING ==========
/**
 * Global error handler for better debugging
 */
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

// ========== PERFORMANCE OPTIMIZATION ==========
/**
 * Debounce function to limit how often a function can be called
 * Useful for resize and scroll events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== ACCESSIBILITY ENHANCEMENTS ==========
/**
 * Improves keyboard navigation
 */
document.addEventListener('keydown', function(event) {
    // Close sidebar with Escape key
    if (event.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    }
});