// Accessibility enhancements for WCAG 2.1 compliance

document.addEventListener('DOMContentLoaded', function() {
    // Skip to main content link
    addSkipToMainLink();
    
    // Keyboard navigation enhancements
    enhanceKeyboardNavigation();
    
    // Focus management
    manageFocus();
    
    // ARIA live regions for dynamic content
    setupLiveRegions();
    
    // High contrast mode detection
    detectHighContrastMode();
    
    // Screen reader announcements
    setupScreenReaderAnnouncements();
});

function addSkipToMainLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-main visually-hidden-focusable';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

function enhanceKeyboardNavigation() {
    // Add keyboard support for custom interactive elements
    const interactiveElements = document.querySelectorAll('[data-interactive]');
    
    interactiveElements.forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Escape key to close modals/dropdowns
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            });
            
            const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
}

function manageFocus() {
    // Focus management for single-page app navigation
    const originalFocus = document.activeElement;
    
    // Focus first heading when navigating to new page
    function focusFirstHeading() {
        const firstHeading = document.querySelector('h1, h2, h3, h4, h5, h6');
        if (firstHeading) {
            firstHeading.setAttribute('tabindex', '-1');
            firstHeading.focus();
        }
    }
    
    // Focus management for modals
    document.addEventListener('shown.bs.modal', function(e) {
        const modal = e.target;
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    });
    
    // Trap focus within modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const modal = document.querySelector('.modal.show');
            if (modal) {
                trapFocus(e, modal);
            }
        }
    });
}

function trapFocus(e, container) {
    const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        }
    } else {
        if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
}

function setupLiveRegions() {
    // Create ARIA live regions for dynamic content updates
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'visually-hidden';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
    
    // Function to announce messages to screen readers
    window.announceToScreenReader = function(message) {
        const liveRegion = document.getElementById('live-region');
        liveRegion.textContent = message;
        
        // Clear after announcement
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
}

function detectHighContrastMode() {
    // Detect Windows high contrast mode
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
    
    // Listen for changes
    window.matchMedia('(prefers-contrast: high)').addEventListener('change', function(e) {
        if (e.matches) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    });
}

function setupScreenReaderAnnouncements() {
    // Announce page changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const addedNode = mutation.addedNodes[0];
                if (addedNode.nodeType === Node.ELEMENT_NODE) {
                    const heading = addedNode.querySelector('h1, h2, h3');
                    if (heading) {
                        announceToScreenReader(`Navigated to ${heading.textContent}`);
                    }
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Announce form validation errors
    document.addEventListener('invalid', function(e) {
        const field = e.target;
        const label = document.querySelector(`label[for="${field.id}"]`);
        const fieldName = label ? label.textContent : field.name || 'Field';
        
        announceToScreenReader(`${fieldName} has an error: ${field.validationMessage}`);
    }, true);
    
    // Announce successful form submissions
    document.addEventListener('submit', function(e) {
        const form = e.target;
        if (form.checkValidity()) {
            announceToScreenReader('Form submitted successfully');
        }
    });
}