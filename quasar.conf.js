// Configuration for your app

module.exports = function (ctx) {
  return {
    // sapp plugins (/src/plugins)
    plugins: ['axios'],
    css: ['app.styl'],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    vendor: {
      add: [],
      remove: [],
    },
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/,
        });
      },
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QChatMessage',
        'QScrollArea',
        'QInput',
        'QItemSeparator',
        'QSpinnerDots',
      ],
      directives: ['Ripple'],
      // Quasar plugins
      plugins: ['Notify', 'AddressbarColor'],
    },
    // animations: 'all' --- includes all animations
    animations: ['slideInUp', 'fadeIn'],
    pwa: {
      cacheExt:
        'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        // name: 'Quasar App',
        short_name: 'Zeebot',
        description: 'Zeebot PWA',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        permissions: {
          'audio-capture': {
            description: 'Audio capture',
          },
          'speech-recognition': {
            description: 'Speech recognition',
          },
        },
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack(cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.3',
  };
};
