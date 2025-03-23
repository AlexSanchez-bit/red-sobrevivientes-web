import { CartService } from "@/services/Cart/Cart.service";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToastStorage } from "./ToasterStorage";
import { i18n } from "@/setup";

export const useCartStore = defineStore("cart-store", () => {
  const cartService = new CartService();
  const quantity = ref(0);
  const loading = ref(false);

  const cart_id = ref("");

  const getMyCart = async () => {
    const t = i18n.global.t;
    loading.value = true;

    const { data, error } = await cartService.getMyCart();

    loading.value = false;
    if (error) {
      const { data: cart_data, error: cart_error } =
        await cartService.createCart();
      if (cart_error) {
        useToastStorage().notify(
          "error",
          t("error"),
          t(cart_error.message),
          3000,
        );
      } else {
        cart_id.value = cart_data.id;
        quantity.value = 0;
      }
      return { data: cart_data, error: cart_error };
    }

    if (data) {
      cart_id.value = data.id;
      quantity.value = data.cart_count;
    }
    return { data, error };
  };

  const updateProductQuantity = async (product_id: string, ammount: number) => {
    const resp = await cartService.addProductToCart(
      product_id,
      cart_id.value,
      ammount,
    );
    if (resp) {
      quantity.value += ammount;
    }
    return resp;
  };

  const clearCart = async () => {
    const { error } = await cartService.removeCartItems(cart_id.value);
    if (!error) {
      quantity.value = 0;
    }
  };

  return {
    quantity,
    loading,
    getMyCart,
    clearCart,
    updateProductQuantity,
  };
});
