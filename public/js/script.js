window.addEventListener("DOMContentLoaded", function () {
  // Initialize FilePond instance
  const imageFileInput = document.querySelector("#imageFile");
  const pond = FilePond.create(imageFileInput);

  // Get other elements
  const convertBtn = document.querySelector("#convertBtn");
  const formatSelect = document.querySelector("#formatSelect");

  // Convert button click event handler
  convertBtn.addEventListener("click", function () {
    const files = pond.getFiles();
    if (files.length === 0) {
      alert("Please select an image file.");
      return;
    }

    const format = formatSelect.value;

    files.forEach((file) => {
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
      reader.readAsDataURL(file.file);
    });
  });

  // Download button click event handler
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