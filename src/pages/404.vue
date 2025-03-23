<template>
  <div class="not-found">
    <h1 class="title">¡Oops! Parece que te perdiste... 🐰</h1>

    <!-- Contenedor de Mimi -->
    <div class="mimi-container">
      <svg
        class="mimi"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Orejas -->
        <ellipse
          cx="70"
          cy="40"
          rx="18"
          ry="45"
          fill="#FFD700"
          stroke="#E6B800"
          stroke-width="3"
        />
        <ellipse
          cx="130"
          cy="40"
          rx="18"
          ry="45"
          fill="#FFD700"
          stroke="#E6B800"
          stroke-width="3"
        />

        <!-- Cabeza -->
        <circle
          cx="100"
          cy="90"
          r="50"
          fill="#FFD700"
          stroke="#E6B800"
          stroke-width="3"
        />

        <!-- Cachetes -->
        <circle cx="65" cy="110" r="12" fill="white" opacity="0.9" />
        <circle cx="135" cy="110" r="12" fill="white" opacity="0.9" />

        <!-- Cuerpo -->
        <ellipse
          cx="100"
          cy="150"
          rx="45"
          ry="50"
          fill="#FFD700"
          stroke="#E6B800"
          stroke-width="3"
        />

        <!-- Pancita blanca -->
        <ellipse cx="100" cy="165" rx="25" ry="30" fill="white" opacity="0.9" />

        <!-- Ojos -->
        <circle cx="85" cy="85" r="5" fill="black" />
        <circle cx="115" cy="85" r="5" fill="black" />

        <!-- Nariz -->
        <ellipse cx="100" cy="100" rx="5" ry="3" fill="black" />

        <!-- Boca -->
        <path
          d="M 95 105 Q 100 115, 105 105"
          stroke="black"
          stroke-width="2"
          fill="none"
        />
      </svg>

      <span class="error-text">404</span>
    </div>

    <p class="message">
      Mimi no encuentra esta página, pero te puede llevar a casa 🏡
    </p>

    <!-- Botón para volver -->
    <router-link to="/" class="home-button">Volver al inicio</router-link>
  </div>
</template>

<script setup></script>

<style scoped>
/* Estilos generales */
.not-found {
  text-align: center;
  padding: 40px;
  background: #ffebf0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Texto principal */
.title {
  font-size: 28px;
  color: #ff69b4;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Contenedor de Mimi */
.mimi-container {
  position: relative;
  display: inline-block;
  animation: bounce 1.5s infinite;
}

.mimi {
  width: 150px;
  height: auto;
}

/* Animación de Mimi brincando */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Número 404 */
.error-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  font-weight: bold;
  color: #ffcc00;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
}

/* Mensaje */
.message {
  font-size: 18px;
  color: #c71585;
  margin-top: 10px;
}

/* Botón de volver */
.home-button {
  margin-top: 20px;
  display: inline-block;
  padding: 10px 20px;
  background: #ff69b4;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
}

.home-button:hover {
  background: #ff1493;
}
</style>
