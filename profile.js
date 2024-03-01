
// Function to fetch data from the server
function fetchData() {
fetch('signup.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        // Once data is received, render it in the browser
        populateUserProfile(data[1]);
    })
    .catch(error => {
        console.error('There was a problem fetching the data:', error);
    });
}

// Function to render data in the browser
function populateUserProfile(user) {
    const userName = document.getElementById('user-name');
    const userNameSidebar = document.getElementById('user-name-sidebar');
    const userEmail = document.getElementById('user-email');
    const userGender = document.getElementById('user-gender');
    const userProfilePic = document.getElementById('user-profile-pic');

    // Populate the user profile fields
    userName.textContent = user.full_name;
    userNameSidebar.textContent = user.full_name;
    userEmail.textContent = user.email;
    userGender.textContent = user.gender;
    const username = encodeURIComponent(user.full_name); // Encode the username

    userProfilePic.src = `https://eu.ui-avatars.com/api/?name=${username}&size=250`;

}


// Call the fetchData function when the page loads
window.onload = fetchData;
