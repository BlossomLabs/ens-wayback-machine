import { extendTheme } from '@chakra-ui/react';
import { cardAnatomy, inputAnatomy, modalAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const modalTheme = () => {
  const { definePartsStyle, defineMultiStyleConfig } =
      createMultiStyleConfigHelpers(modalAnatomy.keys)
  return defineMultiStyleConfig({
    baseStyle: definePartsStyle({
      dialog: {
        borderRadius: 'lg',
        bg: 'primary.100',
      }
    })
  })
}

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
          bg: 'rgba(193, 143, 101, 0.9)',
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
      element: {
        height: '100%', // center vertically
      },
      field: {
        fontFamily: 'Edu QLD Beginner',
        borderColor: 'black',
        _hover: {
          borderColor: 'black',
        },
        _placeholder: {
          color: 'black',
          opacity: 1,
          fontFamily: 'Edu QLD Beginner',
        },
        _focusVisible: {
          opacity: 1,
          fontFamily: 'Edu QLD Beginner',
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
    heading: 'Megrim',
    body: 'Edu QLD Beginner',
  },
  components: {
    Box: {
      variants: {
        semiTransparent: {
          bg: 'rgba(193, 143, 101, 0.9)',
          borderRadius: '8px',
          p: 4,
        },
      },
    },
    Modal: modalTheme(),
    Card: cardTheme(),
    Heading: {
      baseStyle: {
        fontFamily: 'Megrim',
        fontWeight: 'extrabold',
        textShadow:
          '1px 1px 0px rgb(0, 0, 0), 0px 1px 0px rgb(0, 0, 0)',
      },
    },
    Text: {
      baseStyle: {
        fontFamily: 'Edu QLD Beginner',
        fontWeight: 'extrabold',
      },
    },
    Input: inputTheme(),
  },
});

export default theme;
