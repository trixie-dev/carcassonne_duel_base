export const getAssetPath = (filename) => {
  const path = `/assets/tiles/${filename}`;
  console.log("Loading asset:", path); // Для дебагу
  return path;
};
