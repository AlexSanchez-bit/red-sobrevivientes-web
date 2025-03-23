<template>
  <div
    class="relative w-full h-screen flex justify-center items-center bg-cover"
  >
    <!-- Fondo -->
    <div class="absolute inset-0 z-0 bg-[#449ca8]"></div>

    <!-- Barra de progreso mientras se carga -->

    <!-- Tarjeta de registro -->
    <form
      @submit.prevent="register"
      class="relative z-10 bg-white rounded-lg shadow-lg px-10 py-8 flex flex-col gap-6 items-center w-full max-w-md"
    >
      <img src="/logo/logo-fondo.jpg" alt="Logo" class="w-24 mb-4" />

      <!-- Campo Email -->
      <FloatLabel class="w-full">
        <InputText
          id="email"
          v-model="email"
          @input="emailTouched = true"
          :invalid="emailTouched && !emailValid"
          class="w-full"
        />
        <label for="email" class="font-albra-serif-bold">{{
          $t("email")
        }}</label>
      </FloatLabel>

      <!-- Campo Teléfono (opcional) -->
      <FloatLabel class="w-full">
        <InputText id="phone" v-model="phone" class="w-full" />
        <label for="phone" class="font-albra-serif-bold"
          >{{ $t("phone_number") }} (Opcional)</label
        >
      </FloatLabel>

      <!-- Campo Contraseña -->
      <FloatLabel class="w-full">
        <Password
          id="password"
          v-model="password"
          @input="passwordTouched = true"
          :invalid="passwordTouched && !passwordValid"
          :feedback="false"
          toggleMask
          class="!w-full"
        />
        <label for="password" class="font-albra-serif-bold">{{
          $t("password")
        }}</label>
      </FloatLabel>

      <!-- Campo Confirmar Contraseña -->
      <FloatLabel class="w-full">
        <Password
          id="confirmPassword"
          v-model="confirmPassword"
          @input="confirmPasswordTouched = true"
          :invalid="confirmPasswordTouched && !confirmPasswordValid"
          :feedback="false"
          toggleMask
          class="w-full"
        />
        <label for="confirmPassword" class="font-albra-serif-bold">{{
          $t("confirm_password")
        }}</label>
      </FloatLabel>

      <!-- Botón de registro -->
      <Button
        type="submit"
        :disabled="!formValid || loading"
        :loading="loading"
        :label="$t('Register')"
        class="w-full bg-grass"
      />

      <!-- Enlace a la pantalla de login -->
      <p class="text-sm text-gray-600">
        {{ $t("already_have_an_account") }}
        <router-link to="/login" class="text-blue-500 hover:underline">
          {{ $t("login_yourself") }}
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
import ProgressBar from "primevue/progressbar";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { useToastStorage } from "@/stores/ToasterStorage";
import { useI18n } from "vue-i18n";

const router = useRouter();

const email = ref<string | null>(null);
const phone = ref<string | null>(null);
const password = ref<string | null>(null);
const confirmPassword = ref<string | null>(null);

const emailTouched = ref(false);
const passwordTouched = ref(false);
const confirmPasswordTouched = ref(false);

const emailValid = computed(() =>
  email.value ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) : false,
);
const passwordValid = computed(
  () => password.value != null && password.value !== "",
);
const confirmPasswordValid = computed(
  () =>
    confirmPassword.value != null && confirmPassword.value === password.value,
);

// El formulario es válido si se cumple que el email, la contraseña y la confirmación de la contraseña sean correctos
const formValid = computed(
  () => emailValid.value && passwordValid.value && confirmPasswordValid.value,
);

const loading = ref(false);

const { notify } = useToastStorage();
const { t } = useI18n();
const register = async () => {
  loading.value = true;

  const { data, error } = await useAuthStore().register(
    email.value!,
    phone.value!,
    password.value!,
    confirmPassword.value!,
  );
  if (error) {
    notify("error", "error", t(error.message), 4000);
  }
  console.log(data, error);
  loading.value = false;
};
</script>

<style scoped>
::v-deep .p-password:has(.p-password-toggle-mask-icon) .p-password-input {
  width: 100%;
}
</style>
