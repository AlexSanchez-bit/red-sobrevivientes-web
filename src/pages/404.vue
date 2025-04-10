<template>
  <div class="not-found bg-primary text-primary">
    <h1 class="title text-primary">
      ¡Oh no! Te has adentrado en terreno sagrado... 😶‍🌫️
    </h1>

    <!-- Contenedor del cardenal -->
    <div class="cardinal-container">
      <svg
        class="cardinal"
        viewBox="0 0 200 250"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Solideo (gorro) -->
        <ellipse cx="100" cy="40" rx="30" ry="20" fill="#7f1d1d" />

        <!-- Cabeza -->
        <circle
          cx="100"
          cy="75"
          r="35"
          fill="#e5e7eb"
          stroke="#111827"
          stroke-width="3"
        />

        <!-- Cuerpo / sotana -->
        <rect
          x="60"
          y="110"
          width="80"
          height="120"
          rx="20"
          fill="#1f2937"
          stroke="#4b5563"
          stroke-width="2"
        />

        <!-- Capa roja -->
        <path
          d="M 60 110 Q 100 160 140 110 L 140 230 Q 100 250 60 230 Z"
          fill="#7f1d1d"
          opacity="0.8"
        />

        <!-- Cruz colgando -->
        <line
          x1="100"
          y1="120"
          x2="100"
          y2="150"
          stroke="#d1d5db"
          stroke-width="2"
        />
        <line
          x1="90"
          y1="135"
          x2="110"
          y2="135"
          stroke="#d1d5db"
          stroke-width="2"
        />
      </svg>

      <span class="error-text">404</span>
    </div>

    <p class="message text-primary">
      El cardenal no reconoce este lugar... mejor volvamos antes que se haga un
      exorcismo.
    </p>

    <router-link to="/" class="home-button"> Volver al inicio </router-link>
  </div>
</template>

<script setup></script>

<style scoped>
.not-found {
  @apply text-center p-10 min-h-screen flex flex-col justify-center items-center;
}

.title {
  @apply text-3xl font-bold mb-4;
}

.cardinal-container {
  position: relative;
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

.cardinal {
  width: 180px;
  height: auto;
  filter: drop-shadow(0 0 6px #000);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.error-text {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 70px;
  font-weight: bold;
  color: #facc15;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.6);
}

.message {
  @apply text-lg mt-6;
}

.home-button {
  @apply mt-6 inline-block px-6 py-3 bg-primary hover:bg-primary text-white font-bold rounded-xl transition;
}
</style>
