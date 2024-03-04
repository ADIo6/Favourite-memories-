window.addEventListener('DOMContentLoaded', async function () {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        window.location.href = 'index.html';
    }
    else {
        populateUserProfile(userData);
        fetch(`http://localhost:8080/api/user/${userData.id}/images`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched user images:', data);
                // Process your images here. For example, display them on the page.
                populateMasonryGrid(data);

            })
            .catch(error => {
                
    const grid = document.getElementById('imageGrid');
    grid.innerHTML = ''; 
        grid.textContent = "No Images found, go to image section to upload your images.."
                console.error('There has been a problem with your fetch operation:', error);
            });

    }
});
signout = document.getElementById('signout');
signout.addEventListener('click', function () {
    fetch(`http://localhost:8080/api/auth/signout`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {

            localStorage.removeItem('isSignedIn');
            localStorage.removeItem('userData');
            window.location.href = 'index.html';
            console.log('Fetched user images:', data);
            // Process your images here. For example, display them on the page.

        })
        .catch(error => {

            localStorage.removeItem('isSignedIn');
            localStorage.removeItem('userData');
            window.location.href = 'index.html';
            console.error('There has been a problem with your fetch operation:', error);
        });


});
// Function to render data in the browser
function populateUserProfile(user) {
    const userName = document.getElementById('user-name');
    const userNameSidebar = document.getElementById('user-name-sidebar');
    const userEmail = document.getElementById('user-email');
    // const userGender = document.getElementById('user-gender');

    // Populate the user profile fields
    userName.textContent = user.username;
    userNameSidebar.textContent = user.username;
    userEmail.textContent = user.email;
    // userGender.textContent = user.gender;
    const username = encodeURIComponent(user.username); // Encode the username
    // const userProfilePic = document.getElementById('user-profile-pic');

    /*  if (userProfilePic) {
         userProfilePic.src = `https://eu.ui-avatars.com/api/?name=${username}&size=250`;
     } else {
         console.error("Element with ID 'user-profile-pic' not found.");
     } */
}
function populateMasonryGrid(images) {

    const grid = document.getElementById('imageGrid');
    grid.innerHTML = ''; // Clear existing content

    // Define your classes in the order you want them to be applied
    const classes = ['tall', 'wide', 'big'];
    let index = 0; // Start with the first class

    images.forEach(image => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = image.imageUrl;
        img.alt = 'User Image';

        // Apply a class from the array and increment the index
        div.className = classes[index % classes.length];
        index++;

        div.appendChild(img);
        grid.appendChild(div);
    });
}
