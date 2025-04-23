<template>
  <div class="max-w-3xl mx-auto p-6">
    <!-- Primer segmento visible -->
    <section class="mb-4">
      <h1 class="text-2xl text-center font-semibold text-primary" id="about_us">
        Sobre Nosotros
      </h1>
      <p class="text-gray-700 mt-2">
        <strong class="text-primary">¿Quiénes somos?</strong><br />
        Red de Sobrevivientes de Abuso Sexual Clerical (RESABSEC) somos una
        organización sin ánimo de lucro que brinda un acompañamiento de carácter
        jurídico a los Sobrevivientes de Abuso Sexual Clerical en Colombia,
        consolidamos testimonios para posteriormente convertirlos en denuncias
        ante las autoridades penales o civiles. Actualmente contamos con
        colaboradores y con voluntarios, sobrevivientes/no sobrevivientes de
        Abuso Sexual Clerical, MAYORES DE EDAD que tengan conocimientos en el
        área del derecho, psicología, ciencias comunicativas y administración
        pública; fortaleciendo sus liderazgos a través de constantes procesos de
        capacitación que les doten de herramientas para abordar las
        problemáticas de la Violencia Clerical en Colombia desde la empatía y la
        sanación.
      </p>
    </section>

    <!-- Segundo segmento visible -->
    <section class="mb-4">
      <h2 class="text-lg font-semibold text-primary">Misión</h2>
      <p class="text-gray-700 mt-2">
        Nuestra misión es acompañar, empoderar y defender a las víctimas de
        abuso sexual infantil cometido por religiosos, brindándoles apoyo
        jurídico especializado y promoviendo la justicia, la reparación y la
        prevención de futuros casos. Trabajamos para romper el silencio,
        garantizar los derechos de las víctimas y contribuir a la construcción
        de una sociedad más justa y segura.
      </p>
    </section>

    <!-- Contenido colapsable -->
    <transition name="fade" mode="out-in">
      <div v-if="expanded" class="space-y-6">
        <section>
          <div class="space-y-4 text-gray-700">
            <p>
              <strong class="text-primary">Visión</strong><br />En cinco años,
              La Red de Sobrevivientes de Abuso Sexual Clerical, estará como una
              organización líder en la defensa jurídica de las víctimas de abuso
              sexual infantil por parte de religiosos, reconocida por nuestro
              impacto en la obtención de justicia y reparación para las
              víctimas. Habremos contribuido a la implementación de políticas
              públicas efectivas para prevenir estos delitos, fortalecido las
              redes de apoyo para las víctimas y generado un cambio cultural que
              priorice la protección de los derechos de la infancia y la
              rendición de cuentas de las instituciones religiosas.
            </p>
          </div>
        </section>
      </div>
    </transition>

    <!-- Botón Mostrar más / menos -->
    <div class="mt-6 text-center hidden">
      <button
        @click="expanded = !expanded"
        class="bg-primary text-white px-6 py-2 rounded-full transition-all duration-300 hover:bg-primary/70 border-0"
      >
        {{ expanded ? "Mostrar menos" : "Mostrar más" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const expanded = ref(true);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
