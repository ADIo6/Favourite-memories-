
// document.getElementById('imageInput').addEventListener('change', handleImageSelect);

// //   const canvas = document.createElement('canvas'); // Create a canvas element
// //   const context = canvas.getContext('2d'); // Get canvas context
// function handleImageSelect(event) {
//   const files = event.target.files;
//   const mosaicContainer = document.getElementById('mosaicContainer');
  
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     const reader = new FileReader();
    
//     reader.onload = function(e) {
//       const imgSrc = e.target.result;
//       const img = document.createElement('img');
//       img.src = imgSrc;
//       img.classList.add('mosaic-image');
//       mosaicContainer.appendChild(img);


//       }
        
//     reader.readAsDataURL(file);
//   }
// }

document.getElementById('imageInput').addEventListener('change', handleImageSelect);

function handleImageSelect(event) {
  const files = event.target.files;
  const imageContainer = document.getElementById('imageContainer');

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function(e) {
      const imgSrc = e.target.result;

      // Prompt user for image title
      const title = prompt("Enter a title for this image:");

      // Create image item with title
      const imageItem = document.createElement('div');
      imageItem.classList.add('imageItem');
      const img = document.createElement('img');
      img.src = imgSrc;
      imageItem.appendChild(img);
      const titleElem = document.createElement('p');
      titleElem.textContent = title || "Untitled"; // If no title provided, set it to "Untitled"
      imageItem.appendChild(titleElem);

      imageContainer.appendChild(imageItem);
    };

    reader.readAsDataURL(file);
  }
}