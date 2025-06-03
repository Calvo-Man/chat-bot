<script setup>
import Navegacion from "./components/Navegacion.vue";
import ChatBot from "./components/ChatBot.vue";
</script>

<template>
  <v-app style="background-color: #f5f5f5">
    <v-layout>
      <ChatBot />
    </v-layout>
  </v-app>
</template>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 50px ;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #555ceeaa);
  cursor: pointer;
}
</style>
