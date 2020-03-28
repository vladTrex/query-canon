const path = require('path');
const reactAppRewireBuildDev = require('react-app-rewire-build-dev');

const options = {
    outputPath: path.join(__dirname, './src')
};

module.exports = function override(config, env) {
    return reactAppRewireBuildDev(config, env, options);
};