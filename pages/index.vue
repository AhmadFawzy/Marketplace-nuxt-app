<template>
  <v-row v-if="allData" justify="center" align="center">
    <v-col cols="12" md="10" lg="8">
      <section v-if="featuredApp" class="my-8">
        <v-card>
          <v-row class="ma-0" align="center">
            <v-col cols="12" lg="9" class="pa-0">
              <v-img width="100%" :src="`/images/${featuredApp[0].id}A.png`" alt="Featured image"></v-img>
            </v-col>
            <v-col class="pa-8" cols="12" lg="3">
              <h2>{{ featuredApp[0].title }}</h2>
              <p>{{ featuredApp[0].body }}</p>
              <nuxt-link class="d-block text-center main-bg-color white--text text-decoration-none pa-3" :to="`/details/${featuredApp[0].id}`">MORE INFO</nuxt-link>
            </v-col>
          </v-row>
        </v-card>
      </section>
      <section v-if="recommendedApps" class="rounded-xl">
        <v-card class="px-6 pb-7">
          <div class="d-flex align-center justify-space-between">
            <h3 class="py-4">Most Recommendation</h3>
            <nuxt-link class="main-color text-decoration-none" to="#">SEE ALL</nuxt-link>
          </div>
          <AppsContainer :apps="recommendedApps" />
        </v-card>
      </section>
      <section v-if="popularApps" class="rounded-xl my-8">
        <v-card class="px-6 pb-7">
          <div class="d-flex align-center justify-space-between">
            <h3 class="py-4">Most Popular</h3>
            <nuxt-link class="main-color text-decoration-none" to="#">SEE ALL</nuxt-link>
          </div>
          <AppsContainer :apps="popularApps" />
        </v-card>
      </section>
    </v-col>
  </v-row>
</template>

<script>
import AppsContainer from '@/components/AppsContainer';
export default {
  components: {
    AppsContainer
  },
  fetch({$axios, store}) {
    return $axios.$get('https://jsonkeeper.com/b/6XNP')
    .then(res => {
      store.commit('updateAllData', res);
    })
    .catch(err => console.log(err))
  },
  data() {
    return {
      recommendedApps: [],
      popularApps: [],
      selectedCategory: null,
      featuredApp: null,

    }
  },
  computed: {
    allData() {
      return this.$store.state.allData;
    }
  },
  mounted() {
    this.filterByCategory();
  },
  methods: {
    filterByCategory() {
      if(this.selectedCategory) {
        this.featuredApp = this.allData.filter(app => app.category == this.selectedCategory && app.type == 'f');
        this.recommendedApps = this.allData.filter(app => app.category == this.selectedCategory && app.type == 'r');
        this.popularApps = this.allData.filter(app => app.category == this.selectedCategory && app.type == 'p');
      }else {
        this.featuredApp = this.allData.filter(app => app.category == 'action' && app.type == 'f');
        this.recommendedApps = this.allData.filter(app => app.type == 'r');
        this.popularApps = this.allData.filter(app => app.type == 'p');
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>