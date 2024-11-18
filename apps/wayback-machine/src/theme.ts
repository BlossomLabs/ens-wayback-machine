import {
  createSystem,
  defaultConfig,
  defineRecipe,
  defineSlotRecipe,
} from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      backgroundColor: "primary.100",
      backgroundImage: "url('./bg.png')",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  },
  theme: {
    tokens: {
      fontSizes: {
        xs: { value: "0.9rem" },
        sm: { value: "1rem" },
        md: { value: "1.1rem" },
      },
      colors: {
        primary: {
          100: { value: "#CAA9A5" },
          200: { value: "#C39C98" },
          300: { value: "#BB908B" },
          400: { value: "#b4847e" },
          500: { value: "#ac7872" },
          600: { value: "#a46b65" },
          700: { value: "#9a615b" },
          800: { value: "#8d5953" },
          900: { value: "#81514B" },
        },
        secondary: {
          100: { value: "#F7DAB5" },
          200: { value: "#F5D1A3" },
          300: { value: "#F3C891" },
          400: { value: "#F1BF7E" },
          500: { value: "#EFB66C" },
          600: { value: "#EDAD5A" },
          700: { value: "#EBA448" },
          800: { value: "#E99B36" },
          900: { value: "#E79224" },
        },
      },
      fonts: {
        heading: { value: `'Megrim', sans-serif` },
        body: { value: `'Edu QLD Beginner', sans-serif` },
      },
    },
    semanticTokens: {
      colors: {
        background: { value: "rgba(193, 143, 101, 0.9)" },
        panel: { value: "rgba(193, 143, 101, 0.9)" },
      },
    },
    recipes: {
      box: defineRecipe({
        variants: {
          semiTransparent: {
            true: {
              bg: "rgba(193, 143, 101, 0.9)",
              borderRadius: "8px",
              p: 4,
            },
          },
        },
      }),
      text: defineRecipe({
        base: {
          fontFamily: "Edu QLD Beginner",
          fontWeight: "extrabold",
        },
      }),
      heading: defineRecipe({
        base: {
          fontFamily: "Megrim",
          fontWeight: "extrabold",
          textShadow: "1px 1px 0px rgb(0, 0, 0), 0px 1px 0px rgb(0, 0, 0)",
        },
      }),
      link: defineRecipe({
        base: {
          textDecoration: "none",
        },
      }),
      input: defineRecipe({
        base: {
          fontFamily: "Edu QLD Beginner",
          borderColor: "black",
          _hover: {
            borderColor: "black",
          },
          _placeholder: {
            color: "black",
            opacity: 1,
            fontFamily: "Edu QLD Beginner",
          },
          _focusVisible: {
            opacity: 1,
            fontFamily: "Edu QLD Beginner",
            outline: "none",
          },
        },
      }),
      card: defineRecipe({
        base: {
          borderRadius: "lg",
          p: 2,
          bg: "transparent",
        },
      }),
    },
    slotRecipes: {
      dialog: defineSlotRecipe({
        slots: ["content"],
        base: {
          content: {
            borderRadius: "lg",
            bg: "primary.100",
          },
        },
      }),
    },
  },
});
