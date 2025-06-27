const IMAGE_CONFIGS = {
  logo: { width: 300, height: 300, quality: 0.9, keepAspectRatio: true },
  banner: { width: 1920, height: 800, quality: 0.85, keepAspectRatio: false },
  gallery: { width: 800, height: 600, quality: 0.8, keepAspectRatio: false },
};

export const resizeImage = (
  file: File,
  type: keyof typeof IMAGE_CONFIGS
): Promise<File> => {
  const config = IMAGE_CONFIGS[type];

  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    if (!ctx) {
      reject(new Error("Canvas context not available"));
      return;
    }

    img.onload = () => {
      let { width, height } = img;
      const {
        width: maxWidth,
        height: maxHeight,
        keepAspectRatio,
        quality,
      } = config;

      if (keepAspectRatio) {
        // Maintain aspect ratio (good for logos)
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        if (ratio < 1) {
          // Only resize if image is larger than target
          width *= ratio;
          height *= ratio;
        }
      } else {
        // Fit within bounds while maintaining aspect ratio
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        if (ratio < 1) {
          // Only resize if image is larger than target
          width *= ratio;
          height *= ratio;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw image with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create blob"));
            return;
          }

          // Create a new File object with updated extension for WebP
          const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
          const resizedFile = new File([blob], `${fileNameWithoutExt}.webp`, {
            type: "image/webp",
            lastModified: Date.now(),
          });

          resolve(resizedFile);
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = URL.createObjectURL(file);
  });
};
