<template>
  <v-app>
    <AppHeader />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue"
export default {
  components: {
    AppHeader
  }
}
</script>

<style></style>