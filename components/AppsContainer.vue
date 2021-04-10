<template>
  <v-row>
    <v-col class="d-flex flex-column" cols="6" sm="3" xl="2" v-for="app in apps" :key="app.id">
      <v-img :src="`/images/${app.id}B.png`"></v-img>
      <p class="font-weight-light mt-3">{{ app.title }}</p>
      <nuxt-link class="app_btn text-decoration-none rounded text-center pa-0" :to="`/details/${app.id}`">
        <span class="d-block font-weight-black pa-md-3 pa-1" @click="updateSelectedApp(app)">MORE INFO</span>
      </nuxt-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["apps"],
  methods: {
    updateSelectedApp(app) {
      this.$emit("updateSelectedApp", app);
    }
  }
}
</script>

<style></style>