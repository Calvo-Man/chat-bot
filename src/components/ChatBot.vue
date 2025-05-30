<!-- src/components/ChatBot.vue -->
<template>
  <v-card
    class="chat-card"
    title="OptiFood IA"
    subtitle="Tu asistente inteligente"
    elevation="4"
    v-show="showChat"
  >
    <template v-slot:prepend>
      <img :src="robotIcon" />
    </template>
    <template v-slot:append>
      <v-btn icon="mdi-close" @click="showChat = false" variant="text"></v-btn>
    </template>
    <v-divider></v-divider>

    <v-card-text class="chat-window" style=" overflow-y: auto">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="mb-2 d-flex"
        :class="msg.sender === 'Bot' ? 'justify-start' : 'justify-end'"
      >
        <div class="d-flex container-bot" v-if="msg.sender === 'Bot'">
          <img :src="robotIcon" width="30" height="30" />
          <v-card class="bot-message ml-2">
            <v-card-text>{{ msg.text }}</v-card-text>
            <v-card-subtitle>{{ msg.date }}</v-card-subtitle>
          </v-card>
        </div>
        <div class="d-flex" v-if="msg.sender === 'Tu'">
          <v-card class="user-message mr-2">
            <v-card-text>{{ msg.text }}</v-card-text>
            <v-card-subtitle>{{ msg.date }}</v-card-subtitle>
          </v-card>
          <img :src="usesrIcon" width="30" height="30" />
        </div>
      </div>
    </v-card-text>

    <v-text-field
      class="custom-input"
      width="90%"
      bg-color="black"
      v-model="userInput"
      label="Escribe tú pregunta sobre nutrición..."
      @keyup.enter="sendMessage"
      append-inner-icon="mdi-send"
      variant="solo"
      density="compact"
      hide-details
      single-line
      @click:append-inner="sendMessage"
    />
  </v-card>
  <div
    class="chat-action logo"
    @click="showChat = !showChat"
    v-show="!showChat"
  >
    <img :src="robotIcon" width="50" height="50" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import robotIcon from "../assets/robot-mensaje.png";
import usesrIcon from "../assets/user-mensaje-2.png";
import axios from "axios";
const userInput = ref("");
const messages = ref([
  {
    sender: "Bot",
    text: "¡Hola! Soy Optifood IA, tu asistente personal. ¿En qué puedo ayudarte hoy?",
    date: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  },
]);

const showChat = ref(true);

function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  // Agregar mensaje del usuario
  messages.value.push({
    sender: "Tu",
    text: input,
    date: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  });

  // Simular respuesta del bot
  setTimeout(() => {
    messages.value.push({
      sender: "Bot",
      text: `Tú dijiste: "${input}"`,
      date: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    });
  }, 500);
  const data = {
    message: input,
  };
  try {
    axios.post("http://localhost:4000/", data).then((response) => {
      messages.value.push({
        sender: "Bot",
        text: response.data.message,
        date: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      });
    });
  } catch (error) {
    console.log(error);
  }

  userInput.value = "";
}
</script>

<style scoped>
.chat-card {
  width: 100%;
  max-width: 550px;
  position: fixed;
  bottom: 5px;
  right: 10px;
  margin: 0 10px;
}

@media (max-width: 600px) {
  .chat-card {
    bottom: 10px;
    right: 0;
    left: 0;
    margin: 0 auto;
    border-radius: 10px 10px 0 0;
    
  }
}

.chat-window {
  background-color: #eceff1;
  border-radius: 0;
  width: 100%;
  height: 67vh;
}
@media (max-width: 600px) {
  .chat-window{
    height: calc(80vh - 100px);
  }
}

.bot-message {
  border-radius: 10px 10px 10px 1px !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  word-break: break-word;
}

.user-message {
  border-radius: 10px 10px 3px 10px !important;
  background: linear-gradient(90deg, #3b67df, #8430f1);
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  word-break: break-word;
}

.custom-input {
  margin: 10px 20px;
}

.custom-input .v-input__control {
  border-radius: 50px !important;
}

.chat-action {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
}

@media (max-width: 600px) {
  .chat-action {
    right: 10px;
    bottom: 10px;
  }
}

</style>
