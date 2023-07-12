window.onload = function () {
  // Initialize FilePond instance
  const imageFileInput = document.querySelector("#imageFile");
  const pond = FilePond.create(imageFileInput);

  // Get other elements
  const convertBtn = document.querySelector("#convertBtn");
  const formatSelect = document.querySelector("#formatSelect");

  // Convert button click event handler
  convertBtn.addEventListener("click", function () {
    const file = pond.getFile();
    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const format = formatSelect.value;

    file.convert(
      "image/png",
      { type: `image/${format}`, quality: 0.8 },
      (convertedFile) => {
        const convertedImageData = URL.createObjectURL(convertedFile);
        const outputImage = document.querySelector("#outputImage");
        if (outputImage) {
          outputImage.src = convertedImageData;
        }
      }
    );
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
};