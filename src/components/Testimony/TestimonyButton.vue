<template>
  <div class="text-center py-6 border border-red-700/20 z-[999]">
    <Button
      label="Comparte tu historia"
      @click="openModal"
      class="!bg-[#6f2465] hover:!bg-[#5a1d50] text-white font-bold py-3 !px-6 !text-xl !rounded-full transition-all"
    />

    <Dialog
      v-model:visible="isModalOpen"
      header="Comparte tu testimonio"
      :modal="true"
      maximizable
      dismissableMask
      mask-class="!bg-[#6f2465]/10"
      content-class="custom-dialog-content"
      class="custom-dialog-container !min-h-screen !w-screen lg:!h-[90vh] lg:!w-[60vw]"
    >
      <TestimonyForm
        @submit="handleSubmit"
        @cancel="closeModal"
        :loading="isSubmitting"
      />
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
</script>

<style scoped>
.custom-dialog-container {
  @apply !w-screen !h-screen !m-0 !rounded-none !overflow-y-auto;
  @apply lg:!w-[50vw] lg:!h-[90vh] lg:!rounded-lg;
}

.custom-dialog-content {
  @apply !bg-[#6f2465]/10 !h-full !rounded-none;
  @apply lg:!rounded-lg;
}
</style>
