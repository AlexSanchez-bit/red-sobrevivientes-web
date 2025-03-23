import { ref } from "vue";
import { defineStore } from "pinia";

import type { ICurrency } from "@/services/Currency/Currency.service";

export const useCurrencyStore = defineStore("currency", () => {
  const selected_currency = ref<Partial<ICurrency>>({
    name: "USD",
    change_value: 1,
  });

  const change_currency = (currency: ICurrency) => {
    selected_currency.value = currency;
  };
  return { selected_currency, change_currency };
});
