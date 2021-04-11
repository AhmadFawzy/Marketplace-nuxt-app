<template>
  <section v-if="appData">
    <v-row class="home-body ma-0" justify="center" align="center">
      <v-col cols="12" md="10" lg="8">
        <section class="my-8">
          <v-card>
            <v-img max-width="100%" max-height="300px" :src="`/images/${appData.id}B.png`" alt="Featured image"></v-img>
          </v-card>
        </section>
        <section class="my-8">
          <v-card>
            <v-card-title>{{ appData.title }}</v-card-title>
            <v-card-subtitle>
              <p>{{ appData.category }}</p>
              <p>{{ appType }}</p>
            </v-card-subtitle>
            <v-card-text>{{ appData.body }}</v-card-text>
          </v-card>
        </section>
        <section v-if="recommendedApps" class="rounded-xl">
          <v-card class="px-sm-6 pb-7 px-3">
            <div class="d-flex align-center justify-space-between">
              <h3 class="py-4">Most Recommendation</h3>
              <nuxt-link class="app_link text-decoration-none" to="#">SEE ALL</nuxt-link>
            </div>
            <AppsContainer :apps="recommendedApps" @updateSelectedApp="updateSelectedApp" />
          </v-card>
        </section>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import AppsContainer from '@/components/AppsContainer';

export default {
  components: { AppsContainer },

  validate({params}) {
    return isFinite(params.id);
  },

  fetch({$axios, store, params}) {
    if(store.state.selectedApp && store.state.selectedApp.id == params.id) return true;
    return $axios.$get('https://jsonkeeper.com/b/JH0W')
    .then(res => {
      store.dispatch('updateAllData', res);
    })
    .catch(err => console.log(err))
  },

  data() {
    return {}
  },

  created() {
    this.getRecommendedApps();
  },

  computed: {
    appData() {
      return this.$store.state.selectedApp || this.getSelectedApp();
    },
    recommendedApps() {
      return this.$store.state.recommendedApps || this.getRecommendedApps();
    },
    appType() {
      if(this.appData) {
        let gameType;
        switch(this.appData.type) {
          case 'f':
            gameType = "Featured Game";
            break;
          case 'r':
            gameType = "Recommended Game";
            break;
          case 'p':
            gameType = "Popular Game";
            break;
          default:
            "unknown type";
        }
        return gameType;
      }
    }
  },

  methods: {
    updateSelectedApp(app) {
      this.$store.dispatch("updateSelectedApp", app);
      this.getRecommendedApps();
    },
    getSelectedApp() {
      return this.$store.state.allData.filter(app => app.id == this.$route.params.id)[0];
    },
    getRecommendedApps() {
      let recommendedData = this.$store.state.allData.filter(app => app.type == 'r' && app.category == this.appData.category && app.id != this.$route.params.id);
      this.$store.dispatch("updateRecommendedApps", recommendedData);
      return recommendedData;
    }
  }
}
</script>

<style></style>