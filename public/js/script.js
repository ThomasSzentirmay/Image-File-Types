import * as FilePond from 'filepond';

document.addEventListener("DOMContentLoaded", function () {
  // Initialize FilePond instance
  const imageFileInput = document.querySelector("#imageFile");
  FilePond.create(imageFileInput);

  const convertBtn = document.querySelector("#convertBtn");
  const formatSelect = document.querySelector("#formatSelect");

  convertBtn.addEventListener("click", function () {
    const file = imageFileInput.files[0];
    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const format = formatSelect.value;

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);

        const convertedImageData = canvas.toDataURL(`image/${format}`);
        const outputImage = document.querySelector("#outputImage");
        if (outputImage) {
          outputImage.src = convertedImageData;
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  const downloadBtn = document.querySelector("#downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      const outputImage = document.querySelector("#outputImage");
      if (!outputImage) {
        return;
      }

      const link = document.createElement("a");
      link.href = outputImage.src;
      link.download = "converted_image.jpg";
      link.click();
    });
  }
});