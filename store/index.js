export default {
  state: () => ({
    allData: [],
    selectedApp: null
  }),
  mutations: {
    updateAllData(state, allData) {
      state.allData = allData;
    },
    updateSelectedApp(state, app) {
      state.selectedApp = app;
    }
  }
}