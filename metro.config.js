const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
    // Get the default Metro configuration
    const defaultConfig = await getDefaultConfig();


    return {
        resolver: {

            assetExts: [...defaultConfig.resolver.assetExts, 'db'],
        },
        transformer: {

            babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
        },
        server: {

            port: 8080,
        },
    };
})();