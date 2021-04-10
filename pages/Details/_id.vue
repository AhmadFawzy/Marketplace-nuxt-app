<template>
  <div v-if="appDetails">
    <nuxt-link to="/">back</nuxt-link>
    <h5>{{ appDetails[0].title }}</h5>
  </div>
</template>

<script>
export default {
  validate({params}) {
    return isFinite(params.id);
  },
  data() {
    return {
      appDetails: null,
      recommendedApps: []
    }
  },
  mounted() {
    this.appDetails = this.$store.state.allData.filter(app => app.id == this.$route.params.id);
  },
  methods: {
    recommendedApp() {
      this.recommendedApps = this.$store.state.allData.filter(app => app.category == this.appDetails[0].category && app.type == 'r' && app.id != this.appDetails[0].id);
    }
  }
}
</script>

<style></style>