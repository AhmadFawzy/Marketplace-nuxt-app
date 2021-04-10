<template>
  <v-row>
    <v-col class="d-flex flex-column" cols="6" sm="3" xl="2" v-for="app in apps" :key="app.id">
      <v-img :src="`/images/${app.id}B.png`"></v-img>
      <p class="mt-3">{{ app.title }}</p>
      <v-btn class="main-bg-color text-center">
        <nuxt-link class="white--text text-decoration-none" :to="`/details/${app.id}`">MORE INFO</nuxt-link>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["apps"]
}
</script>

<style></style>