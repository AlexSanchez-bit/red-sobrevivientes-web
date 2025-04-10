<template>
  <form @submit.prevent="handleSubmit" class="space-y-2 overflow-y-auto">
    <div>
      <label class="block text-gray-700 font-medium mb-2">Nombre</label>
      <InputText
        v-model="formData.name"
        class="w-full"
        placeholder="Tu nombre completo"
      />
    </div>

    <div>
      <div class="flex justify-between items-center mb-2">
        <label class="block text-gray-700 font-medium"
          >Persona involucrada *</label
        >
        <small v-if="errors.laic_involved" class="text-red-500">{{
          errors.laic_involved
        }}</small>
      </div>
      <Select
        v-model="formData.laic_involved"
        :options="items"
        optionLabel="name"
        optionValue="id"
        class="w-full"
        :class="{ '!border-red-500': errors.laic_involved }"
        :virtualScrollerOptions="{
          lazy: true,
          onLazyLoad: onLazyLoad,
          itemSize: 38,
          showLoader: true,
          loading: loading,
          delay: 250,
        }"
        placeholder="Seleccionar"
      />
    </div>

    <div>
      <label class="block text-gray-700 font-medium mb-2">Género</label>
      <Select
        v-model="formData.gender"
        :options="genders"
        optionLabel="name"
        optionValue="id"
        class="w-full"
        placeholder="Su Género"
      />
    </div>

    <div>
      <label class="block text-gray-700 font-medium mb-2">Edad</label>
      <InputNumber
        v-model="formData.age"
        class="w-full"
        placeholder="Su Edad"
      />
    </div>

    <div>
      <div class="flex justify-between items-center mb-2">
        <label class="block text-gray-700 font-medium">Detalles *</label>
        <small v-if="errors.text" class="text-red-500">{{ errors.text }}</small>
      </div>
      <TextArea
        v-model="formData.text"
        class="w-full"
        :class="{ '!border-red-500': errors.text }"
        placeholder="Cuenta tu historia.."
        rows="5"
      />
    </div>

    <div>
      <label class="block text-gray-700 font-medium mb-2">Ubicación</label>
      <MapComponent
        @location-selected="formData.location = $event"
        class="border rounded-lg overflow-hidden"
      />
    </div>

    <div class="flex justify-end gap-4">
      <Button
        type="button"
        label="Cancelar"
        severity="secondary"
        @click="$emit('cancel')"
        :disabled="loading"
      />
      <Button
        type="submit"
        label="Enviar testimonio"
        :loading="loading"
        class="!bg-[#6f2465] hover:!bg-[#5a1d50] text-white"
        :disabled="!isFormValid"
      />
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { Pagination } from "@/utils/entities/Pagination";
import InputText from "primevue/inputtext";
import TextArea from "primevue/textarea";
import Select from "primevue/select";
import Button from "primevue/button";
import MapComponent from "./SelectionMap.vue";
import { useLaicTypeService } from "@/composables/LaicTypes/useLaicTypesService";
import { Gender } from "@/services/Testimony/Testimony.service";
import { InputNumber } from "primevue";

const service = useLaicTypeService();

const emit = defineEmits(["submit", "cancel"]);
const props = defineProps(["loading"]);

const formData = reactive({
  name: "",
  laic_involved: null,
  location: null,
  text: "",
});

const errors = reactive({
  laic_involved: "",
  text: "",
});

const isFormValid = computed(() => {
  return formData.laic_involved !== null && formData.text.trim() !== "";
});

const validateForm = () => {
  let isValid = true;

  errors.laic_involved =
    formData.laic_involved === null
      ? "Debes seleccionar una persona involucrada"
      : "";

  errors.text =
    formData.text.trim() === ""
      ? "Por favor describe los detalles del testimonio"
      : "";

  return !errors.laic_involved && !errors.text;
};

const handleSubmit = () => {
  if (validateForm()) {
    emit("submit", formData);
  }
};

const selectedItem = ref();
const items = ref(Array.from({ length: 100000 }));
const loading = ref(false);
const loadLazyTimeout = ref();
const onLazyLoad = (event) => {
  if (loadLazyTimeout.value) {
    clearTimeout(loadLazyTimeout.value);
  }
  //imitate delay of a backend call
  loading.value = true;
  loadLazyTimeout.value = setTimeout(async () => {
    const awaitedItems = await service.getAll(
      [],
      new Pagination(event.first, 100),
      [],
    );
    loading.value = false;
    if (awaitedItems.length > 0) {
      items.value = awaitedItems;
    }
  }, 400);
};

const genders = Object.keys(Gender).map((key) => ({
  id: key,
  name: Gender[key],
}));
</script>

<style>
.p-inputtext.ng-invalid.ng-touched,
.p-inputtext.ng-invalid {
  border-color: #ef4444 !important;
}
</style>
