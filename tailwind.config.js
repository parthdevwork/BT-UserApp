/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'montserrat-100': 'Montserrat_100Thin',
      'montserrat-200': 'Montserrat_200ExtraLight',
      'montserrat-300': 'Montserrat_300Light',
      'montserrat-400': 'Montserrat_400Regular',
      'montserrat-500': 'Montserrat_500Medium',
      'montserrat-600': 'Montserrat_600SemiBold',
      'montserrat-700': 'Montserrat_700Bold',
      'montserrat-800': 'Montserrat_800ExtraBold',
      'montserrat-900': 'Montserrat_900Black',
      'montserrat-100-italic': 'Montserrat_100Thin_Italic',
      'montserrat-200-italic': 'Montserrat_200ExtraLight_Italic',
      'montserrat-300-italic': 'Montserrat_300Light_Italic',
      'montserrat-400-italic': 'Montserrat_400Regular_Italic',
      'montserrat-500-italic': 'Montserrat_500Medium_Italic',
      'montserrat-600-italic': 'Montserrat_600SemiBold_Italic',
      'montserrat-700-italic': 'Montserrat_700Bold_Italic',
      'montserrat-800-italic': 'Montserrat_800ExtraBold_Italic',
      'montserrat-900-italic': 'Montserrat_900Black_Italic',
      'inter-100': 'Inter_100Thin',
      'inter-200': 'Inter_200ExtraLight',
      'inter-300': 'Inter_300Light',
      'inter-400': 'Inter_400Regular',
      'inter-500': 'Inter_500Medium',
      'inter-600': 'Inter_600SemiBold',
      'inter-700': 'Inter_700Bold',
      'inter-800': 'Inter_800ExtraBold',
      'inter-900': 'Inter_900Black',
    },
    extend: {
      fontSize: {
        'xs2': 10,
        '3xs': 6,
        '4xs': 4,
      },
    },
  },
  plugins: [],
}

