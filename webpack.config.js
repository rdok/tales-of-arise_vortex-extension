const webpack = require("vortex-api/bin/webpack").default;

module.exports = {
  ...webpack("tales-of-arise", __dirname, 5),
};
