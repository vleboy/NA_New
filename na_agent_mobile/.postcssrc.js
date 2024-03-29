// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": { 
      utf8: false 
    },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": { 
      viewportWidth: 750,
      viewportHeight: 1334, 
      unitPrecision: 3,  
      viewportUnit: 'vw', 
      selectorBlackList: ['.ignore', '.hairlines', '.picker', '.picker-toolbar', 'mint-datetime-action'],
      minPixelValue: 1, 
      mediaQuery: false
    },
    "postcss-viewport-units":{},
    "cssnano": { 
      preset: "advanced", 
      autoprefixer: false, 
      "postcss-zindex": false 
    }
  }
}
