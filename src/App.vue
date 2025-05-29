<script setup>
import Navegacion from "./components/Navegacion.vue";
import ChatBot from "./components/ChatBot.vue";
</script>

<template>
 
  <v-layout>
    <Navegacion />
    <ChatBot />
    
  </v-layout>
</template>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
  cursor: pointer;
}

</style>
