<template>
  <div>
    <!-- Botón flotante de chat -->
    <div class="fixed right-4 bottom-4 z-50">
      <OverlayBadge
        :value="`${unreadMessages}`"
        severity="danger"
        :class="{
          inactive: !aviable_chat || unreadMessages == 0,
        }"
      >
        <Button
          v-if="aviable_chat"
          icon="pi pi-comment"
          class="chat-btn"
          @click="toggleChat"
        />
      </OverlayBadge>

      <transition name="chat-transition">
        <div @keydown.esc="toggleChat" v-show="isChatOpen" class="chat-overlay">
          <!-- Contenedor del chat: full screen en móviles, modal en desktop -->
          <div
            class="chat-container w-full h-full"
            :class="{
              'chat-mobile': isMobile,
              'chat-desktop': !isMobile,
            }"
          >
            <!-- Header del chat -->
            <div class="chat-header">
              <h3 class="chat-title">Chat</h3>
              <Button
                icon="pi pi-times"
                class="chat-close-btn"
                @click="toggleChat"
              />
            </div>

            <!-- Área de mensajes -->
            <div class="chat-messages" ref="messagesContainer">
              <div
                v-for="(message, index) in messages"
                :key="index"
                :class="[
                  'chat-message relative flex flex-wrap min-w-64 justify-between !pt-1',
                  message.from === 'user'
                    ? 'chat-message-user'
                    : message.from === 'bot'
                      ? 'chat-message-bot'
                      : 'chat-message-human',
                ]"
              >
                <span class="w-full text-start text-xs text-gray-50">
                  {{
                    message.from === "user"
                      ? ""
                      : message.from === "bot"
                        ? "bot"
                        : "usuario humano"
                  }}
                </span>
                <span>
                  {{ message.text }}
                </span>
                <span class="flex flex-row items-center justify-end">
                  <span class="text-xs text-gray-600">{{
                    message.created_at?.toLocaleDateString("en-US", {
                      hour12: true,
                    })
                  }}</span>
                  <i
                    class="scale-[65%] text-xs !h-0.5"
                    :class="{
                      'pi pi-clock': message.status == MessageStatus.LOADING,
                      'pi pi-x-mark': message.status == MessageStatus.ERROR,
                      'pi pi-check': message.status == MessageStatus.SENT,
                    }"
                  >
                  </i>
                </span>
              </div>
            </div>

            <!-- Entrada de mensaje -->
            <div class="chat-input-area">
              <div class="chat-input-wrapper">
                <textarea
                  v-model="newMessage"
                  @keyup.enter.exact.prevent="sendMessage"
                  placeholder="Escribe tu mensaje..."
                  class="chat-input"
                  ref="messageInput"
                  @input="autoResize"
                ></textarea>
                <Button
                  :loading="unanswered"
                  :disabled="unanswered"
                  icon="pi pi-send"
                  class="chat-send-btn"
                  @click="sendMessage"
                />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch, Ref } from "vue";
import Button from "primevue/button";
import OverlayBadge from "primevue/overlaybadge";
import {
  useChatService,
  type Message,
  MessageStatus,
} from "@/services/Chat/Chat.service";
import { useToastStorage } from "@/stores/ToasterStorage";

const aviable_chat = ref(false);
const isChatOpen = ref(false);
const newMessage = ref("");

const messages = ref<Message[]>([]);
const messagesContainer = ref<HTMLElement | null>(null);
const messageInput = ref<HTMLTextAreaElement | null>(null);

const unanswered = ref(false);

const { notify } = useToastStorage();
const service = useChatService();
const unreadMessages = ref(0);

const scrollDown = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

onMounted(async () => {
  const { error } = await service.initChatUser();
  const { error: chat_error } = await service.get_or_create_chat();

  const { data: load_data, error: load_error } =
    await service.loadChatMessages();

  if (error || chat_error || load_error) {
    notify("error", "Error al iniciar el chat", "", 3000);
    return;
  }
  messages.value = [...load_data];
  aviable_chat.value = true;

  service.enableMessageListenning(async (message) => {
    if (!isChatOpen.value) {
      unreadMessages.value += 1;
    }
    messages.value.push({
      from: message.user,
      text: message.content,
      status: MessageStatus.READED,
      created_at: new Date(message.created_at),
    });

    await scrollDown();
    unanswered.value = false;
  });

  await scrollDown();
});

