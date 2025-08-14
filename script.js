// Form validation and UI enhancements for Formspree.io
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Basic validation
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const message = contactForm.querySelector('#message').value;
            
            if (!name || !email || !message) {
                e.preventDefault();
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                e.preventDefault();
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Let Formspree handle the actual submission
            // Reset button state after submission (handled by page reload)
        });
        
        // Check for Formspree success/error in URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('success')) {
            showMessage('Thank you! Your message has been sent successfully.', 'success');
        } else if (urlParams.has('error')) {
            showMessage('Sorry, there was an error sending your message.', 'error');
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 12px 16px;
            margin: 16px 0;
            border-radius: 4px;
            font-weight: 500;
            max-width: 100%;
            box-sizing: border-box;
        `;
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        } else {
            messageDiv.style.backgroundColor = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '1px solid #f5c6cb';
        }
        
        // Insert message after the form
        contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
        
        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Add some basic styling for form inputs
    const style = document.createElement('style');
    style.textContent = `
        .contact-form input:focus,
        .contact-form textarea:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
        
        .contact-form input.error,
        .contact-form textarea.error {
            border-color: #dc3545;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }
    `;
    document.head.appendChild(style);
});
