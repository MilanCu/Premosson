const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
    alias({
        '@pages': 'src/pages',
        '@assets': 'src/assets',
        '@services': 'src/services',
        '@config': 'src/config',
    })(config);

    return config;
};