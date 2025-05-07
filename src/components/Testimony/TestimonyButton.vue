<template>
  <div class="text-center py-6">
    <Button label="Sí, soy Sobreviviente." @click="openModal"
      class="!bg-[#6f2465] hover:!bg-[#5a1d50] text-white font-bold py-2 !px-6 !text-sm lg:!text-xl !rounded-full transition-all" />

    <Dialog v-model:visible="isModalOpen" header="Comparte tu testimonio" :modal="true" maximizable dismissableMask
      mask-class="!bg-[#6f2465]/10" content-class="custom-dialog-content lg:!rounded-lg"
      class="custom-dialog-container !w-screen lg:!h-[90vh] lg:!w-[60vw]  lg:!rounded-lg ">

      <div class="flex item-center w-full my-2 justify-center">
        <div
          class="relative flex w-full items-center bg-gray-200 rounded-full p-1 shadow-inner  h-[48px] cursor-pointer">
          <!-- Fondo animado -->
          <div
            class="absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] bg-primary text-white rounded-full transition-all duration-300"
            :class="selected === 'survivor' ? 'translate-x-full' : ''"></div>

          <!-- Botones -->
          <button class="flex-1 z-10 lg:text-sm font-semibold transition-colors duration-300 rounded-full text-xs"
            :class="selected === 'no-survivor' ? 'text-white' : 'text-primary'" @click="selected = 'no-survivor'">
            Soy Sobreviviente
          </button>
          <button class="flex-1 z-10 lg:text-sm font-semibold transition-colors duration-300 rounded-full text-xs"
            :class="selected === 'survivor' ? 'text-white' : 'text-primary'" @click="selected = 'survivor'">
            No soy sobreviviente, pero conozco uno
          </button>
        </div>
      </div>

      <TestimonyForm @submit="handleSubmit" @cancel="closeModal" :loading="isSubmitting"
        v-if="selected === 'no-survivor'" />
      <ReferalForm v-else @submit="closeModal" @cancel="closeModal" />
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import TestimonyForm from "./TestimonyForm.vue";
import { useTestimonyService } from "@/composables/Testimony/useTestimonyService";
import { useToastStorage } from "@/stores/ToasterStorage";
import ReferalForm from "../Referal/ReferalForm.vue";
const selected = ref('no-survivor')

const { notify } = useToastStorage();

const isModalOpen = ref(false);
const isSubmitting = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const service = useTestimonyService();

const handleSubmit = async (testimonyData) => {
  try {
    isSubmitting.value = true;
    const { data, error } = await service.create(testimonyData);

    if (error) {
      notify("error", "error", "Ocurrió un error, intenta de nuevo", 4000);
    } else {
      notify("success", "", "Gracias por compartir tu historia", 4000);
    }

    closeModal();
  } catch (err) {
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
};

defineExpose({
  openModal,
});
</script>

<style scoped>
.custom-dialog-container {
  @apply !w-screen !h-screen !m-0 !rounded-none !overflow-y-auto;
}

.custom-dialog-content {
  @apply !bg-[#6f2465]/10 !h-full !rounded-none;
}
</style>
