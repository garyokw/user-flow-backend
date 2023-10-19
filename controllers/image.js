// controllers/image.js
let images = [];

function uploadImage(userId, image, annotation) {
    // Create a new canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Create a new image element
    const img = new Image();
    img.src = image;
  
    // Wait for the image to load
    img.onload = () => {
      // Calculate the new dimensions
      const scaleFactor = Math.min(1, 800 / img.width, 800 / img.height);
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;
  
      // Draw the resized image onto the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
      // Get the compressed image as a Base64 string
      const compressedImage = canvas.toDataURL('image/jpeg', 0.8);
  
      // Add the compressed image to the list
      const newImage = { id: images.length + 1, userId, image: compressedImage, annotation };
      images.push(newImage);
      
      // Save to localStorage
      localStorage.setItem('images', JSON.stringify(images));
    };
  }

  function getImages(userId) {
    // Get images from localStorage
    const images = JSON.parse(localStorage.getItem('images')) || [];
    
    // Return list of user's images
    return images.filter(image => image.userId === userId);
  }

module.exports = { uploadImage, getImages };
