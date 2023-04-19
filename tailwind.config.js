/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },

    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui',],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular', ],
      'display': ['Oswald', ],
      'body': ['proxima nova'  ],
    },
    
    colors: {
      'blue': '#1fb6ff',
      'skyblue': '#00a8ff',
      'purple': '#706fd3',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'upperorange': '#ff793f',
      'uppergreen': '#33d9b2',
      'luckypoint':'#2c2c54',
      'upperblue':'#474787',
      'green': '#9aca3c',
      'green2': '#0b301a',
      'deepgreen':'#86b12f',
      'lightgreen': '#9dd970',
      'yellow': '#ffb142',
      'gray-dark': '#101011',
      'dark': '#24252d',
      'gray': '#8492a6',
      'graylight': '#30313d',
      'black' : '#0f150f',
      'notblack': '#282828',
      'red': '#ff5252',
      'redflower': '#e84118',
      'white': '#f5f6fa',
      'deepwhite': '#eaeaea',
      'soda': '#7f8fa6',
    },
    screens: {
      'sm': '250px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ]
}
