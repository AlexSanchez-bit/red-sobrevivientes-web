<template>
  <div class="paypal-donate">
    <h2 class="text-xl font-bold mb-4 text-center">
      Apóyanos con una donación
    </h2>
    <div ref="paypalButton" class="flex justify-center"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const paypalButton = ref(null);

onMounted(() => {
  if (!window.paypal) {
    console.error("PayPal SDK no está cargado");
    return;
  }

  window.paypal
    .Buttons({
      style: {
        layout: "vertical",
        color: "purple",
        shape: "pill",
        label: "donate",
      },
      // Monto fijo o dinámico
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "10.00", // monto por defecto, puedes reemplazarlo por una prop
              },
            },
          ],
        });
      },
      // Al completar la donación
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          // Aquí puedes notificar al usuario y guardar el detalle en tu back-end
          alert(
            `¡Gracias ${details.payer.name.given_name}! Tu donación fue procesada.`,
          );
        });
      },
      onError: (err) => {
        console.error(err);
        alert("Ocurrió un error al procesar tu donación.");
      },
    })
    .render(paypalButton.value);
});
</script>

<style scoped>
.paypal-donate {
  max-width: 400px;
  margin: 0 auto;
}
</style>
