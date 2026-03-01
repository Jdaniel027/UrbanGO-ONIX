module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Con reanimated v4 el plugin cambió a worklets
      "react-native-worklets/plugin",
    ],
  };
};
