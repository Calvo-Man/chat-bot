<template>
  <v-app-bar color="success" dark>
    <v-app-bar-title>OptiFood IA</v-app-bar-title>

    <v-spacer />
    <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none" />
    <div class="d-none d-md-flex">
      <v-btn class="boton" text to="/acerca">Alimentos</v-btn>
      <v-btn class="boton" text to="/contacto">Medio ambiente</v-btn>
      <v-btn class="boton" text to="/contacto">Conócenos</v-btn>
      <v-btn class="boton" text to="/contacto">Misión</v-btn>
      <v-btn class="boton" text to="/contacto">Contacto</v-btn>
      <v-btn class="boton" text to="/contacto">Chatbot</v-btn>
    </div>
  </v-app-bar>

  
  <v-navigation-drawer v-model="drawer" temporary class="d-md-none">
    <v-list>
      <v-list-item to="/acerca" title="Alimentos" />
      <v-list-item to="/contacto" title="Medio ambiente" />
      <v-list-item to="/contacto" title="Conócenos" />
      <v-list-item to="/contacto" title="Misión" />
      <v-list-item to="/contacto" title="Contacto" />
      <v-list-item to="/contacto" title="Chatbot" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>

<style scoped>
.boton:hover {
  cursor: pointer;
}
.v-app-bar {
  box-shadow: none !important;
}
</style>
