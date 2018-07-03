
const { ipcRenderer } = require('electron');

// initial state
const initialState = {
  list: []
};

// getters
const initialGetters = {
  projectList: state => state.list
};

// actions
const actions = {
  // 打开项目
  openProject() {
    ipcRenderer.send('open-dir-dialog');
  },
  createProject() {

  },
  getProjectList({ commit }) {
    // shop.getProductList().then((products) => {
    //   if (products.code === 0) {
    //     commit('setProducts', products.data);
    //   }
    // });
  }
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  },

  decrementProductInventory(state, { id }) {
    const product = state.all.find(p => p.id === id);
    product.inventory--;
  }
};

export default {
  namespaced: true,
  state: initialState,
  getters: initialGetters,
  actions,
  mutations
};
