export const getAssetPath = (filename) => {
  const path = `/assets/tiles/${filename}`;
  console.log("Attempting to load asset:", path);

  // Перевіряємо, чи файл існує (тільки для розробки)
  if (process.env.NODE_ENV === "development") {
    fetch(path)
      .then((response) => {
        console.log(`Asset ${path} status:`, response.status);
      })
      .catch((error) => {
        console.error(`Error loading ${path}:`, error);
      });
  }

  return path;
};
