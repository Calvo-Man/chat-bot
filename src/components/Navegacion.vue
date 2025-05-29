<template>
  <v-app-bar color="success" dark>
    <v-app-bar-title>OptiFood</v-app-bar-title>
    <v-spacer />
    
    <v-btn class="boton" text to="/acerca">Alimentos</v-btn>
    <v-btn class="boton" text to="/contacto">Medio ambiente</v-btn>
    <v-btn class="boton" text to="/contacto">Conócenos</v-btn>
    <v-btn class="boton" text to="/contacto">Misión</v-btn>
    <v-btn class="boton" text to="/contacto">Contacto</v-btn>
    <v-btn class="boton" text to="/contacto">Chatbot</v-btn>
  </v-app-bar>
</template>
<style scoped>
.boton:hover {
  
  cursor: pointer;
}
.v-app-bar {
    box-shadow: none !important;
}
</style>
