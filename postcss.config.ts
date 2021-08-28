const tailwindConfig = require("./config/tailwind");

module.exports = {
  plugins: {
    tailwindcss: { config: tailwindConfig },
    autoprefixer: {},
  },
};
