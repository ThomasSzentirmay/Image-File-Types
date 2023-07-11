document.addEventListener('DOMContentLoaded', function() {

    const convertBtn = document.getElementById('convertBtn');
    convertBtn.addEventListener('click', convertImage);
  
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', downloadImage);
    }
  });
  
  function convertImage() {
    const fileInput = document.getElementById('imageFile');
    const file = fileInput.files[0];
  
    if (!file) {
      alert('Please select an image file.');
      return;
    }
  
    const formatSelect = document.getElementById('formatSelect');
    const format = formatSelect.value;
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
  
        const convertedImageData = canvas.toDataURL(`image/${format}`);
        const outputImage = document.getElementById('outputImage');
        outputImage.src = convertedImageData;

      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
  
  function downloadImage() {
    const outputImage = document.getElementById('outputImage');
    const imageSrc = outputImage.src;
  
    const link = document.createElement('a');
    link.href = imageSrc;

    const fileName = imageSrc.substring(imageSrc.lastIndexOf('/') + 1);
    link.download = fileName;
    link.click();
  }
  