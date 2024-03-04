const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const messageDiv = document.getElementById('message');

signUpButton.addEventListener('click', () => container.classList.add("right-panel-active"));
signInButton.addEventListener('click', () => container.classList.remove("right-panel-active"));

function showMessage(message, timeout = 3000) {
    messageDiv.hidden = false;
    messageDiv.textContent = message;
    setTimeout(() => messageDiv.hidden = true, timeout);
}

async function handleFormSubmission(event, formType) {
    event.preventDefault();
    const formElements = formType === 'signup' ? { username: 'username-signup', password: 'password-signup', email: 'email' } : { username: 'username', password: 'password' };
    const userInfo = {
        username: document.getElementById(formElements.username).value,
        password: document.getElementById(formElements.password).value,
        ...(formType === 'signup' && { email: document.getElementById(formElements.email).value })
    };

    if (formType === 'signup' && (userInfo.username.length < 6 || userInfo.password.length < 8)) {
        showMessage('Username and password have minimum length requirements');
        return;
    }

    showMessage(formType === 'signup' ? 'Creating account...' : 'Signing in...');

    try {
        const response = await fetch(`http://localhost:8080/api/auth/${formType}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo)
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(formType === 'signup' ? 'User registered successfully!' : 'Signed in successfully!');
            handleSuccessfulAuth(formType, data);
        } else {
            showMessage(data.message || `Error during ${formType}`);
            clearAuthData();
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage(`${formType.charAt(0).toUpperCase() + formType.slice(1)} failed. Please try again.`);
    }
}

function handleSuccessfulAuth(formType, data) {
    if (formType === 'signin') {
        localStorage.setItem('isSignedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(data));
        window.location.href = 'profile.html';
    } else {
        signInButton.click();
        document.getElementById('username-signup').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password-signup').value = '';
    }
}

function clearAuthData() {
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('userData');
}

document.getElementById('signup-form').addEventListener('submit', (event) => handleFormSubmission(event, 'signup'));
document.getElementById('signin-form').addEventListener('submit', (event) => handleFormSubmission(event, 'signin'));
document.addEventListener('DOMContentLoaded', () => {
  const isSignedIn = localStorage.getItem('isSignedIn') === 'true';
  console.log(`User is ${isSignedIn ? 'signed in' : 'not signed in'}`);

  if (isSignedIn) {
      // Set the countdown duration
      let countdown = 3; // 3 seconds for the countdown

      const countdownInterval = setInterval(() => {
          // Update the message to show the countdown
          showMessage(`You will be redirected to your profile page in ${countdown} second(s)...`);

          if (countdown <= 0) {
              clearInterval(countdownInterval); // Stop the countdown
              window.location.href = 'profile.html'; // Redirect to the profile page
          }

          countdown--; // Decrease the countdown
      }, 1000); // Update the countdown every second
  } else {
      // Show a message if the user is not signed in
      setTimeout(() => {
          showMessage('User is not signed in');
      }, 3000);
  }
});
