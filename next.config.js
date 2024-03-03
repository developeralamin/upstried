const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'i1.sndcdn.com',
      'via.placeholder.com',
      'devapi.virtunus.com',
      'lh3.googleusercontent.com',
      'virtunus.s3.ap-southeast-1.amazonaws.com',
      'i.ytimg.com',
      'i.vimeocdn.com',
      'www.youtube.com',
      'soundcloud.com',
      'youtu.be',
      'graph.facebook.com',
      'lh5.googleusercontent.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          },
        ],
      },
    ];
  },
});
