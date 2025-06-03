<template>
  <div class="home-container">
    <h1>Bienvenido a OptiFood</h1>
    <p>Así puedes aprovechar tus alimentos...</p>
    <div v-if="imageUrl">
      <img
        :src="imageUrl"
        alt="Imagen generada por DALL·E"
        style="max-width: 100%; border-radius: 10px"
      />
    </div>
    <div v-else>
      <p>Cargando imagen...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { generateImage } from "../services/dalle";

const imageUrl = ref("");

onMounted(async () => {
  const prompt =
    "Una mesa con frutas y verduras recicladas, estilo realista, iluminación natural"; // Puedes cambiarlo

  const result = await generateImage(prompt);
//   imageUrl.value = result.data.data[0].url;
  // Save the image to a file
  // const image_base64 = result.data[0].b64_json;
  // const image_bytes = Buffer.from(image_base64, "base64");
  // fs.writeFileSync("otter.png", image_bytes);
});
</script>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
