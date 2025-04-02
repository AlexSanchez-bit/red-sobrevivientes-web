<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import { useToastStorage } from "./stores/ToasterStorage";
import { useToast } from "primevue/usetoast";
import ChatButton from "./components/Chat/ChatButton.vue";
const toastStorage = useToastStorage();
const toast = useToast();
toastStorage.addtoaster(toast);
</script>

<template>
  <RouterView />
  <Toast />
  <ConfirmDialog></ConfirmDialog>

  <ChatButton />
</template>
