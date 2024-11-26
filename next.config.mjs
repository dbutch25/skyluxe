const { withPlausibleProxy } = require('next-plausible')

export default withPlausibleProxy()({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '',
                pathname: '/**',
            },
        ],
    },
});
