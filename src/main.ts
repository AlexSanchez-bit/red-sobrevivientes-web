import "./assets/main.css";
import "./leaflet";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import "swiper/css";
// register Swiper custom elements
register();

import { createApp } from "vue";
import { createPinia } from "pinia";
import Aura from "@primevue/themes/aura";

import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";

import App from "./App.vue";
import router from "./router";

import { i18n } from "./setup";
import Img from "./components/Img.vue";

const app = createApp(App);
app.use(createPinia());
app.use(ConfirmationService);

app.use(ToastService);
app.use(router);
app.use(i18n);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || "none",
    },
  },
});
app.use(ConfirmationService);
app.directive("tooltip", Tooltip);
app.component("Img", Img);

app.mount("#app");
