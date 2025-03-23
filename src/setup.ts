import { createI18n } from "vue-i18n";
import { createClient } from "@supabase/supabase-js";

import es from "./locales/es.json";
import en from "./locales/en.json";
import co from "./locales/co.json";

export const i18n = createI18n({
  legacy: false,
  locale: "es",
  messages: { es, en, co },
});

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL!;
const supabaseKey = (import.meta as any).env.VITE_ANON_KEY!;
export const stripeKey = (import.meta as any).env.VITE_STRIPE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
