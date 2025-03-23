<template>
  <div class="text-center py-6 border border-red-700/20">
    <Button
      label="Comparte tu historia"
      @click="openModal"
      class="!bg-[#6f2465] hover:!bg-[#5a1d50] text-white font-bold py-3 px-6 rounded-full transition-all"
    />

    <Dialog
      v-model:visible="isModalOpen"
      header="Comparte tu testimonio"
      :style="{ width: '90vw', maxWidth: '800px' }"
      :modal="true"
      class="!overflow-y-auto"
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
      notify("success", "", "Gracias por compartit tu historia", 4000);
    }

    closeModal();
  } catch (err) {
  } finally {
    isSubmitting.value = false;
  }
};
</script>
