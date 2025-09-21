// Account Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const accountBtn = document.getElementById('account-btn');
    const accountModal = document.getElementById('account-modal');
    const closeModal = document.querySelector('.close-modal');
    const accountOptions = document.querySelectorAll('.account-option-btn');
    const formSwitches = document.querySelectorAll('.form-switch a');
    
    // Open modal when account button is clicked
    if (accountBtn) {
        accountBtn.addEventListener('click', function(e) {
            e.preventDefault();
            accountModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    // Close modal when X is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            accountModal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
            resetForms();
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === accountModal) {
            accountModal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
            resetForms();
        }
    });
    
    // Handle account option clicks
    accountOptions.forEach(option => {
        option.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            showForm(action);
        });
    });
    
    // Handle form switch links (e.g., "Don't have an account?")
    formSwitches.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            showForm(action);
        });
    });
    
    // Password validation for registration form
    const registerPassword = document.getElementById('register-password');
    if (registerPassword) {
        registerPassword.addEventListener('input', validatePassword);
    }
    
    // Form submission handlers
    const loginForm = document.querySelector('#login-form form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.querySelector('#register-form form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
    
    // Function to show the appropriate form
    function showForm(formName) {
        // Hide all forms
        document.querySelectorAll('.account-form').forEach(form => {
            form.classList.add('hidden');
        });
        
        // Show the requested form
        document.getElementById(`${formName}-form`).classList.remove('hidden');
    }
    
    // Function to reset all forms to initial state
    function resetForms() {
        // Hide all forms
        document.querySelectorAll('.account-form').forEach(form => {
            form.classList.add('hidden');
        });
        
        // Reset form inputs
        document.querySelectorAll('form').forEach(form => {
            form.reset();
        });
        
        // Reset password validation
        resetPasswordValidation();
    }
    
    // Function to validate password
    function validatePassword() {
        const password = registerPassword.value;
        const requirements = {
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            length: password.length >= 8
        };
        
        // Update requirement indicators
        document.querySelector('.req-upper').classList.toggle('valid', requirements.upper);
        document.querySelector('.req-lower').classList.toggle('valid', requirements.lower);
        document.querySelector('.req-number').classList.toggle('valid', requirements.number);
        document.querySelector('.req-length').classList.toggle('valid', requirements.length);
    }
    
    // Function to reset password validation
    function resetPasswordValidation() {
        document.querySelectorAll('.password-requirements li').forEach(item => {
            item.classList.remove('valid');
        });
    }
    
    // Function to handle login form submission
    function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simple validation
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate login process
        showNotification('Logging in...', 'success');
        
        // In a real application, you would make an API call here
        setTimeout(() => {
            showNotification('Login successful!', 'success');
            accountModal.style.display = 'none';
            document.body.style.overflow = '';
            
            // Update UI to show user is logged in
            updateUserStatus(true);
        }, 1500);
    }
    
    // Function to handle registration form submission
    function handleRegistration(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;
        const terms = document.getElementById('terms-agree').checked;
        
        // Simple validation
        if (!name || !email || !password || !confirm) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirm) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (!terms) {
            showNotification('Please agree to the terms and conditions', 'error');
            return;
        }
        
        // Check password strength
        const passwordStrong = /[A-Z]/.test(password) && 
                              /[a-z]/.test(password) && 
                              /[0-9]/.test(password) && 
                              password.length >= 8;
        
        if (!passwordStrong) {
            showNotification('Password does not meet requirements', 'error');
            return;
        }
        
        // Simulate registration process
        showNotification('Creating account...', 'success');
        
        // In a real application, you would make an API call here
        setTimeout(() => {
            showNotification('Account created successfully!', 'success');
            accountModal.style.display = 'none';
            document.body.style.overflow = '';
            
            // Update UI to show user is logged in
            updateUserStatus(true);
        }, 1500);
    }
    
    // Function to update UI based on login status
    function updateUserStatus(loggedIn) {
        if (loggedIn) {
            // Change account icon to indicate logged in state
            const accountIcon = document.querySelector('#account-btn i');
            accountIcon.classList.remove('fa-user');
            accountIcon.classList.add('fa-user-check');
            
            // You could also add a username display, etc.
        }
    }
    
    // Helper function to show notifications
    function showNotification(message, type = 'success') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '5px';
        notification.style.color = 'white';
        notification.style.zIndex = '1001';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        notification.style.transition = 'all 0.3s ease';
        
        // Set background color based on type
        if (type === 'error') {
            notification.style.background = '#e74c3c';
        } else {
            notification.style.background = 'var(--accent)';
        }
        
        // Add to document
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
});