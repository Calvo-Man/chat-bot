<!-- src/components/ChatBot.vue -->
<template>
  <v-card
    class="chat-card"
    title="OptiFood IA"
    subtitle="Tu asistente inteligente"
    elevation="3"
    v-show="showChat"
  >
    <template v-slot:prepend>
      <img :src="robotIcon" width="50" height="50" />
    </template>
    
    <template v-slot:append>
      <v-btn icon="mdi-plus" @click="newChat" variant="text"></v-btn>
      <v-btn icon="mdi-close" @click="showChat = false" variant="text"></v-btn>
    </template>
    <v-divider></v-divider>

    <v-card-text class="chat-window" style="overflow-y: auto">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="mb-2 d-flex"
        :class="msg.sender === 'Bot' ? 'justify-start' : 'justify-end'"
      >
        <div class="d-flex container-bot" v-if="msg.sender === 'Bot'">
          <img :src="robotIcon" width="30" height="30" />

          <v-card class="bot-message ml- pa-2">
            <div v-if="writting" v-html="msg.text"></div>
            <div v-else class="mb-2 pa-2" v-html="msg.text"></div>
            <p class="date-bot">{{ msg.date }}</p>
          </v-card>
        </div>
        <div class="d-flex" v-if="msg.sender === 'Tu'">
          <v-card class="user-message mr- pa-2">
            <p style="color: white">{{ msg.text }}</p>
            <p class="date-user">{{ msg.date }}</p>
          </v-card>
          <img :src="usesrIcon" width="30" height="30" />
        </div>
      </div>
    </v-card-text>

    <v-text-field
      :disabled="limitReached"
      class="custom-input"
      width="90%"
      bg-color="black"
      v-model="userMessage"
      label="Escribe tú pregunta sobre nutrición..."
      @keyup.enter="sendMessage"
      variant="solo"
      density="compact"
      hide-details
      single-line
      @click:append-inner="sendMessage"
    >
      <template v-slot:append-inner>
        <img
          :src="sendIcon"
          width="30"
          height="30"
          @click="sendMessage"
          style="cursor: pointer"
        />
      </template>
    </v-text-field>
  </v-card>

  <div
    class="chat-action logo"
    @click="showChat = !showChat"
    v-show="!showChat"
  >
    <img :src="robotIcon" width="60" height="60" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import robotIcon from "../assets/robot-mensaje.png";
import usesrIcon from "../assets/user-mensaje-2.png";
import sendIcon from "../assets/send-icon.png";
import { markdownToHtml } from "../services/markdowntohtml";
import axios from "axios";
import { sendMessageToOpenAI } from "../services/openia";
const showChat = ref(true);
</script>
<script>
export default {
  data() {
    return {
      userMessage: "",
      userInput: "",
      limitReached: false,
      apiBackend: import.meta.env.VITE_API_BACKEND,
      writting: false,
      conversation: [
        {
          role: "system",
          content:
            "Eres un experto en optimización y manejo de recursos orgánicos. Tu principal función es dar consejos para evitar tantos desechos de alimentos en el hogar. Responde siempre en un formato adecuado para mostrar en un chat y usa titulos adecuados minimo h2 y listas adeacuadas con sangria respectivamente. Todo lo que respondas va a estar relacionado con ese tema.",
        },
      ],
      messages: [
        {
          sender: "Bot",
          text: "¡Hola! Soy Optifood IA, tu asistente personal. Estoy aquí para ayudarte a reducir el desperdicio de alimentos en casa. Solo puedo responder una pregunta.",
          date: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        },
      ],
    };
  },
  methods: {
    async newChat() {
      this.messages = [
        {
          sender: "Bot",
          text: "¡Hola! Soy Optifood IA, tu asistente personal. Estoy aqui para ayudarte a reducir el desperdicio de alimentos en casa. Solo puedo responder una pregunta.",
          date: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        },
      ];
      this.conversation = [
        {
          role: "system",
          content:
            "Eres un experto en optimización y manejo de recursos orgánicos. Tu principal función es recomendar acciones para evitar tantos desechos de alimentos en el hogar.",
        },
      ];

      this.userMessage = "";
      this.limitReached = false;
    },
    async sendMessage() {
      if (!this.userMessage.trim()) return;
      this.messages.push({
        sender: "Tu",
        text: this.userMessage,
        date: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      });
      this.writting = true;
      this.messages.push({
        sender: "Bot",
        text: markdownToHtml("**Escribiendo...**"),
        date: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      });

      // Añadir el mensaje del usuario al historial
      this.conversation.push({
        role: "user",
        content: this.userMessage.trim(),
      });
      this.userMessage = "";
      try {
        const res = await sendMessageToOpenAI(this.conversation);
        const markdown = res.data.choices[0].message.content;
        this.limitReached = true;

        const replyContent = markdownToHtml(markdown);

        this.writting = false;
        this.messages.pop({
          sender: "Bot",
          text: "Escribiendo...",
          date: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        });
        this.messages.push({
          sender: "Bot",
          text: replyContent,
          date: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        });
        if (this.limitReached) {
          this.messages.push({
            sender: "Bot",
            text: markdownToHtml(
              "**Gracias por usar nuestro servicio de Optifood IA, vuelva pronto.**"
            ),
            date: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
          });
        }
        // Añadir respuesta del asistente al historial
        // const reply = res.data.choices[0].message;
        // this.conversation.push(reply);
      } catch (error) {
        console.error("Error al conectar con OpenAI:", error);
        this.conversation.push({
          role: "assistant",
          content: "Ocurrió un error al intentar responder.",
        });
      }

      this.$nextTick(() => {
        const chatWindow = document.querySelector(".chat-window");
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
.chat-card {
  width: 100%;
  max-width: 550px;
  position: fixed;
  bottom: 5px;
  height: calc(100% - 10px);
  right: 0px;
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
  height: calc(100% - 140px);
  box-shadow: inset 0px 0px 10px rgb(177, 175, 175);
}
@media (max-width: 600px) {
  
 
}
.date {
  font-size: 12px;
  color: #706c6c;
  margin-top: 5px;
}
.date-user {
  font-size: 12px;
  color: #ddd8d8;
  margin-top: 5px;
}
.bot-message {
  border-radius: 10px 10px 10px 1px !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: normal !important;
  background-color: #69f192;
}

.user-message {
  border-radius: 10px 10px 3px 10px !important;
  background: linear-gradient(90deg, #3b67df, #8430f1);

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0px !important;
}

.custom-input {
  margin: 10px 25px;
  border-radius: 20px !important;
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
