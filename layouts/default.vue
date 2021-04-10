<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-card>
        <!-- <v-btn v-for="category in categories" :key="category.id">{{ category }}</v-btn> -->
      </v-card>
      <v-container>
        <nuxt />
      </v-container>
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

<style lang="scss">
  $main-color: #572589;
  html {
    overflow-y: auto;
    .v-main {
      background-color: #f5f5f5;
    }
    .main-color {
      color: $main-color!important;
    }
    .main-bg-color {
      background-color: $main-color!important;
    }
  }
</style>