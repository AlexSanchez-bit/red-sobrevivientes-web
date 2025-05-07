<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-gray-700 font-medium mb-2">Nombre</label>
      <InputText v-model="formData.name" class="w-full" placeholder="Nombre completo" />
    </div>

    <div>
      <label class="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
      <InputText v-model="formData.email" class="w-full" placeholder="ejemplo@correo.com" type="email" />
    </div>

    <div>
      <label class="block text-gray-700 font-medium mb-2">Teléfono *</label>
      <InputText v-model="formData.phone_number" class="w-full" placeholder="Número de contacto"
        :class="{ '!border-red-500': errors.phone_number }" />
      <small v-if="errors.phone_number" class="text-red-500">{{ errors.phone_number }}</small>
    </div>

    <div>
      <label class="block text-gray-700 font-medium mb-2">Descripción *</label>
      <TextArea v-model="formData.description" class="w-full" :class="{ '!border-red-500': errors.description }"
        rows="4" placeholder="Describe los detalles del referido" />
      <small v-if="errors.description" class="text-red-500">{{ errors.description }}</small>
    </div>

    <div class="flex justify-end gap-3">
      <Button label="Cancelar" severity="secondary" type="button" @click="$emit('cancel')" :disabled="loading" />
      <Button label="Guardar Referido" type="submit" :loading="loading"
        class="!bg-[#6f2465] hover:!bg-[#5a1d50] text-white" :disabled="!isFormValid || loading" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import InputText from 'primevue/inputtext'
import TextArea from 'primevue/textarea'
import Button from 'primevue/button'
import { type IReferal, ReferalStatus } from '@/services/Referal/Referal.service'
import { useReferalService } from '@/composables/Referal/useReferalService'
import { useToastStorage } from '@/stores/ToasterStorage'

const emit = defineEmits<{
  (e: 'submit', data: IReferal): void
  (e: 'cancel'): void
}>()

const formData = reactive<IReferal>({
  name: '',
  email: '',
  phone_number: '',
  description: '',
  status: ReferalStatus.CREATED,
  created_at: new Date().toISOString(),
})

const errors = reactive({
  phone_number: '',
  description: '',
})

const isFormValid = computed(() =>
  formData.phone_number.trim() !== '' && formData.description.trim() !== ''
)

function validateForm() {
  return true
}

const service = useReferalService()
const { notify } = useToastStorage()
const loading = ref(false)

async function handleSubmit() {
  if (validateForm()) {
    loading.value = true
    const { error } = await service.create(formData)
    loading.value = false
    if (error) {
      notify("error", "Ocurrióun error", "Por favor intente otra vez", 3000)
    } else {
      emit('submit', formData)
      notify("success", "Gracias!!", "Nuestro equipo se pondrá en contacto", 3000)
    }
  }
}
</script>
