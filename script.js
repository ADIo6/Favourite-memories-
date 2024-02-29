// // scripts.js
// // alert("Welcome to relive your best memories")
// document.addEventListener('DOMContentLoaded', function () {
//     // Function to display images in mosaic formation
//     function displayImages(images) {
//         const mosaicContainer = document.getElementById('mosaic');
//         mosaicContainer.innerHTML = ''; // Clear previous images

//         images.forEach(image => {
//             // Create image element
//             const img = document.createElement('img');
//             img.src = image.url;
//             img.alt = image.alt;

//             // Append image to mosaic container
//             mosaicContainer.appendChild(img);
//         });
//     }

//     // Function to handle image upload
//     function uploadImage(file) {
//         // Simulate uploading image to server (replace with actual code)
//         setTimeout(() => {
//             const imageUrl = 'path/to/uploaded/image'; // Replace with actual URL of uploaded image
//             const imageAlt = 'Uploaded Image'; // Replace with appropriate alt text
//             const uploadedImage = { url: imageUrl, alt: imageAlt };
//             displayImages([uploadedImage]); // Display uploaded image
//         }, 1000); // Simulate delay of 1 second for upload process
//     }

//     // Event listener for image upload form submission
//     const uploadForm = document.getElementById('upload-form');
//     uploadForm.addEventListener('submit', function (event) {
//         event.preventDefault(); // Prevent form submission
//         const imageFile = document.getElementById('image-file').files[0];
//         if (imageFile) {
//             uploadImage(imageFile); // Call function to handle image upload
//         } else {
//             alert('Please select an image to upload.');
//         }
//     });

//     // Function to fetch randomly selected user-uploaded images (simulate data)
//     function fetchRandomImages() {
//         // Simulate fetching images from server (replace with actual code)
//         const images = [
//             { url: 'path/to/image1', alt: 'Image 1' },
//             { url: 'path/to/image2', alt: 'Image 2' },
//             { url: 'path/to/image3', alt: 'Image 3' },
//             // Add more image objects as needed
//         ];
//         displayImages(images); // Display randomly selected images
//     }

//     // Call function to fetch and display randomly selected images on landing page
//     fetchRandomImages();
// });
document.getElementById('imageInput').addEventListener('change', handleImageSelect);

//   const canvas = document.createElement('canvas'); // Create a canvas element
//   const context = canvas.getContext('2d'); // Get canvas context
function handleImageSelect(event) {
  const files = event.target.files;
  const mosaicContainer = document.getElementById('mosaicContainer');
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const imgSrc = e.target.result;
      const img = document.createElement('img');
      img.src = imgSrc;
      img.classList.add('mosaic-image');
      mosaicContainer.appendChild(img);


      }
        
    reader.readAsDataURL(file);
  }
}
