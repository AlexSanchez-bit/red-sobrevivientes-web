<template>
  <div class="p-6  mx-auto">
    <h1 class="text-3xl font-extrabold !text-primary mb-6 text-center">Políticas</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(label, key) in headers" :key="key"
        class="bg-white shadow rounded-lg p-4 hover:bg-primary/10 !text-primary hover:shadow-lg hover:shadow-primary border border-gray-200 flex flex-col justify-between transition-all duration-700">
        <div>
          <h2 class="text-lg font-semibold text-center  mb-4 text-gray-700">{{ label }}</h2>
        </div>
        <div class="flex justify-center">
          <Button icon="pi pi-eye" label="ver más" class="p-button-rounded p-button-lg p-button-secondary"
            @click="openDialog(key)" />
        </div>
      </div>
    </div>

    <Dialog maximizable v-for="(label, key) in headers" :key="key + '-dialog'" v-model:visible="dialogVisible[key]"
      :header="label" :breakpoint="'640px'" :style="{ width: dialogWidth }" modal class="rounded-lg">
      <div class="min-h-[200px] flex items-center justify-center">
        <iframe v-if="policy[key]" :src="policy[key]" class="w-full h-screen  border rounded"></iframe>
        <p v-else class="text-gray-500 italic text-center px-4">
          El contenido aún no está disponible, pero pronto lo estará.
        </p>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import type { IPolicy } from '@/services/Policy/Policy.service'
import { usePolicyService } from '@/composables/Policy/usePolicyService'

const service = usePolicyService()
const policy = ref<IPolicy>({})

// Encabezados para las cards
const headers: Record<string, string> = {
  protection: 'Política de Protección',
  protocol: 'Protocolo',
  decalog: 'Decálogo',
}

// Estado de visibilidad de cada diálogo
const dialogVisible = ref<Record<string, boolean>>({
  protection: false,
  protocol: false,
  decalog: false,
})

const dialogWidth = '100vw'

onMounted(async () => {
  const data = await service.getDetails(1)
  if (data) {
    policy.value = data
  }
})


function openDialog(key: string) {
  dialogVisible.value[key] = true
}
</script>

<style scoped>
/* Responsive adjustments */
.min-h-\[200px\] {
  min-height: 200px;
}
</style>
