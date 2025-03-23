<template>
  <div
    class="relative w-full h-screen flex justify-center items-center bg-cover"
  >
    <!-- Fondo -->
    <div class="absolute inset-0 z-0 bg-[#449ca8]"></div>

    <!-- Tarjeta de login -->
    <form
      @submit.prevent="login"
      class="relative z-10 bg-white rounded-lg shadow-lg px-10 py-8 flex flex-col gap-6 items-center w-full max-w-md"
    >
      <img src="/logo/logo-fondo.jpg" alt="Logo" class="w-24 mb-4" />

      <FloatLabel class="w-full">
        <InputText
          id="username"
          v-model="email"
          @input="email_touched = true"
          :invalid="email_touched && !email_valid"
          class="w-full"
        />
        <label for="username" class="font-albra-serif-bold">{{
          $t("email")
        }}</label>
      </FloatLabel>

      <FloatLabel class="w-full">
        <Password
          id="password"
          v-model="password"
          @input="password_touched = true"
          :invalid="password_touched && !password_valid"
          :feedback="false"
          toggleMask
          class="w-full"
        />
        <label for="password" class="font-albra-serif-bold">{{
          $t("password")
        }}</label>
      </FloatLabel>

      <Button
        type="submit"
        :disabled="!email_valid || !password_valid"
        :label="$t('login')"
        :loading="loading"
        class="w-full bg-grass"
      />

      <p class="text-sm text-gray-600">
        {{ $t("not_have_an_account") }}
        <router-link to="/register" class="text-blue-500 hover:underline">
          {{ $t("register_yourself") }}
        </router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import FloatLabel from "primevue/floatlabel";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useToastStorage } from "@/stores/ToasterStorage";
import { useI18n } from "vue-i18n";

const authStore = useAuthStore();
const router = useRouter();

const email = ref<string | null>(null);
const password = ref<string | null>(null);

const email_touched = ref(false);
const password_touched = ref(false);

const email_valid = computed(() =>
  email.value?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
);
const password_valid = computed(
  () => password.value != null && password.value !== "",
);

const loading = ref(false);

const { notify } = useToastStorage();
const { t } = useI18n();

const login = async () => {
  loading.value = true;
  const { error } = await authStore.login(email.value!, password.value!);
  loading.value = false;
  if (!error) {
    router.push("/");
  } else {
    notify("error", "error", t(error.message), 4000);
  }
};
</script>

<style scoped>
::v-deep .p-password:has(.p-password-toggle-mask-icon) .p-password-input {
  width: 100%;
}
</style>
