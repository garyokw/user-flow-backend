// controllers/image.js
let images = [];

function uploadImage(userId, image, annotation) {
  // Add image to the list and start processing
  const newImage = { id: images.length + 1, userId, image, annotation, status: 'enqueued' };
  images.push(newImage);

  // Start processing the image (this is just a simulation)
  setTimeout(() => {
    newImage.status = 'ready';
    newImage.facesDetected = Math.floor(Math.random() * 10); // Random number of faces detected
  }, 5000);

  return newImage.id;
}

function getImages(userId) {
  // Return list of user's images
  return images.filter(image => image.userId === userId);
}

module.exports = { uploadImage, getImages };
