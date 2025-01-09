// frontend/src/plugins/vuetify.js

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css"; // Assurez-vous que les icônes sont importées

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#f5f5f5",
          surface: "#ffffff",
          primary: "#6200ee",
          secondary: "#03dac6",
          error: "#b00020",
        },
      },
      dark: {
        dark: true,
        colors: {
          background: "#121212",
          surface: "#1e1e1e",
          primary: "#bb86fc",
          secondary: "#03dac6",
          error: "#cf6679",
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
    // Suppression de la configuration des sets pour éviter l'import de 'mdi/js'
  },
});
