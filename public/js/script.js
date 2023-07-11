window.onload = function () {
  const convertBtn = document.querySelector("#convertBtn");
  if (convertBtn) {
    convertBtn.addEventListener("click", convertImage);
  }

  const downloadBtn = document.querySelector("#downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadImage);
  }
};

function convertImage() {
  const fileInput = document.querySelector("#imageFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image file.");
    return;
  }

  const formatSelect = document.querySelector("#formatSelect");
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
      } else {
        alert("Error: Unable to find the output image element.");
      }
    };
    img.onerror = function () {
      alert("Error: Failed to load the image file.");
    };
    img.src = event.target.result;
  };
  reader.onerror = function () {
    alert("Error: Failed to read the image file.");
  };
  reader.readAsDataURL(file);
}

function downloadImage() {
  const outputImage = document.querySelector("#outputImage");
  if (!outputImage) {
    return;
  }

  const link = document.createElement("a");
  link.href = outputImage.src;
  link.download = "converted_image.jpg";
  link.click();
}
