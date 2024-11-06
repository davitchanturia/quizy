import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

export const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{indigo.50}",
      100: "{indigo.100}",
      200: "{indigo.200}",
      300: "{indigo.300}",
      400: "{indigo.400}",
      500: "{indigo.500}",
      600: "{indigo.600}",
      700: "{indigo.700}",
      800: "{indigo.800}",
      900: "{indigo.900}",
      950: "{indigo.950}",
    },
    secondary: {
      50: "{neutral.50}",
      100: "{neutral.100}",
      200: "{neutral.200}",
      300: "{neutral.300}",
      400: "{neutral.400}",
      500: "{neutral.500}",
      600: "{neutral.600}",
      700: "{neutral.700}",
      800: "{neutral.800}",
      900: "{neutral.900}",
      950: "{neutral.950}",
    },
    colorScheme: {
      light: {
        primary: {
          color: "{indigo.950}",
          inverseColor: "#ffffff",
          hoverColor: "{indigo.900}",
          activeColor: "{indigo.800}",
        },
        highlight: {
          background: "{indigo.950}",
          focusBackground: "{indigo.700}",
          color: "#ffffff",
          focusColor: "#ffffff",
        },
        formField: {
          hoverBorderColor: "{primary.color}",
        },
      },
      dark: {
        primary: {
          color: "{indigo.50}",
          inverseColor: "{indigo.950}",
          hoverColor: "{indigo.100}",
          activeColor: "{indigo.200}",
        },
        highlight: {
          background: "rgba(250, 250, 250, .16)",
          focusBackground: "rgba(250, 250, 250, .24)",
          color: "rgba(255,255,255,.87)",
          focusColor: "rgba(255,255,255,.87)",
        },
        formField: {
          hoverBorderColor: "{primary.color}",
        },
      },
    },
  },
});
