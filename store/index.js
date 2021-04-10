export default {
  state: () => ({
    allData: null,
    recommendedApps: null,
    selectedApp: null,
    selectedCategory: null,
  }),
  mutations: {
    updateAllData(state, allData) {
      state.allData = allData;
    },
    updateSelectedApp(state, app) {
      state.selectedApp = app;
    },
    updateSelectedCategory(state, category) {
      state.selectedCategory = category;
    },
    updateRecommendedApps(state, recommendedApps) {
      state.recommendedApps = recommendedApps;
    }
  },
  actions: {
    updateAllData(context, payload) {
      context.commit("updateAllData", payload)
    },
    updateSelectedApp(context, payload) {
      context.commit("updateSelectedApp", payload)
    },
    updateSelectedCategory(context, payload) {
      context.commit("updateSelectedCategory", payload)
    },
    updateRecommendedApps(context, payload) {
      context.commit("updateRecommendedApps", payload)
    }
  }
}