/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#222224',
        hdr: '#ad0c24',
        txt: '#6C757D',
        crbg: '#23232b'
      },
      backgroundImage : {
        'jsTips' : '',
        'myExp' : 'url(https://us.123rf.com/450wm/fizkes/fizkes1802/fizkes180200202/95238950-afro-am%C3%A9ricain-fatigu%C3%A9-homme-d-affaires-priv%C3%A9-de-sentiment-de-manque-de-sommeil-ayant-une-sieste-au-.jpg)'
      }
    },
    
  },
  plugins: [],
}