watch(messages, async () => {
  // Espera a que se rendericen los nuevos mensajes y luego realiza scroll
  await scrollDown();
});

function toggleChat() {
  isChatOpen.value = !isChatOpen.value;
  scrollDown();
  if (isChatOpen.value) {
    unreadMessages.value = 0;
  }
}

async function sendMessage() {
  if (newMessage.value.trim() === "") return;
  // Agrega el mensaje del usuario
  const auxMessage = {
    from: "user",
    text: newMessage.value,
    status: MessageStatus.LOADING,
  };
  messages.value.push(auxMessage as any);
  const messageIndex = messages.value.length - 1;
  const lastmsg = newMessage.value;
  newMessage.value = "";

  unanswered.value = true;
  scrollDown();
  const { data: resp, error } = await service.sendMessage(lastmsg);
  const { data, error: operation_error } = resp;
  if (error || operation_error) {
    messages.value[messageIndex].status = MessageStatus.ERROR;
    unanswered.value = false;
    return;
  }

  if (data.human_driven) {
    unanswered.value = false;
  }
  messages.value[messageIndex].status = MessageStatus.SENT;
}

function autoResize() {
  if (messageInput.value) {
    messageInput.value.style.height = "auto";
    messageInput.value.style.height = messageInput.value.scrollHeight + "px";
  }
}

// Detección de vista móvil
const isMobile = computed(() => window.innerWidth < 640);
</script>

<style scoped>
/* Botón flotante */
.chat-btn {
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  background-color: #3b82f6;
  border: none;
  transition: background-color 0.3s ease;
  z-index: 50;
}
.chat-btn:hover {
  background-color: #2563eb !important;
}

/* Overlay del chat */
.chat-overlay {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 40dvw;
  height: 85dvh;
  z-index: 50;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 20;
  border-radius: 0.9rem 0.99rem 0.5rem 0.5rem;
  overflow: hidden;
  transform: translateY(-96%) translateX(-96%);
}

@media (max-width: 1100px) {
  .chat-overlay {
    width: 60dvw;
  }
}

@media (max-width: 640px) {
  .chat-overlay {
    position: fixed;
    top: 0%;
    left: 0%;
    transform: translateY(0%) translateX(0%);
    width: 100dvw;
    height: 100dvh;
    z-index: 50;
  }
}
/* Contenedor del chat */
.chat-container {
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Header del chat */
.chat-header {
  background-color: #3b82f6;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chat-title {
  color: #fff;
  font-size: 1.25rem;
  font-weight: bold;
}
.chat-close-btn {
  padding: 0.5rem;
  background: transparent;
  color: #fff;
  transition: background-color 0.3s ease;
  border: none !important;
}
.chat-close-btn:hover {
  background-color: #2563eb !important;
}

/* Área de mensajes */
.chat-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Estilos para los mensajes */
.chat-message {
  padding: 0.75rem;
  border-radius: 0.5rem;
  max-width: 80%;
  word-break: break-word;
}
.chat-message-user {
  align-self: flex-end;
  background-color: #d1fae5;
  text-align: right;
}
.chat-message-bot {
  align-self: flex-start;
  background-color: #dbeafe;
  text-align: left;
}

.chat-message-human {
  align-self: flex-start;
  background-color: #ff0aa0;
  text-align: left;
}

/* Área de entrada */
.chat-input-area {
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
}
.chat-input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}
.chat-input {
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: 1.25rem;
  padding: 0.5rem 1rem;
  resize: none;
  overflow: hidden;
  transition: border-color 0.2s ease;
}
.chat-input:focus {
  outline: none;
  border-color: #3b82f6;
}
.chat-send-btn {
  border-radius: 9999px;
  background-color: #3b82f6;
  transition: background-color 0.3s ease;
}
.chat-send-btn:hover {
  background-color: #2563eb;
}

/* Transiciones */
.chat-transition-enter-active,
.chat-transition-leave-active {
  transition:
    opacity 0.5s ease-in-out,
    scale 0.4s ease-in-out,
    transform 0.3s ease-in-out;
}
.chat-transition-enter-from,
.chat-transition-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.chat-transition-enter-to,
.chat-transition-leave-from {
  opacity: 1;
}

.inactive :deep(.p-badge) {
  display: none;
}
</style>
