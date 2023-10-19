// models/image.js
function addImage(userId, image, annotation) {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    const newImage = { userId, image, annotation };
    images.push(newImage);
    localStorage.setItem('images', JSON.stringify(images));
  }
  
  function getImages(userId) {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    return images.filter(image => image.userId === userId);
  }
  
  module.exports = { addImage, getImages };
  