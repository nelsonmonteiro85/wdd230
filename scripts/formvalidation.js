document.addEventListener('DOMContentLoaded', function() {
    // Selecting elements
    let pass1 = document.getElementById('pass1');
    let pass2 = document.getElementById('pass2');
    let email = document.getElementById('email');
    let passwordError = document.getElementById('passwordError');
    let emailError = document.getElementById('emailError');
    let signupForm = document.getElementById('signupForm');
    let successMessage = document.createElement('div');
    successMessage.id = 'successMessage';
    document.body.appendChild(successMessage);

    // Allowed characters pattern for password
    const allowedPattern = /^[a-zA-Z0-9]*$/;

    function validatePasswords() {
        passwordError.textContent = ''; // Clear previous errors
    
        // Check if pass1 is empty
        if (!pass1.value) {
            passwordError.textContent = 'Please enter a password';
            pass1.setCustomValidity('Please enter a password');
            return false;
        }
    
        // Check for allowed characters in pass1
        if (!allowedPattern.test(pass1.value)) {
            passwordError.textContent = 'Password must be alphanumeric (a-z, A-Z, 0-9)';
            pass1.setCustomValidity('Password must be alphanumeric (a-z, A-Z, 0-9)');
            return false;
        }
    
        // Check if pass2 is empty
        if (!pass2.value) {
            passwordError.textContent = 'Please confirm your password';
            pass2.setCustomValidity('Please confirm your password');
            return false;
        }
    
        // Check if passwords match
        if (pass1.value !== pass2.value) {
            passwordError.textContent = 'Passwords do not match';
            pass2.setCustomValidity('Passwords do not match');
            return false;
        }
    
        // If everything is valid
        pass1.setCustomValidity('');
        pass2.setCustomValidity('');
        return true; // Passwords match and are valid
    }

    // Function to validate email format
    function validateEmail() {
        emailError.textContent = ''; // Clear previous errors

        // Check if email is empty
        if (!email.value) {
            emailError.textContent = 'Please enter an email';
            return false;
        }

        // Check if email matches BYUI pattern
        const byuiPattern = /^[a-zA-Z0-9._%+-]+@byui\.edu$/;

        if (!byuiPattern.test(email.value)) {
            emailError.textContent = 'Please enter a valid BYUI email address';
            return false;
        }

        return true; // Email is valid
    }

    // Event listener for form submission
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Validate passwords and email
        if (validatePasswords() && validateEmail()) {
            // Display success message
            successMessage.textContent = 'Congratulations! You\'ve been signed up! Thank you for joining!';
            successMessage.style.color = 'green';

            // Submit the form after a short delay to show the success message
            setTimeout(() => {
                signupForm.submit();
            }, 200);
        }
    });

    // Event listeners for password fields
    pass1.addEventListener('input', validatePasswords);
    pass2.addEventListener('input', validatePasswords);

    // Event listener for email field
    email.addEventListener('input', validateEmail);

    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    if (!darkModeToggle || !body) {
        console.error('Dark mode toggle or body element not found.');
    }

    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = "☀️";
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        darkModeToggle.textContent = "🌙";
        localStorage.removeItem('darkMode');
    }

    // Hamburger menu toggle functionality
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.querySelector('.main-nav');
    const mainContent = document.querySelector('main');

    if (!hamburger || !mainNav || !mainContent) {
        console.error('Hamburger, main nav, or main content element not found.');
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mainNav.classList.toggle('open');

        if (mainNav.classList.contains('open')) {
            mainContent.style.transform = 'translateY(0vh)';
            mainContent.style.transition = 'transform 0.3s ease'; // Smooth transition
        } else {
            mainContent.style.transform = 'translateY(0)';
        }
    });
});
