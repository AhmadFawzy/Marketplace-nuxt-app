<template>
  <v-row class="mt-5 mt-sm-0" justify="center" align="center">
    <v-col class="d-flex flex-wrap align-center justify-center py-3" cols="12" md="10" lg="8">
      <nuxt-link class="d-none d-sm-flex justify-center align-center text-decoration-none" to="/">
        <img src="@/static/icons/Logo.png" alt="logo">
        <h3 class="app_link">Game Store</h3>
      </nuxt-link>

      <v-spacer></v-spacer>

      <div class="d-flex align-center mb-md-0 px-0">
        <v-autocomplete v-if="searchFlag" class="pl-7" :items="items" v-model="select"></v-autocomplete>
        <v-btn icon @click="searchFlag = !searchFlag">
          <v-icon class="app_link">mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="app_link">mdi-dots-vertical</v-icon>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      searchFlag: false,
      search: null,
      items: [],
      select: null,
      selectedId: null,
    }
  },
  mounted() {
    this.items = this.$store.state.allData.map(app => app.title);
  },
  watch: {
    select(v) {
      if(!v) {
        return this.$router.push('/');
      }
      let app = this.$store.state.allData[this.items.indexOf(v)];
      this.selectedId = app.id;
      this.$store.dispatch("updateSelectedApp", app);
      this.$router.push(`/details/${app.id}`);
    }
  }
}
</script>

<style lang="scss">
.v-input__control {
  &>div {
    margin-bottom: 0!important;
  }
}
</style>