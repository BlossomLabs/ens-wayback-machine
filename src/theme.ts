import { extendTheme } from '@chakra-ui/react';
import { cardAnatomy, inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const cardTheme = () => {
  const { definePartsStyle, defineMultiStyleConfig } =
      createMultiStyleConfigHelpers(cardAnatomy.keys)
  return defineMultiStyleConfig({
    baseStyle: definePartsStyle({
      container: {
        borderRadius: 'lg',
        p: 2,
        bg: 'transparent',
      }
    }),
    variants: {
      semiTransparent: definePartsStyle({
        container: {
          bg: 'rgba(242, 193, 133, 0.5)',
        }
      }),
    }
  })
}

const inputTheme = () => {
  const { definePartsStyle, defineMultiStyleConfig } =
      createMultiStyleConfigHelpers(inputAnatomy.keys)
  return defineMultiStyleConfig({
    baseStyle: definePartsStyle({
      field: {
        fontFamily: 'Caveat',
        fontWeight: 'extrabold',
        fontSize: '25px',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        borderColor: 'black',
        _hover: {
          borderColor: 'black',
        },
        _placeholder: {
          color: 'black',
          opacity: 1,
          fontFamily: 'Amatic SC',
          fontWeight: 'extrabold',
          fontSize: '25px',
        },
        _focusVisible: {
          outline: 'none',
        },
      }
    })
  })
}

const theme = extendTheme({
  styles: {
    global: {
      body: {
        overflowX: 'hidden',
        backgroundImage: "url('./bg.png')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      },
    },
  },
  colors: {
    primary: {
      100: '#CAA9A5',
      200: '#C39C98',
      300: '#BB908B',
      400: '#b4847e',
      500: '#ac7872',
      600: '#a46b65',
      700: '#9a615b',
      800: '#8d5953',
      900: '#81514B',
    },
    secondary: {
      100: '#F7DAB5',
      200: '#F5D1A3',
      300: '#F3C891',
      400: '#F1BF7E',
      500: '#EFB66C',
      600: '#EDAD5A',
      700: '#EBA448',
      800: '#E99B36',
      900: '#E79224',
    },
  },
  fonts: {
    heading: 'Amatic SC',
    body: 'Caveat',
  },
  components: {
    Box: {
      variants: {
        semiTransparent: {
          bg: 'rgba(242, 193, 133, 0.5)',
          borderRadius: '20px',
          p: 4,
        },
      },
    },
    Card: cardTheme(),
    Heading: {
      baseStyle: {
        fontFamily: 'Amatic SC',
        fontWeight: 'extrabold',
        textShadow:
          '1px 1px 2px rgba(0, 0, 0, 0.5), 2px 2px 2px rgba(255, 255, 255, 1)',
      },
    },
    Text: {
      baseStyle: {
        fontFamily: 'Caveat',
        fontWeight: 'extrabold',
        textShadow:
          '1px 1px 2px rgba(0, 0, 0, 0.5), 2px 2px 2px rgba(255, 255, 255, 1)',
      },
    },
    Input: inputTheme(),
  },
});

export default theme;
