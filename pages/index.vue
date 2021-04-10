<template>
  <section v-if="allData" class="home-page">
    <v-row class="home-header mt-5 pb-8">
      <v-col class="d-flex justify-center pa-0" cols="12">
        <v-btn class="app_btn rounded-pill mx-1" v-for="(category, index) in categories" :key="index" @click="updateSelectedCategory(category)">
          <span>{{ category }}</span>
          <v-icon v-if="category==selectedCategory" dark right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="home-body ma-0" justify="center" align="center">
      <v-col cols="12" md="10" lg="8">
        <section v-if="featuredApp" class="my-8">
          <v-card>
            <v-row class="ma-0" align="center">
              <v-col cols="12" lg="9" class="pa-0">
                <v-img width="100%" max-height="350px" :src="`/images/${featuredApp[0].id}A.png`" alt="Featured image"></v-img>
              </v-col>
              <v-col class="pa-8" cols="12" lg="3">
                <h2>{{ featuredApp[0].title }}</h2>
                <p class="font-weight-thin">{{ featuredApp[0].body }}</p>
                <nuxt-link class="d-block text-center app_btn text-decoration-none" :to="`/details/${featuredApp[0].id}`">
                  <span class="d-block pa-md-3 pa-1" @click="updateSelectedApp(featuredApp[0])">MORE INFO</span>
                </nuxt-link>
              </v-col>
            </v-row>
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
        <section v-if="popularApps" class="rounded-xl my-8">
          <v-card class="px-sm-6 pb-7 px-3">
            <div class="d-flex align-center justify-space-between">
              <h3 class="py-4">Most Popular</h3>
              <nuxt-link class="app_link text-decoration-none" to="#">SEE ALL</nuxt-link>
            </div>
            <AppsContainer :apps="popularApps" @updateSelectedApp="updateSelectedApp" />
          </v-card>
        </section>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import AppsContainer from '@/components/AppsContainer';
export default {
  components: {
    AppsContainer
  },
  fetch({$axios, store}) {
    return $axios.$get('https://jsonkeeper.com/b/JH0W')
    .then(res => {
      store.dispatch('updateAllData', res);
    })
    .catch(err => console.log(err))
  },
  data() {
    return {
      categories: [],
      recommendedApps: [],
      popularApps: [],
      featuredApp: null,
      selectedCategory: null,
    }
  },
  computed: {
    allData() {
      return this.$store.state.allData;
    }
  },
  mounted() {
    this.filterByCategory();
    this.categories = this.allData.map(app => app.category);
    this.categories = [...new Set(this.categories)];
  },
  methods: {
    filterByCategory() {
      if(this.selectedCategory) {
        this.featuredApp = this.allData.filter(app => app.category == this.selectedCategory && app.type == 'f');
        this.recommendedApps = this.allData.filter(app => app.category == this.selectedCategory && app.type == 'r');
        this.$store.dispatch("updateRecommendedApps", this.recommendedApps);
        this.popularApps = this.allData.filter(app => app.category == this.selectedCategory && app.type == 'p');
      }else {
        this.featuredApp = this.allData.filter(app => app.category == 'action' && app.type == 'f');
        this.recommendedApps = this.allData.filter(app => app.type == 'r');
        this.$store.dispatch("updateRecommendedApps", this.recommendedApps);
        this.popularApps = this.allData.filter(app => app.type == 'p');
      }
    },
    updateSelectedApp(app) {
      this.$store.dispatch("updateSelectedApp", app);
    },
    updateSelectedCategory(category) {
      this.selectedCategory == category?
        this.selectedCategory = '':
        this.selectedCategory = category;
    }
  },
  watch: {
    selectedCategory(category) {
      this.filterByCategory();
      this.$store.dispatch("updateSelectedCategory", category);
    }
  }
}
</script>

<style scoped lang="scss"></style>